import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Category } from '../types';
import { Award, ExternalLink } from 'lucide-react';

const Certifications: React.FC = () => {
  const { certifications } = useData();
  const [filter, setFilter] = useState<Category | 'All'>('All');

  const filteredCerts = filter === 'All' 
    ? certifications 
    : certifications.filter(c => c.category === filter);

  return (
    <section id="certifications" className="py-24 px-4 bg-slate-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-3 mb-2">
              <span className="text-primary-500 font-mono">03.</span>
              Certifications & Credentials
            </h2>
            <p className="text-slate-400">Validated skills across Security, Development, and Cloud Operations.</p>
          </div>

          <div className="flex flex-wrap gap-2 p-1 bg-slate-900/80 rounded-lg border border-slate-800">
            {['All', ...Object.values(Category).filter(c => typeof c === 'string')].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as Category | 'All')}
                className={`px-4 py-2 text-sm rounded-md transition-all font-mono ${
                  filter === cat 
                    ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20 shadow-lg shadow-primary-500/5' 
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCerts.map((cert) => (
            <div 
              key={cert.id}
              className="group relative bg-slate-900 border border-slate-800 hover:border-primary-500/30 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/5"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-5 h-5 text-primary-500" />
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-lg ${
                  cert.category === Category.SECURITY ? 'bg-red-500/10 text-red-400' :
                  cert.category === Category.DEV ? 'bg-blue-500/10 text-blue-400' :
                  cert.category === Category.CLOUD ? 'bg-orange-500/10 text-orange-400' :
                  cert.category === Category.MARKETING ? 'bg-pink-500/10 text-pink-400' :
                  'bg-purple-500/10 text-purple-400'
                }`}>
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">{cert.category}</span>
                  <h3 className="text-lg font-bold text-slate-100 leading-tight mt-1 group-hover:text-primary-400 transition-colors">
                    {cert.name}
                  </h3>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-800 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Issuer:</span>
                  <span className="text-slate-300">{cert.issuer}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Issued:</span>
                  <span className="text-slate-300 font-mono">{cert.date}</span>
                </div>
                {cert.credentialId && (
                   <div className="flex justify-between text-sm">
                   <span className="text-slate-500">ID:</span>
                   <span className="text-slate-400 font-mono text-xs truncate max-w-[120px]" title={cert.credentialId}>
                     {cert.credentialId}
                   </span>
                 </div>
                )}
              </div>
              
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;