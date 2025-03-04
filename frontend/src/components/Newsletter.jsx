import React from 'react'

const Newsletter = () => {
  return (
    <div className='h-50 justify-center justify-items-center pt-20 bg-gray-300' >
      <div className="text text-5xl linden-hill-regular ">
        Subscribe for Newsletter
      </div>
      <div className="emailEnter">
        <input type="email" placeholder='Enter your email'/>
        <button className='bg-red-300' >Subscribe</button>

      </div>
    </div>
  )
}

export default Newsletter
