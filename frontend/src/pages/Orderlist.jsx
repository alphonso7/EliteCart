import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const authToken = localStorage.getItem("auth-token");

        // Redirect to login if user is not authenticated
        if (!authToken) {
            navigate("/login");
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await fetch("https://localhost:3000/orders", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": authToken, // ✅ Send auth token for user-specific orders
                    },
                });
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, [navigate]); // ✅ Redirect immediately if not logged in

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
                            <p className="text-gray-600">Status: <span className="font-bold">{order.status}</span></p>
                            <p className="text-gray-600">Total: ${order.totalAmount.toFixed(2)}</p>
                            <ul className="mt-2">
                                {order.items.map((item) => (
                                    <li key={item.productId._id} className="flex items-center space-x-3">
                                        <img src={item.productId.image} alt={item.productId.name} className="w-12 h-12 object-cover"/>
                                        <p>{item.productId.name} (x{item.quantity})</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderList;
