import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import add_product_icon from '../../src/assets/Product_Cart.svg'
import list_product_icon from '../../src/assets/Product_list_icon.svg'
import dashboard_icon from '../assets/dashboard_icon.png'

const Sidebar = () => {
    return (
        <div className='sidebar' >
            <Link to={'/'} style={{ textDecoration: "none" }}>
                <div className='sidebar-item'>
                    <img className='dashboard-image' src={dashboard_icon} alt="" />
                    <p>Home</p>
                </div>
            </Link>
            <hr className='line'/>
            <Link to={'/addproduct'} style={{ textDecoration: "none" }}>
                <div className='sidebar-item'>
                    <img src={add_product_icon} alt="" />
                    <p>Add Product</p>
                </div>
            </Link>
            <Link to={'/listproduct'} style={{textDecoration: "none"}} >
                <div className="sidebar-item">
                    <img src={list_product_icon} alt="" />
                    <p>Product List</p>
                </div>
            </Link>
            <Link to={'/admin/orders'} style={{textDecoration: "none"}} >
                <div className="sidebar-item">
                    <img src={list_product_icon} alt="" />
                    <p>View Orders</p>
                </div>
            </Link>

        </div>
    )
}

export default Sidebar
