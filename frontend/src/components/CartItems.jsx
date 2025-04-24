import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
// import remove_icon from '../assets/cart_cross_icon.png'
import empty_cart from '../assets/empty_cart.jpg';
import { useNavigate } from 'react-router-dom'
import Footer from './Footer';

const CartItems = () => {
    const { all_products, cartItems, removeFromCart, getTotalCartAmount, sizeMap, addToCart } = useContext(ShopContext);

    const navigate = useNavigate();

    const handleCheckout = async () => {
        const authToken = localStorage.getItem("auth-token");

        if (!authToken) {
            navigate("/signup");
            return;
        }


        console.log(cartItems);
        const filteredCartItems = Object.fromEntries(
            Object.entries(cartItems).filter(([id, quantity]) => quantity > 0)
        );

        // const formattedCartItems = Object.fromEntries(
        //     Object.entries(filteredCartItems).map(([key, value]) => [Number(key), value]) // Convert keys to numbers
        // );

        const formattedCartItems = Object.fromEntries(
            Object.entries(filteredCartItems)// Convert keys to numbers
        );

        console.log("✅ Sending filtered cart items:", filteredCartItems);
        console.log(formattedCartItems)
        console.log("🛒 Final Cart Data Being Sent:", JSON.stringify(formattedCartItems, null, 2));

        navigate("/checkout");

        // try {
        //     const response = await fetch("http://localhost:3000/create-order", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "auth-token": authToken,
        //         },
        //         body: JSON.stringify(formattedCartItems),
        //     });

        //     const data = await response.json();
        //     console.log("Checkout Response:", data); // ✅ Debugging log

        //     if (data.success) {
        //         // navigate("/yourorders");
        //         navigate("/checkout");
        //     } else {
        //         alert("Failed to place order: " + (data.message || "Unknown error"));
        //     }
        // } catch (error) {
        //     console.error("Checkout error:", error); // ✅ Log full error
        //     alert("An error occurred while placing the order. Check the console for details.");
        // }
    };

    const totalAmount = getTotalCartAmount();


    return (

        <div className="cart-container p-4">
            {totalAmount === 0 ? (
                <div className="text-center text-gray-500 text-lg font-normal mt-6 justify-items-center">
                    <img src={empty_cart} alt="cart" />
                    <p>Your cart is empty</p>
                    <p>Add some items first!</p>
                    <button onClick={() => navigate("/shop")} className='mt-4 w-50 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition' >Shop Now</button>
                </div>
            ) : (

                <>
                    <div className='cartitems flex felx-col p-4 sm:m-10 bg-gray-200' >
                        {/* <div className="cartitemsFormat grid grid-cols-6 justify-items-center gap-4 py-2 border-b font-semibold">
                            <p>Products</p>
                            <p className='sm:pl-40' >Title</p>
                            <p className='sm:pl-40' >Price</p>
                            <p className='sm:pl-20' >Quantity</p>
                            <p className='sm:pl-10' >Total</p>
                            <p>Remove</p>
                        </div> */}
                        {/* <hr /> */}
                        <div>
                        {all_products.map((e) => {
                            if (cartItems[e.id] > 0) {
                                return (
                                    <div key={e.id}>
                                        <div className="flex items-start gap-4 p-4 mb-4 w-3xl border rounded-lg shadow-sm bg-white">
                                            <img className="w-28 h-28 object-contain" src={e.image} alt={e.name} />

                                            <div className="flex-1">
                                                <h2 className="text-lg font-medium">{e.name}</h2>
                                                {sizeMap[e.id] && (
                                                    <p className="text-sm text-gray-500 mb-1">Size: {sizeMap[e.id]}</p>
                                                )}
                                                <p className="text-sm text-gray-700 mb-1">Price: ₹{e.new_price}</p>
                                                <p className="text-sm text-gray-700 mb-2">Total: ₹{(e.new_price * cartItems[e.id]).toFixed(2)}</p>

                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => removeFromCart(e.id)}
                                                        className="w-8 h-8 rounded border border-gray-400 text-xl flex items-center justify-center hover:bg-gray-100"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-6 text-center">{cartItems[e.id]}</span>
                                                    <button
                                                        onClick={() => addToCart(e.id)}
                                                        className="w-8 h-8 rounded border border-gray-400 text-xl flex items-center justify-center hover:bg-gray-100"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <hr /> */}
                                    </div>
                                );
                            }
                            return null;
                        })}
                        </div>
                        <div className="cart-summary sticky top-20 bg-white p-6 rounded-lg shadow-lg w-full sm:w-80 mx-auto sm:ml-auto sm:mr-0 mt-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Price Details</h2>

                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>₹{getTotalCartAmount()}</span>
                            </div>

                            <div className="flex justify-between mb-2">
                                <span>Shipping Charges</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>

                            <hr className="my-3 border-gray-300" />

                            <div className="flex justify-between text-lg font-semibold mb-4">
                                <span>Total</span>
                                <span>₹{getTotalCartAmount()}</span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                PLACE ORDER
                            </button>
                        </div>


                    </div>
                </>

            )
            }
        </div >

    )
}

export default CartItems
