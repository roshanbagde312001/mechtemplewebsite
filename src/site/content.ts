// All site copy lives here so it can be edited without touching layout or motion code.
// Wording rule: describe what we design, develop, engineer, integrate, automate, deploy and maintain.
// Do not add client names, results, certifications or "available now" products without evidence.

export const BRAND = 'Preemptech';
export const MONOGRAM = 'PT';
/** Brand logo (cropped from public/assets/aistudio/Preemptech Logo Premium.png). */
export const LOGO = '/assets/brand/logo.webp';
export const TAGLINE = 'Engineering what comes next.';
export const EMAIL = 'athravasonone7@gmail.com';
export const MAILTO = `mailto:${EMAIL}?subject=Let%27s%20build%20together`;

export const SHORT_DESCRIPTION = `${BRAND} is an AI, software engineering and automation company that designs and develops intelligent digital solutions for businesses and consumers.`;
export const SUPPORTING = `From custom software and AI-powered applications to intelligent automation and connected business systems, ${BRAND} transforms complex ideas and operational challenges into practical digital solutions.`;
export const BRAND_STATEMENT = 'We engineer intelligent software, connected systems and automated experiences that move businesses forward.';

export const ROTATING_WORDS = ['problem.', 'process.', 'team.', 'customers.', 'growth.'];

export const PHILOSOPHY = [
  { label: 'Understand', shape: 'cube' },
  { label: 'Engineer', shape: 'lens' },
  { label: 'Automate', shape: 'cone' },
  { label: 'Deliver', shape: 'orb' },
  { label: 'Improve', shape: 'pill' },
];

export const INTERSECTION = [
  'Artificial Intelligence', 'Software Engineering', 'Machine Learning', 'Intelligent Automation',
  'Data Engineering & Analytics', 'Application Development', 'System Integration', 'Cloud Deployment & Infrastructure',
];

export const PROBLEMS = ['Too many spreadsheets', 'Manually maintained records', 'Disconnected systems', 'Software that misfits the workflow', 'No consolidated reports', 'Repetitive manual work'];

export const WORKFLOW = ['Trigger', 'Input', 'Validation', 'Processing', 'Decision', 'Routing', 'Action', 'Notification', 'Monitoring'];

// Core service categories. Images are Pexels stock (see public/assets/stock/CREDITS.md). Shape index maps to stage.ts MORPH_ORDER (0-5).
export const CAPABILITIES = [
  { title: 'AI & Machine Learning', image: '/assets/capabilities/cap-ai.jpg', description: 'AI assistants, chatbots, document intelligence and predictive models, used where AI solves a genuine problem.', items: ['AI assistants', 'Intelligent chatbots', 'Document processing', 'Forecasting', 'Recommendations'], shape: 0 },
  { title: 'Software Development', image: '/assets/capabilities/cap-software.jpg', description: 'Custom software engineered around specific operational requirements, not generic tools.', items: ['Custom business apps', 'Internal systems', 'Enterprise modules', 'Modernization'], shape: 1 },
  { title: 'Intelligent Automation', image: '/assets/capabilities/cap-automation.jpg', description: 'Reliable, maintainable workflows that replace unnecessary repetitive manual processes.', items: ['Lead management', 'Approvals', 'Notifications', 'Data movement'], shape: 2 },
  { title: 'Data Engineering & Analytics', image: '/assets/capabilities/cap-data.jpg', description: 'Collect, process, organize and understand data through pipelines, dashboards and analysis.', items: ['Data pipelines', 'ETL / ELT', 'KPI dashboards', 'Trend analysis'], shape: 3 },
  { title: 'Mobile & Web Applications', image: '/assets/capabilities/cap-apps.jpg', description: 'Websites, web applications and mobile apps with real business capabilities behind them.', items: ['Business websites', 'E-commerce', 'Web apps', 'Android / iOS'], shape: 4 },
  { title: 'System Integration & APIs', image: '/assets/capabilities/cap-integration.jpg', description: 'Connect applications, services and databases so information moves between systems.', items: ['REST APIs', 'Third-party integrations', 'Payments', 'CRM / ERP'], shape: 5 },
  { title: 'Cloud & Deployment', image: '/assets/capabilities/cap-cloud.jpg', description: 'Take applications from development to production, then keep them running.', items: ['VPS & cloud', 'Docker', 'Domains & hosting', 'Backups'], shape: 0 },
  { title: 'Technology Consulting', image: '/assets/capabilities/cap-consulting.jpg', description: 'Identify the actual problem, decide whether technology can solve it, and plan a suitable implementation.', items: ['Requirement analysis', 'Architecture planning', 'Technology selection'], shape: 1 },
];

