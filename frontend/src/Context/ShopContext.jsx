import React, { createContext, useState, useEffect } from "react";
// import all_products from '../assets/all_product'
import Product from "../pages/Product";

export const ShopContext = createContext(null)



const getDefaultCart = ()=>{
    let cart = {}
    for (let i = 0; i < 10+1; i++) {
        cart[i] = 0;
        
    }
    return cart;
}

const ShopContextProvider = (props) =>{

<<<<<<< HEAD
    const [searchQuery, setSearchQuery] = useState("");


    const [all_products, setAllProduct] = useState([]);
=======
    // const [all_products, setAllProduct] = useState([]);
>>>>>>> dev

    const [cartItems, setcartItems] = useState(()=>{
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : getDefaultCart();
    }   
    );

    // useEffect(()=>{
    //     fetch('http://localhost:3000/allproducts')
    //     .then((resp) => resp.json())
    //     .then((data) => {setAllProduct(data)});
    // },[]);
  

    useEffect(() => {
        fetch('http://localhost:3000/allproducts')
            .then((resp) => resp.json())
            .then((data) => {
                setAllProduct(data);
                console.log(data)
            })
            .catch((err) => console.error("Fetch error:", err));
    }, []);

    const filteredProducts = searchQuery.trim()
    ? all_products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : []; 

  

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (itemId) =>{
        setcartItems((prev) => ({...prev, [itemId]:(prev[itemId] || 0)+1}));
        // console.log(cartItems);
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:3000/addToCart', {
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"itemId": itemId})
            })
            .then((resp) => resp.json())
            .then((data) => console.log(data));
        }
    }
    const removeFromCart = (itemId) =>{
        setcartItems((prev)=> ({...prev, [itemId]:prev[itemId]-1}));
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        
        console.log("🔍 Available Product IDs:", all_products.map(p => p.id));

    
        // console.log(cartItems)
        for (const item in cartItems) {
            if (Number(cartItems[item]) > 0) {
                let productInfo = all_products.find((e) => {return Number(item) === Number(e.id)});
                // console.log(productInfo)
    
                if (!productInfo) {  
                    console.warn(`⚠️ Product with ID ${item} not found in all_products.`);
                    continue;
                }
    
                totalAmount += productInfo.new_price * cartItems[item];
            }
        }
    
        return totalAmount;
    };
    
        

    const getTotalCartItems = () =>{
        let totItems = 0;
        for (const item in cartItems) {
            if (cartItems[item]>0) {
                totItems += cartItems[item];
                
            }
        }
        return totItems;
    }

    const contextValue = {all_products, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems, filteredProducts, searchQuery, setSearchQuery};



    return (
        <ShopContext.Provider value={contextValue} >
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider