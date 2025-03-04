import React from 'react'
import hero_image from '../assets/hero_image.png'

const Banner = () => {
  return (
    <div className='h-100vh flex bg-blue-200 justify-evenly justify-items-center'>
      <div className="bannerText justify-items-center pt-30">
        <h1 className='font-bold text-7xl linden-hill-regular p-3 bottom-3' >New Collections</h1>
        <p className='text-4xl font-serif'>Give it a try</p>
        <div className="bannerButton">
        <button className='bg-indigo-600 h-10 w-15' >Explore</button>
      </div>
      </div>
      
      <div className="bannerPhoto">
        <img className=' h-100 w-100 object-contain' src={hero_image} alt="HeroImage" />
      </div>
    </div>
  )
}

export default Banner
 