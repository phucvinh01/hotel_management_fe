import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
const Page = () => {
  const style = {
    backgroundImage: "url('/background/partner-background.jpg')",
    backgroundSize: 'cover',
  }
  return (
    <main style={style} className='min-h-screen container flex items-center'>
      <div className='px-10 flex flex-col gap-5 justify-center items-center'>
        <h2 className='text-[40px] text-white font-bold'>Nâng doanh nghiệp của bạn lên một tầm cao mới</h2>
        <h3 className='text-[28px] text-white line-clamp-3 px-10 text-center'>Liệt kê cơ sở kinh doanh của bạn và giới thiệu doanh nghiệp của bạn với hàng triệu khách tiềm năng. Traveloka còn cho phép bạn quản lý chỗ ở của mình một cách dễ dàng; không có rắc rối và không ồn ào.</h3>
        <Button className='bg-orange-500 text-white'><Link href={'/app/partner/register'}> Đăng ký ngay </Link></Button>
      </div>
       </main>

  )
}

export default Page