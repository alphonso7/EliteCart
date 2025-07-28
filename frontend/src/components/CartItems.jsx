import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
// import remove_icon from '../assets/cart_cross_icon.png'
import empty_cart from '../assets/empty_cart.jpg';
import { useNavigate } from 'react-router-dom'
import safe_payment from '../assets/safe_payment.jpg'

const CartItems = () => {
    const { all_products, cartItems, removeFromCart, getTotalCartAmount, sizeMap, addToCart } = useContext(ShopContext);

    const navigate = useNavigate();

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    deliveryDate.setHours(23, 0, 0, 0);

    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const deliveryString = `${deliveryDate.toLocaleDateString('en-IN', options)}`;


    const handleCheckout = async () => {
        const authToken = localStorage.getItem("auth-token");

        if (!authToken) {
            navigate("/signup");
            return;
        }


        // console.log(cartItems);
        const filteredCartItems = Object.fromEntries(
            Object.entries(cartItems).filter(([id, quantity]) => quantity > 0)
        );

        const formattedCartItems = Object.fromEntries(
            Object.entries(filteredCartItems)// Convert keys to numbers
        );

        navigate("/checkout");

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
                    <div className="flex flex-col lg:flex-row p-4 sm:p-10 bg-blue-50 min-h-screen">

                        {/* Left Section - Address + Cart Items */}
                        <div className="w-full lg:w-3/4 pr-0 lg:pr-6">
                            {/* Cart Items */}
                            {all_products.map((e) => {
                                if (cartItems[e.id] > 0) {
                                    return (
                                        <div key={e.id} className="bg-white shadow-sm p-4 mb-4 flex">
                                            <div className="flex items-start gap-4">
                                                <img className="w-50 h-50 object-contain" src={e.image} alt={e.name} />
                                                <div className="flex-1">
                                                    <h2 className="text-2xl font-medium">{e.name}</h2>
                                                    {sizeMap[e.id] && (
                                                        <p className="text-lg text-gray-500 mb-1">Size: {sizeMap[e.id]}</p>
                                                    )}
                                                    <p className="text-lg text-gray-700 mb-1">Price: ₹{e.new_price}</p>
                                                    {/* <p className="text-lg text-gray-700 mb-2">Total: ₹{(e.new_price * cartItems[e.id]).toFixed(2)}</p> */}
                                                    <p className="text-lg text-green-600">You save ₹{(e.old_price - e.new_price) * cartItems[e.id]}</p>
                                                    <p className='text-green-700 font-semibold text-sm mt-2'>Delivery by 11PM, {deliveryString}</p>


                                                    <div className="flex items-center gap-2 mt-2">
                                                        <button
                                                            onClick={() => removeFromCart(e.id)}
                                                            className="w-8 h-8 border border-gray-400 text-xl flex items-center justify-center rounded hover:bg-gray-100"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-6 text-center">{cartItems[e.id]}</span>
                                                        <button
                                                            onClick={() => addToCart(e.id)}
                                                            className="w-8 h-8 border border-gray-400 text-xl flex items-center justify-center rounded hover:bg-gray-100"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        {/* Right Section - Price Summary */}
                        <div className="w-full lg:w-1/4 bg-white sticky top-20 h-fit p-6 rounded-lg shadow-md mt-6 lg:mt-0">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Price Details</h2>

                            <div className="space-y-2 text-lg text-gray-700">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>
                                        ₹{all_products.reduce((acc, e) => acc + (cartItems[e.id] > 0 ? e.old_price * cartItems[e.id] : 0), 0).toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Discount</span>
                                    <span className="text-green-600">
                                        -₹{all_products.reduce((acc, e) => acc + (cartItems[e.id] > 0 ? (e.old_price - e.new_price) * cartItems[e.id] : 0), 0).toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Shipping Charges</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                            </div>

                            <hr className="my-3 border-gray-300" />

                            <div className="flex justify-between text-lg font-semibold mb-4">
                                <span>Total</span>
                                <span>₹{getTotalCartAmount()}</span>
                            </div>

                            <hr className="my-3 border-gray-300" />

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                PLACE ORDER
                            </button>
                            <div className='mt-4' >
                                <img src={safe_payment} alt="" />
                            </div>
                        </div>
                    </div>
                </>

            )
            }
        </div >

    )
}

export default CartItems
