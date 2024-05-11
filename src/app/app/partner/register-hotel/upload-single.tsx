import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { FileData } from './upload-image';
import { Input } from '@/components/ui/input';

interface UploadedImage {
  url: string;
  file: File;
  region: string;
}

interface ImageUploaderProps {
  data: FileData[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ data }) => {
  const [previewImages, setPreviewImages] = useState<UploadedImage>();
  const [region, setRegion] = useState<string>(''); // State để lưu trữ khu vực của ảnh

  const handlePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setPreviewImages(
          { url: reader.result as string, file, region },
        );
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreviewImages(undefined);
  };



  return (
   <div className='m-4 p-4 border border-gray-300 rounded-3xl'>
      <div className='flex items-center justify-center w-full'>
        <label  htmlFor='dropzone-file'
          className='flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-3xl cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
         <div className='flex flex-col items-center justify-center pt-5 pb-6'>
            <svg
              className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 16'>
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
              />
            </svg>
            <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
              <span className='font-semibold'>Click to upload</span> or drag and
              drop
            </p>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
        <Input
          type='file'
          className='hidden'
          onChange={(e) => {
            const selectedFiles = e.target.files;
            if (!selectedFiles) return;
            for (let i = 0; i < selectedFiles.length; i++) {
              const file = selectedFiles.item(i);
              if (file) {
                handlePreview(file);
                const f = {
                  file: file,
                  filename: file.name,
                  regions: 'Ảnh bìa',
                  typeroom: 'None',
                };
                data.push(f);
              }
            }
          }}
        />
        </label>
      </div>
      {previewImages &&  
        <div
          className='mt-2 flex items-center'>
          <Image
            src={previewImages.url}
            alt='Uploaded Image'
            width={200}
            height={200}
          />
          <Button
            onClick={() => handleRemoveImage()}
            className='ml-2'>
            Remove
          </Button>
        </div>
}
    </div>
  );
};

export default ImageUploader;
