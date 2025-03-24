import React, { useContext, useState } from 'react'
import star_icon from '../assets/star_icon.png'
import star_dull_icon from '../assets/star_dull_icon.png'
import { ShopContext } from '../Context/ShopContext'


const ProductDisplay = (props) => {

  
  const [color, setColor] = useState('bg-gray-300');
  const {addToCart} = useContext(ShopContext);

  // const newColor = () =>{
  //   if(color === 'bg-gray-300'){
  //     setColor('bg-red-400');
  //   }
  //   else{
  //     setColor('bg-gray-300');
  //   }
  // }

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
        <h1 className='font-semibold text-zinc-900 text-2xl' >{props.productName}</h1>
        <p className='m-2 text-red-500 font-medium' >Description </p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa cupiditate, iusto nesciunt dolorem quo reprehenderit! Maxime quam culpa deserunt, animi dolorem consequuntur natus?</p>
      </div>
      <div>
        Select Your size
        <button onClick={() => {color==='bg-gray-300'? setColor('bg-red-400') : setColor('bg-gray-300')}} className={`w-8 ${color} m-2`} >S</button >
        <button onClick={() => {color==='bg-gray-300'? setColor('bg-red-400') : setColor('bg-gray-300')}} className={`w-8 ${color} m-2`} >M</button >
        <button onClick={() => {color==='bg-gray-300'? setColor('bg-red-400') : setColor('bg-gray-300')}} className={`w-8 ${color} m-2`} >L</button >
        <button onClick={() => {color==='bg-gray-300'? setColor('bg-red-400') : setColor('bg-gray-300')}} className={`w-8 ${color} m-2`} >XL</button >
        <button onClick={() => {color==='bg-gray-300'? setColor('bg-red-400') : setColor('bg-gray-300')}} className={`w-8 ${color} m-2`} >XXL</button >
        {/* <button onClick={() => {color==='bg-gray-300'? setColor('bg-red-400') : setColor('bg-gray-300')}} className={`w-8 ${color} m-2`} >S</button > */}
      </div>
      <div className="productRevies flex space-x-2">
        Reviews 
        <span><img src={star_icon} alt="" /></span>
        <span><img src={star_icon} alt="" /></span>
        <span><img src={star_icon} alt="" /></span>
        <span><img src={star_icon} alt="" /></span>
        <span><img src={star_dull_icon} alt="" /></span>
        <span>(24345)</span>
      </div>
      <div className="addToCart mt-3">
        <button onClick={()=>{addToCart(props.productId)}} className='bg-red-500 hover:bg-gray-300 rounded p-1' >Add to Cart</button>
      </div>
      </div>
      
    </div>
  )
}

export default ProductDisplay