// The four areas the business operates across.
export const AREAS = [
  {
    letter: 'A', title: 'Technology Services',
    description: 'Professional technology development for businesses, startups, educational institutions and organizations.',
    items: ['Websites & web apps', 'Custom software', 'Mobile apps', 'AI-powered apps', 'Process automation', 'Backend & databases', 'APIs & integration', 'Analytics & reporting', 'Deployment & maintenance'],
  },
  {
    letter: 'B', title: 'Business Technology Solutions',
    description: 'Complete systems that help businesses manage their operations more efficiently, built for one business or adapted into reusable products.',
    items: ['Business management', 'Customer management', 'Lead management', 'Admission management', 'Inventory management', 'Analytics dashboards', 'Workflow apps', 'Enterprise apps'],
  },
  {
    letter: 'C', title: 'AI and Automation',
    description: 'AI and automation integrated into applications and business processes. Not AI everywhere: AI where it solves a genuine problem.',
    items: ['AI assistants', 'Chatbots', 'Inquiry handling', 'Document processing', 'Data extraction', 'Classification & routing', 'Follow-ups', 'AI search', 'Decision support'],
  },
  {
    letter: 'D', title: 'Digital Products & Platforms',
    description: 'Reusable software products and SaaS platforms that can be offered to multiple customers through licensing or subscription.',
    items: ['Subscription business apps', 'EdTech platforms', 'AI productivity tools', 'Industry software', 'Online service platforms'],
  },
];

type Group = { heading: string; items: string[] };
export type Service = { title: string; intro: string; groups: Group[]; note?: string };

