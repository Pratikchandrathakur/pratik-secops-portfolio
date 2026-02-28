import React from 'react';
import { useData } from '../contexts/DataContext';
import { Github, Code, Terminal, Activity, Lock, ExternalLink, Play } from 'lucide-react';

interface ProjectsProps {
  onLaunchApp?: (appId: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onLaunchApp }) => {
  const { projects } = useData();

  return (
    <section id="projects" className="py-24 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl font-bold flex items-center gap-3 mb-4">
            <span className="text-primary-500 font-mono">02.</span>
            Security Engineering & Research
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            Bridging the gap between offensive security and secure software architecture. 
            Currently developing tools that solve real-world SecOps challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="group flex flex-col h-full bg-slate-900/40 border border-slate-800 rounded-lg overflow-hidden hover:border-primary-500/50 hover:shadow-[0_0_30px_-5px_theme('colors.primary.500')] hover:shadow-primary-500/10 transition-all duration-300"
            >
              <div className="bg-slate-900/80 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50 group-hover:bg-red-500 transition-colors" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50 group-hover:bg-yellow-500 transition-colors" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50 group-hover:bg-green-500 transition-colors" />
                </div>
                <div className="flex gap-2 text-slate-500">
                  {project.status === 'In Development' && <Activity className="w-4 h-4 animate-pulse text-amber-500" />}
                  {project.status === 'Research Phase' && <Lock className="w-4 h-4 text-primary-500" />}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-slate-800 rounded text-primary-400 group-hover:text-white group-hover:bg-primary-600 transition-colors">
                    {project.id === 'proj-1' ? <Activity className="w-6 h-6" /> : 
                     project.id === 'proj-2' ? <Terminal className="w-6 h-6" /> : 
                     <Code className="w-6 h-6" />}
                  </div>
                  <div className="flex gap-3">
                    {project.repoUrl && (
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-400 transition-colors">
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.demoUrl && onLaunchApp && (
                      <button 
                        onClick={() => onLaunchApp(project.demoUrl!)}
                        className="text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1 bg-primary-500/10 px-2 py-1 rounded text-xs border border-primary-500/20"
                      >
                        <Play className="w-3 h-3 fill-current" /> DEMO
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                <div>
                   <div className="text-xs font-mono text-slate-500 mb-2 uppercase tracking-wide">Tech Stack</div>
                   <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                      <span key={tech} className="px-2 py-1 text-xs font-mono rounded bg-slate-800/50 text-slate-300 border border-slate-700/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 py-2 px-6 border-t border-slate-800/50 flex justify-between items-center text-xs font-mono">
                <span className={`${
                  project.status === 'In Development' ? 'text-amber-400' : 
                  project.status === 'Research Phase' ? 'text-primary-400' : 'text-green-400'
                }`}>
                  {project.status.toUpperCase()}
                </span>
                <span className="text-slate-600">git branch: main</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;