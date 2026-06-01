// All content sourced directly from the resume.
// Each resume section maps 1:1 to an infrastructure component in the UI.

export type Status = 'running' | 'warning' | 'stopped' | 'error'

export interface ContactInfo {
  name: string
  handle: string
  phone: string
  email: string
  linkedin: string
  github: string
  location: string
}

export interface Skill {
  name: string
  category: 'cloud' | 'devops' | 'development' | 'systems' | 'networking' | 'soft'
}

export interface Experience {
  id: string
  company: string
  role: string
  location: string
  duration: string
  start: string
  end: string
  status: Status
  achievements: string[]
  stack: string[]
}

export interface Project {
  id: string
  name: string
  type: 'container' | 'vm'
  status: Status
  description: string
  stack: string[]
  highlights: string[]
  // synthetic infra-metaphor metrics (visual only)
  vcpu: number
  vram: string
  storage: string
}

export interface EducationEntry {
  id: string
  institution: string
  degree: string
  duration: string
}

export interface Certification {
  id: string
  issuer: string
  title: string
}

// ───── CONTACT ─────────────────────────────────────────────
export const contact: ContactInfo = {
  name: 'Ayush Maheshwari',
  handle: 'ayush@datacenter',
  phone: '+91 8432506003',
  email: 'ayyush.maheshwari@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ayush-maheshwari/',
  github: 'https://github.com/ayushmaheshwari',
  location: 'India',
}

// ───── PROFESSIONAL SUMMARY ────────────────────────────────
export const summary = `Cloud & Infrastructure Engineer and Full-Stack Developer with hands-on experience in building scalable progressive web applications and setting up secure, reliable Azure cloud infrastructure. Actively working with CI/CD tools and automating deployments and workflows. Aspiring to grow into a DevSecOps Engineer role to bring development and operations closer together.`

// ───── SKILLS (Services / Stack) ───────────────────────────
export const skills: Skill[] = [
  // Cloud
  { name: 'AWS', category: 'cloud' },
  { name: 'Azure', category: 'cloud' },
  { name: 'VMware (ESXi)', category: 'cloud' },
  // DevOps
  { name: 'Jenkins', category: 'devops' },
  { name: 'Ansible', category: 'devops' },
  { name: 'Terraform', category: 'devops' },
  { name: 'Docker', category: 'devops' },
  { name: 'Kubernetes', category: 'devops' },
  { name: 'Grafana', category: 'devops' },
  // Development
  { name: 'MERN Stack', category: 'development' },
  { name: 'Next.js', category: 'development' },
  { name: 'Python', category: 'development' },
  { name: 'PowerShell', category: 'development' },
  // Systems
  { name: 'Windows Server', category: 'systems' },
  { name: 'Linux', category: 'systems' },
  { name: 'Database Management', category: 'systems' },
  { name: 'ServiceNow', category: 'systems' },
  // Networking
  { name: 'Network Administration', category: 'networking' },
  { name: 'Cisco Meraki', category: 'networking' },
]

export const softSkills: string[] = [
  'Cross-Functional Collaboration',
  'Strategic Communication',
  'Learning Agility',
  'Troubleshooting',
]