export const SERVICES: Service[] = [
  {
    title: 'Website Development',
    intro: 'Professional websites for businesses, startups, institutions, brands and individuals, with functional business capabilities, not just static pages.',
    groups: [
      { heading: 'Business websites', items: ['Corporate websites', 'Company profiles', 'Professional services', 'Startup websites', 'Institutional websites', 'Agency websites'] },
      { heading: 'E-commerce websites', items: ['Online stores', 'Product catalogs', 'Carts & checkout', 'Order management', 'Payment gateways', 'Inventory', 'Admin dashboards'] },
      { heading: 'Custom websites', items: ['Booking platforms', 'Membership sites', 'Customer portals', 'Listings & directories', 'Landing pages', 'Portfolios'] },
      { heading: 'What you receive', items: ['UI/UX design', 'Responsive frontend', 'Backend where required', 'Database integration', 'Admin panel', 'API integrations', 'SEO-ready structure', 'Deployment', 'Testing & handover'] },
    ],
  },
  {
    title: 'Web Application Development',
    intro: 'Interactive web-based software that helps businesses manage their work. Our goal: convert business requirements into working software platforms.',
    groups: [
      { heading: 'What we build', items: ['CRM', 'ERP', 'LMS', 'SaaS applications', 'Business dashboards', 'Project management', 'Customer portals', 'Employee management', 'Admissions', 'Inventory', 'Booking & scheduling', 'Workflow platforms'] },
      { heading: 'Technical capabilities', items: ['Frontend architecture', 'Backend APIs', 'Database design', 'Authentication', 'Role-based access', 'Admin panels', 'Reporting', 'Third-party integrations', 'Application security', 'Testing & deployment'] },
    ],
  },
  {
    title: 'Custom Software Development',
    intro: 'Software engineered around specific operational requirements, rather than forcing businesses into generic software.',
    groups: [
      { heading: 'What we provide', items: ['Custom business apps', 'Internal management systems', 'Enterprise modules', 'Desktop or web tools', 'Data management', 'Custom portals', 'Workflow apps', 'Modernization', 'Improving existing apps'] },
      { heading: 'Typical problems we solve', items: ['Too many spreadsheets', 'Manually maintained records', 'Disconnected departments', 'Software that misfits the workflow', 'No consolidated reports', 'Repetitive manual work'] },
    ],
  },
  {
    title: 'Artificial Intelligence Development',
    intro: 'AI-powered functionality developed and integrated into business applications and digital products.',
    groups: [
      { heading: 'AI assistants', items: ['Knowledge assistants', 'Customer support', 'Internal employee assistants', 'Document Q&A', 'Connected to approved business information'] },
      { heading: 'AI chatbots', items: ['Website chatbots', 'Inquiry assistants', 'Product information', 'Educational assistants', 'Conversational interfaces'] },
      { heading: 'AI integration', items: ['AI APIs in existing software', 'Language models in workflows', 'Information extraction', 'AI-assisted search', 'Summaries & reports', 'Context-aware features'] },
      { heading: 'Intelligent documents', items: ['Information extraction', 'Classification', 'Structured data extraction', 'Summarization', 'Automated processing'] },
      { heading: 'Implementation approach', items: ['Understand the use case', 'Identify suitable AI', 'Design the architecture', 'Connect models or APIs', 'Build interface & backend', 'Test accuracy, reliability, security', 'Deploy & monitor'] },
    ],
    note: 'We distinguish conventional automation from AI-powered functionality. Not every automated workflow needs an AI model.',
  },
  {
    title: 'Machine Learning Solutions',
    intro: 'Machine learning and data-driven models where a problem needs predictive or analytical capabilities.',
    groups: [
      { heading: 'What we can develop', items: ['Classification', 'Regression & prediction', 'Forecasting', 'Recommendation engines', 'Pattern recognition', 'Anomaly detection', 'Predictive analytics', 'Scoring systems'] },
      { heading: 'Example applications', items: ['Sales forecasting', 'Demand forecasting', 'Customer segmentation', 'Predictive reporting', 'Transaction anomalies', 'Performance prediction'] },
      { heading: 'Process', items: ['Data assessment', 'Cleaning & preparation', 'Exploratory analysis', 'Feature engineering', 'Model selection', 'Training', 'Evaluation', 'Deployment & monitoring'] },
    ],
    note: 'Machine learning depends on data availability, quality and the suitability of the use case.',
  },
  {
    title: 'Intelligent Process Automation',
    intro: 'Automated workflows that reduce repetitive manual work and connect business processes. One of our major service categories.',
    groups: [
      { heading: 'Lead & customer management', items: ['Capture inquiries', 'Validate information', 'Classify & assign leads', 'Customer records', 'Status updates', 'Follow-up reminders'] },
      { heading: 'Administrative & education', items: ['Form processing', 'Data entry workflows', 'Document handling', 'Report generation', 'Admission inquiries', 'Student registration', 'Document tracking'] },
      { heading: 'Sales & internal operations', items: ['Lead categorization', 'Follow-up scheduling', 'Campaign integration', 'Approval workflows', 'Task assignment', 'Process tracking'] },
      { heading: 'Anatomy of a workflow', items: ['Trigger', 'Input', 'Validation', 'Processing', 'Decision', 'Routing', 'Action', 'Notification', 'Monitoring'] },
      { heading: 'We can integrate', items: ['Websites & web apps', 'Databases', 'CRM & ERP', 'Email', 'Messaging platforms', 'Business APIs', 'Cloud services', 'AI models & APIs'] },
    ],
    note: 'Integrations are subject to API availability, permissions and technical compatibility.',
  },
  {
    title: 'Data Engineering & Analytics',
    intro: 'We help organizations collect, process, organize and understand their data.',
    groups: [
      { heading: 'Data processing', items: ['Extraction', 'Cleaning', 'Transformation', 'Validation', 'Consolidation'] },
      { heading: 'Data engineering', items: ['Data pipelines', 'Database integration', 'Structured processing', 'ETL / ELT', 'Synchronization'] },
      { heading: 'Business intelligence', items: ['Dashboards', 'KPI tracking', 'Performance reports', 'Operational reporting', 'Sales & financial reporting'] },
      { heading: 'Analytics', items: ['Exploratory analysis', 'Statistical analysis', 'Trend analysis', 'Customer analysis', 'Predictive analytics where appropriate'] },
    ],
  },
  {
    title: 'Mobile App Development',
    intro: 'Mobile applications for businesses and consumer-facing products, scoped to your requirements and chosen platform.',
    groups: [
      { heading: 'What we can build', items: ['Android', 'iOS', 'Cross-platform', 'Customer-facing apps', 'Business apps', 'Education apps', 'Booking & services', 'E-commerce', 'Apps for existing web platforms'] },
      { heading: 'Features', items: ['Registration & auth', 'User profiles', 'Notifications', 'API integration', 'Database connectivity', 'Payments where required', 'Admin functionality', 'Testing & deployment'] },
    ],
  },
  {
    title: 'API Development & Integration',
    intro: 'We connect applications, services and databases so information can move between systems.',
    groups: [
      { heading: 'What we provide', items: ['REST APIs', 'Backend services', 'Third-party APIs', 'Database integration', 'Authentication', 'Payment gateways', 'Email & notifications', 'CRM & ERP', 'AI services'] },
      { heading: 'Business benefits', items: ['Less duplicate data entry', 'Better app communication', 'Centralized information', 'Consistent workflows', 'Easier expansion'] },
    ],
  },
  {
    title: 'Cloud, Deployment & Infrastructure',
    intro: 'We take applications from development to production, considering architecture, hosting, security, scalability and expected usage first.',
    groups: [
      { heading: 'What we provide', items: ['Application deployment', 'Server configuration', 'VPS & cloud', 'Backend & database setup', 'Domains & hosting', 'Environment config', 'Docker where appropriate', 'Production builds', 'Troubleshooting', 'Updates', 'Backup & recovery', 'Monitoring & maintenance'] },
    ],
  },
  {
    title: 'UI/UX & Digital Product Design',
    intro: 'Interfaces and experiences for websites, applications and platforms that are usable, understandable and visually consistent.',
    groups: [
      { heading: 'What we provide', items: ['UI design', 'UX research', 'Wireframes', 'User journeys', 'Responsive layouts', 'Interactive prototypes', 'Design systems', 'Dashboard design', 'Interface development', 'Motion design'] },
    ],
  },
  {
    title: 'Consulting & Digital Transformation',
    intro: 'Practical help identifying where technology can improve existing operations, and how to implement it.',
    groups: [
      { heading: 'What we provide', items: ['Requirement analysis', 'Process assessment', 'Solution planning', 'Architecture planning', 'Automation opportunities', 'Technology selection', 'Integration planning', 'Legacy improvement', 'Deployment planning', 'Implementation guidance'] },
    ],
  },
];

