'use client';

import URL_Enum from '@/axios/URL_Enum';
import Loader from '@/components/admin/common/Loader';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const BarChartTopBooking = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${URL_Enum.BaseURL_Api}get-top-province-booking`,
      );
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };
  if (isLoading) return <Loader />;
  return (
    <ResponsiveContainer
      width='100%'
      height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey='province'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey='booking_count'
          fill='currentColor'
          radius={[4, 4, 0, 0]}
          className='fill-primary'
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartTopBooking;
