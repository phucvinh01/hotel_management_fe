import React from 'react'
import { RegisterNewHotelForm } from './register-new-hotel-form'
import Image from 'next/image'
const style = {
    backgroundImage: "url('/images/pexels.jpg')",
    backgroundSize: 'cover',
  }
const page = () => {
  return (
    <div style={style}  className="flex justify-center items-center min-h-screen">
      <RegisterNewHotelForm/>
      </div>
  )
}

export default page