// ───── EXPERIENCE (Deployments / Clusters) ─────────────────
export const experience: Experience[] = [
  {
    id: 'deploy-ltim-prod',
    company: 'LTIMindtree',
    role: 'Engineer - Cloud and Infrastructure',
    location: 'Mumbai, MH',
    duration: 'May 2025 – Feb 2026',
    start: 'May 2025',
    end: 'Feb 2026',
    status: 'stopped',
    stack: ['Jenkins', 'Ansible', 'Terraform', 'Azure', 'Linux', 'Windows Server'],
    achievements: [
      'Worked with CI/CD pipelines using Jenkins, Ansible, and Terraform to deploy Windows and Linux workloads across hybrid-cloud environments and standardized infrastructure through IaC modules for networking and storage, reducing manual deployment time by 70%.',
      'Administered Azure IAM, including Azure Active Directory (Entra ID) and RBAC, to manage user identities and service principals, which decreased unauthorized access incidents by 90%. Designed and maintained Azure Virtual Networks, subnets, NSGs, cutting network-related incidents by 45%. Implemented Azure Monitor and Log Analytics to create real-time dashboards and alerting for VM and storage performance; identified system bottlenecks before escalation, reducing MTTR by 50%.',
      'Optimized cross-platform server environments (Linux/Windows) by managing system configurations, access controls, and log analysis to ensure high availability for development and testing workloads.',
    ],
  },
  {
    id: 'deploy-vickybytes-dev',
    company: 'VickyBytes',
    role: 'Full Stack Engineer Intern',
    location: 'Bengaluru, KA',
    duration: 'June 2024 – April 2025',
    start: 'Jun 2024',
    end: 'Apr 2025',
    status: 'stopped',
    stack: ['Next.js', 'Supabase', 'PostgreSQL', 'Docker'],
    achievements: [
      "Led the end-to-end development of Vickybytes' Progressive Web App (PWA) using Next.js, Supabase, and PostgreSQL, enhancing accessibility and reducing bounce rate by 20% through faster load times and offline functionality.",
      'Engineered scalable content delivery features with advanced caching, boosting user engagement by 35% and driving consistent growth in returning visitors.',
      'Containerized the Next.js app using Docker, ensuring consistent development and production environments and simplifying deployment across platforms.',
    ],
  },
]

// ───── PROJECTS (Containers / VMs) ─────────────────────────
export const projects: Project[] = [
  {
    id: 'ctr-vapt-001',
    name: 'DevOps VAPT Automation',
    type: 'container',
    status: 'running',
    description:
      'Automated DevSecOps security testing pipeline performing vulnerability assessment and penetration testing (VAPT) across development and deployment stages.',
    stack: ['Shell', 'CI/CD', 'Security Scanners', 'Docker'],
    highlights: [
      'Integrated shell scripts and security scanning tools into CI/CD automation.',
      'Reduced manual effort and improved compliance auditability.',
      'Enabled secure, auditable software delivery across pipeline stages.',
    ],
    vcpu: 4,
    vram: '4 GB',
    storage: '20 GB',
  },
  {
    id: 'ctr-mobcloud-002',
    name: 'Smartphone Cloud Server',
    type: 'container',
    status: 'running',
    description:
      'Smartphone-based cloud hosting system using Termux, OpenSSH, PM2, and Cloudflare Tunnel to deploy and run Node.js applications with public access.',
    stack: ['Termux', 'OpenSSH', 'PM2', 'Cloudflare Tunnel', 'Node.js', 'Git'],
    highlights: [
      'Built end-to-end deployment via SSH with network scanning.',
      'Automated auto-updates using Git for continuous availability.',
      'Exposed Node.js applications publicly via Cloudflare Tunnel.',
    ],
    vcpu: 2,
    vram: '2 GB',
    storage: '16 GB',
  },
]

// ───── EDUCATION (Node Specs) ──────────────────────────────
export const education: EducationEntry[] = [
  {
    id: 'edu-christ',
    institution: 'CHRIST (Deemed To Be University), Bangalore',
    degree: 'Bachelor of Computer Applications',
    duration: 'Aug 2022 – June 2025',
  },
  {
    id: 'edu-mps',
    institution: 'Maheshwari Public School, Ajmer',
    degree: 'Commerce and Informatics Practices',
    duration: 'May 2020 – July 2022',
  },
]

// ───── CERTIFICATIONS (Compliance) ─────────────────────────
export const certifications: Certification[] = [
  { id: 'cert-nptel', issuer: 'NPTEL', title: 'Product and Brand Management Elite Certification' },
  { id: 'cert-aws', issuer: 'AWS', title: 'Cloud Foundations' },
  { id: 'cert-sl', issuer: 'SimpliLearn', title: 'Machine Learning Using Python' },
]
