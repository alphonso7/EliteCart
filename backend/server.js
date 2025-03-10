const express = require("express");
const cors = require("cors");
const multer = require("multer");
// const axios = require("axios");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");
const { type } = require("os");
const Product = require('./models/Product')

require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors());


// Database connection
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected Successfully");
}).catch((error) => {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); 
});


// api creation
app.get('/', (req, res) =>{
    res.send("Express app is running");
})

//image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage: storage})

// creating upload endpoint for images
app.use('/images', express.static(path.join(__dirname , '/upload/images')))
app.post("/upload", upload.single('product'),(req, res)=>{
    res.json({
        success: 1,
        image_url:  `http://localhost:${process.env.PORT}/images/${req.file.filename}`
    })
})

//schema for creating products
// const Product = mongoose.model("Product",{
//     id:{
//         type: Number,
//         required: true,
//     },
//     name:{
//         type: String,
//         required: true,
//     },
//     image:{
//         type:String,
//         required: true,
//     },
//     category:{
//         type:String,
//         required: true,
//     },
//     new_price:{
//         type: Number,
//         required:true,
//     },
//     old_price:{
//         type:Number,
//         required:true,
//     },
//     date:{
//         type:Date,
//         default:Date.now,
//     },
//     available:{
//         type:Boolean,
//         default:true,
//     },
// })

app.post('/addproduct', async (req, res) => {
    
        let lastProduct = await Product.findOne().sort({ id: -1 });
        let id = lastProduct ? lastProduct.id + 1 : 1;
        const { name, image, category, new_price, old_price } = req.body;
        if (!name || !image || !category || !new_price || !old_price) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

// for deleting products
app.post('/removeproduct', async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ id: req.body.id });

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        console.log("Removed:", deletedProduct);
        res.json({
            success: true,
            message: "Product removed successfully",
            deletedProduct: deletedProduct, // Send deleted product details
        });

    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
});


//api for getting all products
app.get('/allproducts', async(req, res)=>{
    try{
        let products = await Product.find({});
        console.log("All Products fetch");
        res.send(products);
    }
    catch{
        console.log(error);
        res.status(500).json({message: "NOt found"});
    }
})


app.listen(process.env.PORT, (error) =>{
    if(!error){
        console.log(`Server running on port ${process.env.PORT}`)
    }
    else{
        console.log(error);
    }
})