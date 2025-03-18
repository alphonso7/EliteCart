import React from 'react'
import './Admin.css'
import Sidebar from '../components/Sidebar'
import {Routes, Route} from 'react-router-dom'
import AddProduct from '../components/AddProduct'
import ListProduct from '../components/ListProduct'
import AdminOrders from '../components/AdminOrders'
import LoginSignup from '../../../frontend/src/pages/LoginSignup'


const Admin = () => {
  return (
    <div className='admin' >
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element={<AddProduct/>} ></Route>
        <Route path='/listproduct' element={<ListProduct/>} ></Route>
        <Route path="/admin/orders" element={<AdminOrders />} /><Route/>
        <Route path="/signup" element={<LoginSignup/>} /><Route/>
      </Routes>
    </div>
  )
}

export default Admin
