import React from 'react'
import new_collection from '../assets/new_collections'
import Item from '../components/Item'

const RelatedProducts = () => {
  return (
    <div className='w-full px-4' >
      <div className="realatedProducts text-center my-6 ">
        <h1 className='text-2xl font-semibold text-gray-600' >Related Products</h1>
      </div>
      <hr className='border-gray-300 my-4' />
      <div className="products grid grid-cols-2 sm:grid-cols-3 gap-6 ">
        {new_collection.slice(0,3).map((item, i)=>{
            return <Item key={i} id= {item.id} name= {item.name} image={item.image} newPrice = {item.new_price} oldPrice = {item.old_price} />  
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
