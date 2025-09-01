import React from 'react';

const Projects = ({ projects }) => {
  return (
    <section id="proyectos" className="relative py-16 px-6 md:px-12 overflow-hidden font-mono min-h-screen">
      {/* CMD-style container */}
      <div className="relative max-w-6xl w-full mx-auto">
        <div className="border border-green-500 bg-black/80 rounded-md shadow-lg overflow-hidden animate-fade-in-scale-up">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-3 bg-black/90 border-b border-green-500">
            <span className="text-green-400 font-pixel text-base md:text-lg">C:/projects</span>
            <button className="text-green-400 font-bold hover:text-green-300 text-base md:text-lg">×</button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 md:p-8">
            {projects?.map((project, idx) => (
              <div
                key={project.id}
                className="border border-green-500 bg-black/80 rounded-md shadow-lg overflow-hidden flex flex-col hover:shadow-green-glow transition-all duration-300 animate-fade-in-left"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                {/* Imagen */}
                {project.image && (
                  <div className="mb-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-56 object-cover rounded-md border-4 border-green-500"
                    />
                  </div>
                )}

                {/* Info */}
                <div className="flex flex-col flex-grow p-4 md:p-6 space-y-3">
                  <h3 className="text-2xl md:text-3xl font-pixel text-green-400 mb-1 animate-typing overflow-hidden border-r-2 border-green-300">
                    {project.title}
                  </h3>
                  <p className="text-green-100 text-base md:text-lg flex-grow font-sans">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech_stack?.map((tech) => (
                      <span
                        key={tech}
                        className="bg-green-900 text-green-400 text-sm px-3 py-1 rounded-full font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
