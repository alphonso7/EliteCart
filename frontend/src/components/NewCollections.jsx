import React, { useState, useEffect } from 'react'
import Item from '../components/Item'
// import new_collections from '../assets/new_collections'

const NewCollections = () => {

  const[new_collections, setNewCollection] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:3000/newCollections')
    .then((resp) => resp.json())
    .then((data) => {setNewCollection(data)});
  },[])

  return (
    <div>
      <div >
      <div className="newCollections p-4">
        <h1 className='text-xl font-semibold text-gray-700' >New Collections</h1>
        <hr className='border-gray-500 my-4' />
      </div>
      <div className="items justify-evenly inline-block">
        {new_collections.map((item, i) =>{
            return <Item key={i} id= {item.id} name={item.name} image = {item.image} oldPrice = {item.old_price} newPrice={item.new_price} />
        })}
      </div>
    </div>
      
    </div>
  )
}

export default NewCollections
