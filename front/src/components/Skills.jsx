import React from 'react';

const Skills = ({ skills }) => {
  return (
    <section id="skills" className="relative py-16 px-6 md:px-12 overflow-hidden font-mono min-h-screen">
      {/* CMD-style container */}
      <div className="relative max-w-6xl w-full mx-auto">
        <div className="border border-green-500 bg-black/80 rounded-md shadow-lg overflow-hidden animate-fade-in-scale-up">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-3 bg-black/90 border-b border-green-500">
            <span className="text-green-400 font-pixel text-base md:text-lg">C:/skills</span>
            <button className="text-green-400 font-bold hover:text-green-300 text-base md:text-lg">×</button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 md:p-8">
            {skills?.map((skill, idx) => (
              <div
                key={skill.name}
                className="border border-green-500 bg-black/80 rounded-md shadow-lg p-6 flex flex-col hover:shadow-green-glow transition-all duration-300 animate-fade-in-left"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <h3 className="text-2xl md:text-3xl font-pixel text-green-400 mb-4 animate-typing overflow-hidden border-r-2 border-green-300">
                  {skill.name}
                </h3>
                
                <div className="w-full bg-green-900 rounded-full h-6">
                  <div
                    className="bg-green-400 h-6 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
