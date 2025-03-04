import React from 'react'
import arrow_icon from '../assets/breadcrum_arrow.png'

const Breadcrumb = (props) => {
     const {product} = props
  return (
    <div className='flex' >
        HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> CATEGORY <img src={arrow_icon} alt="" /> {product}  
    </div>
  )
}

export default Breadcrumb
