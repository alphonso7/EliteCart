import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import arrow_icon from '../assets/breadcrum_arrow.png'
import Footer from "../components/Footer";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const [filteredStatus, setFilteredStatus] = useState('All');

    useEffect(() => {
        const authToken = localStorage.getItem("auth-token");

        // Redirect to login if user is not authenticated
        if (!authToken) {
            navigate("/login");
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:3000/yourorders", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": authToken, // ✅ Send auth token for user-specific orders
                    },
                });
                const data = await response.json();
                // setOrders(data);

                console.log("📦 Fetched Orders:", data); // ✅ Debugging log

                if (Array.isArray(data)) {
                    setOrders(data); // ✅ Ensure `orders` is always an array
                } else {
                    console.error("🚨 Unexpected data format:", data);
                    setOrders([]); // ✅ Fallback to empty array
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, [navigate]); // ✅ Redirect immediately if not logged in

    const statuses = ['All', 'Delivered', 'Cancelled', 'Shipped', 'Processing'];
    const filteredOrders = filteredStatus === 'All'
        ? orders
        : orders.filter(order => order.status === filteredStatus);

    return (
        <>
            <Navbar />
            <Categories />
            <div className='flex font-serif font-medium ml-5 mt-2 gap-3 text-gray-400' >
                HOME <img className='h-5 w-auto' src={arrow_icon} alt="" />
                MY PROFILE <img className='h-5 w-auto' src={arrow_icon} alt="" />
                MY ORDERS
            </div>
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    // <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    //     {orders.map((order) => (
                    //         <div key={order._id} className="bg-white p-4 rounded-lg shadow">
                    //             <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
                    //             <p className="text-gray-600">Status: <span className="font-bold">{order.status}</span></p>
                    //             <p className="text-gray-600">Total: INR {order.totalAmount.toFixed(2)}</p>
                    //             <ul className="mt-2">
                    //                 {order.items.map((item) => (
                    //                     <li key={item.productId._id} className="flex items-center space-x-3">
                    //                         <img src={item.productId.image} alt={item.productId.name} className="w-12 h-12 object-cover"/>
                    //                         <p>{item.productId.name} (x{item.quantity})</p>
                    //                     </li>
                    //                 ))}
                    //             </ul>
                    //         </div>
                    //     ))}
                    // </div>
                    <div className="main flex flex-row">
                        <div className="w-1/4 bg-gray-100 p-4 space-y-4 mr-20">
                            <h3 className="text-lg font-semibold">Filter by Status</h3>
                            {statuses.map(status => (
                                <button
                                    key={status}
                                    onClick={() => setFilteredStatus(status)}
                                    className={`block w-full text-left px-3 py-1 rounded ${filteredStatus === status ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                        {/* Orders List */}
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 h-25">
                            {filteredOrders.map((order) => (
                                <div key={order._id} className=" flex flex-row bg-gray-200 p-4 rounded-lg shadow gap-20 ">
                                    {/* <h3 className="text-lg font-semibold">Order ID: {order._id}</h3> */}
                                    <ul className="mt-2">
                                        {order.items.map((item) => (
                                            <li key={item.productId._id} className="flex items-center space-x-3 w-auto gap-3">
                                                <img src={item.productId.image} alt={item.productId.name} className="w-12 h-12 object-cover" />
                                                <p>{item.productId.name} (x{item.quantity})</p>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-gray-600">INR {order.totalAmount.toFixed(2)}</p>
                                    <p className="text-gray-600">Status: <span className="font-bold">{order.status}</span></p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default OrderList;
