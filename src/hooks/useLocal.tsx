'use client'

import React, { useState, useEffect, createContext } from 'react';

const HotelIdContext = createContext<string | undefined>(undefined);

const useHotelId = () => {
  const [hotelId, setHotelId] = useState<string  | undefined>(undefined);

  useEffect(() => {
    const storedHotelId = localStorage.getItem('Hotel');
    if(storedHotelId) {
        setHotelId(storedHotelId)
    }
  }, []);

  return { hotelId };
};

export { HotelIdContext, useHotelId };