// Examples of systems we can engineer, not finished off-the-shelf products.
export const SOLUTIONS = [
  { title: 'Business Management Systems', description: 'A centralized platform for managing business operations.', modules: ['Employees', 'Customers', 'Sales tracking', 'Inventory', 'Tasks', 'Reporting', 'Role-based access', 'Admin dashboard'] },
  { title: 'Customer Relationship Management', description: 'Manage customer information and business relationships.', modules: ['Lead capture', 'Customer records', 'Lead assignment', 'Follow-ups', 'Sales pipeline', 'Communication history', 'Analytics', 'Notifications'] },
  { title: 'Education Management', description: 'For institutions, coaching classes and training organizations.', modules: ['Students', 'Admissions', 'Enquiries', 'Courses & batches', 'Attendance', 'Fees', 'Examinations', 'Results', 'Student & parent portals'] },
  { title: 'AI-Powered Business Assistant', description: 'Helps employees or customers find information and perform supported tasks.', modules: ['Knowledge base', 'Document understanding', 'Q&A', 'Search', 'Summarization', 'Workflow integration', 'Permissions', 'History'] },
  { title: 'Automated Lead Management', description: 'A workflow that processes business inquiries automatically.', flow: ['Website form', 'Validation', 'Classification', 'CRM record', 'Team assignment', 'Email notification', 'Follow-up', 'Reporting'] },
  { title: 'E-commerce & Retail Platforms', description: 'Complete digital commerce systems.', modules: ['Catalog', 'Variants', 'Cart & checkout', 'Payments', 'Orders', 'Inventory', 'Customer accounts', 'Sales reports'] },
  { title: 'Data & BI Platform', description: 'A centralized system for understanding business performance.', modules: ['Data ingestion', 'Processing', 'Database integration', 'KPI dashboards', 'Trends', 'Automated reporting', 'Predictive analytics'] },
  { title: 'Custom SaaS Platforms', description: 'Products built around a specific industry or business requirement.', modules: ['Multi-user accounts', 'Organizations', 'Subscription plans', 'Permissions', 'Billing', 'Usage management', 'Analytics'] },
  { title: 'Workflow & Approvals', description: 'Manage internal organizational processes end to end.', modules: ['Workflow creation', 'Task assignment', 'Approval levels', 'Status tracking', 'Notifications', 'Audit history', 'Reports'] },
  { title: 'Industry-Specific Applications', description: 'Applications for particular business domains, built from their requirements.', modules: ['Construction', 'Education', 'Retail', 'Recruitment', 'Professional services', 'SMBs', 'Startups'] },
];

export const MARQUEE = ['Understand', 'Engineer', 'Automate', 'Deliver'];

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

export const LIFECYCLE = [
  { title: 'Discovery', verb: 'Understand', items: ['Your business', 'Existing problems', 'Objectives', 'Current processes', 'Required functionality'] },
  { title: 'Requirement analysis', verb: 'Prepare', items: ['Functional requirements', 'Technical requirements', 'User roles', 'System workflows', 'Integrations', 'Project scope'] },
  { title: 'Architecture & design', verb: 'Define', items: ['Application structure', 'Database architecture', 'Technology stack', 'UI/UX design', 'Integration architecture', 'Deployment approach'] },
  { title: 'Development', verb: 'Build', items: ['Frontend', 'Backend', 'Database', 'APIs', 'Business logic', 'Automation workflows', 'AI where required'] },
  { title: 'Testing & validation', verb: 'Verify', items: ['Functional correctness', 'User workflows', 'API behavior', 'Data handling', 'Security', 'Responsiveness', 'Error handling'] },
  { title: 'Deployment', verb: 'Deliver', items: ['Production application', 'Hosting', 'Domain', 'Database setup', 'Environment config', 'Documentation'] },
  { title: 'Support & improvement', verb: 'Maintain', items: ['Bug fixes', 'Updates', 'Technical support', 'New features', 'Performance', 'Maintenance'] },
];

