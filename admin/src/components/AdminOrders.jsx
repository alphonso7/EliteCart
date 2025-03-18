import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const AdminOrders = () => {

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    
    


    // const authToken = localStorage.getItem("auth-token");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        // const authToken = localStorage.getItem("auth-token");
    
        // if (!authToken) {
        //     console.error("No auth token found. Redirecting to login...");
        //     navigate("/signup"); // Redirect if not logged in
        //     return;
        // }
    
        try {
            const response = await fetch("http://localhost:3000/admin/orders", {  // ✅ Change to 5000
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    // "auth-token": authToken.trim(),
                    
                },
            });
            const data = await response.json();
            console.log("📦 API Response:", data); // ✅ Debugging
    
            if (Array.isArray(data)) {
                setOrders(data); // ✅ Only set if it’s an array
            } else {
                console.error("🚨 Unexpected response format:", data);
                setOrders([]); // ✅ Prevents map() errors
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            setOrders([]); // Prevents map() crash
        }
    };
    

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch("http://localhost:3000/update-order-status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                },
                body: JSON.stringify({ orderId, newStatus }),
            });

            const data = await response.json();
            if (data.success) {
                // Update the status in UI without refetching
                setOrders(orders.map(order => 
                    order._id === orderId ? { ...order, status: newStatus } : order
                ));
            } else {
                alert("Failed to update order status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Admin Order Management</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {orders.map(order => (
                        <div key={order._id} className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
                            <p className="text-gray-600">User ID: {order.userId}</p>
                            <p className="text-gray-600">
                                Status: 
                                <select
                                    className="ml-2 border p-1 rounded"
                                    value={order.status}
                                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                >
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </p>
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

export default AdminOrders;
