import React from 'react';

interface Experience {
  role: string;
  period: string;
  company: string;
  description: string;
}

interface ExperienceSectionProps {
  experience: Experience[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience }) => {
  return (
    <section className="mb-8">
      <h2 className="text-slate-800 text-3xl mb-6 flex items-center after:content-[''] after:flex-1 after:h-0.5 after:bg-slate-100 after:ml-5 font-bold">Experience</h2>
      {experience.map((exp, index) => (
        <div key={index} className="relative pl-8 pb-8 last:pb-0 border-l-2 border-slate-200 last:border-l-0 before:content-[''] before:absolute before:-left-1.75 before:top-0 before:size-3 before:rounded-full before:bg-violet-600 before:border-2 before:border-white">
          <div className="mb-2.5">
            <h4 className="m-0 text-xl text-slate-800 font-bold">{exp.role}</h4>
            <span className="text-sm text-violet-600 font-semibold">{exp.period}</span>
          </div>
          <div className="text-slate-500 mb-2.5">{exp.company}</div>
          <p>{exp.description}</p>
        </div>
      ))}
    </section>
  );
};
