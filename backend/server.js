const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const Product = require("./models/Product");
const Users = require("./models/Users");
const Order = require("./models/Order");


require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // ✅ Ensures form data is parsed correctly

const authMiddleware = require("./middleware/authMiddleware");

// Database connection
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  });

// api creation
app.get("/", (req, res) => {
  res.send("Express app is running");
});

//image storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

// creating upload endpoint for images
app.use("/images", express.static(path.join(__dirname, "/upload/images")));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`,
  });
});

 

app.post("/addproduct", async (req, res) => {
  let lastProduct = await Product.findOne().sort({ id: -1 });
  let id = lastProduct ? lastProduct.id + 1 : 1;
  const { name, image, category, new_price, old_price } = req.body;
  if (!name || !image || !category || !new_price || !old_price) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required!" });
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// for deleting products
app.post("/removeproduct", async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ id: req.body.id });

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    console.log("Removed:", deletedProduct);
    res.json({
      success: true,
      message: "Product removed successfully",
      deletedProduct: deletedProduct, // Send deleted product details
    });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

//api for getting all products
app.get("/allproducts", async (req, res) => {
  try {
    let products = await Product.find({});
    // console.log("All Products fetch");
    res.send(products);
  } catch {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "NOt found" });
  }
});

//Creating endpoint for registering user
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    res.status(400).json({
      success: false,
      errors: "Existing user found with same email address",
    });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

//creating endpoint for user login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  // console.log(user)
  if (user) {
    // console.log(req.body.password);
    // console.log(user.password)
    // const passCompare = await bcrypt.compare(req.body.password, user.password);
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong EmailId" });
  }
});

//creating endpoint for newCollection data
app.get("/newCollections", async (req, res) => {
  let products = await Product.find({});
  let newCollection = products.slice(1).slice(-8);
  console.log("New Collection fecthed");
  res.send(newCollection);
});

//creatign endpoitn for popular in women
app.get("/popularInWomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  console.log("POpulalr in women fecthed");
  res.send(popular_in_women);
});

//creating endpoint for adding products in cart
app.post("/addToCart", async (req, res) => {
  console.log(req.body);
});

// for order list display
app.get("/yourorders", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("👤 Fetching orders for User ID:", userId);

    const orders = await Order.find({ userId }).populate(
      "items.productId",
      "name image new_price"
    );

    console.log("📦 Orders Fetched from DB:", orders);

    if (!orders || !Array.isArray(orders)) {
      console.error("🚨 No valid orders found");
      return res.status(200).json([]);
    }

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

//to create order for user
app.post("/create-order", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems  = req.body;

    console.log("User ID:", userId);
    // console.log("Received cart items:", cartItems); 
    // console.log("Raw Request Body:", req.body); // ✅ Log full request body

    // console.log("Parsed cart items:", cartItems); // ✅ Debugging log

    // if (!cartItems || Object.keys(cartItems).length === 0) {
    //   return res.status(400).json({ message: "Cart is empty" });
    // }

    const orderItems = Object.keys(cartItems)
    .filter(productId => mongoose.Types.ObjectId.isValid(productId)) // ✅ Filter valid ObjectId
    .map(productId => ({
        productId: new mongoose.Types.ObjectId(productId),
        quantity: cartItems[productId],
    }));

    const totalAmount = orderItems.reduce((total, item) => total + item.quantity * 10, 0);

    // const orderItems = Object.keys(cartItems)
    // // .map((productId) => parseInt(productId, 10)) // Convert to integer
    // .filter((id) => !isNaN(id) && cartItems[id] > 0); // Ensure valid numbers and quantity > 0
    // console.log(orderItems)

    //   const productIds = orderItems.map((item) => item.productId);
    //   console.log(productIds);
    //   const products = await Product.find({ id: { $in: productIds } });
  
    //   console.log("📦 Fetched Products:", products);

    // // ✅ Match products with orderItems to get correct prices
    // const productPriceMap = new Map();
    // products.forEach((product) => {
    //   productPriceMap.set(product._id.toString(), product.new_price);
    // });

    // orderItems.forEach((item) => {
    //   const price = productPriceMap.get(item.productId.toString()) || 0;
    //   item.price = price; // ✅ Assign price to item
    //   item.total = price * item.quantity; // ✅ Calculate total
    // });

    // console.log("📝 Order Items to Save:", orderItems);

    // const totalAmount = orderItems.reduce(
    //   (total, item) => total + item.total,
    //   0
    // );

    // if (!cartItems || typeof cartItems !== "object") {
    //     return res.status(400).json({ message: "Invalid cart data received" });
    //   }
  
    //   // ✅ Step 1: Extract `id` values from `cartItems` where quantity > 0
    // //   console.log(cartItems) correct hai
    // const productIds = Object.keys(cartItems).map((id) => parseInt(id, 10));

    //     // .map((id) => parseInt(id, 10)) // Convert keys to integer (match `id` in DB)
    //     // .filter((id) => !isNaN(id) && cartItems[id] > 0); // Ensure valid numbers with quantity > 0
  
    // //   if (productIds.length === 0) {
    // //     return res.status(400).json({ message: "No valid products in cart" });
    // //   }
  
    //   console.log("  Product IDs  ", productIds);
  
    //   // ✅ Step 2: Fetch `_id` and `new_price` from products using `id`
    //   const products = await Product.find({ id: { $in: productIds } }, "_id id new_price name image");
  
    //   console.log("📦 Fetched Products:", products);
  
    //   if (!products || products.length === 0) {
    //     return res.status(400).json({ message: "No matching products found" });
    //   }
  
    //   // ✅ Step 3: Match products with `cartItems` to create `orderItems`
    //   const orderItems = products.map((product) => ({
    //     productId: product._id, // Store MongoDB `_id`
    //     name: product.name, // Store name for reference
    //     image: product.image, // Store image for reference
    //     quantity: cartItems[product.id], // Match by `id`
    //     price: product.new_price, // Store `new_price`
    //     total: product.new_price * cartItems[product.id], // Calculate total
    //   }));
  
    //   console.log("📝 Order Items:", orderItems);
  
    //   if (orderItems.length === 0) {
    //     return res.status(400).json({ message: "Order items could not be created" });
    //   }
  
    //   // ✅ Step 4: Calculate total amount
    //   const totalAmount = orderItems.reduce((sum, item) => sum + item.total, 0);
  
    const newOrder = new Order({
      userId,
      items: orderItems,
      totalAmount,
      status: "Processing",
    });

    await newOrder.save();
    console.log("Order saved successfully:", newOrder);
    res.json({ success: true, order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
});

app.listen(process.env.PORT, (error) => {
  if (!error) {
    console.log(`Server running on port ${process.env.PORT}`);
  } else {
    console.log(error);
  }
});
