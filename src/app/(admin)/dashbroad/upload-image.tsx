import React, { useState } from 'react';
import Upload from 'rc-upload';
import Image from 'next/image';

interface UploadedImage {
  url: string;
  file: File;
}

interface UploadProps {
  action: () => Promise<string>;
  multiple?: boolean;
  onStart?: (file: File) => void;
  onSuccess?: (response: any) => void;
  onError?: (error: Error) => void;
}

const Uploader: React.FC = () => {
  const [previewImages, setPreviewImages] = useState<UploadedImage[]>([]);

  const handlePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setPreviewImages(prevState => [...prevState, { url: reader.result as string, file }]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (index: number) => {
    setPreviewImages(prevState => {
      const updatedImages = [...prevState];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleRemoveAllImages = () => {
    setPreviewImages([]);
  };

  const props: UploadProps = {
    action: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('/upload.do');
        }, 2000);
      });
    },
    multiple: true,
    onStart(file: File) {
      handlePreview(file);
    },
    onSuccess(response: any) {
      console.log('Upload success:', response);
    },
    onError(error: Error) {
      console.error('Upload error:', error);
    },
  };

  return (
    <>
      <div className='mb-3'>
        <div className='border p-10 border-dashed rounded-lg grid m-auto'>
          <Upload {...props}>
            <a>Bắt đầu tải lên (Start Upload)</a>
          </Upload>
        </div>
        {previewImages.map((uploadedImage, index) => (
          <div key={index} className="mt-2 flex items-center">
            <Image src={uploadedImage.url} alt="Uploaded Image" width={50} height={50} />
            <button onClick={() => handleRemoveImage(index)} className="ml-2">Xóa</button>
          </div>
        ))}
        {previewImages.length > 0 && (
          <div className="mt-2">
            <button onClick={handleRemoveAllImages}>Xóa tất cả</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Uploader;
