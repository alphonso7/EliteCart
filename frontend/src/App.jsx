
import Shop from './pages/Shop'
import ShopCategory from './pages/ShopCategory'
import Product from './pages/Product'
import Cart from './pages/Cart'
import LoginSignup from './pages/LoginSignup'
import {BrowserRouter, Routes, Route, HashRouter} from 'react-router-dom'
import men_banner from './assets/banner_mens.png'
import women_banner from './assets/banner_women.png'
import kids_banner from './assets/banner_kids.png'
import OrderList from './pages/Orderlist'
import UserProfile from './pages/UserProfile'
import Checkout from './pages/Checkout'
import ThankYou from './pages/ThankYou'

function App() {

  return (
    <>
      <div className='w-100 sm:w-auto md:w-auto' >
        <HashRouter>
        {/* <Navbar/> */}
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
          <Route path='/yourorders' element={<OrderList/>} ></Route>
          <Route path='/myprofile' element={<UserProfile/>} ></Route>
          <Route path='/checkout' element={<Checkout/>} ></Route>
          <Route path='/thankyou' element={<ThankYou/>} ></Route>
        </Routes>
        </HashRouter>
        

         
      </div>
     
    </>
  )
}

export default App
