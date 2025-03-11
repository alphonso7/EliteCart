import React from 'react'
import './Navbar.css'
import shoppingbag from '../../src/assets/shopping-bag.png'
import nav_profile from  '../../src/assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src= {shoppingbag} alt="logo" className='logo' />
        <h1 className='adminPanel' >Admin Panel</h1>
    <div className="profile">
        <img src={nav_profile} alt="profile" />
    </div>
      
    </div>
  )
}

export default Navbar 