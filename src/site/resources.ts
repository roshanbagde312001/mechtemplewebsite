// Guides and articles for /resources. Each article is plain data rendered by pages/ResourcePages.tsx, listed in
// seo.ts (routes, Article schema, sitemap with real dates) and in llms.txt / llms-full.txt.
//
// Publishing rules:
// - status 'draft' keeps an article out of the build, the sitemap and the navigation.
// - `updated` must change only when the content changes (it becomes the sitemap lastmod and dateModified).
// - No statistics, prices, client names or results without a cited source (`sources`).
// - Paragraph text may contain internal links written as [anchor text](/path).
import { WORKFLOW, LEAD_STEPS } from './content';

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'table'; caption: string; columns: string[]; rows: string[][] };
export type ArticleSection = { heading: string; blocks: ArticleBlock[] };
export type Article = {
  slug: string;
  status: 'published' | 'draft';
  /** H1 and headline. */
  title: string;
  /** Search title before " | PrimpTech" (max ~53 characters). */
  seoTitle: string;
  description: string;
  /** One-paragraph direct answer shown first on the page and on cards. */
  summary: string;
  category: 'Guide' | 'Insight' | 'Case study';
  /** Primary search query this article targets (one article per query, see SEO_KEYWORD_MAPPING.csv). */
  keyword: string;
  published: string;
  updated: string;
  /** Indexes into SERVICES: the service pages this guide supports (linked both ways). */
  services: number[];
  sections: ArticleSection[];
  faqs: { q: string; a: string }[];
  sources?: { label: string; url: string }[];
};

