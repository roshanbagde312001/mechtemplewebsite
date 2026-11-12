import React, { useState } from 'react';
import { ArrowUpRight, Briefcase, Building2, Factory, GraduationCap, Rocket, Store, Users } from 'lucide-react';
import {
  AI_APPROACH, CAPABILITIES, CUSTOMERS_B2B, CUSTOMERS_B2C, INDUSTRIES, INDUSTRY_PHOTOS, LIFECYCLE, PAGE_IMAGES, PAGE_VIDEOS, QUESTIONS, SERVICE_CATEGORY,
  SERVICE_IMAGES, SERVICES, SOLUTION_IMAGES, SOLUTIONS, VIDEOS, WORKFLOW, serviceSlug,
} from '../content';
import { Link } from '../router';
import { Pill, pad } from '../ui';
import { Block, CtaBand, PageHero, usePageMeta } from './Layout';
import { Media, VideoBand } from './media';
import { NotFoundPage } from './LegalPages';

const INDUSTRY_ICONS = [Building2, GraduationCap, Store, Users, Briefcase, Factory, Rocket];

export function ServicesPage() {
  usePageMeta('Services', 'Website and web application development, custom software, AI, machine learning, automation, data engineering, mobile apps, APIs, cloud deployment, UI/UX and technology consulting.');
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Services' }]}
        label="What we do"
        title={'Services built\naround your business.'}
        image={PAGE_IMAGES.services}
        video={PAGE_VIDEOS.services}
        intro={<p>Twelve services across software engineering, AI, automation, data and infrastructure. Use one on its own, or combine them into a complete system. Every engagement starts with understanding the problem, not the technology.</p>}
      >
        <Pill to="/contact">Discuss a project</Pill>
        <Pill to="/process" variant="ghost">How we work</Pill>
      </PageHero>

      <Block label="Core capabilities" title={'Eight areas,\none engineering team.'}>
        <ul className="cap-grid">
          {CAPABILITIES.map((cap, i) => (
            <li key={cap.title} className="cap-card glass" data-rv style={{ '--d': `${(i % 4) * 60}ms` } as React.CSSProperties}>
              <img src={cap.image} alt="" loading="lazy" />
              <div>
                <small>{pad(i + 1)}</small>
                <h3>{cap.title}</h3>
                <p>{cap.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      <Block label="Service catalog" title={'Twelve services.\nBuilt to connect.'} lead={<p>Open any service for its full scope: what we build, what you receive and how we approach it.</p>}>
        <ul className="link-grid">
          {SERVICES.map((service, i) => (
            <li key={service.title} data-rv style={{ '--d': `${(i % 3) * 60}ms` } as React.CSSProperties}>
              <Link className="link-card glass" to={`/services/${serviceSlug(i)}`}>
                <small>{pad(i + 1)} · {CAPABILITIES[SERVICE_CATEGORY[i]].title}</small>
                <strong>{service.title}</strong>
                <span>{service.intro}</span>
                <em>View service <ArrowUpRight size={14} /></em>
              </Link>
            </li>
          ))}
        </ul>
      </Block>

      <VideoBand
        video={VIDEOS.data}
        label="Software, AI and automation"
        title="Connected systems that move information for you."
        text="Applications, databases, APIs and AI services working as one, so your team spends less time moving data by hand."
      />

      <Block label="Combined into systems" title={'Services become\ncomplete solutions.'} lead={<p>Most businesses need more than one service. We combine them into platforms such as CRMs, education management systems, AI assistants and automated lead management.</p>}>
        <div className="hero__cta" data-rv><Pill to="/solutions" variant="ghost">Explore solutions</Pill></div>
      </Block>

      <CtaBand />
    </>
  );
}

export function ServiceDetailPage({ slug }: { slug: string }) {
  const index = SERVICES.findIndex((_, i) => serviceSlug(i) === slug);
  const service = SERVICES[index];
  usePageMeta(service ? service.title : 'Page not found', service?.intro);
  if (!service) return <NotFoundPage />;

  const category = CAPABILITIES[SERVICE_CATEGORY[index]];
  const related = SERVICES.map((s, i) => ({ s, i })).filter(({ i }) => i !== index && SERVICE_CATEGORY[i] === SERVICE_CATEGORY[index]);
  const fill = SERVICES.map((s, i) => ({ s, i })).filter(({ i }) => i !== index && !related.some((r) => r.i === i));
  const others = [...related, ...fill.slice(index, index + 3), ...fill].slice(0, 3);
  const isAI = slug === 'artificial-intelligence-development';
  const isAutomation = slug === 'intelligent-process-automation';

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Services', to: '/services' }, { label: service.title }]}
        label={`Service ${pad(index + 1)} · ${category.title}`}
        title={service.title}
        image={SERVICE_IMAGES[index]}
        intro={<p>{service.intro}</p>}
      >
        <Pill to={`/contact?interest=${encodeURIComponent(service.title)}`}>Discuss this service</Pill>
        <Pill to="/services" variant="ghost">All services</Pill>
      </PageHero>

      <Block label="Scope" title="What this covers">
        <div className="scope-grid">
          {service.groups.map((group, i) => (
            <article key={group.heading} className="scope-card glass" data-rv style={{ '--d': `${(i % 2) * 70}ms` } as React.CSSProperties}>
              <h3>{group.heading}</h3>
              <ul className="ticks">{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
        {service.note && <p className="note" data-rv>{service.note}</p>}
      </Block>

      <Block className="fit">
        <div className="media-split">
          <Media src={category.image} ratio="4 / 3" parallax />
          <div className="media-split__copy" data-rv>
            <p className="label">Where it fits</p>
            <h2 className="t-h2">Part of {category.title}</h2>
            <p>{category.description}</p>
            <ul className="chips">{category.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </Block>

      {isAI && (
        <Block label="Our approach" title="How we implement AI">
          <ol className="steps">{AI_APPROACH.map((step, i) => <li key={step} className="glass" data-rv><small>{pad(i + 1)}</small><span>{step}</span></li>)}</ol>
        </Block>
      )}
      {isAutomation && (
        <Block label="Anatomy" title="What a workflow contains">
          <ol className="steps">{WORKFLOW.map((step, i) => <li key={step} className="glass" data-rv><small>{pad(i + 1)}</small><span>{step}</span></li>)}</ol>
        </Block>
      )}

      <Block label="How we deliver" title={'From discovery\nto support.'} lead={<p>Every service follows the same seven-step lifecycle, so you always know what happens next.</p>}>
        <ol className="lifecycle-strip">
          {LIFECYCLE.map((stage, i) => <li key={stage.title} data-rv><small>{pad(i + 1)}</small><strong>{stage.title}</strong><span>{stage.verb}</span></li>)}
        </ol>
        <div className="hero__cta" data-rv><Pill to="/process" variant="ghost">The full process</Pill></div>
      </Block>

      <Block label="Related" title="Services that pair well">
        <ul className="link-grid">
          {others.map(({ s, i }) => (
            <li key={s.title} data-rv>
              <Link className="link-card glass" to={`/services/${serviceSlug(i)}`}>
                <small>{pad(i + 1)} · {CAPABILITIES[SERVICE_CATEGORY[i]].title}</small>
                <strong>{s.title}</strong>
                <span>{s.intro}</span>
                <em>View service <ArrowUpRight size={14} /></em>
              </Link>
            </li>
          ))}
        </ul>
      </Block>

      <Block label="Questions" title="Worth asking first">
        <dl className="faq-list">
          {QUESTIONS.slice(0, 4).map((item) => <div key={item.q} className="glass" data-rv><dt>{item.q}</dt><dd>{item.a}</dd></div>)}
        </dl>
      </Block>

      <CtaBand title={`Talk to us about ${service.title.toLowerCase()}.`} />
    </>
  );
}

function SolutionCard({ index }: { index: number }) {
  const solution = SOLUTIONS[index];
  const modules = solution.modules ?? [];
  const [open, setOpen] = useState(false);
  const shown = open ? modules : modules.slice(0, 4);
  return (
    <article className="sol-card glass" id={`solution-${index + 1}`} data-rv style={{ '--d': `${(index % 3) * 70}ms` } as React.CSSProperties}>
      <div className="sol-card__media">
        <img src={SOLUTION_IMAGES[index]} alt="" loading="lazy" decoding="async" />
        <span className="sol-card__num">{pad(index + 1)}</span>
      </div>
      <div className="sol-card__body">
        <h3>{solution.title}</h3>
        <p>{solution.description}</p>
        <ul className="chips">
          {shown.map((module) => <li key={module}>{module}</li>)}
          {modules.length > 4 && (
            <li className="chips__more">
              <button type="button" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Show less' : `+${modules.length - 4} more`}</button>
            </li>
          )}
        </ul>
      </div>
    </article>
  );
}

export function SolutionsPage() {
  usePageMeta('Solutions', 'Business management systems, CRM, education management, AI business assistants, automated lead management, e-commerce, BI platforms, SaaS and workflow systems.');
  const featured = SOLUTIONS.findIndex((solution) => solution.flow);
  const flow = SOLUTIONS[featured].flow!;
  const rest = SOLUTIONS.map((_, i) => i).filter((i) => i !== featured);
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Solutions' }]}
        label="Complete business solutions"
        title={'Services, combined into\nsystems that run a business.'}
        image={PAGE_IMAGES.solutions}
        video={PAGE_VIDEOS.solutions}
        intro={<p>Examples of systems we engineer by combining our services, each one built around the organisation's own requirements rather than sold off the shelf.</p>}
      >
        <Pill to="/contact">Discuss your system</Pill>
        <Pill to="/services" variant="ghost">Our services</Pill>
      </PageHero>

      <nav className="jump" aria-label="Solutions on this page" data-rv>
        {SOLUTIONS.map((solution, i) => <a key={solution.title} href={`#solution-${i + 1}`}><small>{pad(i + 1)}</small>{solution.title}</a>)}
      </nav>

      <Block label="Featured solution" title={'Every enquiry,\nhandled automatically.'}>
        <article className="featured glass" id={`solution-${featured + 1}`} data-rv>
          <Media src={SOLUTION_IMAGES[featured]} className="featured__media">
            <figcaption><small>Solution {pad(featured + 1)}</small>{SOLUTIONS[featured].title}</figcaption>
          </Media>
          <div className="featured__body">
            <p>{SOLUTIONS[featured].description} Here is how one inquiry moves through it, with no retyping and nothing forgotten.</p>
            <ol className="pipeline" style={{ '--steps': flow.length } as React.CSSProperties}>
              {flow.map((step, i) => (
                <li key={step} style={{ '--i': i } as React.CSSProperties}>
                  <span className="pipeline__dot" aria-hidden="true" />
                  <small>{pad(i + 1)}</small>
                  <b>{step}</b>
                </li>
              ))}
            </ol>
            <div className="hero__cta"><Pill to="/services/intelligent-process-automation" variant="ghost">Automation service</Pill></div>
          </div>
        </article>
      </Block>

      <Block label="All solutions" title={'Nine more systems\nwe can engineer.'} lead={<p>Each card lists possible modules. Your version includes the ones your organisation actually needs.</p>}>
        <div className="sol-grid">
          {rest.map((i) => <SolutionCard key={i} index={i} />)}
        </div>
      </Block>

      <VideoBand
        video={VIDEOS.team}
        label="How they are built"
        title="Engineered around your workflow, not a template."
        text="We start with how your team really works, then design the modules, data and integrations to fit it."
      />

      <Block label="Built from our services" title="The building blocks">
        <ul className="link-grid">
          {[0, 1, 3, 5, 6, 8].map((i) => (
            <li key={i} data-rv>
              <Link className="link-card glass" to={`/services/${serviceSlug(i)}`}>
                <small>{pad(i + 1)} · {CAPABILITIES[SERVICE_CATEGORY[i]].title}</small>
                <strong>{SERVICES[i].title}</strong>
                <span>{SERVICES[i].intro}</span>
                <em>View service <ArrowUpRight size={14} /></em>
              </Link>
            </li>
          ))}
        </ul>
      </Block>

      <CtaBand title="Need a system like one of these?" />
    </>
  );
}

export function IndustriesPage() {
  usePageMeta('Industries', 'Software, AI and automation for construction, education, retail and e-commerce, recruitment, professional services, SMBs and startups.');
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Industries' }]}
        label="Industries we serve"
        title={'Different industries.\nDistinct ways of working.'}
        image={PAGE_IMAGES.industries}
        video={PAGE_VIDEOS.industries}
        intro={<p>We build applications around each domain's requirements: the people involved, the processes they follow and the systems they already use.</p>}
      />

      <Block>
        <ul className="grid industries-grid">
          {INDUSTRIES.map((name, i) => {
            const Icon = INDUSTRY_ICONS[i];
            return <li key={name} data-rv style={{ '--d': `${(i % 3) * 50}ms` } as React.CSSProperties}><img className="grid__photo" src={INDUSTRY_PHOTOS[i]} alt="" loading="lazy" /><Icon size={26} strokeWidth={1.4} /><span>{name}</span></li>;
          })}
        </ul>
      </Block>

      <VideoBand
        video={VIDEOS.group}
        label="Same engineering, different context"
        title="We learn how your industry works before we build."
      />

      <Block label="Who we work with" title={'Built for businesses.\nAnd the people they serve.'}>
        <div className="customer-grid">
          {CUSTOMERS_B2B.map((group, i) => (
            <article key={group.title} className="glass customers__card" data-rv style={{ '--d': `${(i % 3) * 60}ms` } as React.CSSProperties}>
              <small>B2B</small>
              <h3>{group.title}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
          <article className="glass customers__card customers__card--b2c" data-rv>
            <small>B2C</small>
            <h3>Individual users</h3>
            <p>Digital products and applications for individual consumers, presented once they are ready to offer.</p>
            <ul className="chips">{CUSTOMERS_B2C.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </Block>

      <CtaBand title="Working in a different industry?" text="The engineering is the same; the context is what changes. Tell us how your organisation works and we will tell you honestly where technology can help." />
    </>
  );
}
