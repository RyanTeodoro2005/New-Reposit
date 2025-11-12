const skillIcons = {
  html: '🧱',
  js: '🟨',
  sql: '🗄️',
  ts: '🟦',
  react: '⚛️',
  angular: '🅰️',
  bootstrap: '🅱️',
  java: '☕',
  git: '🐙',
  figma: '🎨',
  postgres: '🐘',
  mysql: '🐬',
  node: '🟢',
  aws: '☁️',
  workspace: '🧰',
  notion: '🅽',
  workvivo: '🌐',
  responsive: '📱',
  docs: '🗂️',
  support: '🤝',
  communication: '💬',
  agile: '🧭',
  ai: '🤖',
};

const baseContact = [
  { key: 'email', value: 'ryanbryansilvateodoro@gmail.com', href: 'mailto:ryanbryansilvateodoro@gmail.com' },
  { key: 'phone', value: '(11) 98465-4399', href: 'tel:+5511984654399' },
  { key: 'profiles', value: 'github.com/RyanTeodoro2005', href: 'https://github.com/RyanTeodoro2005' },
];

const projectsBase = [
  {
    key: 'ams',
    name: {
      pt: '04_projeto_AMS_I',
      en: '04_projeto_AMS_I',
      es: '04_proyecto_AMS_I',
    },
    url: 'https://github.com/RyanTeodoro2005/04_projeto_AMS_I',
    tag: { pt: 'TypeScript', en: 'TypeScript', es: 'TypeScript' },
    description: {
      pt: 'Projeto integrador com foco em práticas modernas de front-end e integração de APIs, reforçando versionamento com Git e colaboração em equipe.',
      en: 'Integrator project focused on modern front-end practices and API integrations, reinforcing Git versioning and teamwork.',
      es: 'Proyecto integrador centrado en prácticas modernas de front-end e integraciones de API, reforzando versionado con Git y trabajo en equipo.',
    },
  },
  {
    key: 'tcc',
    name: {
      pt: 'Sistema de Reservas (TCC)',
      en: 'Court Booking System (Capstone)',
      es: 'Sistema de Reservas (TCC)',
    },
    url: 'https://github.com/RyanTeodoro2005/TCC',
    tag: { pt: 'Full Stack', en: 'Full Stack', es: 'Full Stack' },
    description: {
      pt: 'Plataforma para gerenciar reservas de quadras esportivas, com foco em fluxo intuitivo para usuários e administração de horários.',
      en: 'Platform to manage sports court reservations with intuitive flows for users and schedule administration.',
      es: 'Plataforma para gestionar reservas de canchas deportivas con flujos intuitivos para usuarios y administración de horarios.',
    },
  },
  {
    key: 'laquea',
    name: {
      pt: 'Site Laquéa-es',
      en: 'Laquéa-es Website',
      es: 'Sitio Laquéa-es',
    },
    url: 'https://github.com/RyanTeodoro2005/Site-Laquea-es',
    tag: { pt: 'Web', en: 'Web', es: 'Web' },
    description: {
      pt: 'Página institucional desenvolvida para cliente, destacando serviços, depoimentos e canais de contato com layout responsivo.',
      en: 'Institutional page built for a client, highlighting services, testimonials and contact channels in a responsive layout.',
      es: 'Página institucional desarrollada para un cliente, destacando servicios, testimonios y canales de contacto con diseño responsivo.',
    },
  },
  {
    key: 'portfolio',
    name: {
      pt: 'Meu Portfólio',
      en: 'My Portfolio',
      es: 'Mi Portafolio',
    },
    url: 'https://github.com/RyanTeodoro2005/Meu-Portifolio',
    tag: { pt: 'Front-end', en: 'Front-end', es: 'Front-end' },
    description: {
      pt: 'Landing page pessoal destacando skills, experiências e contato, evoluída com boas práticas de semântica, acessibilidade e design consistente.',
      en: 'Personal landing page showcasing skills, experience and contact, refined with semantic, accessibility and design best practices.',
      es: 'Landing page personal que destaca habilidades, experiencia y contacto, optimizada con buenas prácticas de semántica, accesibilidad y diseño.',
    },
  },
];

