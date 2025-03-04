import React from 'react'
import { Link } from 'react-router-dom'

const Item = (props) => {
  return (
    <div className='grid-cols-3 inline-block m-10' >
      <Link to={`/Product/${props.id}`} > <img className='m-6' src={props.image} alt="iamge" onClick={window.screen} /></Link>
      <div className='justify-center w-100 ' >
        <p className='overflow-clip' >{props.name}</p>
        <p className='line-through' > {props.oldPrice} </p>
        <p>{props.newPrice} Rs </p>
      </div>
    </div>
  )
}

export default Item
