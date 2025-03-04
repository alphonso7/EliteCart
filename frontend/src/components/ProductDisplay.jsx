import React, { useContext } from 'react'
import star_icon from '../assets/star_icon.png'
import star_dull_icon from '../assets/star_dull_icon.png'
import { ShopContext } from '../Context/ShopContext'

const ProductDisplay = (props) => {
  const {addToCart} = useContext(ShopContext);
  return (
    <div className='flex mx-10 ' >
      <div className="displayLeft flex-col ">
        <img className='h-35 w-30 p-2' src={props.productImage} alt="" />
        <img className='h-35 w-30 p-2' src={props.productImage} alt="" />
        <img className='h-35 w-30 p-2' src={props.productImage} alt="" />
        {/* <img className='h-35 w-30 ' src={props.productImage} alt="" /> */}
      </div>
      <div className="mainImage p-2 ">
        <img src={props.productImage} alt="" /> 
      </div>
      <div className="displayRight">
      <div className="productText p-1 w-100 " >
        <h1 className='font-bold' >{props.productName}</h1>
        <p>Description </p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa cupiditate, iusto nesciunt dolorem quo reprehenderit! Maxime quam culpa deserunt, animi dolorem consequuntur natus?</p>
      </div>
      <div>
        select Your size
        <p>S</p>
        <p>M</p>
        <p>L</p>
        <p>XL</p>
        <p>XXL</p>
      </div>
      <div className="productRevies flex ">
        Reviews 
        <span><img src={star_icon} alt="" /></span>
        <span><img src={star_icon} alt="" /></span>
        <span><img src={star_icon} alt="" /></span>
        <span><img src={star_icon} alt="" /></span>
        <span><img src={star_dull_icon} alt="" /></span>
        <span>(24345)</span>
      </div>
      <div className="addToCart">
        <button onClick={()=>{addToCart(props.productId)}} className='bg-red-500 hover:bg-red-700 ' >Add to Cart</button>
      </div>
      </div>
      
    </div>
  )
}

export default ProductDisplay
