'use client';

export interface FileData {
  filename: string;
  regions: string;
  typeroom: string;
  file: File;
}

interface Props {
  files: FileData[];
  setFiles: (files: FileData[]) => void;
  type?: boolean;
  dataRender?: TypeRoom[];
}

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { XCircle } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const ImageUploader: React.FC<Props> = (props) => {
  const { files, setFiles, type, dataRender } = props;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const filesToAdd: FileData[] = [];

    const handleReaderLoad = (filex: File, imageURL: string) => {
      const regions: string = '';
      const typeroom: string = '';

      filesToAdd.push({
        filename: filex.name,
        regions: regions,
        typeroom: typeroom,
        file: filex,
      });
      if (filesToAdd.length === selectedFiles.length) {
        setFiles([...files, ...filesToAdd]);
      }
    };

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles.item(i);
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const imageURL = event.target?.result as string;
          handleReaderLoad(file, imageURL);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const renderImageTable = () => {
    return (
      <table className='w-full bg-slate-200 mt-3 rounded-3xl px-5'>
        <thead>
          <tr>
            <th className='px-2 py-1 text-md'>File</th>
            <th className='px-2 py-1 text-md'>Ảnh</th>
            <th className='px-2 py-1 text-md'>Loại phòng</th>
            <th className='px-2 py-1 text-md'>Khu vực</th>
            <th className='px-2 py-1 text-md'>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {files.slice(1).map((file) => (
            <tr key={file.filename}>
              <td className='border px-2 py-1 text-[11px]'> {file.filename}</td>
              <td className='border px-2 py-1 text-[11px]'>
                <Image
                  loading='lazy'
                  width={70}
                  height={70}
                  className='object-cover rounded-3xl min-h-[70px]'
                  src={URL.createObjectURL(file.file)}
                  alt={file.filename}
                />
              </td>
              <td>
                <Select
                  value={file.typeroom}
                  onValueChange={(e) => {
                    setFiles(
                      files.map((f) =>
                        f.filename === file.filename
                          ? { ...f, typeroom: e }
                          : f
                      )
                    );
                  }}>
                 <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Loại phòng' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {
                        dataRender?.map((item,index) => {
                          return(
                           <SelectItem value={item.Name} key={index}>{item.Name}</SelectItem>
                          )
                        })
                        }
                    </SelectGroup>
                  </SelectContent>
                </Select>
                </td>
                <td>
                <Select
                  value={file.regions}
                  onValueChange={(e) => {
                    setFiles(
                      files.map((f) =>
                        f.filename === file.filename ? { ...f, regions: e } : f
                      )
                    );
                  }}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Chọn khu vực' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='Phòng tắm'>Phòng tắm</SelectItem>
                      <SelectItem value='Sảnh chờ'>Sảnh chờ</SelectItem>
                      <SelectItem value='Khu vực công cộng'>
                        Khu vực công cộng
                      </SelectItem>
                      <SelectItem value='Phòng ngủ'>Phòng ngủ</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </td>
              <td>
                <Button onClick={() => removeFile(file)}>
                  <XCircle />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const removeFile = (file: FileData) => {
    setFiles(files.filter((f) => f !== file));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      images: files.map((file) => ({
        filename: file.filename,
        regions: file.regions,
      })),
    };
    console.log('Submit data:', formData);
  };

  return (
    <div className='m-4 p-4 border border-gray-300 rounded-3xl'>
      <div className='flex items-center justify-center w-full'>
        <label
          htmlFor='dropzone-file'
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
          <input
            className='mb-4 hidden'
            type='file'
            multiple
            id='dropzone-file'
            accept='image/*'
            onChange={handleFileChange}
          />
        </label>
      </div>
      {renderImageTable()}
    </div>
  );
};

export default ImageUploader;
