import React, { createContext, useState, useEffect } from "react";
// import all_products from '../assets/all_product'
import Product from "../pages/Product";

export const ShopContext = createContext(null)
const getDefaultCart = ()=>{
    let cart = {}
    for (let i = 0; i < 300+1; i++) {
        cart[i] = 0;
        
    }
    return cart;
}

const ShopContextProvider = (props) =>{

    const [all_products, setAllProduct] = useState([]);

    const [cartItems, setcartItems] = useState(()=>{
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : getDefaultCart();
    }   
    );

    useEffect(()=>{
        fetch('http://localhost:3000/allproducts')
        .then((resp) => resp.json())
        .then((data) => {setAllProduct(data)});
    },[]);
  

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (itemId) =>{
        setcartItems((prev) => ({...prev, [itemId]:(prev[itemId] || 0)+1}));
        console.log(cartItems);
    }
    const removeFromCart = (itemId) =>{
        setcartItems((prev)=> ({...prev, [itemId]:prev[itemId]-1}));
    }

    const getTotalCartAmount = () =>{
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item]>0) {
                 let productInfo = all_products.find((e) => Number(item) === Number(e.id))
                 totalAmount += productInfo.new_price * cartItems[item]
                
            }
            
        }
        return totalAmount;
    }

    const getTotalCartItems = () =>{
        let totItems = 0;
        for (const item in cartItems) {
            if (cartItems[item]>0) {
                totItems += cartItems[item];
                
            }
        }
        return totItems;
    }

    const contextValue = {all_products, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems};



    return (
        <ShopContext.Provider value={contextValue} >
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider