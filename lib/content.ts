// All site content lives here. Edit this file to update the portfolio.

export const personal = {
  name: 'Bibekpreet Singh Chugh',
  shortName: 'BSingh',
  email: 'hello@bsingh.codes',
  github: 'https://github.com/BSinghOP',
  githubUsername: 'BSinghOP',
  linkedin: '#', // TODO: update once LinkedIn is set up
  ytJobs: 'https://ytjobs.co/talent/profile/124595',
  domain: 'bsingh.codes',
  resume: '/resume.pdf',
};

export const hero = {
  title: ['Building things.', 'Breaking servers.', 'Figuring it out.'],
  accentLine: 1, // index of the line that gets the accent color (0-based)
  subtitle:
    'CS undergrad at SRM Delhi-NCR. I build personal projects across the stack and run game-server infrastructure that has handled 1000+ concurrent players. Comfortable in code, calmer in front of a working deploy.',
};

export const about = [
  'I am Bibekpreet Singh Chugh, a B.Tech CSE student at SRM Institute of Science and Technology, Delhi-NCR, currently entering my third year. Most of my time goes into personal full-stack projects — React on the front, Node and MySQL on the back, deployed on a Linux VPS behind Nginx and PM2.',
  'On the side I have spent a few years operating Minecraft game servers — third-party hosting, dedicated machines, Cloudflare Spectrum for DDoS protection, peaks past 1000 concurrent players. That is where I learned what production traffic actually feels like.',
  'I enjoy poking at things until they make sense. Comfortable enough in C, C++, Python, Java, JavaScript and React, plus the database, hosting and SSL side of getting projects live.',
];

export const stats = [
  { label: 'public repos', value: '1', hint: '+ private projects' },
  { label: 'years coding', value: '3+' },
  { label: 'prod uptime', value: '99.9%', hint: 'dbms.bsingh.codes' },
  { label: 'concurrent peak', value: '1000+', hint: 'minecraft infra' },
];

export const projects = [
  {
    title: "BSingh's Vault",
    subtitle:
      'Full-stack bank management system. DBMS course project taken from broken state to live production. Auth with freeze enforcement, transaction history, admin panel.',
    tags: ['React', 'Node.js', 'MySQL', 'Nginx', 'PM2'],
    live: 'https://dbms.bsingh.codes',
    repo: 'https://github.com/BSinghOP/bank-management-system',
    accent: 'blue' as const,
  },
  {
    title: 'Minecraft Server Infrastructure',
    subtitle:
      'Multi-region Minecraft network. 1000+ concurrent peak. Cloudflare Spectrum DDoS mitigation, dedicated bare-metal hosts, custom plugin stack.',
    tags: ['DevOps', 'Linux', 'Cloudflare', 'Java'],
    accent: 'green' as const,
  },
  {
    title: 'YouTube editor work',
    subtitle:
      'Freelance video editing and channel work — see the YT Jobs profile for details and references.',
    tags: ['Video', 'Premiere Pro', 'After Effects'],
    live: 'https://ytjobs.co/talent/profile/124595',
    accent: 'amber' as const,
  },
  {
    title: 'More coming.',
    subtitle:
      'Currently figuring out the next build. Probably something with realtime, probably something I will regret deploying on a Friday.',
    tags: ['soon'],
    accent: 'amber' as const,
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
    title: '1st Prize — College Science Project Expo',
    org: 'SRM Institute of Science and Technology, Delhi-NCR',
    note: 'Awarded first place at the college-level science project exhibition.',
  },
  {
    title: 'Hackathon Participations',
    org: 'Various inter-college and online hackathons',
    note: 'Multiple participations across student hackathons during undergraduate study.',
  },
  {
    title: 'Production Game Server Operations',
    org: 'Self-operated Minecraft network',
    note: '1000+ concurrent peak. Cloudflare Spectrum DDoS mitigation. Multi-host architecture.',
  },
];
