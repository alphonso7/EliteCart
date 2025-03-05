import React from 'react'
import { Link } from 'react-router-dom'

const Item = (props) => {
  return (
    <div className='grid-cols-3 inline-block m-9 w-auto h-xl  pl-6 sm:pl-10 justify-items-center' >
      <Link to={`/Product/${props.id}`} > <img className='w-50 h-auto border-gray-400' src={props.image} alt="iamge" onClick={window.screen} /></Link>
      <div className='justify-center w-60 ' >
        <p className='overflow-clip text-stone-950 pt-2 font-serif ' >{props.name}</p>
        <p className='line-through' > $ {props.oldPrice} </p>
        <p className='text font-bold' >$ {props.newPrice} </p>
      </div>
    </div>
  )
}

export default Item
