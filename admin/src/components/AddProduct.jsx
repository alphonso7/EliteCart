import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../src/assets/upload_area.svg'

const AddProduct = () => {

    const[image, setimage] = useState(false);

    const handleImageChange = (e) =>{
        setimage(e.target.files[0]);
    }
    const [productDetails, setProductDetails] = useState({
        name: '',
        image: '',
        category: 'women',
        new_price:'',
        old_price:''
    });

    const changeHandler = (e) =>{
        setProductDetails({...productDetails, [e.target.name]:e.target.value})
    }

    const Add_Product = async() =>{
        // console.log(productDetails)
        let responseData;
        let product = productDetails;
        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:3000/upload', {
            method: 'POST',
            headers:{
                Accept:'application/json'
            },
            body: formData,

        }).then((resp) => resp.json())
        .then((data) => {responseData=data});

        if(responseData.success){
            product.image = responseData.image_url;
            // console.log(product);
            await fetch('http://localhost:3000/addproduct', {
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(product),
            })
            .then((resp) => resp.json())
            .then((data)=> {
                if(data.success){
                    alert("Product added")
                }
                else{
                    alert("Failed adding product")
                }
            } )
        }
    }
  return (
    <div className='add-product'>
        <div className="itemfeild">
            <p>Product title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='type here' />
        </div>
        <div className="product-price">
            <div className="itemfeild">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='type here'  />
            </div>
            <div className="itemfeild">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='type here'  />
            </div>
        </div>
        <div className="itemfeild">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className='selector'>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>
        <div className="itemfeild">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} className='thumbnail' alt="" />
            </label>
            <input onChange={handleImageChange} type="file" name="imae" id="file-input" hidden />
        </div>
        <button onClick={()=> Add_Product()} className="addproduct-button">
            ADD
        </button>
    </div>
  )
}

export default AddProduct