export const JOURNEY = LIFECYCLE.map((stage) => stage.title);
export const JOURNEY_PHOTOS = ['discovery', 'strategy', 'design', 'development', 'testing', 'deployment', 'support'].map((name) => `/assets/stock/stage-${name}.jpg`);
export const ECOSYSTEM = ['Website', 'CRM', 'ERP', 'AI assistant', 'Analytics', 'Payments', 'Customer portal'];

export const INDUSTRIES = ['Construction & infrastructure', 'Education', 'Retail & e-commerce', 'Recruitment', 'Professional services', 'Small & medium businesses', 'Startups & technology companies'];
export const INDUSTRY_PHOTOS = ['realestate', 'education', 'retail', 'services', 'finance', 'manufacturing', 'startups'].map((name) => `/assets/stock/industry-${name}.jpg`);

export const CUSTOMERS_B2B = [
  { title: 'Startups', items: ['MVP development', 'Product engineering', 'SaaS development', 'Technical architecture', 'AI integration'] },
  { title: 'Small & medium businesses', items: ['Business websites', 'Custom software', 'CRM & ERP', 'Automation', 'E-commerce', 'Data dashboards'] },
  { title: 'Educational institutions', items: ['Admission management', 'Student management', 'Education platforms', 'AI learning tools', 'Admin automation'] },
  { title: 'Enterprises & organizations', items: ['System integration', 'Custom applications', 'Workflow automation', 'Data solutions', 'Modernization'] },
  { title: 'Agencies & service providers', items: ['Business websites', 'Client portals', 'Internal applications', 'Automated operations', 'Reporting systems'] },
];
export const CUSTOMERS_B2C = ['Productivity apps', 'AI-powered personal tools', 'Educational apps', 'Learning platforms', 'Consumer digital services', 'Subscription software'];

// Stock footage, so the captions describe the idea and never claim the systems shown are ours.
export const REEL = [
  { clip: 'traffic', title: 'Built for the real world.', note: 'Every system meets people, places and movement' },
  { clip: 'servers', title: 'Engineered to keep running.', note: 'Dependable foundations under everything visible' },
  { clip: 'code', title: 'Written with care.', note: 'From a focused first release to what comes next' },
];

export const ENGAGEMENT = [
  { title: 'Engineer', detail: 'Build the software and systems the problem actually needs.' },
  { title: 'Automate', detail: 'Connect the work that benefits from automation, with AI only where it helps.' },
  { title: 'Deliver', detail: 'Deploy working systems that can be tested, maintained and improved.' },
];

export const DIFFERENTIATORS = [
  { title: 'End-to-end engineering', detail: 'The complete lifecycle, from understanding a problem to deploying the finished application.' },
  { title: 'Software + AI + automation', detail: 'Conventional engineering, AI and automation combined when they suit the problem.' },
  { title: 'Business-oriented', detail: 'Focused on your actual workflows and operational requirements, not just the technology.' },
  { title: 'Custom development', detail: 'Built around specific requirements, not one predefined application for everyone.' },
  { title: 'Connected systems', detail: 'Applications, databases, APIs, AI services and workflows integrated together.' },
  { title: 'Practical implementation', detail: 'Working systems that can be tested, deployed, maintained and improved.' },
];

// Every number is a count of what is listed on this page. Do not add client or performance figures without evidence.
export const FACTS = [
  { value: SERVICES.length, label: 'services, from websites and AI to cloud and consulting' },
  { value: SOLUTIONS.length, label: 'complete business solutions we can engineer' },
  { value: LIFECYCLE.length, label: 'stages from discovery through to long-term support' },
  { value: AREAS.length, label: 'business areas: services, solutions, AI & automation, products' },
  { value: INDUSTRIES.length, label: 'industries with their own context, people and processes' },
  { value: DIFFERENTIATORS.length, label: 'principles that shape how we engineer' },
];

export const OUTCOMES = [
  { title: 'Understand', detail: 'Start from the problem, not the technology.' },
  { title: 'Engineer', detail: 'Design and build the right solution.' },
  { title: 'Automate', detail: 'Remove repetitive manual handoffs.' },
  { title: 'Deliver', detail: 'Deploy something that works and lasts.' },
];

export const FOUNDER = {
  name: 'Sanket Sonone',
  role: 'Founder',
  focus: 'Technical direction, solution architecture, software engineering, AI implementation, data-related development and deployment.',
  expertise: ['Software Development', 'Artificial Intelligence', 'Machine Learning', 'Data Analysis', 'Data Science', 'Application Development', 'Backend & Deployment Engineering'],
};

