import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import remove_icon from '../assets/cart_cross_icon.png'

const CartItems = () => {
    const { all_products, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
    return (
        <div className='cartitems' >
            <div className="cartitemsFormat grid grid-cols-6 justify-items-center gap-3 ">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_products.map((e) => {
                if (cartItems[e.id] > 0) {
                        return (
                    <div key={e.id}>
                    <div className="individual-item flex justify-around ">
                        <img className='w-24 h-auto object-contain' src={e.image} alt={e.name} />
                        <p>{e.name}</p>
                        <p>${e.new_price}</p>
                        <button>{cartItems[e.id]}</button>
                        <p>${(e.new_price * cartItems[e.id]).toFixed(2)}</p>
                        <img className='h-4 w-4' onClick={() => removeFromCart(e.id)} src={remove_icon} alt="Remove" />
                    </div>
                    <hr />
                    </div>
                );
                }
                return null;
            })}
            <div className="cartTotal">
                <h1>Total</h1>
                <p>Subtotal</p>
                <p>  Total is {getTotalCartAmount()} </p>
            </div>
            <div className="checkout">
                <button className='bg-gray-400' >PROCEED TO CHECKOUT</button>
            </div>
        </div>
    )
}

export default CartItems
