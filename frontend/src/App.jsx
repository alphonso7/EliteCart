import { useState } from 'react'
import Navbar from './components/Navbar'
import Shop from './pages/Shop'
import ShopCategory from './pages/ShopCategory'
import Product from './pages/Product'
import Cart from './pages/Cart'
import LoginSigup from './pages/LoginSignup'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import men_banner from './assets/banner_mens.png'
import women_banner from './assets/banner_women.png'
import kids_banner from './assets/banner_kids.png'

function App() {

  return (
    <>
      <div className='w-100 sm:w-auto md:w-auto' >
        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Shop/>} ></Route>
          <Route path='/Shop' element={<Shop/>} ></Route>
          <Route path='/Men' element={<ShopCategory banner={men_banner} category="men" />} ></Route>
          <Route path='/Women' element={<ShopCategory banner={women_banner} category="women" />} ></Route>
          <Route path='/Kids' element={<ShopCategory banner={kids_banner} category="kid" />} ></Route>
          <Route path='/Product' element={<Product/>} ></Route>
          <Route path='/Product/:ProductId' element={<Product/>} ></Route>
          <Route path='/Cart' element={<Cart/>} ></Route>
          <Route path='/Login' element={<LoginSigup/>} ></Route>
        </Routes>
        </BrowserRouter>
        

         
      </div>
     
    </>
  )
}

export default App
