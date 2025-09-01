import React from 'react';

const Hero = ({ personalInfo }) => {
  return (
    <section className="h-screen flex items-center justify-center text-center flex-col">
      <h1 id="hero-title" className="text-6xl font-bold text-green-400 font-mono uppercase">
        {personalInfo?.full_name}
      </h1>
      <p id="hero-subtitle" className="text-2xl mt-4 text-green-300 font-mono">
        {personalInfo?.title}
      </p>
    </section>
  );
};

export default Hero;
