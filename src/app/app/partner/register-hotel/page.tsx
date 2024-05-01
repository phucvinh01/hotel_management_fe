import React from 'react'
import { RegisterNewHotelForm } from './register-new-hotel-form'
const style = {
    backgroundImage: "url('/background/register-new-hotel-bg.jpg')",
    backgroundSize: 'cover',
  }
const page = () => {
  return (
    <div style={style} className="min-h-screen flex justify-center items-center px-10">
      <RegisterNewHotelForm/>

      </div>
  )
}

export default page