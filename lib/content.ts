export const personal = {
  name: 'Bibekpreet Singh Chugh',
  shortName: 'BSingh',
  email: 'hello@bsingh.dev',
  github: 'https://github.com/BSinghOP',
  githubUsername: 'BSinghOP',
  linkedin: 'https://www.linkedin.com/in/bibekpreet-singh-chugh-0b3a96325/',
  ytJobs: 'https://ytjobs.co/@BSingh',
  domain: 'bsingh.dev',
  resume: '/resume.pdf',
};

export const hero = {
  title: ['Building things.', 'Breaking servers.', 'Figuring it out.'],
  accentLine: 1,
  subtitle:
    'CS undergrad at SRM Delhi-NCR. I build personal projects across the stack and have run game-server infrastructure that handled 1000+ concurrent players. Comfortable in code, calmer in front of a working deploy.',
};

export const about = [
  'I am Bibekpreet Singh Chugh, a B.Tech CSE student at SRM Institute of Science and Technology, Delhi-NCR, currently entering my third year. Most of my time goes into personal full-stack projects — React on the front, Node and MySQL on the back, deployed on a Linux VPS behind Nginx and PM2.',
  'On the side I spent time operating Minecraft game servers — third-party hosting, dedicated machines, Cloudflare Spectrum for DDoS protection, peaks past 1000 concurrent players. That is where I learned what production traffic actually feels like.',
  'I enjoy poking at things until they make sense. Comfortable enough in C, C++, Python, Java, JavaScript and React, plus the database, hosting and SSL side of getting projects live.',
];

export const stats = [
  { label: 'public repos', value: '1', hint: '+ private projects' },
  { label: 'years coding', value: '3+' },
  { label: 'prod uptime', value: '99.9%', hint: 'dbms.bsingh.dev' },
  { label: 'concurrent peak', value: '1000+', hint: 'minecraft infra' },
];

