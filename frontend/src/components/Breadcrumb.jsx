import React from 'react'
import arrow_icon from '../assets/breadcrum_arrow.png'

const Breadcrumb = (props) => {
     const {product} = props
  return (
    <div className='flex font-serif font-medium ml-5 mt-2 gap-3' >
        HOME <img className='h-5 w-auto' src={arrow_icon} alt="" /> 
        SHOP <img className='h-5 w-auto' src={arrow_icon} alt="" /> 
        CATEGORY <img className='h-5 w-auto' src={arrow_icon} alt="" /> 
        {product}  
    </div>
  )
}

export default Breadcrumb
