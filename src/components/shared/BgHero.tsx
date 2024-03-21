import React from 'react';

const Hero = ({ children }: { children: React.ReactNode }) => {
  const bgHero = {
    backgroundImage: "url('/background/hero-bg.avif')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100%',
  };

  return <section style={bgHero}>{children}</section>;
};

export default Hero;
