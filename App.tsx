import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import ADFlowchart from './components/ADFlowchart';
import { ThemeProvider } from './components/ThemeContext';
import { DataProvider } from './contexts/DataContext';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Handle URL changes
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLaunchApp = (url: string) => {
    window.history.pushState({}, '', url);
    setCurrentPath(url);
    window.scrollTo(0, 0);
  };

  const isAdmin = currentPath === '/admin';
  const isADApp = currentPath === '/ad-flowchart';

  useEffect(() => {
    if (!isAdmin && !isADApp) {
      console.log(
        "%c HELLO FELLOW HACKER ",
        "background: #10b981; color: #000; font-size: 24px; font-weight: bold; padding: 10px;"
      );
      console.log(
        "%c Access the C2 Server at /admin ",
        "color: #10b981; font-family: monospace; font-size: 14px;"
      );
    }
  }, [isAdmin, isADApp]);

  return (
    <DataProvider>
      <ThemeProvider>
        {isAdmin ? (
          <AdminDashboard />
        ) : isADApp ? (
          <ADFlowchart />
        ) : (
          <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-primary-500/30 selection:text-primary-200">
            <Navbar />
            <main>
              <Hero />
              <About />
              <Projects onLaunchApp={handleLaunchApp} />
              <Certifications />
              <Experience />
              <Contact />
            </main>
            
            {/* Decorative background grid fixed */}
            <div className="fixed inset-0 z-[-1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
          </div>
        )}
      </ThemeProvider>
    </DataProvider>
  );
};

export default App;