import React from 'react'
import './Navbar.css'
import shoppingbag from '../../src/assets/shopping-bag.png'
import nav_profile from '../../src/assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className="admin-navbar">
      <div className="navbar-left">
        <img src={shoppingbag} alt="logo" className="logo" />
        <h1 className="admin-title">EliteCart Admin Panel</h1>
      </div>

      <div className="navbar-right">
        <div className="user-info">
          <img src={nav_profile} alt="profile" className="profile-pic" />
          <span className="username">Admin</span>
          <span className="caret">▼</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar 