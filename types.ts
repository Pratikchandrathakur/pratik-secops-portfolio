export enum Category {
  SECURITY = 'Security',
  DEV = 'Development',
  CLOUD = 'Cloud',
  IT = 'IT & Ops',
  MARKETING = 'Marketing'
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  category: Category;
  credentialId?: string;
  url?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  repoUrl?: string;
  demoUrl?: string;
  status: 'Completed' | 'In Development' | 'Research Phase';
  featured?: boolean;
}