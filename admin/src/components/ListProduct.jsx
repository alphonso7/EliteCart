import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../src/assets/cross_icon.png'

const ListProduct = () => {

  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async() =>{
    await fetch("http://localhost:3000/allproducts")
    .then((resp) => resp.json())
    .then((data) => {setAllProducts(data)});
  }

  useEffect(() =>{
    fetchInfo();
  },[]);

  const removeProduct  = async (idForDeleting) =>{
    await fetch('http://localhost:3000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id:idForDeleting})
    })
    await fetchInfo();
  }

  return (
    <div className='list-product' >
      <h1>All Products List</h1>
      <div className="format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="all-products">
        <hr />
        {allProducts.map((product,index)=>{
          return <> 
          <div className="format-main format" key={index}>
              <img src={product.image} alt="" className="product-icon" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={() => {removeProduct(product.id)}} src={cross_icon} alt="" className="remove-icon" />
          </div>
          <hr />
          </>
        })}
      </div>
      
    </div>
  )
}
import './ListProduct.css'

export default ListProduct