const skillsBase = {
  linguagens: [
    { key: 'html', icon: skillIcons.html },
    { key: 'js', icon: skillIcons.js },
    { key: 'sql', icon: skillIcons.sql },
    { key: 'ts', icon: skillIcons.ts },
    { key: 'react', icon: skillIcons.react },
    { key: 'angular', icon: skillIcons.angular },
    { key: 'bootstrap', icon: skillIcons.bootstrap },
    { key: 'java', icon: skillIcons.java },
  ],
  ferramentas: [
    { key: 'git', icon: skillIcons.git },
    { key: 'figma', icon: skillIcons.figma },
    { key: 'postgres', icon: skillIcons.postgres },
    { key: 'mysql', icon: skillIcons.mysql },
    { key: 'node', icon: skillIcons.node },
    { key: 'react', icon: skillIcons.react },
    { key: 'angular', icon: skillIcons.angular },
    { key: 'aws', icon: skillIcons.aws },
    { key: 'workspace', icon: skillIcons.workspace },
    { key: 'notion', icon: skillIcons.notion },
    { key: 'workvivo', icon: skillIcons.workvivo },
  ],
  competencias: [
    { key: 'responsive', icon: skillIcons.responsive },
    { key: 'docs', icon: skillIcons.docs },
    { key: 'support', icon: skillIcons.support },
    { key: 'communication', icon: skillIcons.communication },
    { key: 'agile', icon: skillIcons.agile },
    { key: 'ai', icon: skillIcons.ai },
  ],
};

const skillLabels = {
  pt: {
    linguagens: 'Linguagens & Frameworks',
    ferramentas: 'Ferramentas',
    competencias: 'Competências',
    html: 'HTML5 & CSS3',
    js: 'JavaScript',
    sql: 'SQL',
    ts: 'TypeScript',
    react: 'React',
    angular: 'Angular',
    bootstrap: 'Bootstrap',
    java: 'Java',
    git: 'Git & GitHub',
    figma: 'Figma',
    postgres: 'PostgreSQL',
    mysql: 'MySQL',
    node: 'Node.js',
    aws: 'AWS',
    workspace: 'Google Workspace',
    notion: 'Notion',
    workvivo: 'Workvivo',
    responsive: 'Responsive Design',
    docs: 'Organização documental',
    support: 'Atendimento ao cliente',
    communication: 'Comunicação empática',
    agile: 'Metodologias ágeis',
    ai: 'AI First',
  },
  en: {
    linguagens: 'Languages & Frameworks',
    ferramentas: 'Tools',
    competencias: 'Soft skills',
    html: 'HTML5 & CSS3',
    js: 'JavaScript',
    sql: 'SQL',
    ts: 'TypeScript',
    react: 'React',
    angular: 'Angular',
    bootstrap: 'Bootstrap',
    java: 'Java',
    git: 'Git & GitHub',
    figma: 'Figma',
    postgres: 'PostgreSQL',
    mysql: 'MySQL',
    node: 'Node.js',
    aws: 'AWS',
    workspace: 'Google Workspace',
    notion: 'Notion',
    workvivo: 'Workvivo',
    responsive: 'Responsive design',
    docs: 'Documentation organization',
    support: 'Customer service',
    communication: 'Empathetic communication',
    agile: 'Agile methods',
    ai: 'AI First mindset',
  },
  es: {
    linguagens: 'Lenguajes y Frameworks',
    ferramentas: 'Herramientas',
    competencias: 'Competencias',
    html: 'HTML5 & CSS3',
    js: 'JavaScript',
    sql: 'SQL',
    ts: 'TypeScript',
    react: 'React',
    angular: 'Angular',
    bootstrap: 'Bootstrap',
    java: 'Java',
    git: 'Git & GitHub',
    figma: 'Figma',
    postgres: 'PostgreSQL',
    mysql: 'MySQL',
    node: 'Node.js',
    aws: 'AWS',
    workspace: 'Google Workspace',
    notion: 'Notion',
    workvivo: 'Workvivo',
    responsive: 'Diseño responsivo',
    docs: 'Organización documental',
    support: 'Atención al cliente',
    communication: 'Comunicación empática',
    agile: 'Metodologías ágiles',
    ai: 'AI First',
  },
};

