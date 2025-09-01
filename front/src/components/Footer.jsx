import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative py-8 px-6 md:px-12 min-h-[250px] overflow-hidden font-mono bg-black">
      {/* CMD-style container */}
      <div className="relative max-w-6xl w-full mx-auto border border-green-500 bg-black/90 rounded-md shadow-lg overflow-hidden animate-fade-in-scale-up">
        
        {/* Header tipo CMD */}
        <div className="flex justify-between items-center px-6 py-3 bg-black/95 border-b border-green-500">
          <span className="text-green-400 font-pixel text-base md:text-lg">C:/footer</span>
          <button className="text-green-400 font-bold hover:text-green-300 text-base md:text-lg">×</button>
        </div>

        {/* Contenido principal */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 p-6 md:p-8">

          {/* Info personal */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2 animate-fade-in-up">
            <h2 className="text-green-400 font-bold text-xl md:text-2xl">Facundo Cientofante</h2>
            <p className="text-green-200 text-sm md:text-base font-mono">
              &copy; {new Date().getFullYear()} Todos los derechos reservados.
            </p>
            <p className="text-green-200 text-sm md:text-base font-mono">
              Integridad del sistema: Nominal. Conexión: Segura.
            </p>
          </div>

          {/* División visual */}
          <div className="hidden md:block w-px h-20 bg-green-500 mx-6"></div>

          {/* Redes / contacto */}
          <div className="flex flex-col items-center md:items-end space-y-2 animate-fade-in-up">
            <p className="text-green-300 font-mono text-sm md:text-base">Contacto & Redes</p>
            <div className="flex space-x-4">
              <a href="https://github.com/FacundoCientofante" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">
                <FaGithub size={22} />
              </a>
              <a href="https://linkedin.com/in/FacundoCientofante" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">
                <FaLinkedin size={22} />
              </a>
              <a href="mailto:facundo@example.com" className="text-green-400 hover:text-green-300">
                <FaEnvelope size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Línea inferior tipo terminal */}
        <div className="w-full border-t border-green-500 mt-4 pt-2 text-center text-green-300 font-mono text-sm animate-fade-in-up">
          C:/users/facundo/footer >_
        </div>
      </div>
    </footer>
  );
};

export default Footer;
