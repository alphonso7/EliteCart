import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import ProductDisplay from '../components/ProductDisplay'
import RelatedProducts from '../components/RelatedProducts'
import Footer from '../components/Footer'
import {useMemo} from "react";

const Product = () => {
  
 
  const {all_products} = useContext(ShopContext);
  const {ProductId} = useParams();
  const product = all_products.find((e) => Number(e.id)===Number(ProductId))

  const memoizedProduct = useMemo(() => product, [product]); 

  if (!all_products.length) {
    return <p>Loading products...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }
  return (
    <div >
      <Breadcrumb product_name={product.name} />
      {/* <img src={product.image} alt="" />- */}
      <ProductDisplay productId = {ProductId} productName= {product.name} productOldPrice = {product.oldPrice} productNewPrice = {product.newPrice} productImage = {product.image} />
      <RelatedProducts selectedProduct={memoizedProduct} />
      <Footer/>
    </div>
  )
}

export default Product
