import React from 'react';

const Testimonials = ({ testimonials }) => {
  return (
    <section className="py-20 bg-black testimonials-bg">
            <h2 className="text-4xl text-center font-bold mb-12 text-green-400">TESTIMONIALS</h2>
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 px-4">
                {testimonials?.map(testimonial => (
                    <div key={testimonial.id} className="p-6 border border-green-500/50 rounded-lg bg-black/50 backdrop-blur-sm flex items-start gap-4">
                        <img src={testimonial.photo} alt={testimonial.name} className="w-20 h-20 rounded-full border-2 border-green-500" />
                        <div>
                            <p className="italic">"{testimonial.message}"</p>
                            <h3 className="text-xl font-bold mt-4">- {testimonial.name}</h3>
                            <p className="text-green-300">{testimonial.role}, {testimonial.company}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
  );
};

export default Testimonials;