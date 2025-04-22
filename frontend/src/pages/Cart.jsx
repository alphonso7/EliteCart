import React from 'react'
import CartItems from '../components/CartItems'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Categories from '../components/Categories'

const Cart = () => {
  return (
    <div>
      <Navbar/>
      <Categories/>
      <CartItems/>
      <Footer/>
    </div>
  )
}

export default Cart
