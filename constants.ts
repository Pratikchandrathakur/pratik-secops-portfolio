import { Category, Certification, Experience, SocialLink, Project } from './types';

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/pratikchandrathakur/', icon: 'linkedin' },
  { platform: 'GitHub', url: 'https://github.com/Pratikchandrathakur', icon: 'github' },
  { platform: 'TryHackMe', url: 'https://tryhackme.com/p/ThreatBuster', icon: 'shield' },
  { platform: 'Hashnode', url: 'https://hashnode.com/@PratikChandra', icon: 'book' },
  { platform: 'Email', url: 'mailto:pratikchandrathakur@gmail.com', icon: 'mail' },
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: 'exp1',
    role: 'Security Solution Lead',
    company: 'CyberAlertNepal',
    period: 'Dec 2025 - Present',
    description: [
      'Monitor and analyze security alerts and events to detect potential threats.',
      'Contribute to incident response efforts and disaster recovery planning.',
      'Apply best practices in network security to protect organizational assets.',
      'Collaborate with cross-functional teams to ensure security compliance.'
    ],
    skills: ['SIEM', 'Incident Response', 'Network Security', 'Compliance']
  },
  {
    id: 'exp2',
    role: 'Security Analyst',
    company: 'CyberAlertNepal',
    period: 'Feb 2025 - Nov 2025',
    description: [
      'Monitor and analyze security alerts and events to detect potential threats.',
      'Contribute to incident response efforts and disaster recovery planning.',
      'Apply best practices in network security to protect organizational assets.',
      'Collaborate with cross-functional teams to ensure security compliance.'
    ],
    skills: ['SIEM', 'Incident Response', 'Network Security', 'Compliance']
  }
];

export const CERTIFICATIONS: Certification[] = [
  // 2025
  { id: 'tcm-peh', name: 'Practical Ethical Hacking - The Complete Course', issuer: 'TCM Security', date: 'Dec 2025', category: Category.SECURITY, credentialId: 'cert_tx47sf14' },
  { id: 'ccep', name: 'Certified Cybersecurity Educator Professional (CCEP)', issuer: 'Red Team Leaders', date: 'Dec 2025', category: Category.SECURITY, credentialId: 'c768f714403e55be' },
  { id: 'gcp-sec-cloud', name: 'Introduction to Security Principles in Cloud Computing', issuer: 'Google Cloud Skills Boost', date: 'Dec 2025', category: Category.CLOUD, credentialId: 'GL3UVIP3KPVH' },
  { id: 'cisco-endpoints', name: 'Endpoints and Systems', issuer: 'Cisco', date: 'Jul 2025', category: Category.IT, credentialId: 'PEDO4TEEDT0D' },
  { id: 'ibm-js-essentials', name: 'JavaScript Programming Essentials', issuer: 'IBM', date: 'Jul 2025', category: Category.DEV, credentialId: 'WKLYFVZAA9AC' },
  { id: 'aws-compute', name: 'AWS Educate Getting Started with Compute', issuer: 'Amazon Web Services', date: 'Mar 2025', category: Category.CLOUD },
  { id: 'isc2-cc', name: 'Certified in Cybersecurity (CC)', issuer: 'ISC2', date: 'Feb 2025', category: Category.SECURITY, credentialId: 'Official' },
  { id: 'cisco-soc', name: 'Security Operations Center (SOC)', issuer: 'Cisco', date: 'Feb 2025', category: Category.SECURITY, credentialId: '8WRZEY9ESMGA' },
  { id: 'antisyphon-soc', name: 'SOC Core Skills w/ John Strand', issuer: 'Antisyphon Training', date: 'Feb 2025', category: Category.SECURITY },

  // 2024
  { id: 'antisyphon-active', name: 'Active Defense and Cyber Deception', issuer: 'Antisyphon Training', date: 'Dec 2024', category: Category.SECURITY },
  { id: 'thm-aoc-2024', name: 'Advent of Cyber 2024', issuer: 'TryHackMe', date: 'Dec 2024', category: Category.SECURITY, credentialId: 'THM-RRUIIU6W50' },
  { id: 'isc2-course', name: 'Official CC Course Completion', issuer: 'ISC2', date: 'Dec 2024', category: Category.SECURITY },
  { id: 'tcm-helpdesk', name: 'Practical Help Desk', issuer: 'TCM Security', date: 'Dec 2024', category: Category.IT, credentialId: 'cert_6sz02mjd' },
  { id: '365-jupyter', name: 'Introduction to Jupyter', issuer: '365 Data Science', date: 'Nov 2024', category: Category.DEV, credentialId: 'CC-4A304938EB' },
  { id: 'tcm-python', name: 'Programming 100: Fundamentals (Python)', issuer: 'TCM Security', date: 'Oct 2024', category: Category.DEV, credentialId: 'cert_950cgjbw' },
  { id: 'codedex-python', name: 'The Legend of Python', issuer: 'Codédex', date: 'Oct 2024', category: Category.DEV },
  { id: 'codedex-js', name: 'The Origins III: JavaScript', issuer: 'Codédex', date: 'Oct 2024', category: Category.DEV },
  { id: 'ibm-git', name: 'Git and GitHub Essentials', issuer: 'IBM', date: 'Sep 2024', category: Category.DEV },
  { id: 'tcm-linux', name: 'Linux 100: Fundamentals', issuer: 'TCM Security', date: 'Sep 2024', category: Category.SECURITY, credentialId: 'cert_lhh7m3f1' },
  { id: 'codedex-html', name: 'The Origins I: HTML', issuer: 'Codédex', date: 'Sep 2024', category: Category.DEV, credentialId: '114767083' },
  { id: 'codedex-css', name: 'The Origins II: CSS', issuer: 'Codédex', date: 'Sep 2024', category: Category.DEV },
  { id: 'infosec-foundations', name: 'Cybersecurity Foundations Specialization', issuer: 'Infosec', date: 'Aug 2024', category: Category.SECURITY, credentialId: 'NL949IR9QDEZ' },
  { id: 'ibm-intro-web', name: 'Introduction to HTML, CSS, & JavaScript', issuer: 'IBM', date: 'Aug 2024', category: Category.DEV, credentialId: 'PX0V6II9QWOA' },
  { id: 'ibm-se', name: 'Introduction to Software Engineering', issuer: 'IBM', date: 'Aug 2024', category: Category.DEV, credentialId: 'TW9GA3QSHA63' },
  { id: 'aws-cloud-foundations', name: 'AWS Academy Cloud Foundations', issuer: 'AWS', date: 'Jun 2024', category: Category.CLOUD },
  { id: 'antisyphon-intro', name: 'Getting Started in Security w/ BHIS', issuer: 'Antisyphon Training', date: 'Jun 2024', category: Category.SECURITY },
  { id: 'google-ads', name: 'Google Ads for Beginners', issuer: 'EDX Alumni', date: 'Jun 2024', category: Category.MARKETING, credentialId: '8GNYS6GQA3EK' },
  { id: 'google-cyber-pro', name: 'Google Cybersecurity Professional', issuer: 'Google', date: 'May 2024', category: Category.SECURITY, credentialId: 'AJZLWDP5D5EV' },

  // 2023
  { id: 'digital-ad', name: 'Digital Ad Certificate', issuer: 'Digital Ad Expert', date: 'Nov 2023', category: Category.MARKETING, credentialId: '705943430875' },
  { id: 'google-digital-mkt', name: 'Digital Marketing & E-commerce', issuer: 'Google', date: 'Nov 2023', category: Category.MARKETING, credentialId: '9KSAHGTYHWDV' },
  { id: 'comptia-a', name: 'CompTIA A+', issuer: 'LinkedIn Learning', date: 'Apr 2023', category: Category.IT },
  { id: 'cisco-intro-cyber', name: 'Introduction to Cybersecurity', issuer: 'Cisco', date: 'Apr 2023', category: Category.SECURITY },
  { id: 'isc2-candidate', name: 'ISC2 Candidate', issuer: 'ISC2', date: 'Feb 2024', category: Category.SECURITY },
];

