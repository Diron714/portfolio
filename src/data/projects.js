export const projects = [
  {
    id: '1',
    title: 'UniMate – AI-Powered University Assistant',
    client: 'AI / Education',
    description:
      'AI-powered university guidance system that provides accurate and personalized academic assistance. Answers university-related questions, predicts admission eligibility using Z-score analysis, recommends suitable courses, and analyzes uploaded PDFs to generate structured questions (Easy, Medium, Hard). Built with a Retrieval-Augmented Generation (RAG) architecture for context-aware responses.',
    technologies: ['FastAPI', 'LangChain', 'Gemini API', 'MongoDB', 'RAG', 'Docker'],
    image: '/a.png',
    githubUrl: 'https://github.com/Diron714/UniMate-AI-Agent-ChatBot',
    order: 1,
  },
  {
    id: '2',
    title: 'Distributed Voting System',
    client: 'Elections / Security',
    description:
      'Secure, role-based digital voting platform for transparent and scalable election management. Enables voter authentication, admin-controlled election creation, secure vote casting, and role-based access control (RBAC). Backend services are containerized for consistent and scalable deployment.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'JWT', 'Docker', 'Git & GitHub'],
    image: '/v.png',
    githubUrl: 'https://github.com/Diron714/distributed-votingSystem',
    order: 2,
  },
  {
    id: '3',
    title: 'Personal Portfolio Website',
    client: 'Portfolio',
    description:
      'Modern, responsive personal portfolio showcasing projects, technical skills, and professional profile. Includes project showcase, skills overview, contact form, and resume download with a clean and user-friendly UI/UX design.',
    technologies: ['React.js', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Vercel', 'Git & GitHub'],
    image: '/p.png',
    githubUrl: 'https://github.com/Diron714/portfolio',
    order: 3,
  },
  {
    id: '4',
    title: 'Tour Management System',
    client: 'Desktop Application',
    description:
      'Java-based desktop application for managing tour operations, customer records, and booking workflows through an integrated database-driven system. Provides a user-friendly graphical interface built with core OOP principles and relational database design.',
    technologies: ['Java', 'Java Swing', 'MySQL', 'SQL', 'NetBeans', 'Git & GitHub'],
    image: '/s.png',
    githubUrl: '#',
    order: 4,
  },
  {
    id: '5',
    title: 'Pet Sale & Veterinary Management System',
    client: 'Current Project · In Progress',
    description:
      'Full-stack web application that digitalizes and automates pet sales, product management, veterinary appointments, and customer interactions in a single integrated platform. Replaces traditional manual processes with a centralized solution for customers, staff, and doctors—including loyalty points, notifications, chat, appointment scheduling, order and payment management, stock management, and audit logs.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'JWT', 'RBAC', 'REST API'],
    image: '/pe.png',
    githubUrl: 'https://github.com/Diron714/My-Pet-Care-',
    order: 5,
  },
]
