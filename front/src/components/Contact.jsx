import React from 'react';

const Contact = ({ socialLinks }) => {
  return (
    <section id="contact" className="relative py-16 px-6 md:px-12 overflow-hidden font-mono min-h-screen">
      {/* CMD-style container */}
      <div className="relative max-w-6xl w-full mx-auto">
        <div className="border border-green-500 bg-black/80 rounded-md shadow-lg overflow-hidden animate-fade-in-scale-up">
          
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-3 bg-black/90 border-b border-green-500">
            <span className="text-green-400 font-pixel text-base md:text-lg">C:/contact</span>
            <button className="text-green-400 font-bold hover:text-green-300 text-base md:text-lg">×</button>
          </div>

          {/* Content */}
          <div className="flex flex-col p-6 md:p-8 space-y-8">
            {/* Mensaje introductorio */}
            <p className="text-center text-lg sm:text-base md:text-xl text-green-200 font-sans animate-fade-in-up">
              Actualmente estoy disponible para trabajos freelance. Escríbeme si quieres charlar.
            </p>

            {/* Enlaces a redes sociales */}
            <div className="flex justify-center flex-wrap gap-6 animate-fade-in-up">
              {socialLinks?.map((link, idx) => (
                <a 
                  key={link.type} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 text-2xl sm:text-xl md:text-3xl font-pixel hover:animate-glitch transition-colors duration-300"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {link.type}
                </a>
              ))}
            </div>

            {/* Formulario de contacto */}
            <form className="flex flex-col space-y-6 bg-black/70 p-6 md:p-8 rounded-md border border-green-500 shadow-lg animate-fade-in-left">
              <input 
                type="text" 
                placeholder="NOMBRE" 
                className="bg-black/90 text-green-400 border border-green-500 p-4 rounded w-full focus:outline-none focus:border-green-300 placeholder-green-600 transition-all duration-300 font-mono" 
              />
              <input 
                type="email" 
                placeholder="CORREO ELECTRÓNICO" 
                className="bg-black/90 text-green-400 border border-green-500 p-4 rounded w-full focus:outline-none focus:border-green-300 placeholder-green-600 transition-all duration-300 font-mono" 
              />
              <textarea 
                placeholder="MENSAJE" 
                rows="4" 
                className="bg-black/90 text-green-400 border border-green-500 p-4 rounded w-full focus:outline-none focus:border-green-300 placeholder-green-600 transition-all duration-300 font-mono"
              />
              <button 
                type="submit" 
                className="bg-green-900 hover:bg-green-400 text-black font-pixel py-4 px-8 rounded w-full border border-green-400 hover:shadow-green-glow transition-all duration-300"
              >
                ENVIAR MENSAJE
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
