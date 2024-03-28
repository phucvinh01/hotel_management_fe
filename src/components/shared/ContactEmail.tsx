import Image from 'next/image';
import React from 'react'
import EmailForm from './form/EmailForm';
import { Button } from '../ui/button';
  const bgHero = {
    backgroundImage: "url('/background/2.webp')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',

  };
const ContactEmail = () => {
  return (
    <section style={bgHero} className='px-10 pt-10 flex justify-around'>
        <Image  src={'/background/mobie.webp'} width={300} height={320} alt='mobile phone'/>
        <div className='flex flex-col gap-10 w-1/3'>
            <p className='font-extrabold text-3xl text-white leading-normal'>Luôn được cập nhật về các lời khuyên du lịch, đề xuất và khuyến mãi mới nhất.</p>
            <EmailForm />
            <p className='font-bold text-xl text-white leading-normal'>Có chuyến đi mơ ước của bạn trong tầm tay của bạn. Tải xuống ứng dụng.</p>
            <div className='flex flex-row gap-4 justify-center items-center'>
                <Image src={'/Button/QRcode.png'} alt='qr' width={60} height={60} />
                <Button className='w-[150px] p-1' style={{
                    backgroundImage:"url('/Button/play.svg')",
                     backgroundSize: 'cover',
    backgroundPosition: 'center',
                }} />
                <Button className='w-[150px] p-1' style={{
                    backgroundImage:"url('/Button/app.svg')",
                     backgroundSize: 'cover',
    backgroundPosition: 'center',
                }} />
                </div> 
        </div>
    </section>
  )
}

export default ContactEmail