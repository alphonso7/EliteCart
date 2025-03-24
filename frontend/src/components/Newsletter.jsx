import React from 'react'

const Newsletter = () => {
  return (
    <div className='h-60 justify-center justify-items-center pt-17 bg-gray-300 space-y-3' >
      <div className="text sm:text-5xl linden-hill-regular ">
        Subscribe for Newsletter
        <p className='text sm:text-2xl place-self-center' >Get latest updates</p>
      </div>
      <div className="emailEnter sm:grid sm:grid-cols-2 sm:gap-2 ">
        <input type="email" placeholder='Enter your email'/>
        <button className='bg-gray-500 p-2 rounded-xl' >Subscribe</button>

      </div>
    </div>
  )
}

export default Newsletter
