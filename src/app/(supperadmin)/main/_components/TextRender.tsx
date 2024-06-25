import React, { useState, useEffect } from 'react';
import './TextRender.css';
import { Button } from '@/components/ui/button';
import { run } from './genimi-sumnary';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Loader } from 'lucide-react';
import URL_Enum from '@/axios/URL_Enum';

type TextRenderProps = {
  data: string;
};

const TextRender = () => {
  const [typedText, setTypedText] = useState('');

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${URL_Enum.BaseURL_Api}get-top-province-booking`,
      );
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClick = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `${URL_Enum.BaseURL_Api}get-top-province-booking`,
    );
    const res = await run(
      JSON.stringify(response.data) + 'Với data trên phân tích các khu vực và lý do tại sao các khu vực có lượt booking cao và tại sao lại thấp ở Việt Nam \n'

    );
    setTypedText(res);
    setIsLoading(false);
  };

  return (
    <div>
      <Button
        className='bg-black text-white'
        onClick={() => handleClick()}>
        {isLoading ? <Loader /> : 'Phân tích lý do'}
      </Button>
      {typedText && (
        <Card>
          <CardContent>{typedText}</CardContent>
        </Card>
      )}
    </div>
  );
};

export default TextRender;
