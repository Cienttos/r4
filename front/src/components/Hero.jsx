import React from 'react';
import MatrixBackground from '../components/MatrixBackground';

const Hero = ({ personalInfo }) => {
  if (!personalInfo || personalInfo.length === 0) return null;
  const info = personalInfo[0];

  // Separar nombre en dos líneas
  const [firstName, ...rest] = info.full_name.split(' ');
  const lastName = rest.join(' ');

  return (
    <section className="relative flex items-center justify-center h-screen px-6 md:px-12 overflow-hidden font-mono">
      {/* Fondo Matrix */}
      <MatrixBackground />

      {/* CMD-style container */}
      <div className="relative z-10 max-w-6xl w-full">
        <div className="border border-green-500 bg-black/80 rounded-md overflow-hidden shadow-lg animate-fade-in-scale-up">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-3 bg-black/90 border-b border-green-500">
            <span className="text-green-400 font-pixel text-base md:text-lg">C:/hero</span>
            <button className="text-green-400 font-bold hover:text-green-300 text-base md:text-lg">×</button>
          </div>

          {/* Content: Imagen + Info */}
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-12 p-8 md:p-12">
            {/* Imagen de perfil */}
            {info.profile_image && (
              <img
                src={info.profile_image}
                alt={info.full_name}
                className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-green-500 shadow-lg hover:shadow-green-glow animate-fade-in-left"
              />
            )}

            {/* Información a la derecha */}
            <div className="flex flex-col space-y-3 md:space-y-5 text-left">
              <h1 className="text-3xl sm:text-2xl md:text-5xl lg:text-6xl font-pixel text-green-400 animate-typing overflow-hidden border-r-2 border-green-300">
                {firstName} <br /> {lastName}
              </h1>

              {info.title && (
                <h2 className="text-xl md:text-2xl text-green-300 font-pixel animate-fade-in-up delay-100">
                  {info.title}
                </h2>
              )}

              {info.location && (
                <p className="text-base md:text-lg text-green-200 italic animate-fade-in-up delay-200">
                  📍 {info.location}
                </p>
              )}

              {info.bio && (
                <p className="text-base md:text-lg lg:text-xl text-green-100 max-w-2xl animate-fade-in-up delay-300">
                  {info.bio}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
