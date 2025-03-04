import React from 'react'
import data_product from '../assets/data'
import Item from './Item'

const Popular = () => {
  return (
    <div >
      <div className="popular">
        <h1>Popular in Women</h1>
        <hr />
      </div>
      <div className="items justify-evenly inline-block">
        {data_product.map((item, i) =>{
            return <Item key={i} id= {item.id} name={item.name} image = {item.image} oldPrice = {item.old_price} newPrice={item.new_price} />
        })}
      </div>
    </div>
  )
}

export default Popular