export const LEAD_STEPS = ['Website form', 'Validation', 'Classification', 'CRM record', 'Team assignment', 'Notification', 'Follow-up', 'Reporting'];
export const LEAD_LINES = [
  'A new enquiry arrives through the website form.',
  'Required details are checked before anything moves on.',
  'Rules or AI classify the lead by need and priority.',
  'A CRM record is created, with nothing retyped.',
  'The lead is assigned to the right team member.',
  'An email notification tells the team it is waiting.',
  'A follow-up is scheduled so the conversation keeps moving.',
  'Every step is tracked and reported.',
];

export const QUESTIONS = [
  { q: 'Are you a website agency?', a: `No. ${BRAND} is a technology engineering company. We design, develop, integrate, automate and deploy software and intelligent systems that solve real business and consumer problems. Websites are one part of that.` },
  { q: 'Do you build custom or configure off the shelf?', a: 'We build around your specific requirements and real workflows, rather than limiting every customer to the same predefined application.' },
  { q: 'How do you approach AI?', a: 'The objective is not to add AI everywhere. We use AI where it solves a genuine problem, and we distinguish conventional automation from AI-powered features. Not every automated workflow needs an AI model.' },
  { q: 'Can you connect our existing tools?', a: 'Usually. We integrate websites, databases, CRM and ERP systems, email, messaging, business APIs, cloud services and AI APIs, subject to API availability, permissions and technical compatibility.' },
  { q: 'Do you sell ready-made SaaS products?', a: 'Custom development is our core service. Individual products are offered only once they are actually developed, tested and ready.' },
  { q: 'What happens after launch?', a: 'Depending on the agreed arrangement: bug fixes, updates, technical support, feature improvements, performance optimization and ongoing maintenance.' },
];

// ============================================================================================
// Multi-page site: navigation, page copy and company details for the inner pages.
// ============================================================================================

/** Company contact details. Leave a field empty to hide it everywhere; only fill in verified details. */
export const COMPANY = {
  name: BRAND,
  email: EMAIL,
  phone: '', // e.g. '+91 00000 00000'
  address: '', // e.g. 'Office address, City, State, PIN, India'
  hours: '', // e.g. 'Monday to Friday, 10:00 to 18:00 IST'
  socials: [] as { label: string; href: string }[], // e.g. [{ label: 'LinkedIn', href: 'https://www.linkedin.com/company/...' }]
};