const makeSkills = (lang) => {
  const labels = skillLabels[lang];
  return Object.entries(skillsBase).map(([groupKey, items]) => ({
    key: groupKey,
    title: labels[groupKey],
    items: items.map(({ key, icon }) => ({ label: labels[key], icon })),
  }));
};

const makeProjects = (lang) =>
  projectsBase.map(({ key, name, url, tag, description }) => ({
    key,
    name: name[lang],
    tag: tag[lang],
    description: description[lang],
    url,
  }));

const common = {
  alest: 'Alest',
  profileUrl: 'https://github.com/RyanTeodoro2005',
};

export const languages = [
  { code: 'pt', label: 'Português' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

export const translations = {
  pt: {
    languageLabel: 'Idioma',
    navLinks: [
      { label: 'Sobre', href: '#sobre' },
      { label: 'Experiência', href: '#experiencia' },
      { label: 'Formação', href: '#formacao' },
      { label: 'Projetos', href: '#projetos' },
      { label: 'Contato', href: '#contato' },
    ],
    hero: {
      typing: 'Olá, eu sou o\nRyan Teodoro !',
      role: 'Desenvolvedor Júnior',
      description:
        'Estudante de Análise e Desenvolvimento de Sistemas na FATEC Ipiranga e apaixonado por criar experiências digitais eficientes. Combino vivência corporativa na Ernst & Young com projetos acadêmicos e freelance para entregar soluções funcionais e centradas no usuário.',
      ctaPrimary: 'Ver projetos',
      ctaSecondary: 'Vamos conversar',
      ctaSecondaryHref: 'mailto:ryanbryansilvateodoro@gmail.com',
      location: ['São Paulo • Brasil', '20 anos'],
      profile: { label: 'github.com/RyanTeodoro2005', href: common.profileUrl },
      profileAlt: 'Foto de perfil de Ryan Teodoro',
      cards: [
        {
          title: 'Objetivo',
          description: 'Atuar como estagiário em TI contribuindo para equipes ágeis e projetos reais.',
        },
        {
          title: 'Stack em foco',
          description: 'HTML & CSS · TypeScript · Java · Git · Design Responsivo',
        },
        {
          title: 'Soft skills',
          description: 'Comunicação, empatia, organização e foco em resultados.',
        },
      ],
    },
    about: {
      eyebrow: 'Sobre mim',
      title: 'Resumo de qualificações',
      paragraphs: [
        'Minha trajetória começou com experiência administrativa na Ernst & Young, onde aprimorei habilidades de organização, atendimento e suporte a clientes e gestores. Essa vivência em um ambiente corporativo global me ensinou a navegar por processos complexos, documentar com precisão e atuar com senso de urgência.',
        `Atualmente, atuo como estagiário de Desenvolvimento na ${common.alest}, apoiando squads ágeis na construção de aplicações web modernas. Sou responsável por evoluir componentes React, integrar APIs, cuidar da observabilidade e garantir que as soluções sigam padrões de acessibilidade e performance. Busco sempre aplicar uma mentalidade AI First, avaliando onde automações e assistentes podem acelerar entregas e gerar valor máximo ao usuário.`,
        'Canalizo essa combinação de experiência corporativa e prática em desenvolvimento para entregar produtos que equilibram estratégia, eficiência operacional e uma experiência centrada nas pessoas. Gosto de me envolver desde a ideação até o deploy, colaborando com designers, product owners e demais desenvolvedores para criar soluções robustas e escaláveis.',
      ],
      highlights: [
        {
          heading: '+1 ano',
          description: 'Atuação em ambiente corporativo de grande porte na Ernst & Young.',
        },
        {
          heading: 'Projetos',
          description: 'Integração AMS, sistema de reservas de quadras e sites institucionais.',
        },
        {
          heading: 'Idiomas',
          description: 'Português nativo · Inglês intermediário (Work Time).',
        },
      ],
    },
    experience: {
      eyebrow: 'Experiência',
      title: 'Vivência profissional',
      role: 'Jovem Aprendiz – Área de Arquivos',
      company: 'Ernst & Young · São Paulo/SP',
      period: 'mai/2024 — ago/2025',
      responsibilities: [
        'Organização e controle de contratos no sistema interno e em arquivos físicos.',
        'Padronização de documentos com critérios de qualidade e conformidade.',
        'Suporte a clientes e gestores em demandas específicas de documentação.',
        'Atuação colaborativa com áreas internas para agilizar processos e reduzir erros.',
      ],
    },
    education: {
      eyebrow: 'Formação',
      title: 'Percurso acadêmico & cursos',
      cards: [
        {
          title: 'FATEC Ipiranga',
          subtitle: 'ADS · Conclusão prevista: 2025',
          description:
            'AMS integrado ao Ensino Superior, com foco em desenvolvimento de sistemas, metodologias ágeis e práticas de mercado.',
        },
        {
          title: 'ETEC Heliópolis',
          subtitle: 'Técnico em Desenvolvimento de Sistemas · 2023',
          description:
            'Formação articulada ao Ensino Médio, com base sólida em lógica, banco de dados e desenvolvimento web.',
        },
        {
          title: 'Formação complementar',
          bullets: [
            'Inglês Work Time · 2023—2025 (cursando) · Nível intermediário',
            'Informática · TEC Brasil · 2020—2021',
            'Postura profissional, entrevistas e etiqueta corporativa',
          ],
        },
      ],
    },
    skills: {
      eyebrow: 'Competências',
      title: 'Stack e diferenciais',
      groups: makeSkills('pt'),
    },
    projects: {
      eyebrow: 'Projetos',
      title: 'Aplicando conhecimento na prática',
      linkLabel: 'Ver no GitHub',
      list: makeProjects('pt'),
    },
    contact: {
      eyebrow: 'Contato',
      title: 'Pronto para criar algo incrível com você',
      description:
        'Busco oportunidades para estagiar em TI, contribuir com equipes diversas e aprender com desafios reais. Vamos conversar?',
      cta: 'Enviar e-mail',
      ctaHref: 'mailto:ryanbryansilvateodoro@gmail.com',
      items: baseContact.map((item) => ({
        label:
          item.key === 'email'
            ? 'Email'
            : item.key === 'phone'
            ? 'Telefone'
            : 'LinkedIn/GitHub',
        value: item.value,
        href: item.href,
      })),
    },
    footer: {
      text: '© {{year}} Ryan Teodoro. Construído com foco em código limpo e design responsivo.',
    },
  },
  en: {
    languageLabel: 'Language',
    navLinks: [
      { label: 'About', href: '#sobre' },
      { label: 'Experience', href: '#experiencia' },
      { label: 'Education', href: '#formacao' },
      { label: 'Projects', href: '#projetos' },
      { label: 'Contact', href: '#contato' },
    ],
    hero: {
      typing: 'Hi, I am\nRyan Teodoro !',
      role: 'Junior Developer',
      description:
        'Computer Systems student at FATEC Ipiranga, passionate about crafting efficient digital experiences. I combine corporate experience at Ernst & Young with academic and freelance projects to deliver functional, user-centered solutions.',
      ctaPrimary: 'View projects',
      ctaSecondary: "Let's talk",
      ctaSecondaryHref: 'mailto:ryanbryansilvateodoro@gmail.com',
      location: ['São Paulo • Brazil', '20 years old'],
      profile: { label: 'github.com/RyanTeodoro2005', href: common.profileUrl },
      profileAlt: 'Ryan Teodoro profile picture',
      cards: [
        {
          title: 'Career goal',
          description: 'Work as a tech intern contributing to agile teams and real projects.',
        },
        {
          title: 'Focus stack',
          description: 'HTML & CSS · TypeScript · Java · Git · Responsive Design',
        },
        {
          title: 'Soft skills',
          description: 'Communication, empathy, organization and outcome mindset.',
        },
      ],
    },
    about: {
      eyebrow: 'About me',
      title: 'Summary of qualifications',
      paragraphs: [
        'My journey began with administrative experience at Ernst & Young, where I refined organization, customer support and stakeholder service skills. That global corporate environment taught me to navigate complex processes, document accurately and act with urgency.',
        `I currently work as a Development intern at ${common.alest}, supporting agile squads as we build modern web applications. I evolve React components, integrate APIs, oversee observability and ensure accessibility and performance. I apply an AI First mindset to spot automations that accelerate delivery and amplify user value.`,
        'I combine corporate background and development practice to deliver products that balance strategy, operational efficiency and human-centered experiences. I love partnering from ideation to deploy with designers, product owners and fellow developers to craft robust, scalable solutions.',
      ],
      highlights: [
        {
          heading: '+1 year',
          description: 'Corporate experience within a large-scale environment at Ernst & Young.',
        },
        {
          heading: 'Projects',
          description: 'AMS integration, sports court booking system and institutional websites.',
        },
        {
          heading: 'Languages',
          description: 'Native Portuguese · Intermediate English (Work Time).',
        },
      ],
    },
    experience: {
      eyebrow: 'Experience',
      title: 'Professional background',
      role: 'Apprentice – Records Department',
      company: 'Ernst & Young · São Paulo, Brazil',
      period: 'May/2024 — Aug/2025',
      responsibilities: [
        'Organized and controlled contracts across internal systems and physical archives.',
        'Standardized documents using quality and compliance criteria.',
        'Supported clients and managers with documentation requirements.',
        'Collaborated with internal teams to streamline processes and reduce errors.',
      ],
    },
    education: {
      eyebrow: 'Education',
      title: 'Academic journey & courses',
      cards: [
        {
          title: 'FATEC Ipiranga',
          subtitle: 'Systems Analysis and Development · Graduation forecast: 2025',
          description:
            'Higher education program focused on systems development, agile methodologies and market practices.',
        },
        {
          title: 'ETEC Heliópolis',
          subtitle: 'Technical degree in Systems Development · 2023',
          description:
            'Program aligned with high school curriculum, building strong foundations in logic, databases and web development.',
        },
        {
          title: 'Complementary courses',
          bullets: [
            'Work Time English · 2023—2025 (ongoing) · Intermediate level',
            'Computer Skills · TEC Brasil · 2020—2021',
            'Professional posture, interview preparation and corporate etiquette',
          ],
        },
      ],
    },
    skills: {
      eyebrow: 'Skills',
      title: 'Tech stack & differentiators',
      groups: makeSkills('en'),
    },
    projects: {
      eyebrow: 'Projects',
      title: 'Applying knowledge in practice',
      linkLabel: 'View on GitHub',
      list: makeProjects('en'),
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Ready to build something amazing with you',
      description:
        'I am looking for IT internship opportunities, eager to collaborate with diverse teams and learn from real-world challenges. Let’s talk!',
      cta: 'Send email',
      ctaHref: 'mailto:ryanbryansilvateodoro@gmail.com',
      items: baseContact.map((item) => ({
        label:
          item.key === 'email'
            ? 'Email'
            : item.key === 'phone'
            ? 'Phone'
            : 'LinkedIn/GitHub',
        value: item.key === 'phone' ? '(+55) 11 98465-4399' : item.value,
        href: item.href,
      })),
    },
    footer: {
      text: '© {{year}} Ryan Teodoro. Built with clean code and responsive design.',
    },
  },
  es: {
    languageLabel: 'Idioma',
    navLinks: [
      { label: 'Sobre mí', href: '#sobre' },
      { label: 'Experiencia', href: '#experiencia' },
      { label: 'Formación', href: '#formacao' },
      { label: 'Proyectos', href: '#projetos' },
      { label: 'Contacto', href: '#contato' },
    ],
    hero: {
      typing: 'Hola, soy\nRyan Teodoro !',
      role: 'Desarrollador Junior',
      description:
        'Estudiante de Análisis y Desarrollo de Sistemas en FATEC Ipiranga, apasionado por crear experiencias digitales eficientes. Combino experiencia corporativa en Ernst & Young con proyectos académicos y freelance para entregar soluciones funcionales centradas en las personas.',
      ctaPrimary: 'Ver proyectos',
      ctaSecondary: 'Hablemos',
      ctaSecondaryHref: 'mailto:ryanbryansilvateodoro@gmail.com',
      location: ['São Paulo • Brasil', '20 años'],
      profile: { label: 'github.com/RyanTeodoro2005', href: common.profileUrl },
      profileAlt: 'Foto de perfil de Ryan Teodoro',
      cards: [
        {
          title: 'Objetivo profesional',
          description: 'Actuar como practicante de TI contribuyendo con equipos ágiles y proyectos reales.',
        },
        {
          title: 'Stack principal',
          description: 'HTML & CSS · TypeScript · Java · Git · Diseño responsivo',
        },
        {
          title: 'Habilidades blandas',
          description: 'Comunicación, empatía, organización y enfoque en resultados.',
        },
      ],
    },
    about: {
      eyebrow: 'Sobre mí',
      title: 'Resumen de calificaciones',
      paragraphs: [
        'Mi trayectoria comenzó con experiencia administrativa en Ernst & Young, donde perfeccioné habilidades de organización, atención al cliente y soporte a gestores. Ese entorno corporativo global me enseñó a manejar procesos complejos, documentar con precisión y actuar con sentido de urgencia.',
        `Actualmente trabajo como practicante de Desarrollo en ${common.alest}, apoyando escuadras ágiles en la construcción de aplicaciones web modernas. Evoluciono componentes React, integro APIs, cuido la observabilidad y garantizo estándares de accesibilidad y desempeño. Siempre aplico una mentalidad AI First para detectar automatizaciones que aceleren la entrega y generen más valor.`,
        'Canalizo esta combinación de experiencia corporativa y práctica en desarrollo para entregar productos que equilibran estrategia, eficiencia operativa y experiencias centradas en las personas. Disfruto participar desde la ideación hasta el despliegue junto a diseñadores, product owners y otros desarrolladores para crear soluciones robustas y escalables.',
      ],
      highlights: [
        {
          heading: '+1 año',
          description: 'Experiencia corporativa en un entorno de gran porte en Ernst & Young.',
        },
        {
          heading: 'Proyectos',
          description: 'Integración AMS, sistema de reservas de canchas y sitios institucionales.',
        },
        {
          heading: 'Idiomas',
          description: 'Portugués nativo · Inglés intermedio (Work Time).',
        },
      ],
    },
    experience: {
      eyebrow: 'Experiencia',
      title: 'Trayectoria profesional',
      role: 'Aprendiz – Área de archivos',
      company: 'Ernst & Young · São Paulo, Brasil',
      period: 'may/2024 — ago/2025',
      responsibilities: [
        'Organización y control de contratos en el sistema interno y en archivos físicos.',
        'Estandarización de documentos con criterios de calidad y conformidad.',
        'Soporte a clientes y gestores en demandas específicas de documentación.',
        'Colaboración con áreas internas para agilizar procesos y reducir errores.',
      ],
    },
    education: {
      eyebrow: 'Formación',
      title: 'Recorrido académico y cursos',
      cards: [
        {
          title: 'FATEC Ipiranga',
          subtitle: 'Análisis y Desarrollo de Sistemas · Graduación prevista: 2025',
          description:
            'Carrera superior enfocada en desarrollo de sistemas, metodologías ágiles y prácticas del mercado.',
        },
        {
          title: 'ETEC Heliópolis',
          subtitle: 'Técnico en Desarrollo de Sistemas · 2023',
          description:
            'Formación articulada con la enseñanza media, con base sólida en lógica, bases de datos y desarrollo web.',
        },
        {
          title: 'Formación complementaria',
          bullets: [
            'Inglés Work Time · 2023—2025 (en curso) · Nivel intermedio',
            'Informática · TEC Brasil · 2020—2021',
            'Postura profesional, entrevistas y etiqueta corporativa',
          ],
        },
      ],
    },
    skills: {
      eyebrow: 'Competencias',
      title: 'Stack técnico y diferenciales',
      groups: makeSkills('es'),
    },
    projects: {
      eyebrow: 'Proyectos',
      title: 'Aplicando conocimiento en la práctica',
      linkLabel: 'Ver en GitHub',
      list: makeProjects('es'),
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Listo para crear algo increíble contigo',
      description:
        'Busco oportunidades de prácticas en TI, colaborar con equipos diversos y aprender con desafíos reales. ¿Hablamos?',
      cta: 'Enviar correo',
      ctaHref: 'mailto:ryanbryansilvateodoro@gmail.com',
      items: baseContact.map((item) => ({
        label:
          item.key === 'email'
            ? 'Correo'
            : item.key === 'phone'
            ? 'Teléfono'
            : 'LinkedIn/GitHub',
        value: item.key === 'phone' ? '(+55) 11 98465-4399' : item.value,
        href: item.href,
      })),
    },
    footer: {
      text: '© {{year}} Ryan Teodoro. Construido con código limpio y diseño responsivo.',
    },
  },
};
