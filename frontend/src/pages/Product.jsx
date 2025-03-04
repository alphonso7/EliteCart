import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import ProductDisplay from '../components/ProductDisplay'
import RelatedProducts from '../components/RelatedProducts'
import Footer from '../components/Footer'

const Product = () => {
  const {all_products} = useContext(ShopContext)
  const {ProductId} = useParams()
  const product = all_products.find((e) => e.id===Number(ProductId))
  return (
    <div >
      <Breadcrumb product={product.name} />
      {/* <img src={product.image} alt="" />- */}
      <ProductDisplay productId = {ProductId} productName= {product.name} productOldPrice = {product.oldPrice} productNewPrice = {product.newPrice} productImage = {product.image} />
      <RelatedProducts/>
      <Footer/>
    </div>
  )
}

export default Product