const ARTICLES_DATA: Article[] = [
  {
    slug: 'custom-software-vs-off-the-shelf-software',
    status: 'published',
    title: 'Custom software vs off-the-shelf software: how to choose',
    seoTitle: 'Custom Software vs Off-the-Shelf Software',
    description: 'When to buy existing software and when to build your own: a practical comparison of cost, fit, control and integration, with a step-by-step way to decide.',
    summary: 'Choose off-the-shelf software when your need is common and an existing product fits your process with little adaptation. Choose custom software when your process is specific, when generic tools force costly workarounds, or when the software itself is part of how you compete. Many businesses end up in between: existing products, connected and extended with custom integrations.',
    category: 'Guide',
    keyword: 'custom software vs off-the-shelf software',
    published: '2026-11-26',
    updated: '2026-11-26',
    services: [2, 11, 8],
    sections: [
      {
        heading: 'What is off-the-shelf software?',
        blocks: [
          { type: 'p', text: 'Off-the-shelf software is a ready-made product built for many organizations with similar needs: accounting packages, standard CRMs, e-commerce platforms, project management tools. You pay a licence or subscription, configure the settings the product allows, and start using it. The vendor decides the features, the roadmap and how the product changes over time.' },
        ],
      },
      {
        heading: 'What is custom software?',
        blocks: [
          { type: 'p', text: 'Custom software is designed and built for one organization\'s requirements: its workflows, user roles, data and the systems it already uses. You fund the design and development, and the result does what your process needs rather than what a product\'s average customer needs. See our [custom software development](/services/custom-software-development) service for what this involves in practice.' },
        ],
      },
      {
        heading: 'How do they compare?',
        blocks: [
          {
            type: 'table',
            caption: 'Custom software compared with off-the-shelf software',
            columns: ['Factor', 'Off-the-shelf software', 'Custom software'],
            rows: [
              ['Fit to your process', 'You adapt your process to the product', 'The software is built around your process'],
              ['Upfront cost', 'Low: setup plus licence or subscription', 'Higher: design and development'],
              ['Ongoing cost', 'Subscriptions, often per user, for as long as you use it', 'Hosting, maintenance and improvements'],
              ['Time to start', 'Days or weeks', 'After design, development and testing'],
              ['Control of features', 'Vendor roadmap; requests may never be built', 'You decide what is built and when'],
              ['Integrations', 'Limited to the connectors the vendor offers', 'Built for the systems you actually use'],
              ['Data', 'Stored in the vendor\'s format and platform', 'Stored where and how you decide'],
              ['Risk', 'Vendor price changes, discontinued features', 'Depends on the quality of the build and its maintenance'],
            ],
          },
        ],
      },
      {
        heading: 'When is off-the-shelf software the better choice?',
        blocks: [
          { type: 'list', items: [
            'The need is common and well served by existing products, such as accounting, email or basic project tracking.',
            'You need something working this week, not in a few months.',
            'The process is not a differentiator for your business, so doing it the standard way is fine.',
            'A product covers most of what you need, and the gaps can be closed with configuration or a small integration.',
          ] },
        ],
      },
      {
        heading: 'When is custom software the better choice?',
        blocks: [
          { type: 'list', items: [
            'Your team works around the tools: spreadsheets on the side, re-typing data between systems, manually maintained records.',
            'No product matches the workflow, the user roles or the rules your business actually follows.',
            'Departments use separate systems that cannot share data, so nobody has a consolidated view.',
            'Per-user subscription costs keep growing with your team, while you use a fraction of the features.',
            'The software is part of your offering to customers, or of how you compete.',
          ] },
        ],
      },
      {
        heading: 'Is there a middle path?',
        blocks: [
          { type: 'p', text: 'Often, yes. Many businesses keep the products that work and add custom pieces around them: an [API integration](/services/api-development-and-integration) that moves data between two systems, an [automated workflow](/services/intelligent-process-automation) that removes a manual handoff, or a small internal application for the one process no product covers. This keeps costs down while fixing the part that actually hurts.' },
        ],
      },
      {
        heading: 'How to decide, step by step',
        blocks: [
          { type: 'list', ordered: true, items: [
            'Write down the process as it really happens today, including the workarounds.',
            'List the requirements that matter: user roles, rules, data, reports and the systems it must connect to.',
            'Shortlist two or three existing products and test them against those requirements, not against their feature lists.',
            'For each gap, decide whether configuration, an integration or a process change can close it.',
            'Estimate the cost over several years for both options, including subscriptions, maintenance and the time lost to workarounds.',
            'If you build, start with a focused first release that covers the most important workflow, then extend it.',
          ] },
          { type: 'p', text: 'Our [technology consulting](/services/consulting-and-digital-transformation) service covers this kind of assessment, including an honest recommendation to buy rather than build when a product already fits.' },
        ],
      },
      {
        heading: 'What affects the cost of custom software?',
        blocks: [
          { type: 'list', items: [
            'Scope: the number of modules, screens and features.',
            'User roles and permissions, and how different each role\'s workflow is.',
            'Integrations with existing systems, and whether those systems offer APIs.',
            'Data migration from spreadsheets or older software.',
            'Design complexity and the devices it must work on.',
            'Testing, deployment, documentation and the level of ongoing support.',
          ] },
        ],
      },
    ],
    faqs: [
      { q: 'Can we start with off-the-shelf software and move to custom software later?', a: 'Yes, and it is a common path. Choose a product that lets you export your data in a usable format, so that migrating to custom software later is possible without losing your records.' },
      { q: 'Who owns the code in a custom software project?', a: 'Ownership is set by the contract, not by default. Before work starts, agree in writing who owns the intellectual property, whether you receive the source code, and what is handed over at the end of the project.' },
      { q: 'Is custom software more secure than off-the-shelf software?', a: 'Not automatically. Security depends on how the software is designed, built, tested and maintained. Popular products are tested by many users but are also common targets; custom software is less exposed but needs secure engineering and regular updates.' },
    ],
  },
  {
    slug: 'how-to-automate-repetitive-business-processes',
    status: 'published',
    title: 'How to automate repetitive business processes: a step-by-step guide',
    seoTitle: 'How to Automate Repetitive Business Processes',
    description: 'A step-by-step guide to business process automation: choosing the first process, mapping it, rules vs AI, connecting systems and measuring the results.',
    summary: 'To automate a repetitive business process, pick one frequent, rule-based process, map how it works today, simplify it, then build a workflow that is triggered automatically, validates its input, applies rules (with AI only for steps that need interpretation), updates the right systems and notifies people. Test it with real cases, launch it, and measure the time and errors it removes before automating the next process.',
    category: 'Guide',
    keyword: 'how to automate business processes',
    published: '2026-11-26',
    updated: '2026-11-26',
    services: [5, 3, 8],
    sections: [
      {
        heading: 'Which processes are worth automating?',
        blocks: [
          { type: 'p', text: 'The best first candidates are processes that happen often, follow clear rules and cost time or errors when done by hand. Signs a process is ready:' },
          { type: 'list', items: [
            'The same steps are repeated many times a week.',
            'Someone copies data from one system, email or form into another.',
            'Work waits because a person has to notice it and pass it on.',
            'Mistakes come from missed steps, typos or forgotten follow-ups.',
            'The rules can be written down: if this, then that.',
          ] },
        ],
      },
      {
        heading: 'Step 1: List your repetitive processes',
        blocks: [
          { type: 'p', text: 'Ask each team which tasks they repeat and which ones they dislike. Typical answers: handling new enquiries, data entry, approvals, generating reports, sending reminders and processing forms or documents.' },
        ],
      },
      {
        heading: 'Step 2: Choose the first process',
        blocks: [
          { type: 'p', text: 'Score each candidate on frequency, clarity of rules, the cost of errors and how many systems it touches. Start with one that is frequent and clearly rule-based but not business-critical, so that the first project is quick to deliver and safe to learn from.' },
        ],
      },
      {
        heading: 'Step 3: Map the process as it really happens',
        blocks: [
          { type: 'p', text: 'Write down every step, who does it, which system or document is involved and what decisions are made. Include the exceptions and workarounds: they are where most automation projects run into trouble.' },
        ],
      },
      {
        heading: 'Step 4: Simplify before you automate',
        blocks: [
          { type: 'p', text: 'Remove steps that no longer serve a purpose and agree on one way of doing things. Automating a confusing process only makes the confusion faster.' },
        ],
      },
      {
        heading: 'Step 5: Decide which steps need rules and which need AI',
        blocks: [
          { type: 'p', text: 'Most steps only need rules: when a form is submitted, create a record and notify the owner. Use AI only for steps that need interpretation, such as reading a free-text email, classifying an enquiry or extracting fields from a document. Our [AI development](/services/artificial-intelligence-development) service covers those steps; the rest is conventional [process automation](/services/intelligent-process-automation).' },
        ],
      },
      {
        heading: 'Step 6: Design the workflow',
        blocks: [
          { type: 'p', text: 'A dependable automated workflow has the same building blocks, whatever the process:' },
          { type: 'list', ordered: true, items: WORKFLOW.map((step) => step) },
          { type: 'p', text: 'Validation and monitoring are the steps most often skipped, and the ones that make a workflow trustworthy: invalid input is caught early, and failures are visible instead of silent.' },
        ],
      },
      {
        heading: 'Step 7: Connect the systems',
        blocks: [
          { type: 'p', text: 'Check which of your tools offer APIs, webhooks or exports, and what permissions are needed. Where systems cannot talk to each other directly, an [API integration](/services/api-development-and-integration) or a small connecting service is usually the answer. Integrations always depend on what each system exposes.' },
        ],
      },
      {
        heading: 'Step 8: Test with real cases, then launch',
        blocks: [
          { type: 'p', text: 'Run the workflow on real past examples, including the awkward ones, before switching it on. After launch, keep a person able to review exceptions and watch the monitoring for the first weeks.' },
        ],
      },
      {
        heading: 'Step 9: Measure the result',
        blocks: [
          { type: 'p', text: 'Measure the process before and after: time spent per task, response time, error rate and the volume handled. Those numbers show whether the automation worked and help choose the next process to automate.' },
        ],
      },
      {
        heading: 'Example: automated lead management',
        blocks: [
          { type: 'p', text: 'An enquiry that arrives through a website form can move through these steps without anyone retyping it:' },
          { type: 'list', ordered: true, items: LEAD_STEPS.map((step) => step) },
          { type: 'p', text: 'This is one of the [business solutions](/solutions) we engineer. It is an illustrative workflow, not a client result.' },
        ],
      },
      {
        heading: 'Common mistakes to avoid',
        blocks: [
          { type: 'list', items: [
            'Automating a broken process instead of fixing it first.',
            'Starting with the most complex, business-critical process.',
            'Ignoring exceptions, so the workflow fails on the first unusual case.',
            'Adding AI to steps that simple rules would handle more reliably.',
            'No monitoring, so failures go unnoticed until a customer complains.',
            'Not telling the team how the new workflow works and who handles exceptions.',
          ] },
        ],
      },
    ],
    faqs: [
      { q: 'Do I need AI to automate business processes?', a: 'Usually not for most steps. Rule-based automation handles structured inputs such as forms and status changes. AI is useful only for steps that need interpretation, such as understanding free-text messages or reading documents.' },
      { q: 'Which processes should not be automated?', a: 'Processes that happen rarely, change constantly, depend mainly on human judgement or relationships, or where an error would be very costly without human review. These can still be partly automated, with a person approving the important decisions.' },
      { q: 'How long does it take to automate a business process?', a: 'It depends on the number of steps, the systems involved and whether they offer APIs. A single, well-defined workflow between systems with good APIs is a much smaller project than one that spans many departments, documents and legacy systems.' },
    ],
  },
];

const wordCount = (article: Article) => [article.summary, ...article.sections.flatMap((section) => [section.heading, ...section.blocks.flatMap((block) =>
  block.type === 'p' ? [block.text] : block.type === 'list' ? block.items : [block.caption, ...block.rows.flat()])]), ...article.faqs.flatMap((f) => [f.q, f.a])]
  .join(' ').split(/\s+/).length;

/** Published articles, newest first, with reading time. */
export const ARTICLES = ARTICLES_DATA
  .filter((article) => article.status === 'published')
  .sort((a, b) => b.published.localeCompare(a.published))
  .map((article) => ({ ...article, readingMinutes: Math.max(1, Math.round(wordCount(article) / 200)) }));
export type PublishedArticle = (typeof ARTICLES)[number];

export const getArticle = (slug: string) => ARTICLES.find((article) => article.slug === slug) ?? null;
/** Published guides that support a service page (by SERVICES index). */
export const articlesForService = (serviceIndex: number) => ARTICLES.filter((article) => article.services.includes(serviceIndex));
/** Plain text with [anchor](/path) links reduced to their anchor text (for schema, llms.txt). */
export const plainText = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
