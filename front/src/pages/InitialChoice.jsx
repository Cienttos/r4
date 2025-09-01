import React from 'react';
import { useNavigate } from 'react-router-dom';

const InitialChoice = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center font-mono overflow-x-hidden">
      {/* Fondo Matrix */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        {/* Podés reutilizar tu componente MatrixBackground aquí si querés */}
      </div>

      {/* Contenedor tipo CMD */}
      <div className="bg-black/80 border-2 border-green-500 rounded-lg shadow-lg p-8 md:p-12 flex flex-col items-center space-y-10 animate-fade-in-scale-up">
        <h1 className="text-6xl sm:text-5xl md:text-8xl lg:text-9xl text-green-400 font-pixel mb-6 text-center leading-tight animate-pulse-green transition-all duration-500 hover:animate-glitch">
          Bienvenido
        </h1>

        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10 w-full max-w-xl">
          <button
            onClick={() => navigate('/devmode')}
            className="w-full px-8 py-5 rounded-lg border-2 border-green-500 font-pixel text-2xl md:text-3xl shadow-xl text-green-400 bg-black/90 hover:shadow-green-glow hover:bg-black/80 transform transition-all duration-300 hover:scale-105"
          >
            Modo Desarrollador
          </button>

          <button
            onClick={() => navigate('/portfolio')}
            className="w-full px-8 py-5 rounded-lg border-2 border-green-500 font-pixel text-2xl md:text-3xl shadow-xl text-white bg-green-900 hover:bg-green-600 hover:shadow-green-glow transform transition-all duration-300 hover:scale-105"
          >
            Ver Portafolio
          </button>
        </div>
      </div>
    </section>
  );
};

export default InitialChoice;
