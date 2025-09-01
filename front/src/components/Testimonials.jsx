import React from 'react';

const Testimonials = ({ testimonials }) => {
  return (
    <section id="testimonials" className="relative py-16 px-6 md:px-12 overflow-hidden font-mono min-h-screen">
      {/* CMD-style container */}
      <div className="relative max-w-6xl w-full mx-auto">
        <div className="border border-green-500 bg-black/80 rounded-md shadow-lg overflow-hidden animate-fade-in-scale-up">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-3 bg-black/90 border-b border-green-500">
            <span className="text-green-400 font-pixel text-base md:text-lg">C:/testimonials</span>
            <button className="text-green-400 font-bold hover:text-green-300 text-base md:text-lg">×</button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 md:p-8">
            {testimonials?.map((testimonial, idx) => (
              <div
                key={testimonial.id}
                className="border border-green-500 bg-black/80 rounded-md shadow-lg flex flex-col items-center text-center p-6 hover:shadow-green-glow transition-all duration-300 animate-fade-in-left"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                {testimonial.photo && (
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-green-400 mb-6"
                  />
                )}

                <div>
                  <p className="text-lg sm:text-base italic mb-4 text-green-200 font-sans">"{testimonial.message}"</p>
                  <h3 className="text-2xl sm:text-xl font-semibold text-green-400 font-pixel mb-1 animate-typing overflow-hidden border-r-2 border-green-300">
                    - {testimonial.name}
                  </h3>
                  <p className="text-base text-green-200 font-mono">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
