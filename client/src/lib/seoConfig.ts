// SEO Configuration for all pages
export interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
}

export const seoConfig: Record<string, PageMeta> = {
  home: {
    title: "DINESH KUMAR SAHOO - Cloud & DevOps Engineer | Cybersecurity Expert | Full Stack Developer",
    description: "Welcome to Dinesh Kumar Sahoo's portfolio. Cloud & DevOps Engineer specializing in AWS/Azure infrastructure, CI/CD automation, Kubernetes, Docker, and DevSecOps. Experienced in cybersecurity, ethical hacking, penetration testing, and full-stack web development with React, Node.js, and Python.",
    keywords: "Dinesh Kumar Sahoo, Cloud Engineer, DevOps Engineer, AWS, Azure, Cybersecurity Expert, Ethical Hacker, Full Stack Developer, Portfolio",
    ogType: "website"
  },
  about: {
    title: "About Me - DINESH KUMAR SAHOO | Tech Professional",
    description: "Learn about Dinesh Kumar Sahoo's journey as a Cloud & DevOps Engineer, Cybersecurity Enthusiast, and Full Stack Developer. Passionate about cloud infrastructure, automation, security, and building scalable web applications with modern technologies.",
    keywords: "about Dinesh Kumar Sahoo, professional background, tech career, cloud DevOps journey, cybersecurity passion",
    ogType: "profile"
  },
  education: {
    title: "Education & Qualifications - DINESH KUMAR SAHOO",
    description: "Academic background and educational qualifications of Dinesh Kumar Sahoo. Bachelor's degree in Computer Science with specialization in Cloud Computing, DevOps, Cybersecurity, and Software Development. Continuous learning through certifications and hands-on projects.",
    keywords: "education, qualifications, computer science degree, cloud computing, DevOps training, cybersecurity courses",
    ogType: "profile"
  },
  skills: {
    title: "Technical Skills & Expertise - DINESH KUMAR SAHOO",
    description: "Comprehensive skill set including Cloud Platforms (AWS, Azure, GCP), DevOps Tools (Docker, Kubernetes, Jenkins, Terraform, Ansible), Programming Languages (Python, JavaScript, TypeScript, Java), Cybersecurity Tools (Kali Linux, Metasploit, Burp Suite, Nmap), and Web Technologies (React, Node.js, Express, MongoDB).",
    keywords: "technical skills, AWS, Azure, Docker, Kubernetes, Python, React, Node.js, cybersecurity tools, DevOps expertise",
    ogType: "profile"
  },
  experience: {
    title: "Professional Experience & Work History - DINESH KUMAR SAHOO",
    description: "Professional journey of Dinesh Kumar Sahoo as a Cloud & DevOps Engineer (2023-Present), Cybersecurity Enthusiast (2022-Present), and Full Stack Developer (2021-Present). Experience in cloud infrastructure management, CI/CD pipeline automation, security auditing, penetration testing, and web application development.",
    keywords: "work experience, professional history, cloud DevOps projects, cybersecurity work, full stack development, career timeline",
    ogType: "profile"
  },
  projects: {
    title: "Projects & Portfolio Work - DINESH KUMAR SAHOO",
    description: "Showcase of projects including cloud infrastructure deployments, DevOps automation pipelines, cybersecurity tools, penetration testing reports, web applications, and open-source contributions. Real-world implementations using AWS, Azure, Docker, Kubernetes, React, and security frameworks.",
    keywords: "projects, portfolio work, cloud projects, DevOps automation, security projects, web applications, GitHub projects",
    ogType: "website"
  },
  achievements: {
    title: "Certifications & Achievements - DINESH KUMAR SAHOO",
    description: "Professional certifications and achievements including AWS Cloud Practitioner, Microsoft Business Intelligence, C Programming, CSS, HTML, JavaScript, Python, SQL certifications from HackerRank, Sololearn, SimpliLearn, and industry-recognized platforms. Recognition for excellence in cloud computing, cybersecurity, and web development.",
    keywords: "certifications, achievements, AWS certified, Microsoft certified, programming certifications, cybersecurity badges, professional recognition",
    ogType: "profile"
  },
  contact: {
    title: "Contact Me - DINESH KUMAR SAHOO | Get in Touch",
    description: "Get in touch with Dinesh Kumar Sahoo for cloud & DevOps consulting, cybersecurity services, penetration testing, full-stack web development, or collaboration opportunities. Available for freelance projects, contract work, and full-time positions in Cloud Engineering, DevOps, Cybersecurity, and Software Development.",
    keywords: "contact, get in touch, hire cloud engineer, DevOps consultant, cybersecurity expert, freelance developer, job opportunities",
    ogType: "website"
  }
};

// Helper function to get page meta
export const getPageMeta = (page: string): PageMeta => {
  return seoConfig[page] || seoConfig.home;
};
