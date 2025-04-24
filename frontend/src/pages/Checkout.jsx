import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import circle_check_logo from '../assets/circle_check_logo.png';

const Checkout = () => {
  const { getTotalCartAmount, all_products, cartItems, sizeMap } = useContext(ShopContext);
  const [userDetails, setUserDetails] = useState(null);
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
          <Link to="/" className="text-yellow-300 text-3xl font-bold">EliteCart</Link>

        </div>

      </nav>

    <div className='flex'>
      <div className="p-6 space-y-6 bg-gray-100 min-h-screen w-5xl">

        {/* Card 1: Login Confirmation */}
        <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">Login</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          <img className='w-5 h-auto' src={circle_check_logo} alt="" />
        </div>

        {/* Card 2: User Address */}
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">Delivery Address</p>
            <button
              className="text-blue-600 text-sm underline"
              onClick={() => setShowAddress(!showAddress)}
            >
              {showAddress ? 'Collapse' : 'Expand'}
            </button>
          </div>
          {showAddress && (
            <div className="mt-2 text-sm text-gray-700">
              {/* <p><strong>Name:</strong> {user.name}</p> */}
              <p><strong>Address:</strong> {user.address || 'No address provided'}</p>
              {/* <p><strong>Email:</strong> {user.email}</p> */}
            </div>
          )}
        </div>

        {/* Card 3: Order Summary */}
        <div className=" max-w-5xl mx-auto rounded-xl shadow">
          {/* <h2 className="text-2xl font-bold mb-4">Checkout</h2> */}

          {userDetails && (
            <div className="bg-gray-100 p-4 rounded shadow mb-6">
              <h3 className="font-semibold text-lg">Shipping Information</h3>
              <p><strong>Name:</strong> {userDetails.name}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>Address:</strong> {userDetails.address}</p>
            </div>
          )}

          <div className="bg-white shadow p-4 rounded">
            <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
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
                          {/* <button
                            onClick={() => removeFromCart(e.id)}
                            className="w-8 h-8 rounded border border-gray-400 text-xl flex items-center justify-center hover:bg-gray-100"
                          >
                            -
                          </button> */}
                          <div className=" w-20"> Quantity: {cartItems[e.id]}</div>
                          {/* <button
                            onClick={() => addToCart(e.id)}
                            className="w-8 h-8 rounded border border-gray-400 text-xl flex items-center justify-center hover:bg-gray-100"
                          >
                            +
                          </button> */}
                        </div>
                      </div>
                    </div>

                    {/* <hr /> */}
                  </div>
                );
              }
              return null;
            })}
            {/* <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700">
              Confirm & Place Order
            </button> */}
          </div>
        </div>


        {/* Card 4: Payment Options */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Payment Options</h2>
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
          <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Confirm and Place Order
          </button>
        </div>

      </div>



      <div className=''>
        <div className="cart-summary sticky top-20 bg-white p-6 rounded-lg shadow-lg w-full sm:w-80 mx-auto sm:ml-auto sm:mr-0 mt-6 right-10">
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
            <span>Total Payable</span>
            <span>₹{getTotalCartAmount()}</span>
          </div>

          {/* <button
                                onClick={handleCheckout}
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                PLACE ORDER
                            </button> */}
        </div>
      </div>
    </div>
      <Footer />
    </>
  )
}

export default Checkout
