import React from 'react'
import copyright from '../assets/copyright.png'
import whatsapp_icon from '../assets/whatsapp_icon.png'
import instagram_icon from '../assets/instagram_icon.png'
import pintester_icon from '../assets/pintester_icon.png'

const Footer = () => {
  return (
    <div className='h-30 bg-gray-200  font-semibold text-stone-700' >
      <span className="copyright flex space-x-1 pt-7 justify-center">
        <p>Copyright </p>
        <img className='w-5 h-5' src={copyright} alt="" />
        <p>2025 EliteCart</p>
      </span>
      <div className="shareIcons flex place-self-end gap-7 pr-5 ">
        <img className='w-5 h-5' src={instagram_icon} alt="" />
        <img className='w-5 h-5' src={pintester_icon} alt="" />
        <img className='w-5 h-5' src={whatsapp_icon} alt="" />
      </div>
    </div>
  )
}

export default Footer
