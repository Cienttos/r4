import React from 'react';

const Experience = ({ experience }) => {
  return (
    <section id="experience" className="relative py-16 px-6 md:px-12 overflow-hidden font-mono min-h-screen">
      {/* CMD-style container */}
      <div className="relative max-w-6xl w-full mx-auto">
        <div className="border border-green-500 bg-black/80 rounded-md shadow-lg overflow-hidden animate-fade-in-scale-up">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-3 bg-black/90 border-b border-green-500">
            <span className="text-green-400 font-pixel text-base md:text-lg">C:/experience</span>
            <button className="text-green-400 font-bold hover:text-green-300 text-base md:text-lg">×</button>
          </div>

          {/* Content */}
          <div className="flex flex-col space-y-6 p-6 md:p-8">
            {experience?.map((job, idx) => (
              <div
                key={job.id}
                className="border border-green-500 rounded-md p-4 md:p-6 hover:shadow-green-glow transition-all duration-300 flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-6 animate-fade-in-left"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                {/* Info principal */}
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-xl md:text-3xl font-pixel text-green-400 mb-1 animate-typing overflow-hidden border-r-2 border-green-300">
                    {job.title}
                  </h3>
                  {job.company && (
                    <p className="text-lg text-green-300 font-sans mb-1">{job.company}</p>
                  )}
                  <p className="text-sm md:text-base text-green-200 italic mb-2">
                    {job.start_date} a {job.end_date || 'Actualidad'}
                  </p>
                  {job.description && (
                    <p className="text-base md:text-lg text-green-100">{job.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
