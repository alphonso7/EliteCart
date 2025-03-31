import Navbar from './components/Navbar'
import Shop from './pages/Shop'
import ShopCategory from './pages/ShopCategory'
import Product from './pages/Product'
import Cart from './pages/Cart'
import LoginSignup from './pages/LoginSignup'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import men_banner from './assets/banner_mens.png'
import women_banner from './assets/banner_women.png'
import kids_banner from './assets/banner_kids.png'
import OrderList from './pages/Orderlist'

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
          <Route path='/signup' element={<LoginSignup/>} ></Route>
<<<<<<< HEAD
          <Route path='/yourorders' element={<OrderList/>} ></Route>
=======
>>>>>>> dev
        </Routes>
        </BrowserRouter>
        

         
      </div>
     
    </>
  )
}

export default App
