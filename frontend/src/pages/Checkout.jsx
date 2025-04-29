import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import circle_check_logo from '../assets/circle_check_logo.png';
import safe_payment from '../assets/safe_payment.jpg';

const Checkout = () => {
  const { getTotalCartAmount, all_products, cartItems, sizeMap } = useContext(ShopContext);
  // const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const [showAddress, setShowAddress] = useState(true);
  const userId = localStorage.getItem('userId'); // must be set after login/registration
  console.log(userId)
  const [user, setUser] = useState({
    name: '',
    email: '',
    date: '',
    address: ''
  });
  // const [cartItems, setCartItems] = useState([]); // replace with real cart context or props

  const placeOrder = async() => {
    const authToken = localStorage.getItem("auth-token");
    const filteredCartItems = Object.fromEntries(
      Object.entries(cartItems).filter(([id, quantity]) => quantity > 0)
  );

  const formattedCartItems = Object.fromEntries(
      Object.entries(filteredCartItems)// Convert keys to numbers
  );
    try {
          const response = await fetch("http://localhost:3000/create-order", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "auth-token": authToken,
              },
              body: JSON.stringify(formattedCartItems),
          });

          const data = await response.json();
          console.log("Checkout Response:", data); // ✅ Debugging log

          if (data.success) {
              navigate("/yourorders");
              // navigate("/checkout");
          } else {
              alert("Failed to place order: " + (data.message || "Unknown error"));
          }
      } catch (error) {
          console.error("Checkout error:", error); // ✅ Log full error
          alert("An error occurred while placing the order. Check the console for details.");
      }
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('auth-token');
        const response = await axios.get('/api/checkout', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // setUserDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();

    // Fetch cart items from localStorage or global state
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(savedCart);
    console.log(cartItems);
    // setCartItems(savedCart);
  }, []);

  //   useEffect(() => {
  //     await axios.get(`http://localhost:3000/api/user/${userId}`)
  //         .then(res => setUser(res.data))
  //         .catch(err => console.error('Error fetching user:', err));
  // }, [userId]);

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user/${userId}`);
        const data = await response.json();
        setUser(data);

      } catch (err) {
        console.error(err, 'not data received');
      }
    }

    fetchUser();

  }, [userId]);
  console.log(user);

  // const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <>
      <nav className="shadow-md w-full sticky top-0 z-50 bg-blue-400">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          {/* Logo */}
          <Link to="/" className="text-white text-4xl font-bold">EliteCart</Link>

        </div>

      </nav>

      <div className='flex m-5'>
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen w-5xl">

          {/* Card 1: Login Confirmation */}
          <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
            <div>
              <p className="text-2xl font-semibold">Login</p>
              <p className="text-2sm text-gray-600">{user.email}</p>
            </div>
            <img className='w-5 h-auto' src={circle_check_logo} alt="" />
          </div>

          {/* Card 2: User Address */}
          <div className="bg-white p-4 rounded-xl shadow">
            <div className="flex justify-between items-center">
              <p className="text-2xl font-semibold">Delivery Address</p>
              <button
                className="text-blue-600 text-sm underline"
                onClick={() => setShowAddress(!showAddress)}
              >
                {showAddress ? 'Collapse' : 'Expand'}
              </button>
            </div>
            {showAddress && (
              <div className="mt-2 text-2sm text-gray-700">
                <p><strong>Address:</strong> {user.address || 'No address provided'}</p>
              </div>
            )}
          </div>

          {/* Card 3: Order Summary */}
          <div className=" max-w-5xl mx-auto rounded-xl shadow">

            {/* {userDetails && (
              <div className="bg-gray-100 p-4 rounded shadow mb-6">
                <h3 className="font-semibold text-lg">Shipping Information</h3>
                <p><strong>Name:</strong> {userDetails.name}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>Address:</strong> {userDetails.address}</p>
              </div>
            )} */}

            <div className="bg-white shadow p-4 rounded">
              <h3 className="font-semibold text-2xl mb-3">Order Summary</h3>
              {all_products.map((e) => {
                if (cartItems[e.id] > 0) {
                  return (
                    <div key={e.id}>
                      <div className="flex items-start gap-4 p-4 mb-4 w-3xl shadow-sm bg-white">
                        <img className="w-28 h-28 object-contain" src={e.image} alt={e.name} />

                        <div className="flex-1">
                          <h2 className="text-lg font-medium">{e.name}</h2>
                          {sizeMap[e.id] && (
                            <p className="text-sm text-gray-500 mb-1">Size: {sizeMap[e.id]}</p>
                          )}
                          <p className="text-sm text-gray-700 mb-1">Price: ₹{e.new_price}</p>
                          <p className="text-sm text-gray-700 mb-2">Total: ₹{(e.new_price * cartItems[e.id]).toFixed(2)}</p>

                          <div className="flex items-center gap-2">
                            <div className=" w-20"> Quantity: {cartItems[e.id]}</div>
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
          </div>


          {/* Card 4: Payment Options */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-2">Payment Options</h2>
            <div className="space-y-2 text-sm">
              <label className="flex items-center space-x-2">
                <input type="radio" name="payment" /> <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="payment" /> <span>UPI / QR</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="payment" /> <span>Credit / Debit Card</span>
              </label>
            </div>
            <button
            onClick={placeOrder} 
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Confirm and Place Order
            </button>
          </div>

        </div>



        <div className="w-full lg:w-1/4 bg-white sticky top-20 h-fit p-6  shadow-md mt-6 lg:mt-0">
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
            <span>Total payable</span>
            <span>₹{getTotalCartAmount()}</span>
          </div>

          <hr className="my-3 border-gray-300" />
          <div className='mt-4' >
            <img src={safe_payment} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Checkout
