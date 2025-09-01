import React from 'react';

const Footer = () => {
  return (
    <footer className="relative py-8 px-6 md:px-12 min-h-[200px] overflow-hidden font-mono">
      {/* CMD-style container */}
      <div className="relative max-w-6xl w-full mx-auto border border-green-500 bg-black/80 rounded-md shadow-lg overflow-hidden animate-fade-in-scale-up">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-3 bg-black/90 border-b border-green-500">
          <span className="text-green-400 font-pixel text-base md:text-lg">C:/footer</span>
          <button className="text-green-400 font-bold hover:text-green-300 text-base md:text-lg">×</button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 p-6 md:p-8">

          {/* Derechos de autor y estado del sistema */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-1 animate-fade-in-up">
            <p className="text-green-200 text-sm md:text-base font-mono">
              &copy; {new Date().getFullYear()} [TU NOMBRE]. Todos los derechos reservados.
            </p>
            <p className="text-green-200 text-sm md:text-base font-mono">
              Integridad del sistema: Nominal. Conexión: Segura.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
