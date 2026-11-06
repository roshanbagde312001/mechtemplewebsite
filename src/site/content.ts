// All site copy lives here so it can be edited without touching layout or motion code.

export const BRAND = 'Korvantage';
export const EMAIL = 'athravasonone7@gmail.com';
export const MAILTO = `mailto:${EMAIL}?subject=Let%27s%20build%20together`;

export const NAV_LINKS = [
  { label: 'Approach', target: 'approach' },
  { label: 'Capabilities', target: 'capabilities' },
  { label: 'Work', target: 'work' },
  { label: 'Journey', target: 'journey' },
  { label: 'Industries', target: 'industries' },
  { label: 'How we work', target: 'how' },
  { label: 'Contact', target: 'contact' },
];

export const ROTATING_WORDS = ['business.', 'process.', 'team.', 'customers.', 'growth.'];

export const PHILOSOPHY = [
  { label: 'Understand', shape: 'cube' },
  { label: 'Strategize', shape: 'lens' },
  { label: 'Build', shape: 'cone' },
  { label: 'Automate', shape: 'orb' },
  { label: 'Grow', shape: 'pill' },
];

export const PROBLEMS = ['Manual work', 'Scattered information', 'Missed leads', 'Slow processes', 'Repetitive tasks', 'Poor visibility', 'Difficult scaling'];

export const WORKFLOW = ['Customer interaction', 'Lead capture', 'Qualification', 'CRM', 'Follow-up', 'Analytics'];

// The 13 capabilities, grouped so each scroll step stays readable. Shape index maps to stage.ts MORPH_ORDER.
export const CAPABILITIES = [
  {
    title: 'AI and assistants',
    description: 'Apply AI to practical workflows, products and decision support, and help people find information and finish common tasks.',
    items: ['AI-powered business solutions', 'AI chatbots and assistants'],
    shape: 0,
  },
  {
    title: 'Custom business software',
    description: 'Software designed around a specific need, with core operations, customers and learning brought into connected systems.',
    items: ['Custom software development', 'ERP systems', 'CRM systems', 'Learning Management Systems'],
    shape: 1,
  },
  {
    title: 'Web, commerce and mobile',
    description: 'Digital experiences and tools for customers or teams, available across every device they use.',
    items: ['Websites and web applications', 'E-commerce platforms', 'Mobile applications and PWAs'],
    shape: 2,
  },
  {
    title: 'Automation and digitization',
    description: 'Fewer repetitive handoffs, and manual processes moved into clear, trackable digital workflows.',
    items: ['Business process automation', 'Business process digitization'],
    shape: 3,
  },
  {
    title: 'Data and transformation',
    description: 'Operational information that is easier to understand, and technology changes connected to how the organization runs.',
    items: ['Data analytics and dashboards', 'Digital transformation'],
    shape: 4,
  },
];

export const MARQUEE = ['Build smarter', 'Automate better', 'Grow faster'];

export const PROJECTS = [
  {
    name: 'EduPilot',
    category: 'Education and coaching',
    description: 'An education and coaching institute ERP platform.',
    details: 'Project focus: support the operational needs of education and coaching institutes through an ERP platform.',
    screen: 'edu' as const,
    photo: '/assets/stock/project-edupilot.jpg',
  },
  {
    name: 'CityTwin Nagpur',
    category: 'Intelligent mobility',
    description: 'An intelligent traffic management and digital twin project.',
    details: 'Project focus: explore intelligent traffic management through a city digital twin concept for Nagpur.',
    screen: 'city' as const,
    photo: '/assets/stock/project-citytwin.jpg',
  },
  {
    name: 'SalonSphere',
    category: 'Salon and spa operations',
    description: 'Multi-branch salon and spa management software.',
    details: 'Project focus: coordinate management needs across multiple salon and spa branches.',
    screen: 'salon' as const,
    photo: '/assets/stock/project-salonsphere.jpg',
  },
];

export const JOURNEY = ['Discovery', 'Strategy', 'UX/UI', 'Development', 'AI & automation', 'Testing', 'Deployment', 'Support'];
export const JOURNEY_PHOTOS = ['discovery', 'strategy', 'design', 'development', 'automation', 'testing', 'deployment', 'support'].map((name) => `/assets/stock/stage-${name}.jpg`);
export const ECOSYSTEM = ['Website', 'CRM', 'ERP', 'AI assistant', 'Analytics', 'Payments', 'Customer portal'];

export const INDUSTRIES = ['Education', 'Professional services', 'Retail', 'E-commerce', 'Real estate', 'Healthcare', 'Finance', 'Manufacturing', 'Startups and growing businesses'];

export const INDUSTRY_PHOTOS = ['education', 'services', 'retail', 'ecommerce', 'realestate', 'healthcare', 'finance', 'manufacturing', 'startups'].map((name) => `/assets/stock/industry-${name}.jpg`);

// Stock footage, so the captions describe the idea and never claim the systems shown are ours.
export const REEL = [
  { clip: 'traffic', title: 'Built for the real world.', note: 'Every system meets people, places and movement' },
  { clip: 'servers', title: 'Engineered to keep running.', note: 'Dependable foundations under everything visible' },
  { clip: 'code', title: 'Written with care.', note: 'From a focused first release to what comes next' },
];

export const ENGAGEMENT = [
  { title: 'Build', detail: 'Start with a focused product or system.' },
  { title: 'Automate', detail: 'Connect the work that benefits from automation.' },
  { title: 'Transform', detail: 'Expand the ecosystem as the needs evolve.' },
];

// Every number is a count of what is listed on this page. Do not add client or performance figures without evidence.
export const FACTS = [
  { value: CAPABILITIES.reduce((sum, group) => sum + group.items.length, 0), label: 'capabilities, from AI and ERP to mobile and analytics' },
  { value: JOURNEY.length, label: 'stages from discovery through to long-term support' },
  { value: INDUSTRIES.length, label: 'industries with their own context, people and processes' },
  { value: ECOSYSTEM.length, label: 'kinds of system connected through purposeful integrations' },
  { value: PROJECTS.length, label: 'selected products and projects to explore' },
  { value: 2, label: 'founders, Sanket and Atharva, close to the work' },
];

export const OUTCOMES = [
  { title: 'Acquire', detail: 'Create clearer paths for new opportunities.' },
  { title: 'Convert', detail: 'Support timely, consistent customer journeys.' },
  { title: 'Automate', detail: 'Reduce repetitive work and handoffs.' },
  { title: 'Optimize', detail: 'Use better visibility to improve processes.' },
];

export const PROMISES = [
  'Every feature should solve a problem.',
  'Every automation should save effort.',
  'Every system should create visibility.',
  'Every technology investment should move the business forward.',
];

export const LEAD_STEPS = ['New lead', 'Captured', 'Assigned', 'Follow-up', 'Tracked'];

export const QUESTIONS = [
  { q: 'Where does a project begin?', a: 'With business understanding, before any technology choice. We look at the real need first, then work toward a practical solution that leaves room to grow.' },
  { q: 'Do you build custom or configure off the shelf?', a: 'Solutions are custom and shaped around your real processes, so the software fits how the business already works.' },
  { q: 'How do you approach AI?', a: 'AI-first thinking, applied where it adds practical value. Technology should earn its place in the business.' },
  { q: 'What does the work cover?', a: 'End-to-end execution from idea to release: discovery, strategy, UX/UI, development, AI and automation, testing, deployment and support.' },
  { q: 'What happens after launch?', a: 'We keep a long-term perspective on what comes next. A focused first solution can grow into connected automation and broader transformation when it makes sense.' },
];
