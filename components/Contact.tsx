import React from 'react';
import { Mail, Linkedin, Github, Terminal } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-4 bg-gradient-to-b from-slate-950 to-black border-t border-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-slate-100">
          <span className="text-primary-500 font-mono text-xl block mb-2">05. Initialize Handshake</span>
          Let's Secure the Future
        </h2>
        
        <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
          Whether you have a question about my security research, want to discuss a vulnerability, or just want to say hi, my inbox is always open.
        </p>

        <a 
          href="mailto:pratikchandrathakur@gmail.com"
          className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-primary-400 border border-primary-500/20 hover:border-primary-500 hover:bg-primary-500/10 rounded font-mono text-lg transition-all duration-300 group"
        >
          <Mail className="w-5 h-5 group-hover:animate-bounce" />
          pratikchandrathakur@gmail.com
        </a>

        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-mono text-xs text-slate-600">
            <span className="text-primary-900">root@system:~$</span> ./logout
          </div>
          
          <div className="flex gap-6">
            {SOCIAL_LINKS.map(link => (
                <a 
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-primary-400 transition-colors"
                aria-label={link.platform}
                >
                    {/* Reusing simplified icons logic or importing lucide icons */}
                    {link.icon === 'linkedin' && <Linkedin className="w-5 h-5" />}
                    {link.icon === 'github' && <Github className="w-5 h-5" />}
                    {link.icon === 'shield' && <div className="font-bold font-mono text-sm border border-current rounded px-1">THM</div>}
                    {link.icon === 'book' && <Terminal className="w-5 h-5" />}
                    {link.icon === 'mail' && <Mail className="w-5 h-5" />}
                </a>
            ))}
          </div>

          <div className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Pratik Chandra Thakur
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;