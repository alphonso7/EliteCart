import React, { useEffect, useState } from 'react'
// import data_product from '../assets/data'
import Item from './Item'
import API_BASE from '../config';

const Popular = () => {

  const[popular, setPopular] = useState([]);

  useEffect(()=>{
    fetch(`${API_BASE}/popularInWomen`)
    .then((resp) => resp.json())
    .then((data) => setPopular(data))
  },[])

  return (
    <div >
      <div className="popular p-4">
        <h1 className='text-xl font-semibold text-gray-700' >Popular in Women</h1>
        <hr className='border-gray-500 my-4' />
      </div>
      <div className="items justify-items-center">
        {/* <div className="from justify-self-start pl-10 text-black-300 font-semibold">
          From INR 50
        </div> */}
        {popular.map((item, i) =>{
            return <Item key={i} id= {item.id} name={item.name} image = {item.image} oldPrice = {item.old_price} newPrice={item.new_price} />
        })}
      </div>
    </div>
  )
}

export default Popular
