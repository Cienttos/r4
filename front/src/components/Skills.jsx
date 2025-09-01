import React from 'react';

const Skills = ({ skills }) => {
  return (
    <section className="py-20 bg-black skills-bg">
            <h2 className="text-4xl text-center font-bold mb-12 text-green-400">SKILLS</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 px-4">
                {skills?.map(skill => (
                    <div key={skill.name} className="skill-card p-4 border border-green-500/50 rounded-lg text-center bg-black/50 backdrop-blur-sm">
                        <h3 className="text-xl font-bold">{skill.name}</h3>
                        <div className="w-full bg-green-900 rounded-full h-2.5 mt-2">
                            <div 
                                className="bg-green-400 h-2.5 rounded-full"
                                style={{ width: `${skill.level}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
  );
};

export default Skills;