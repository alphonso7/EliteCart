// import React, { useEffect, useState } from "react";
// import './AdminOrders.css'

// const AdminOrders = () => {
//     const [orders, setOrders] = useState([]);


//     const fetchOrders = async () => {
//         try {
//             const response = await fetch("http://localhost:3000/admin/orders");
//             const data = await response.json();

//             console.log("📦 API Response:", data);  

//             if (Array.isArray(data)) {
//                 setOrders(data);
//             } else {
//                 console.error("🚨 Unexpected response format:", data);
//                 setOrders([]);  
//             }
//         } catch (error) {
//             console.error("Error fetching orders:", error);
//             setOrders([]); 
//         }
//     };


//     // Update order status
//     const updateOrderStatus = async (orderId, newStatus) => {
//         try {
//             const response = await fetch(`http://localhost:3000/admin/orders/${orderId}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ status: newStatus }),
//             });

//             const data = await response.json();
//             if (data.success) {
//                 alert("✅ Order status updated!");
//                 fetchOrders(); // Refresh orders after update
//             } else {
//                 alert(`❌ Error: ${data.message}`);
//             }
//         } catch (error) {
//             console.error("Error updating order status:", error);
//         }
//     };

//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     return (
//         <div className="admin-orders-container">
//             <h2>Orders Status</h2>
//             {orders.length === 0 ? (
//                 <p className="no-orders">No orders found.</p>
//             ) : (
//                 <table className="admin-orders-table">
//                     <thead>
//                         <tr>
//                             <th>Order ID</th>
//                             <th>User ID</th>
//                             <th>Products</th>
//                             <th>Status</th>
//                             <th>Update Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {orders.map((order) => (
//                             <tr key={order._id}>
//                                 {/* <td>{order._id}</td> */}
//                                 <td>Order #{order._id.slice(-6)}</td>
//                                 <td>{order.userId}</td>
//                                 <td className="admin-orders-products">
//                                     {order.items.map((item, index) => (
//                                         <p key={index}>
//                                             {item.productId?.name || 'unknown'} X {item.quantity}
//                                             {/* {item.productId} */}
//                                         </p>
//                                     ))}
//                                 </td>
//                                 <td>{order.status}</td>
//                                 <td className="admin-orders-status">
//                                     <select
//                                         value={order.status}
//                                         onChange={(e) => updateOrderStatus(order._id, e.target.value)}
//                                     >
//                                         <option value="Processing">Processing</option>
//                                         <option value="Shipped">Shipped</option>
//                                         <option value="Delivered">Delivered</option>
//                                         <option value="Cancelled">Cancelled</option>
//                                     </select>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default AdminOrders;

import React, { useEffect, useState } from "react";
import './AdminOrders.css'

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');


    const fetchOrders = async () => {
        try {
            const response = await fetch("http://localhost:3000/admin/orders");
            const data = await response.json();

            console.log("📦 API Response:", data);

            if (Array.isArray(data)) {
                setOrders(data);
            } else {
                console.error("🚨 Unexpected response format:", data);
                setOrders([]);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            setOrders([]);
        }
    };


    // Update order status
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:3000/admin/orders/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await response.json();
            if (data.success) {
                alert("✅ Order status updated!");
                fetchOrders(); // Refresh orders after update
            } else {
                alert(`❌ Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);


    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order._id.includes(searchTerm);

        const matchesCategory = selectedCategory ? order.status === selectedCategory : true;

        return matchesSearch && matchesCategory;
    });


    return (
        <div className="admin-orders-container">
            <h2>Orders Status</h2>
            {orders.length === 0 ? (
                <p className="no-orders">No orders found.</p>
            ) : (
                <>
                    <div className="filter-bar">
                        <input
                            type="text"
                            placeholder="Search by name or userID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                            <option value="">All</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>

                    </div>

                    <table className="admin-orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>User ID</th>
                                <th>Products</th>
                                <th>Status</th>
                                <th>Update Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order._id}>
                                    {/* <td>{order._id}</td> */}
                                    <td>Order #{order._id.slice(-6)}</td>
                                    <td>{order.userId}</td>
                                    <td className="admin-orders-products">
                                        {order.items.map((item, index) => (
                                            <p key={index}>
                                                {item.productId?.name || 'unknown'} X {item.quantity}
                                                {/* {item.productId} */}
                                            </p>
                                        ))}
                                    </td>
                                    <td>{order.status}</td>
                                    <td className="admin-orders-status">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default AdminOrders;
