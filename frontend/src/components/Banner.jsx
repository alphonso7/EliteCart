import React from 'react'
import hero_image from '../assets/exclusive_image.png'
import NewCollections from './NewCollections'

const Banner = () => {
  return (
    <div className='flex bg-blue-200 justify-evenly justify-items-center '>
      <div className="bannerText justify-items-center pt-30 ">
        <h1 className='font-bold  text-2xl sm:text-7xl linden-hill-regular p-3 bottom-3' >New Collections</h1>
        <p className='text-4xl font-serif'>Give it a try</p>
        <div className="bannerButton">
        <button className='bg-gray-400 h-10 w-auto p-2 rounded-xl' >Explore Now</button>
      </div>
      </div>
      
      <div className="bannerPhoto hidden sm:flex">
        <img className=' h-80 w-auto object-contain' src={hero_image} alt="HeroImage" />
      </div>
    </div>
  )
}

export default Banner
 