export const TECH_STACK = [
  { name: 'Python', level: 90 },
  { name: 'Linux/Kali', level: 95 },
  { name: 'JavaScript/TS', level: 85 },
  { name: 'React', level: 80 },
  { name: 'SIEM/SOC', level: 90 },
  { name: 'AWS/Cloud', level: 75 },
  { name: 'Git/GitHub', level: 88 },
  { name: 'Digital Marketing', level: 65 },
];

export const PROJECTS: Project[] = [
  {
    id: 'ad-master-graph',
    title: 'AD Attack Graph: Visual Guide',
    description: 'An interactive, tactical visualization of the Active Directory penetration testing lifecycle. Features a drill-down node system covering Enumeration, Exploitation, and Post-Compromise with embedded tools and commands. Serves as a live "cheat sheet" for red team engagements.',
    techStack: ['React', 'Interactive UI', 'CyberSec Knowledge Base', 'Visual Guide'],
    status: 'In Development',
    repoUrl: 'https://github.com/Pratikchandrathakur',
    demoUrl: '/ad-flowchart', // Internal routing handled in App.tsx
    featured: true
  },
  {
    id: 'proj-1',
    title: 'Live Threat Intelligence Dashboard',
    description: 'A real-time React application that visualizes SSH brute force attacks globally. Parses raw server logs (/var/log/auth.log) via a Node.js watcher and streams attacker geolocation data to a 3D interactive map using WebSockets.',
    techStack: ['React', 'Node.js', 'WebSockets', 'GeoIP', 'Three.js'],
    status: 'In Development',
    repoUrl: 'https://github.com/Pratikchandrathakur',
    featured: true
  },
  {
    id: 'proj-2',
    title: 'AutoRecon-X: Automated Pentest Suite',
    description: 'A Python-based CLI tool designed to automate the initial 15 minutes of a penetration test. Orchestrates Nmap scans, DNS enumeration, and Subdomain takeover checks into a single report, saving 40% of manual recon time.',
    techStack: ['Python', 'Docker', 'Bash', 'Nmap', 'Security Automation'],
    status: 'In Development',
    repoUrl: 'https://github.com/Pratikchandrathakur',
    featured: true
  },
  {
    id: 'proj-3',
    title: 'SecureCode Lab: OWASP Top 10',
    description: 'An educational platform featuring interactive toggle switches between "Vulnerable" and "Secure" code implementations. Demonstrates SQL Injection, XSS, and CSRF mitigation strategies in real-time.',
    techStack: ['Next.js', 'PostgreSQL', 'Express', 'JWT'],
    status: 'Research Phase',
    repoUrl: 'https://github.com/Pratikchandrathakur',
    featured: true
  }
];