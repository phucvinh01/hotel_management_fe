import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import image from '../../../../public/images/BecomeAnAuthorImg-2.png';
const Page = () => {
  return (
    <main className='container'>
      <div className='grid grid-cols-2 gap-9'>
        <Image
          src={image}
          alt='image'
          width={800}
          height={800}
        />
        <div className='text-black flex gap-4 items-center flex-col justify-center'>
          <h2 className='font-bold text-3xl text-center'>
            Nâng doanh nghiệp của bạn lên một tầm cao mới
          </h2>
          <h3 className='to-cyan-500 line-clamp-3 px-10 text-center'>
            Liệt kê cơ sở kinh doanh của bạn và giới thiệu doanh nghiệp của bạn
            với hàng triệu khách tiềm năng. Traveloka còn cho phép bạn quản lý
            chỗ ở của mình một cách dễ dàng; không có rắc rối và không ồn ào.
          </h3>
          <Button className='bg-cyan-500'>
            <Link href={'/app/partner/register'}> Đăng ký ngay </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Page;
