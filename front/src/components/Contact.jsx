import React from 'react';

const Contact = ({ socialLinks }) => {
  return (
    <section id="contact" className="relative py-16 px-6 md:px-12 overflow-hidden font-mono min-h-screen">
      <div className="relative max-w-6xl w-full mx-auto">
        <div className="border border-green-500 bg-black/80 rounded-md shadow-lg overflow-hidden animate-fade-in-scale-up">
          
          <div className="flex justify-between items-center px-6 py-3 bg-black/90 border-b border-green-500">
            <span className="text-green-400 font-pixel text-base md:text-lg">C:/contact</span>
            <button className="text-green-400 font-bold hover:text-green-300 text-base md:text-lg">×</button>
          </div>

          <div className="flex flex-col p-6 md:p-8 space-y-8">
            <p className="text-center text-lg sm:text-base md:text-xl text-green-200 font-sans animate-fade-in-up">
              Actualmente estoy disponible para trabajos freelance. Contáctame a través de mis redes sociales.
            </p>

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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;