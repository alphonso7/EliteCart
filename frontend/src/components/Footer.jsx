
import React from 'react';
import copyright from '../assets/copyright.png';
import whatsapp_icon from '../assets/whatsapp_icon.png';
import instagram_icon from '../assets/instagram_icon.png';
import pintester_icon from '../assets/pintester_icon.png';

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-gray-800 shadow-inner">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        
        {/* About */}
        <div>
          <h3 className="font-bold mb-4">About</h3>
          <ul className="space-y-2">
            <li className="hover:text-blue-600 cursor-pointer">Contact Us</li>
            <li className="hover:text-blue-600 cursor-pointer">About Us</li>
            <li className="hover:text-blue-600 cursor-pointer">Careers</li>
            <li className="hover:text-blue-600 cursor-pointer">Press</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-bold mb-4">Help</h3>
          <ul className="space-y-2">
            <li className="hover:text-blue-600 cursor-pointer">Payments</li>
            <li className="hover:text-blue-600 cursor-pointer">Shipping</li>
            <li className="hover:text-blue-600 cursor-pointer">Returns</li>
            <li className="hover:text-blue-600 cursor-pointer">FAQs</li>
          </ul>
        </div>

        {/* Policy */}
        <div>
          <h3 className="font-bold mb-4">Policy</h3>
          <ul className="space-y-2">
            <li className="hover:text-blue-600 cursor-pointer">Return Policy</li>
            <li className="hover:text-blue-600 cursor-pointer">Terms of Use</li>
            <li className="hover:text-blue-600 cursor-pointer">Security</li>
            <li className="hover:text-blue-600 cursor-pointer">Privacy</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <img src={instagram_icon} alt="Instagram" className="w-6 h-6 hover:scale-110 transition cursor-pointer" />
            <img src={pintester_icon} alt="Pinterest" className="w-6 h-6 hover:scale-110 transition cursor-pointer" />
            <img src={whatsapp_icon} alt="WhatsApp" className="w-6 h-6 hover:scale-110 transition cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-gray-300 py-4 text-center text-xs flex justify-center items-center gap-1">
        <p>© 2025 EliteCart</p>
        <img src={copyright} alt="copyright" className="w-4 h-4" />
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

