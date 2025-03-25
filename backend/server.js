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
const { kmeans } = require("ml-kmeans");   // ✅ Fix Import


require("dotenv").config();

const app = express();
app.use(express.json());
// app.use(cors());
app.use(express.urlencoded({ extended: true })); // ✅ Ensures form data is parsed correctly

const authMiddleware = require("./middleware/authMiddleware");
// const adminMiddleware = require('./middleware/adminMiddleware');


const allowedOrigins = ["http://localhost:5000", "http://localhost:4000"];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, origin);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true // ✅ REQUIRED for cookies to work
}));

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Credentials", "true"); // ✅ REQUIRED
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type, auth-token");
    }
    next();
});

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
    isAdmin: req.body.isAdmin || false,
  });
  await user.save();
  const data = {
    user: {
      id: user.id,
      isAdmin: user.isAdmin
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
          isAdmin: user.isAdmin
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
    const cartItems = req.body;

    console.log("User ID:", userId);
    // console.log("Received cart items:", cartItems);
    // console.log("Raw Request Body:", req.body); // ✅ Log full request body

    // console.log("Parsed cart items:", cartItems); // ✅ Debugging log

    // if (!cartItems || Object.keys(cartItems).length === 0) {
    //   return res.status(400).json({ message: "Cart is empty" });
    // }

    // This is correct code
    // const orderItems = Object.keys(cartItems)
    // .filter(productId => mongoose.Types.ObjectId.isValid(productId)) // ✅ Filter valid ObjectId
    // .map(productId => ({
    //     productId: new mongoose.Types.ObjectId(productId),
    //     quantity: cartItems[productId],
    // }));
 
const numericProductIds = Object.keys(cartItems).map(id => parseInt(id, 10)); // Convert to numbers

// Fetch the correct MongoDB _id using the numeric id
const products = await Product.find({ id: { $in: numericProductIds } }, "_id id new_price");

const productIdMap = new Map(products.map(product => [product.id, product._id.toString()])); // Map id to _id

const orderItems = numericProductIds.map(id => ({
    productId: productIdMap.get(id), // Get _id from map
    quantity: cartItems[id],
}));

// Calculate total price correctly
const totalAmount = orderItems.reduce((total, item) => {
    const price = products.find(p => p._id.toString() === item.productId)?.new_price || 0;
    return total + (price * item.quantity);
}, 0);

    //const totalAmount = orderItems.reduce((total, item) => total + item.quantity * 10, 0);

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

app.get("/admin/orders", async (req, res) => {
  try {
      const orders = await Order.find().populate("items.productId");  

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

      const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
      if (!updatedOrder) {
          return res.status(404).json({ message: "Order not found" });
      }

      res.json({ success: true, message: "Order status updated", order: updatedOrder });
  } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});
  

const Vibrant = require("node-vibrant/browser");

async function extractColorFromImage(imageUrl) {
    try {
        const palette = await Vibrant.from(imageUrl).getPalette();
        return palette.Vibrant.getHex(); // Extract dominant color
    } catch (error) {
        console.error("❌ Error extracting color:", error);
        return "#A0A0A0"; // Default color
    }
}

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
        color: dominantColor // ✅ Store extracted color
    });

    await newProduct.save();
    res.json({ success: true, product: newProduct });
});




app.get("/api/products", async (req, res) => {
  try {
      let products = await Product.find({});
      let productsWithColors = await Promise.all(products.map(getProductWithColors));
      res.json(productsWithColors);
  } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

const chroma = require("chroma-js");

// app.get("/api/recommendations", async (req, res) => {
//     const selectedColor = req.query.color;
//     if (!selectedColor) {
//         return res.status(400).json({ error: "Color is required" });
//     }

//     console.log("🎨 Received Color:", selectedColor);

//     try {
//         const products = await Product.find({});

//         // Ensure selectedColor is valid
//         const selectedColorRGB = chroma.valid(selectedColor) ? chroma(selectedColor).rgb() : null;
//         if (!selectedColorRGB) {
//             console.error("❌ Invalid color format received:", selectedColor);
//             return res.status(400).json({ error: "Invalid color format" });
//         }

//         console.log("🎨 Converted RGB:", selectedColorRGB);

//         const getColorDistance = (color) => {
//             if (!color || !chroma.valid(color)) {
//                 console.warn("⚠️ Invalid color detected, using default gray:", color);
//                 color = "#A0A0A0"; // Default color if missing
//             }
//             const productColorRGB = chroma(color).rgb();
//             return Math.sqrt(
//                 (selectedColorRGB[0] - productColorRGB[0]) ** 2 +
//                 (selectedColorRGB[1] - productColorRGB[1]) ** 2 +
//                 (selectedColorRGB[2] - productColorRGB[2]) ** 2
//             );
//         };

//         const relatedProducts = products
//             .map((product) => {
//                 const distance = getColorDistance(product.color);
//                 return { ...product._doc, colorDistance: distance };
//             })
//             .filter((product) => product.colorDistance !== Infinity) // Ignore invalid colors
//             .sort((a, b) => a.colorDistance - b.colorDistance)
//             .slice(0, 6);

//         console.log("✅ Related Products Found:", relatedProducts.length);
//         res.json(relatedProducts);
//     } catch (error) {
//         console.error("❌ Server Error Fetching Related Products:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });


//Latest working code do not close this
// app.get("/api/recommendations", async (req, res) => {
//   console.log(req.query);
//   const { productId } = req.query;

//   if (!productId) {
//       return res.status(400).json({ error: "Product ID is required" });
//   }

//   try {
//       // ✅ Get selected product's image URL
//       const selectedProduct = await Product.findOne({  id: Number(productId) });
//       if (!selectedProduct) {
//           return res.status(404).json({ error: "Product not found" });
//       }

//       console.log(`🖼 Extracting color for selected product: ${selectedProduct.image}`);
//       const selectedColor = await extractCenterColor(selectedProduct.image);
//       const selectedColorLAB = chroma(selectedColor).lab(); // Convert to LAB color space

//       // ✅ Fetch all products
//       const products = await Product.find({});
      
//       // ✅ Extract center colors for all products dynamically
//       const colorPromises = products.map(async (product) => ({
//           ...product._doc,
//           centerColor: await extractCenterColor(product.image)
//       }));
      
//       const productsWithColors = await Promise.all(colorPromises);

//       // ✅ Function to Calculate Color Similarity (CIE-LAB)
//       const getColorDistance = (color) => {
//           if (!color || !chroma.valid(color)) return Infinity;

//           const productColorLAB = chroma(color).lab();
//           return Math.sqrt(
//               (selectedColorLAB[0] - productColorLAB[0]) ** 2 +
//               (selectedColorLAB[1] - productColorLAB[1]) ** 2 +
//               (selectedColorLAB[2] - productColorLAB[2]) ** 2
//           );
//       };

//       // ✅ Find 6 Products with Closest Center Colors
//       const relatedProducts = productsWithColors
//           .map((product) => ({
//               ...product,
//               colorDistance: getColorDistance(product.centerColor),
//           }))
//           .filter((product) => product.product_id !== productId)  // ✅ Exclude selected product
//           .sort((a, b) => a.colorDistance - b.colorDistance) // ✅ Sort by similarity
//           .slice(0, 6); // ✅ Show top 6 related products

//       console.log("✅ Related Products Found:", relatedProducts.length);
//       res.json(relatedProducts);
//   } catch (error) {
//       console.error("❌ Error fetching recommendations:", error);
//       res.status(500).json({ error: "Failed to fetch related products" });
//   }
// });
const extractCenterColor = async (imageUrl) => {
  try {
      const image = await Jimp.read(imageUrl);
      const centerX = Math.floor(image.bitmap.width / 2);
      const centerY = Math.floor(image.bitmap.height / 2);

      // ✅ Extract a small 5x5 pixel average color from the center
      let r = 0, g = 0, b = 0, count = 0;
      for (let x = centerX - 2; x <= centerX + 2; x++) {
          for (let y = centerY - 2; y <= centerY + 2; y++) {
              const color = Jimp.intToRGBA(image.getPixelColor(x, y));
              r += color.r;
              g += color.g;
              b += color.b;
              count++;
          }
      }

      const avgColor = chroma(r / count, g / count, b / count).rgb(); // Convert to RGB array
      console.log(`🎨 Extracted Center Color: ${avgColor} from ${imageUrl}`);
      return avgColor;
  } catch (error) {
      console.error("❌ Error extracting center color:", error);
      return [150, 150, 150]; // Default fallback color
  }
};

// ✅ Find Related Products Using K-Means Clustering
app.get("/api/recommendations", async (req, res) => {
  const { productId } = req.query;

  if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
  }

  try {
      // ✅ Get selected product's image URL
      const selectedProduct = await Product.findOne({ id: Number(productId) });
      if (!selectedProduct) {
          return res.status(404).json({ error: "Product not found" });
      }

      console.log(`🖼 Extracting color for selected product: ${selectedProduct.image}`);
      const selectedColor = await extractCenterColor(selectedProduct.image);

      // ✅ Fetch all products
      const products = await Product.find({});
      
      // ✅ Extract center colors for all products dynamically
      const colorPromises = products.map(async (product) => ({
          ...product._doc,
          centerColor: await extractCenterColor(product.image)
      }));
      
      const productsWithColors = await Promise.all(colorPromises);
      console.log("✅ kmeans function:", typeof kmeans);


      const colorVectors = productsWithColors.map(p => p.centerColor).filter(c => c.length === 3);
      if (colorVectors.length === 0) {
          return res.status(500).json({ error: "No valid color data found" });
      }

      console.log("📊 Running K-Means on", colorVectors.length, "color samples...");

      // ✅ K-Means Clustering (Fix)
      let k = Math.min(5, colorVectors.length);  // ✅ Ensure `k` is within valid range
      const clusters = kmeans(colorVectors, k);  // ✅ Fix K-Means Usage
      console.log("✅ K-Means Clusters Generated:", clusters.centroids);

      // ✅ Find the cluster of the selected product
      const selectedCluster = clusters.clusters[productsWithColors.findIndex(p => p.id === Number(productId))];
      console.log(`📌 Selected Product Cluster: ${selectedCluster}`);

      // ✅ Get products from the same cluster
      const relatedProducts = productsWithColors
          .map((product, index) => ({
              ...product,
              cluster: clusters.clusters[index]
          }))
          .filter((product) => product.cluster === selectedCluster && product.id !== Number(productId)) // Exclude selected product
          .slice(0, 6); // ✅ Show top 6 related products

      console.log("✅ Related Products Found:", relatedProducts.length);
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
