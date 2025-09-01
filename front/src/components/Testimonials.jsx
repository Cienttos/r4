import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Testimonials = ({ testimonials }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section id="testimonials" className="relative py-16 px-6 md:px-12 overflow-hidden font-mono min-h-screen">
      <div className="relative max-w-6xl w-full mx-auto">
        <div className="border border-green-500 bg-black/80 rounded-md shadow-lg overflow-hidden animate-fade-in-scale-up">
          <div className="flex justify-between items-center px-6 py-3 bg-black/90 border-b border-green-500">
            <span className="text-green-400 font-pixel text-base md:text-lg">C:/testimonials</span>
            <button className="text-green-400 font-bold hover:text-green-300 text-base md:text-lg">×</button>
          </div>

          <div className="p-6 md:p-8">
            <Slider {...settings}>
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
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;