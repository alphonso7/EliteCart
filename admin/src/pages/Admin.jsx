import React from 'react'
import './Admin.css'
import Sidebar from '../components/Sidebar'
import {Routes, Route} from 'react-router-dom'
import AddProduct from '../components/AddProduct'
import ListProduct from '../components/ListProduct'

const Admin = () => {
  return (
    <div className='admin' >
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element={<AddProduct/>} ></Route>
        <Route path='/listproduct' element={<ListProduct/>} ></Route>
      </Routes>
    </div>
  )
}

export default Admin
