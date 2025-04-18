// import React, { useContext, useState } from 'react'
// import star_icon from '../assets/star_icon.png'
// import star_dull_icon from '../assets/star_dull_icon.png'
// import { ShopContext } from '../Context/ShopContext'


// const ProductDisplay = (props) => {


//   const [color, setColor] = useState('bg-gray-300');
//   const {addToCart} = useContext(ShopContext);

//   return (
//     <div className='flex mx-10 ' >
//       <div className="displayLeft flex-col ">
//         <img className='h-35 w-30 p-2' src={props.productImage} alt="" />
//         <img className='h-35 w-30 p-2' src={props.productImage} alt="" />
//         <img className='h-35 w-30 p-2' src={props.productImage} alt="" />
//         {/* <img className='h-35 w-30 ' src={props.productImage} alt="" /> */}
//       </div>
//       <div className="mainImage p-2 ">
//         <img src={props.productImage} alt="" /> 
//       </div>
//       <div className="displayRight">
//       <div className="productText p-1 w-100 " >
//         <h1 className='font-semibold text-zinc-900 text-2xl' >{props.productName}</h1>
//         <p className='m-2 text-red-500 font-medium' >Description </p>
//         <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa cupiditate, iusto nesciunt dolorem quo reprehenderit! Maxime quam culpa deserunt, animi dolorem consequuntur natus?</p>
//       </div>
//       <div>
//         Select Your size
//         <button onClick={() => {color==='bg-gray-300'? setColor('bg-red-400') : setColor('bg-gray-300')}} className={`w-8 ${color} m-2`} >S</button >
//         <button onClick={() => {color==='bg-gray-300'? setColor('bg-red-400') : setColor('bg-gray-300')}} className={`w-8 ${color} m-2`} >M</button >
//         <button onClick={() => {color==='bg-gray-300'? setColor('bg-red-400') : setColor('bg-gray-300')}} className={`w-8 ${color} m-2`} >L</button >
//         <button onClick={() => {color==='bg-gray-300'? setColor('bg-red-400') : setColor('bg-gray-300')}} className={`w-8 ${color} m-2`} >XL</button >
//         <button onClick={() => {color==='bg-gray-300'? setColor('bg-red-400') : setColor('bg-gray-300')}} className={`w-8 ${color} m-2`} >XXL</button >
//         {/* <button onClick={() => {color==='bg-gray-300'? setColor('bg-red-400') : setColor('bg-gray-300')}} className={`w-8 ${color} m-2`} >S</button > */}
//       </div>
//       <div className="productRevies flex space-x-2">
//         Reviews 
//         <span><img src={star_icon} alt="" /></span>
//         <span><img src={star_icon} alt="" /></span>
//         <span><img src={star_icon} alt="" /></span>
//         <span><img src={star_icon} alt="" /></span>
//         <span><img src={star_dull_icon} alt="" /></span>
//         <span>(24345)</span>
//       </div>
//       <div className="addToCart mt-3">
//         <button onClick={()=>{addToCart(props.productId)}} className='bg-red-500 hover:bg-gray-300 rounded p-1' >Add to Cart</button>
//       </div>
//       </div>

//     </div>
//   )
// }

// export default ProductDisplay

import React, { useContext, useState } from 'react';
import star_icon from '../assets/star_icon.png';
import star_dull_icon from '../assets/star_dull_icon.png';
import { ShopContext } from '../Context/ShopContext';
import Navbar from './Navbar';

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const ProductDisplay = (props) => {
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <>
      <div className="flex flex-col md:flex-row mx-6 md:mx-10 my-6 gap-6">
        {/* Left Thumbnails */}
        <div className="flex flex-col gap-2">
          {[...Array(3)].map((_, idx) => (
            <img
              key={idx}
              className="w-24 h-28 object-cover rounded border hover:scale-105 transition"
              src={props.productImage}
              alt={`Thumbnail ${idx + 1}`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 flex justify-center items-center">
          <img
            className="w-full max-w-md object-cover rounded shadow-lg"
            src={props.productImage}
            alt={props.productName}
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{props.productName}</h1>

          <div>
            <div className="price-section flex items-center gap-2">
              <p className="old-price line-through text-gray-500">
                {props.productOldPrice}
              </p>
              <span className="badge bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                Special Offer
              </span>
              <p className="new-price text-green-600 font-bold text-3xl">
                {props.productNewPrice} INR
              </p>
            </div>
            <p className="text-gray-600 text-sm">
              Experience the perfect blend of innovation, performance, and reliability with this premium-quality product — expertly designed to meet the evolving demands of modern consumers. Whether you're a discerning enthusiast or a first-time buyer, this product delivers exceptional functionality that sets a new standard in its category.
            </p>
            <p className='text-gray-500 font-semibold text-sm'>Key Features:</p>

            <p className='text-gray-500  text-sm' >Superior Quality Materials: Crafted from high-grade, durable components to ensure long-lasting performance and resilience under daily use.</p>

            <p className='text-gray-500  text-sm' >Advanced Technology: Integrated with cutting-edge features to enhance usability, efficiency, and overall satisfaction.</p>

            <p className='text-gray-500 text-sm' >Ergonomic & User-Friendly Design: Engineered with precision for optimal comfort and ease of use, tailored to suit diverse preferences and requirements.</p>


          </div>

          {/* Sizes */}
          <div>
            <p className="font-semibold mb-1">Select your size:</p>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 rounded-full border font-medium ${selectedSize === size ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'
                    } hover:bg-red-400 transition`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div>
            <button
              onClick={() => addToCart(props.productId)}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-gray-300 hover:text-black transition font-semibold"
            >
              Add to Cart
            </button>
          </div>

          {/* Reviews */}
          <div className="flex items-center space-x-1">
            <span className="text-sm font-semibold">Reviews:</span>
            {[...Array(4)].map((_, i) => (
              <img key={i} className="w-5 h-5" src={star_icon} alt="star" />
            ))}
            <img className="w-5 h-5" src={star_dull_icon} alt="star" />
            <span className="text-sm text-gray-500">(24,345)</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;

