import React from 'react';

interface Education {
  degree: string;
  school: string;
  year: string;
}

interface EducationSectionProps {
  education: Education[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  return (
    <section className="mb-8">
      <h2 className="text-slate-800 text-3xl mb-6 flex items-center after:content-[''] after:flex-1 after:h-0.5 after:bg-slate-100 after:ml-5 font-bold">Education</h2>
      {education.map((edu, index) => (
        <div key={index} className="relative pl-8 pb-8 last:pb-0 border-l-2 border-slate-200 last:border-l-0 before:content-[''] before:absolute before:-left-1.75 before:top-0 before:size-3 before:rounded-full before:bg-violet-600 before:border-2 before:border-white">
          <div className="mb-2.5">
            <h4 className="m-0 text-xl text-slate-800 font-bold">{edu.degree}</h4>
            <span className="text-sm text-violet-600 font-semibold">{edu.year}</span>
          </div>
          <div className="text-slate-500">{edu.school}</div>
        </div>
      ))}
    </section>
  );
};
