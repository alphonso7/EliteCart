import React, { useState, useEffect } from 'react';
import './AdminHome.css';
import users_logo from '../assets/users_logo.png';
import products_logo from '../assets/products_logo.png';
import pending_logo from '../assets/pending_logo.png';
import orders_logo from '../assets/orders_logo.png';
import delivered_logo from '../assets/delivered_logo.png';


const AdminHome = () => {

    const [allProducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        await fetch("http://localhost:3000/allproducts")
            .then((resp) => resp.json())
            .then((data) => { setAllProducts(data) });
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    const [orders, setOrders] = useState([]);
    const [undelivered, setUndelivered] = useState(0);
    const [delivered, setDelivered] = useState(0);


    const fetchOrders = async () => {
        try {
            const response = await fetch("http://localhost:3000/admin/orders");
            const data = await response.json();

            console.log("📦 API Response:", data);

            if (Array.isArray(data)) {
                setOrders(data);
                setUndelivered(data.filter(order => order.status !== 'Delivered'));
                setDelivered(data.filter(order => order.status == 'Delivered'));
            } else {
                console.error("🚨 Unexpected response format:", data);
                setOrders([]);
                setUndelivered(data.filter(order => order.status !== 'Delivered'));
                setDelivered(data.filter(order => order.status == 'Delivered'));
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            setOrders([]);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const [totalusers, setTotalUsers] = useState(0);

    useEffect(() => {
        const fetchUserCount = async () => {
          try {
            const res = await fetch('http://localhost:3000/totalusers');
            const data = await res.json();
            setTotalUsers(data.count);
          } catch (error) {
            console.error('Failed to fetch user count:', error);
          }
        };
    
        fetchUserCount();
      }, []);



    return (
        <div className="admin-home">
            <h2>Welcome back </h2>
            <div className="stats-container">
                <div className="stat-card">
                    <div className="stat-icon">
                        <img className='stat-icon' src={products_logo} alt="" />
                    </div>
                    <div className="stat-info">
                        <h3>Total Products</h3>
                        <p>{allProducts.length}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <img className='stat-icon' src={orders_logo} alt="" />
                    </div>
                    <div className="stat-info">
                        <h3>Total Orders</h3>
                        <p>{orders.length}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <img className='stat-icon' src={users_logo} alt="" />
                    </div>
                    <div className="stat-info">
                        <h3>Registered Users</h3>
                        <p>{totalusers}</p>
                    </div>
                </div>

                {/* <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-info">
                        <h3>Total Revenue</h3>
                        <p>{revenue}</p>
                    </div>
                </div> */}

                <div className="stat-card">
                    <div className="stat-icon">
                        <img className='stat-icon' src={pending_logo} alt="" />
                    </div>
                    <div className="stat-info">
                        <h3>Pending Orders</h3>
                        <p>{undelivered.length}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <img className='stat-icon' src={delivered_logo} alt="" />
                    </div>
                    <div className="stat-info">
                        <h3>Delivered Orders</h3>
                        <p>{delivered.length}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;