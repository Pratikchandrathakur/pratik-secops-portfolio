import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Certification, Experience, Category } from '../types';
import { PROJECTS, CERTIFICATIONS, EXPERIENCE_DATA } from '../constants';

interface DataContextType {
  projects: Project[];
  certifications: Certification[];
  experience: Experience[];
  updateProject: (project: Project) => void;
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  updateCertification: (cert: Certification) => void;
  addCertification: (cert: Certification) => void;
  deleteCertification: (id: string) => void;
  updateExperience: (exp: Experience) => void;
  addExperience: (exp: Experience) => void;
  deleteExperience: (id: string) => void;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or fallback to constants
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('portfolio_projects');
    return saved ? JSON.parse(saved) : PROJECTS;
  });

  const [certifications, setCertifications] = useState<Certification[]>(() => {
    const saved = localStorage.getItem('portfolio_certifications');
    return saved ? JSON.parse(saved) : CERTIFICATIONS;
  });

  const [experience, setExperience] = useState<Experience[]>(() => {
    const saved = localStorage.getItem('portfolio_experience');
    return saved ? JSON.parse(saved) : EXPERIENCE_DATA;
  });

  // Persist changes
  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio_certifications', JSON.stringify(certifications));
  }, [certifications]);

  useEffect(() => {
    localStorage.setItem('portfolio_experience', JSON.stringify(experience));
  }, [experience]);

  // Project Actions
  const addProject = (project: Project) => setProjects(prev => [project, ...prev]);
  const updateProject = (project: Project) => {
    setProjects(prev => prev.map(p => p.id === project.id ? project : p));
  };
  const deleteProject = (id: string) => setProjects(prev => prev.filter(p => p.id !== id));

  // Certification Actions
  const addCertification = (cert: Certification) => setCertifications(prev => [cert, ...prev]);
  const updateCertification = (cert: Certification) => {
    setCertifications(prev => prev.map(c => c.id === cert.id ? cert : c));
  };
  const deleteCertification = (id: string) => setCertifications(prev => prev.filter(c => c.id !== id));

  // Experience Actions
  const addExperience = (exp: Experience) => setExperience(prev => [exp, ...prev]);
  const updateExperience = (exp: Experience) => {
    setExperience(prev => prev.map(e => e.id === exp.id ? exp : e));
  };
  const deleteExperience = (id: string) => setExperience(prev => prev.filter(e => e.id !== id));

  const resetData = () => {
    setProjects(PROJECTS);
    setCertifications(CERTIFICATIONS);
    setExperience(EXPERIENCE_DATA);
    localStorage.clear();
    window.location.reload();
  };

  return (
    <DataContext.Provider value={{
      projects, certifications, experience,
      updateProject, addProject, deleteProject,
      updateCertification, addCertification, deleteCertification,
      updateExperience, addExperience, deleteExperience,
      resetData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};