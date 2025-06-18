const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");
const Product = require("./models/Product");
const Users = require("./models/Users");
const Order = require("./models/Order");
const Jimp = require("jimp");
const { kmeans } = require("ml-kmeans");
const chroma = require("chroma-js");
const Vibrant = require("node-vibrant/browser");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authMiddleware = require("./middleware/authMiddleware");
const allowedOrigins = ["http://localhost:3000", "http://localhost:5000", "https://elitecart-frontend.onrender.com", "https://elitecart-backend.onrender.com"]

app.use(
  cors({
    // origin: "https://elitecart-frontend.onrender.com",
    origin: allowedOrigins,
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "auth-token"],
  })
);

// Handle preflight OPTIONS requests
app.options("*", cors());

// Database connection
mongoose
  .connect(process.env.MONGO_DB_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
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
    image_url: `${process.env.BASE_URL}/images/${req.file.filename}`,
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
  await product.save();
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
      deletedProduct: deletedProduct,
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
    // res.send(products);
    res.json(products);
  } catch(error) {
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
    isAdmin: req.body.isAdmin || false,
  });
  await user.save();
  const data = {
    user: {
      id: user.id,
      isAdmin: user.isAdmin,
    },
  };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });

  res.json({ success: true, isAdmin: user.isAdmin });
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
          isAdmin: user.isAdmin,
        },
      };
      const token = jwt.sign(data, "secret_ecom");

      res.json({ success: true, token, userId: user.id });
    } else {
      res.json({ success: false, errors: "Wrong password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong EmailId" });
  }
});

// Update user profile
app.put("/user/profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, date } = req.body;

    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { name, email, date },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/api/user/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id).select(
      "name email date address"
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
app.put("/api/user/:id", async (req, res) => {
  const { name, email, date, address } = req.body;
  try {
    const user = await Users.findByIdAndUpdate(
      req.params.id,
      { name, email, date, address },
      { new: true, runValidators: true }
    ).select("name email date address");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

//creating endpoint for newCollection data
app.get("/newCollections", async (req, res) => {
  let products = await Product.find({});
  let newCollection = products.slice(1).slice(-8);
  res.send(newCollection);
});

//creatign endpoitn for popular in women
app.get("/popularInWomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
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

    const orders = await Order.find({ userId }).populate(
      "items.productId",
      "name image new_price"
    );

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
    const cartItems = req.body;


    const numericProductIds = Object.keys(cartItems).map((id) =>
      parseInt(id, 10)
    ); // Convert to numbers

    // Fetch the correct MongoDB _id using the numeric id
    const products = await Product.find(
      { id: { $in: numericProductIds } },
      "_id id new_price"
    );

    const productIdMap = new Map(
      products.map((product) => [product.id, product._id.toString()])
    ); // Map id to _id

    const orderItems = numericProductIds.map((id) => ({
      productId: productIdMap.get(id), // Get _id from map
      quantity: cartItems[id],
    }));

    // Calculate total price correctly
    const totalAmount = orderItems.reduce((total, item) => {
      const price =
        products.find((p) => p._id.toString() === item.productId)?.new_price ||
        0;
      return total + price * item.quantity;
    }, 0);

    const newOrder = new Order({
      userId,
      items: orderItems,
      totalAmount,
      status: "Processing",
    });

    await newOrder.save();
    // console.log("Order saved successfully:", newOrder);
    res.json({ success: true, order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
});

app.get("/admin/orders", async (req, res) => {
  try {
    const orders = await Order.find().populate("items.productId", "name");

    if (!Array.isArray(orders)) {
      return res.status(500).json({ message: "Orders should be an array" });
    }

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/admin/orders/:orderId", async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.orderId;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      success: true,
      message: "Order status updated",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//api to see total users
app.get("/totalusers", async (req, res) => {
  try {
    const count = await Users.countDocuments(); // counts all users
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user count" });
  }
});

// api for checkout page
app.get("/api/checkout", async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select("name email address");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({
      name: user.name,
      email: user.email,
      address: user.address,
    });
  } catch (error) {
    console.error("Error creating order");
    res.status(500).json({ error: "server error" });
  }
});

app.post("/api/add-product", async (req, res) => {
  const { name, image, category, new_price, old_price, available } = req.body;

  const dominantColor = await extractColorFromImage(image);

  const newProduct = new Product({
    name,
    image,
    category,
    new_price,
    old_price,
    available,
    color: dominantColor, // ✅ Store extracted color
  });

  await newProduct.save();
  res.json({ success: true, product: newProduct });
});

app.get("/api/products", async (req, res) => {
  try {
    let products = await Product.find({});
    let productsWithColors = await Promise.all(
      products.map(getProductWithColors)
    );
    res.json(productsWithColors);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const extractCenterColor = async (imageUrl) => {
  try {
    const image = await Jimp.read(imageUrl);
    const centerX = Math.floor(image.bitmap.width / 2);
    const centerY = Math.floor(image.bitmap.height / 2);

    //  Extract a larger 20x20 pixel average color from the center
    let r = 0,
      g = 0,
      b = 0,
      count = 0;
    for (let x = centerX - 10; x <= centerX + 10; x++) {
      // Range from -10 to +10 for a 20x20 area
      for (let y = centerY - 10; y <= centerY + 10; y++) {
        // Range from -10 to +10 for a 20x20 area
        const color = Jimp.intToRGBA(image.getPixelColor(x, y));
        r += color.r;
        g += color.g;
        b += color.b;
        count++;
      }
    }

    const avgColor = chroma(r / count, g / count, b / count).rgb(); // Convert to RGB array
    return avgColor;
  } catch (error) {
    console.error(" Error extracting center color:", error);
    return [150, 150, 150];  
  }
};

//  Find Related Products Using K-Means Clustering
app.get("/api/recommendations", async (req, res) => {
  const { productId } = req.query;

  if (!productId) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  try {
    //  Get selected product's image URL
    const selectedProduct = await Product.findOne({ id: Number(productId) });
    if (!selectedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    
    const selectedColor = await extractCenterColor(selectedProduct.image);

    //  Fetch all products
    const products = await Product.find({});

    // Extract center colors for all products dynamically
    const colorPromises = products.map(async (product) => ({
      ...product._doc,
      centerColor: await extractCenterColor(product.image),
    }));

    const productsWithColors = await Promise.all(colorPromises);

    const colorVectors = productsWithColors
      .map((p) => p.centerColor)
      .filter((c) => c.length === 3);
    if (colorVectors.length === 0) {
      return res.status(500).json({ error: "No valid color data found" });
    }


    //  K-Means Clustering (Fix)
    let k = Math.min(5, colorVectors.length); 
    const clusters = kmeans(colorVectors, k);  
    // console.log("✅ K-Means Clusters Generated:", clusters.centroids);

    const selectedCluster =
      clusters.clusters[
        productsWithColors.findIndex((p) => p.id === Number(productId))
      ];

    const relatedProducts = productsWithColors
      .map((product, index) => ({
        ...product,
        cluster: clusters.clusters[index],
      }))
      .filter(
        (product) =>
          product.cluster === selectedCluster &&
          product.id !== Number(productId)
      ) // Exclude selected product
      .slice(0, 6); //  Show top 6 related products

    // console.log(" Related Products Found:", relatedProducts.length);
    res.json(relatedProducts);
  } catch (error) {
    console.error("❌ Error fetching recommendations:", error);
    res.status(500).json({ error: "Failed to fetch related products" });
  }
});

app.listen(process.env.PORT, (error) => {
  if (!error) {
    console.log(`Server running on port ${process.env.PORT}`);
  } else {
    console.log(error);
  }
});
