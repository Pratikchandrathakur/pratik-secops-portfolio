import React, { useState, useEffect } from 'react';
import { useTheme, Theme } from './ThemeContext';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about', num: '01' },
    { name: 'Projects', href: '#projects', num: '02' },
    { name: 'Certifications', href: '#certifications', num: '03' },
    { name: 'Experience', href: '#experience', num: '04' },
    { name: 'Contact', href: '#contact', num: '05' },
  ];

  const themes: { id: Theme; color: string }[] = [
    { id: 'emerald', color: '#10b981' },
    { id: 'violet', color: '#8b5cf6' },
    { id: 'blue', color: '#3b82f6' },
    { id: 'red', color: '#ef4444' },
    { id: 'amber', color: '#f59e0b' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-3 lg:py-4' : 'bg-transparent py-4 lg:py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Logo Section */}
        <a href="#" className="text-xl font-bold tracking-tighter flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 bg-primary-500 rounded-sm flex items-center justify-center text-slate-950 font-mono font-bold group-hover:rotate-12 transition-transform">
            P
          </div>
          <span className="hidden sm:block text-slate-200 group-hover:text-primary-400 transition-colors">Pratik</span>
        </a>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4 lg:gap-8">
          {/* Navigation Items - Hidden on Mobile, visible on tablet+ with adaptive spacing/sizing */}
          <ul className="hidden md:flex gap-3 lg:gap-8 items-center">
            {navItems.map((item) => (
              <li key={item.name}>
                <a href={item.href} className="text-xs lg:text-sm font-mono text-slate-400 hover:text-primary-400 transition-colors flex gap-1 lg:gap-2 items-center">
                  <span className="text-primary-500 hidden lg:inline">{item.num}.</span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Theme Switcher */}
          <div className="flex gap-1.5 lg:gap-2 bg-slate-900/50 p-1 rounded-full border border-slate-800 shrink-0">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full transition-all ${
                  theme === t.id ? 'scale-110 ring-2 ring-white ring-opacity-50' : 'hover:scale-110 opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: t.color }}
                title={`${t.id} theme`}
              />
            ))}
          </div>

          {/* Connect Button - Hidden on mobile, visible on tablet+ */}
          <a 
            href="https://www.linkedin.com/in/pratikchandrathakur/" 
            target="_blank" 
            rel="noreferrer" 
            className="hidden md:block px-3 py-1.5 lg:px-4 lg:py-2 border border-primary-500/30 text-primary-400 text-xs lg:text-sm font-mono rounded hover:bg-primary-500/10 transition-all shrink-0"
          >
            Connect
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;