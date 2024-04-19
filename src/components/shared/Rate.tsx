'use client';
import React from 'react';
import { Rating } from 'react-simple-star-rating';

type RateProps = {
  count: number | undefined;
  value: number | undefined;
};

const Rate = ({ count, value }: RateProps) => {
  return (
    <Rating
      SVGclassName={`inline-block`}
      style={{
        display: 'block',
      }}
      size={18}
      readonly
      iconsCount={count}
      initialValue={value}
    />
  );
};

export default Rate;