/** Main navigation (header, menu). Contact is the separate call-to-action. */
export const PAGES = [
  { label: 'Services', to: '/services' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Industries', to: '/industries' },
  { label: 'Work', to: '/work' },
  { label: 'Process', to: '/process' },
  { label: 'About', to: '/about' },
  { label: 'Careers', to: '/careers' },
];

export const slugify = (text: string) => text.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const serviceSlug = (index: number) => slugify(SERVICES[index].title);

/** Banner image per service detail page (same order as SERVICES). */
export const SERVICE_IMAGES = [
  '/assets/stock/reel-code.jpg', '/assets/capabilities/cap-data.jpg', '/assets/capabilities/cap-software.jpg', '/assets/capabilities/cap-ai.jpg',
  '/assets/capabilities/cap-integration.jpg', '/assets/capabilities/cap-automation.jpg', '/assets/capabilities/cap-data.jpg', '/assets/capabilities/cap-apps.jpg',
  '/assets/capabilities/cap-integration.jpg', '/assets/capabilities/cap-cloud.jpg', '/assets/stock/project-salonsphere.jpg', '/assets/capabilities/cap-consulting.jpg',
];

/** Each service mapped to the core category it belongs to (index into CAPABILITIES). */
export const SERVICE_CATEGORY = [4, 4, 1, 0, 0, 2, 3, 4, 5, 6, 4, 7];

export const PAGE_IMAGES = {
  about: '/assets/capabilities/cap-consulting.jpg',
  services: '/assets/capabilities/cap-software.jpg',
  solutions: '/assets/capabilities/cap-data.jpg',
  industries: '/assets/capabilities/cap-automation.jpg',
  work: '/assets/stock/project-citytwin.jpg',
  process: '/assets/capabilities/cap-integration.jpg',
  careers: '/assets/stock/reel-code.jpg',
  contact: '/assets/capabilities/cap-cloud.jpg',
};

export const MEDIUM_DESCRIPTION = [
  `${BRAND} helps businesses and individuals turn complex requirements into practical technology solutions. Our capabilities span custom software development, web and mobile applications, artificial intelligence, machine learning, business process automation, data engineering, system integration and cloud deployment.`,
  'From developing a complete business application to automating repetitive operations or integrating AI into an existing system, we engineer solutions around real-world requirements.',
];

export const PHILOSOPHY_STEPS = [
  { title: 'Understand the problem', detail: 'We start with how your business actually works: the people, the processes and where time or information gets lost.' },
  { title: 'Engineer the solution', detail: 'We design and build the software, integrations and data flows the problem needs, and nothing it does not.' },
  { title: 'Automate the process', detail: 'Repetitive manual steps become reliable, maintainable workflows, with AI only where it adds genuine value.' },
  { title: 'Deliver the outcome', detail: 'We test, deploy and support working systems that can be maintained and improved over time.' },
];

/** How we keep claims honest (from the company's own credibility rules). */
export const COMMITMENTS = [
  { title: 'Plain claims', detail: 'We describe what we design, develop, integrate, automate, deploy and maintain. We do not advertise clients, results or partnerships we cannot show.' },
  { title: 'Honest about AI', detail: 'We use existing models and APIs where they fit and say so. We do not present integrations as proprietary models, or human-reviewed steps as fully autonomous.' },
  { title: 'Products when they are real', detail: 'Custom development is our core service. A product is offered only once it is developed, tested and ready.' },
  { title: 'No guaranteed outcomes', detail: 'We commit to engineering quality and clear communication, not to business results we cannot control.' },
];

export const AI_APPROACH = ['Understand the use case', 'Identify suitable AI capabilities', 'Design the application architecture', 'Connect the required models or APIs', 'Develop the interface and backend', 'Test accuracy, reliability and security', 'Deploy and monitor the solution'];

export const CAREERS = {
  intro: `${BRAND} is a young, founder-led engineering company. We do not have advertised openings right now, but we are always glad to hear from people who care about building useful, well-engineered systems.`,
  areas: [
    { title: 'Software engineering', detail: 'Frontend, backend and full-stack development for web and mobile applications.' },
    { title: 'AI & machine learning', detail: 'Applying language models, ML models and data pipelines to real business problems.' },
    { title: 'Data engineering & analytics', detail: 'Pipelines, databases, dashboards and analysis that make information useful.' },
    { title: 'UI/UX design', detail: 'Interfaces and product experiences that are usable, clear and consistent.' },
    { title: 'Cloud & DevOps', detail: 'Deployment, infrastructure, monitoring and keeping systems running well.' },
  ],
  values: [
    { title: 'Problem first', detail: 'Understand the actual problem before choosing the technology.' },
    { title: 'Craft and ownership', detail: 'Write software you would be comfortable maintaining yourself.' },
    { title: 'Honesty', detail: 'Say what works, what does not, and what you do not know yet.' },
    { title: 'Keep learning', detail: 'AI and software move quickly; curiosity is part of the job.' },
  ],
  apply: `mailto:${EMAIL}?subject=${encodeURIComponent('Open application')}&body=${encodeURIComponent('Hello,\n\nI would like to be considered for future roles at Preemptech.\n\nArea of interest:\nPortfolio / GitHub / LinkedIn:\n\nI have attached my CV.\n')}`,
};

export const LEGAL_UPDATED = '12 November 2026';

// Template legal copy written to match how this site actually behaves (no accounts, no analytics, no cookies set by us,
// contact form opens the visitor's email app). Have it reviewed by a qualified professional and add your registered
// legal entity name and address before relying on it.
export const PRIVACY = [
  { heading: 'Who we are', body: [`This website is operated by ${BRAND}. If you have any question about this policy or your information, contact us at ${EMAIL}.`] },
  { heading: 'Information we collect', body: [
    'This website has no user accounts, and we do not use analytics, advertising trackers or cookies of our own.',
    'The contact form does not send anything to our servers. When you submit it, it opens your own email app with your message filled in. We receive your information only if you choose to send that email, and we then hold what you included, such as your name, email address, company and message.',
    'Like most websites, our hosting provider may record standard technical logs (for example IP address, browser type and the pages requested) to keep the site secure and working.',
  ] },
  { heading: 'Third-party services', body: ['Fonts on this site are loaded from Google Fonts, so your browser connects to Google servers, which receive your IP address. Please see Google\'s privacy policy for how they handle that information.'] },
  { heading: 'How we use information', body: ['We use the information you send us to reply to your enquiry, prepare proposals, deliver agreed services and meet legal or accounting obligations. We do not sell your personal information.'] },
  { heading: 'Sharing', body: ['We share information only with service providers that help us operate (such as email hosting), when you ask us to, or when the law requires it.'] },
  { heading: 'How long we keep it', body: ['We keep correspondence for as long as needed to handle your enquiry or project, and afterwards only as long as required for legitimate business or legal reasons.'] },
  { heading: 'Your choices and rights', body: [`You can ask us to access, correct or delete the personal information we hold about you by emailing ${EMAIL}. We will respond within a reasonable time.`] },
  { heading: 'Children', body: ['This website is intended for businesses and adults and is not directed at children.'] },
  { heading: 'Changes to this policy', body: ['We may update this policy as the website or our services change. The date at the top shows when it was last updated.'] },
];

export const TERMS = [
  { heading: 'About these terms', body: [`These terms apply to your use of the ${BRAND} website. By using the site you agree to them. If you do not agree, please do not use the site.`] },
  { heading: 'Information on this site', body: [
    'The content on this website describes the services we offer and how we work. It is general information, not professional advice, and it is not an offer or a contract.',
    'Any project is governed by a separate written agreement or proposal that sets out its scope, timeline, fees and terms.',
    'Solutions and products described on this site are examples of what we can engineer. A product is presented as available only when it has been developed, tested and is ready to offer.',
  ] },
  { heading: 'Intellectual property', body: [
    `The ${BRAND} name, logo and the original text and design of this website belong to ${BRAND}. You may not copy or reuse them without our written permission.`,
    'Stock photographs and footage are used under the Pexels licence and remain the property of their creators. Interface mock-ups on this site are illustrations, not screenshots of client systems.',
  ] },
  { heading: 'Acceptable use', body: ['Do not use this website in any way that is unlawful, that could damage or impair it, or that attempts to gain unauthorised access to it or to our systems.'] },
  { heading: 'Links to other websites', body: ['We may link to websites we do not control. We are not responsible for their content or practices.'] },
  { heading: 'No warranties', body: ['We work to keep this website accurate and available, but it is provided "as is", without warranties of any kind, and we may change or withdraw content at any time.'] },
  { heading: 'Limitation of liability', body: ['To the extent permitted by law, we are not liable for any loss arising from your use of, or inability to use, this website or its content.'] },
  { heading: 'Changes and contact', body: [`We may update these terms from time to time; the date at the top shows the latest version. Questions about these terms can be sent to ${EMAIL}.`] },
];

export const CONTACT_INTERESTS = ['Website or web application', 'Custom software', 'AI assistant or AI integration', 'Business process automation', 'Data, dashboards & analytics', 'Mobile application', 'APIs & system integration', 'Cloud & deployment', 'Technology consulting', 'Something else'];
export const CONTACT_TIMELINES = ['As soon as possible', 'Within 1–3 months', 'In 3–6 months', 'Just exploring'];

// ---------- Media for the inner pages (Pexels stock; see public/assets/stock/CREDITS.md) ----------
export const VIDEOS = {
  team: { src: '/assets/video/team.mp4', poster: '/assets/video/team.jpg' },
  group: { src: '/assets/video/group.mp4', poster: '/assets/video/group.jpg' },
  data: { src: '/assets/video/data.mp4', poster: '/assets/video/data.jpg' },
  meeting: { src: '/assets/video/meeting.mp4', poster: '/assets/video/meeting.jpg' },
  code: { src: '/assets/stock/reel-code.mp4', poster: '/assets/stock/reel-code.jpg' },
  servers: { src: '/assets/stock/reel-servers.mp4', poster: '/assets/stock/reel-servers.jpg' },
  traffic: { src: '/assets/stock/reel-traffic.mp4', poster: '/assets/stock/reel-traffic.jpg' },
};

/** Background video for each page banner (the PAGE_IMAGES photo is used when video is not appropriate). */
export const PAGE_VIDEOS = {
  about: VIDEOS.team,
  services: VIDEOS.code,
  solutions: VIDEOS.data,
  industries: VIDEOS.traffic,
  work: VIDEOS.group,
  process: VIDEOS.servers,
  careers: VIDEOS.meeting,
};

/** One photo per solution, same order as SOLUTIONS. */
export const SOLUTION_IMAGES = [
  '/assets/solutions/sol-business.jpg', '/assets/solutions/sol-crm.jpg', '/assets/stock/project-edupilot.jpg', '/assets/solutions/sol-assistant.jpg',
  '/assets/solutions/sol-leads.jpg', '/assets/solutions/sol-ecommerce.jpg', '/assets/capabilities/cap-data.jpg', '/assets/solutions/sol-saas.jpg',
  '/assets/solutions/sol-workflow.jpg', '/assets/capabilities/cap-automation.jpg',
];

export const ABOUT_GALLERY = [
  { src: '/assets/video/meeting.jpg', caption: 'Discovery starts with conversation', wide: true },
  { src: '/assets/capabilities/cap-software.jpg', caption: 'Software engineering' },
  { src: '/assets/capabilities/cap-ai.jpg', caption: 'AI where it helps' },
  { src: '/assets/capabilities/cap-data.jpg', caption: 'Data you can act on' },
  { src: '/assets/capabilities/cap-cloud.jpg', caption: 'Deployed and maintained' },
];

export const CAREERS_GALLERY = [
  { src: '/assets/video/team.jpg', caption: 'Collaborative by default', wide: true },
  { src: '/assets/solutions/sol-saas.jpg', caption: 'Hands-on engineering', tall: true },
  { src: '/assets/solutions/sol-workflow.jpg', caption: 'Ideas on the wall' },
  { src: '/assets/video/group.jpg', caption: 'Focused work' },
];
