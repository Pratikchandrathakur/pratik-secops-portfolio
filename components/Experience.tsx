import React from 'react';
import { useData } from '../contexts/DataContext';
import { Briefcase } from 'lucide-react';

const Experience: React.FC = () => {
  const { experience } = useData();

  return (
    <section id="experience" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
          <span className="text-primary-500 font-mono">04.</span>
          Operational History
        </h2>

        <div className="relative border-l border-slate-800 ml-4 md:ml-8 space-y-12">
          {experience.map((job) => (
            <div key={job.id} className="relative pl-8 md:pl-12 group">
              {/* Timeline Dot */}
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-slate-800 group-hover:bg-primary-500 transition-colors ring-4 ring-slate-950" />
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-primary-400 transition-colors">
                    {job.role}
                  </h3>
                  <div className="text-primary-500 font-mono text-sm mt-1">{job.company}</div>
                </div>
                <span className="font-mono text-xs text-slate-500 mt-2 sm:mt-0 px-3 py-1 bg-slate-900 rounded-full border border-slate-800">
                  {job.period}
                </span>
              </div>

              <ul className="space-y-3 mb-6">
                {job.description.map((desc, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-400 text-sm md:text-base">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-primary-500/50 shrink-0" />
                    {desc}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {job.skills.map(skill => (
                  <span key={skill} className="text-xs font-mono text-slate-400 bg-slate-800/50 px-2 py-1 rounded border border-slate-700/50">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;