export const projects: {
  title: string;
  subtitle: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  live?: string;
  store?: string;
  repo?: string;
  soon?: boolean;
}[] = [
  {
    title: 'Kronex — AI Security Copilot',
    subtitle:
      'Solo build. Local-first AI cybersecurity learning copilot that runs fully offline on Ollama — explains tool output, tutors concepts, and coaches you through authorized CTFs and labs. Node/Express + React, SQLite for progress, local RAG over a security knowledge base.',
    tags: ['React', 'Node.js', 'Ollama', 'RAG', 'Cybersecurity'],
    image: '/projects/kronex.jpg',
    imageAlt: 'Kronex AI cybersecurity copilot console — mode selector and prompt',
    repo: 'https://github.com/BSinghOP/Kronex',
  },
  {
    title: 'Minecraft Server Infrastructure',
    subtitle:
      'Production Minecraft network with 1000+ concurrent peak. Pterodactyl + Wings on Debian, load-balanced proxy fleet, Cloudflare Spectrum DDoS mitigation, custom Java plugin stack. Former in-game admin, plugin dev, and infra operator (2025–2026).',
    tags: ['DevOps', 'Debian', 'Pterodactyl', 'Cloudflare', 'Java'],
    image: '/projects/battlepie.jpg',
    imageAlt: 'Battle Pie Minecraft network logo',
    live: 'https://battlepie.net',
    store: 'https://store.battlepie.net',
  },
  {
    title: "BSingh's Vault",
    subtitle:
      'Full-stack bank management system. DBMS course project taken from broken state to live production. Auth with freeze enforcement, transaction history, admin panel.',
    tags: ['React', 'Node.js', 'MySQL', 'Nginx', 'PM2'],
    image: '/projects/vault.jpg',
    imageAlt: "BSingh's Vault dashboard",
    live: 'https://dbms.bsingh.dev',
    repo: 'https://github.com/BSinghOP/bank-management-system',
  },
  {
    title: 'AyuTrace — Ethicons',
    subtitle:
      'Team build with Ethicons. Blockchain traceability for Ayurvedic herbs — Solidity contracts, MongoDB, and consumer QR codes for farm-to-formulation history. Contributor, not sole author.',
    tags: ['Next.js', 'Solidity', 'Ethers.js', 'MongoDB', 'Hackathon'],
    image: '/projects/ayutrace.jpg',
    imageAlt: 'AyuTrace landing page — Blockchain-Powered Traceability',
    live: 'https://ethicons.vercel.app',
    repo: 'https://github.com/BSinghOP/ethicons-ayutrace',
  },
  {
    title: 'Flappy Floppy',
    subtitle:
      'Team contribution. Desktop Flappy Bird clone in Java with Swing + AWT — 2D animation, event handling, collision detection, resource management. Contributor, not sole author.',
    tags: ['Java', 'Swing', 'Game'],
    image: '/projects/flappyfloppy.jpg',
    imageAlt: 'Flappy Floppy game landing page',
    live: 'https://flappyfloppy.vercel.app',
    repo: 'https://github.com/bitroop/flappyfloppy',
  },
  {
    title: 'FNDP — Fake News Detector',
    subtitle:
      'Team contribution. ML-driven fake news detector — Python model classifies news headlines and articles for misinformation, served behind a React frontend. Contributor, not sole author.',
    tags: ['Python', 'ML', 'React'],
    image: '/projects/fndp.jpg',
    imageAlt: 'FNDP — AI-Powered Fake News Detector hero',
    live: 'https://fndp-frontend.vercel.app',
    repo: 'https://github.com/Nikunjmiglani/FNDP---Fake-new-detector-project',
  },
  {
    title: 'Minecraft modded content',
    subtitle:
      'Modded Minecraft gameplay and showcases — modpack playthroughs, custom mod features, and progression runs.',
    tags: ['Minecraft', 'Modded', 'Modpacks', 'Gameplay'],
    image: '/projects/minecraft-modded.jpg',
    imageAlt: 'YT Jobs portfolio of Minecraft modded content thumbnails',
    live: 'https://ytjobs.co/@BSingh',
  },
  {
    title: 'More coming.',
    subtitle:
      'Currently figuring out the next build. Probably something with realtime, probably something I will regret deploying on a Friday.',
    tags: [],
    soon: true,
  },
];

export const skills = [
  {
    icon: 'code' as const,
    label: 'languages',
    items: ['C', 'C++', 'Python', 'Java', 'JavaScript'],
  },
  {
    icon: 'terminal' as const,
    label: 'frontend',
    items: ['React', 'Next.js', 'Tailwind', 'HTML/CSS'],
  },
  {
    icon: 'cpu' as const,
    label: 'backend & db',
    items: ['Node.js', 'Express', 'MySQL', 'REST APIs'],
  },
  {
    icon: 'server' as const,
    label: 'infra & ops',
    items: ['Linux VPS', 'Nginx', 'PM2', 'Cloudflare', 'SSL/TLS', 'DDoS mitigation'],
  },
];

export const achievements = [
  {
    title: 'Smart India Hackathon 2025 — Internal Round Cleared',
    org: 'Team Ethicons',
    note: 'Cleared the Internal SIH 2025 round with AyuTrace — a blockchain-based herb traceability solution built with the team.',
  },
  {
    title: 'Hackstasy Hackathon — Top 20',
    org: '300+ participating teams',
    note: 'Ranked in the Top 20 teams for a scalable full-stack project.',
  },
  {
    title: '1st Prize — College Science Project Expo',
    org: 'SRM Institute of Science and Technology, Delhi-NCR',
    note: 'Awarded first place at the college-level science project exhibition.',
  },
  {
    title: 'Production Game Server Operations',
    org: 'Self-operated Minecraft network (Battle Pie)',
    note: '1000+ concurrent peak. Cloudflare Spectrum DDoS mitigation. Multi-host architecture.',
  },
];
