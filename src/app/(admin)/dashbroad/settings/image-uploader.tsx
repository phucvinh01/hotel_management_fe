import { Button } from '@/components/ui/button';
import { updateImageCover } from '@/service/hotel.service';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Props {
  defaultImageUrl: string | undefined;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  hanldUpload: () => void
}

const YourComponent: React.FC<Props> = ({ defaultImageUrl, setImageFile, hanldUpload }) => {
  const [imageUrl, setImageUrl] = useState<string>();

  

  
  

  useEffect(() => {
    if(defaultImageUrl != undefined) {
      setImageUrl(defaultImageUrl)
    }
  },[defaultImageUrl]) 


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='sm:max-w-lg w-full p-10 bg-white rounded-xl z-10'>
      <div className='grid grid-cols-1 space-y-2'>
        <div className='flex items-center justify-center w-full'>
          <label className='flex flex-col rounded-lg w-full h-60  group text-center'>
            <div className='h-full w-full text-center flex flex-col  justify-center items-center  '>
              
              <div className='flex flex-auto max-h-60 w-4/5 mx-auto -mt-10'>
                <Image
                height={244}
                width={300}
                  src={imageUrl as string}
                  alt='Uploaded'
                  className='has-mask h-36 object-center'
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
              <p className='pointer-none text-gray-500 '>
                <span className='text-sm'>Kéo và thả</span> files ở đây{' '}
                <br /> hoặc{' '}
                <label htmlFor='upload' className='text-blue-600 hover:underline cursor-pointer'>
                  chọn từ
                </label>{' '}
                thiết bị của bạn
              </p>
            </div>
            <input
              type='file'
              id='upload'
              className='hidden'
              onChange={handleImageChange}
            />
          </label>
        </div>
        <Button className='bg-cyan-500 dark:bg-cyan-900 hover:bg-cyan-200'  onClick={() => hanldUpload()}>Thay đổi ảnh</Button>
      </div>
    </div>
  );
};

export default YourComponent;
