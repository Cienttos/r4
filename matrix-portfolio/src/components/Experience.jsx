import React from 'react';

const experienceData = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Cybersystems Inc.',
    start_date: '2022-01-01',
    end_date: null,
    description: 'Developing next-gen neural interfaces and network protocols.'
  },
  {
    id: 2,
    title: 'Junior Developer',
    company: 'Data-Link Corp.',
    start_date: '2020-06-01',
    end_date: '2021-12-31',
    description: 'Maintained and optimized data streams for the global network.'
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-black experience-bg">
      <h2 className="text-4xl text-center font-bold mb-12 text-green-400">EXPERIENCE</h2>
      <div className="max-w-4xl mx-auto px-4">
        {experienceData.map((job) => (
          <div key={job.id} className="mb-8 p-4 border border-green-500/50 rounded-lg bg-black/50 backdrop-blur-sm">
            <h3 className="text-2xl font-bold">{job.title}</h3>
            <p className="text-xl text-green-300">{job.company}</p>
            <p className="text-sm text-green-500">{job.start_date} to {job.end_date || 'Present'}</p>
            <p className="mt-4">{job.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
