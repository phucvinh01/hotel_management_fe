'use client'

import axios from '@/axios/http';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface ImageProps {
  className?: string; // Optional className prop
  width?: number; // Optional width prop
  height?: number; // Optional height prop
  src?: string; // Optional default src prop (useful for testing)
  alt: string; // Required alt prop
  placeholder?: string; // Optional placeholder prop
  blurDataURL?: string; // Optional blurDataURL prop
  onError?: () => void; // Optional onError callback
}

const ImageComponent: React.FC<ImageProps> = ({
  className,
  width,
  height,
  src = 'https://i.imgur.com/gf3TZMr.jpeg', 
  alt,
  placeholder = 'blur',
  blurDataURL = '/images/default_image.png',
  onError,
  ...rest
}) => {
  const [internalSrc, setInternalSrc] = useState(src); 

  useEffect(() => {
  const fetchImage = async () => {
    try {
      const response = await axios.get(src);
      const imageData = response.data; // Assuming your API returns image data
      setInternalSrc(imageData.url); // Set internalSrc to image URL
    } catch (error) {
      console.error('Error fetching image:', error);
      setInternalSrc('/images/default_image.png'); // Set default image on error
    }
  };

  fetchImage();
}, [src]); 


  

  const handleError = () => {
    setInternalSrc('/images/default_image.png'); 
    if (onError) onError(); 
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      alt={alt}
      width={width}
      height={height}
      {...rest}
      src={internalSrc} 
      onError={handleError} 
    />
  );
};

export default ImageComponent;
