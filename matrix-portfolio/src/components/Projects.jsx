import React from 'react';

const projectData = [
  {
    id: 1,
    title: 'Project Sentinel',
    description: 'A decentralized firewall using blockchain technology.',
    image: 'https://via.placeholder.com/400x300.png/000/0f0?text=Sentinel',
    tech_stack: ['React', 'Solidity', 'Node.js'],
  },
  {
    id: 2,
    title: 'Neuralink Visualizer',
    description: 'Real-time 3D visualization of neural activity.',
    image: 'https://via.placeholder.com/400x300.png/000/0f0?text=Neuralink',
    tech_stack: ['Three.js', 'React', 'Python'],
  },
  {
    id: 3,
    title: 'Matrix Rain FX',
    description: 'A highly customizable Matrix rain effect generator.',
    image: 'https://via.placeholder.com/400x300.png/000/0f0?text=Rain+FX',
    tech_stack: ['JavaScript', 'HTML5 Canvas'],
  },
    {
    id: 4,
    title: 'Quantum DB',
    description: 'A database leveraging quantum entanglement for instant data retrieval.',
    image: 'https://via.placeholder.com/400x300.png/000/0f0?text=Quantum+DB',
    tech_stack: ['Python', 'Qiskit', 'PostgreSQL'],
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-black projects-bg">
        <h2 className="text-4xl text-center font-bold mb-12 text-green-400">PROJECTS</h2>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {projectData.map((project) => (
                <div key={project.id} className="project-card bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden border border-green-500/30 transition-all duration-300">
                    <div className="relative overflow-hidden">
                        <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                        <div className="scan-line"></div>
                    </div>
                    <div className="p-4">
                        <h3 className="text-2xl font-bold">{project.title}</h3>
                        <p className="mt-2 h-20 overflow-hidden">{project.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {project.tech_stack.map(tech => (
                                <span key={tech} className="px-2 py-1 bg-green-900 text-green-300 text-sm rounded">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
  );
};

export default Projects;
