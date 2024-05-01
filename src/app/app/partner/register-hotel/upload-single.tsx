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
  const [previewImages, setPreviewImages] = useState<UploadedImage[]>([]);
  const [region, setRegion] = useState<string>(''); // State để lưu trữ khu vực của ảnh

  const handlePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setPreviewImages((prevState) => [
          ...prevState,
          { url: reader.result as string, file, region },
        ]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (index: number) => {
    setPreviewImages((prevState) => {
      const updatedImages = [...prevState];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleUpload = () => {
    setPreviewImages([]);
  };

  return (
    <div className='flex flex-row justify-between items-center gap-1 p-10 w-full'>
      <div>
        <label htmlFor=''>Upload ảnh bìa của khách sạn</label>
        <Input
          type='file'
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
      </div>

      {previewImages.map((uploadedImage, index) => (
        <div
          key={index}
          className='mt-2 flex items-center'>
          <Image
            src={uploadedImage.url}
            alt='Uploaded Image'
            width={200}
            height={200}
          />
          <Button
            onClick={() => handleRemoveImage(index)}
            className='ml-2'>
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ImageUploader;
