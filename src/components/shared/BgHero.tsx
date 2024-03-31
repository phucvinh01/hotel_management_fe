import React from 'react';

const Hero = ({ children }: { children: React.ReactNode }) => {
  const bgHero = {
    backgroundImage: "url('/background/image.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '50vh'

  };

  return <main style={bgHero} className='flex flex-col gap-5 min-h-screen'>{children}</main>;
};

export default Hero;
