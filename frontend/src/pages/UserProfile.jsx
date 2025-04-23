import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Categories from '../components/Categories';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import user_icon from  '../assets/user_icon.png'

const UserProfile = () => {

    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId'); // must be set after login/registration
    console.log(userId)
    const [user, setUser] = useState({
        name: '',
        email: '',
        date: '',
        address: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/api/user/${userId}`)
            .then(res => setUser(res.data))
            .catch(err => console.error('Error fetching user:', err));
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSave = () => {
        axios.put(`http://localhost:3000/api/user/${userId}`, user)
            .then(() => alert('Profile updated successfully!'))
            .then(() => { setIsEditing(false) })
            .catch(err => alert('Error updating profile.'));
    };
    if (!user) return <div className="p-6">Loading...</div>;

    return (
        <>
            <Navbar />
            <Categories />
            <hr className='bg-blue-300 font-semibold' />
            <div className="flex flex-col sm:flex-row p-6 sm:p-10 bg-blue-200 min-h-screen">
                <div className="w-full sm:w-1/4 bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center space-x-4 mb-4">
                        <img
                            src="https://www.w3schools.com/howto/img_avatar.png"
                            alt="Profile"
                            className="w-12 h-12 rounded-full"
                        />
                        <div>
                            <p className="font-semibold">Hello,</p>
                            <p className='font-bold' >{user.name}</p>
                        </div>
                    </div>
                    <hr />
                    <div className="space-y-3">
                        <Link to="/yourorders" >
                            <p className="font-semibold text-gray-700 mt-6 mb-4">MY ORDERS</p>
                        </Link>
                        <hr />
                        <p className="font-semibold text-gray-700 flex flex-row"> 
                        <img
                            src={user_icon}
                            alt="Profile"
                            className="w-7 h-auto mr-3 rounded-full"
                        />
                         ACCOUNT SETTINGS</p>
                        <ul className="pl-2 text-sm space-y-1">
                            <li className="hover:text-blue-600 cursor-pointer">Profile Information</li>
                            <li className='hover:text-blue-600 cursor-pointer' >Manage Addresses</li>
                            {/* <li>PAN Card Information</li> */}
                        </ul>
                        {/* <p className="font-semibold text-gray-700 mt-4">PAYMENTS</p>
                    <ul className="pl-2 text-sm space-y-1">
                         <li>Gift Cards <span className="text-green-600">₹0</span></li>
                            <li>Saved UPI</li>
                        <li>Saved Cards</li>
                        </ul> */}
                    </div>
                </div>

                <div className="w-full sm:w-3/4 bg-white rounded-lg shadow-md p-6 mt-6 sm:mt-0 sm:ml-6">
                    <div className="mb-6">
                        <div className="flex items-center ">
                            <h2 className="text-lg font-semibold">Personal Information</h2>
                            {!isEditing ? (
                                <button
                                    className="text-blue-600 hover:underline text-xl ml-5"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit
                                </button>
                            ) : (
                                <button
                                    className="text-green-600 hover:underline"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 ">
                            <input
                                type="text"
                                className="border p-2 rounded bg-gray-100"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                            {/* <input
                                type="text"
                                className="border p-2 rounded"
                                name="username"
                                value={user.username || ''}
                                onChange={handleChange}
                                disabled={!isEditing}
                                placeholder="Username"
                            /> */}
                        </div>
                        <div className="mt-4">
                            <label className="block font-medium text-gray-700">Your Gender</label>
                            <div className="flex items-center space-x-6 mt-1">
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={user.gender === 'Male'}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    /> Male
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={user.gender === 'Female'}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    /> Female
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 ">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">Email Address</p>
                            {/* You may want to allow editing email separately */}
                        </div>
                        <input
                            type="text"
                            className="border p-2 mt-2 rounded sm:w-2/4 bg-gray-100"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">Address</p>
                        </div>
                        <input
                            type="text"
                            className="border p-2 mt-2 rounded sm:w-2/4 bg-gray-100"
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">Date Joined</p>
                        </div>
                        <input
                            type="text"
                            className="border p-2 mt-2 rounded sm:w-2/4 bg-gray-100"
                            value={new Date(user.date).toLocaleDateString()}
                            disabled
                        />
                    </div>
                </div>
                
        </div>
        <Footer />
        </>
        
    );
};

export default UserProfile;
