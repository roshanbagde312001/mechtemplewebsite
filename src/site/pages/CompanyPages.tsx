import React from 'react';
import {
  AREAS, BRAND, BRAND_STATEMENT, CAREERS, COMMITMENTS, DIFFERENTIATORS, ENGAGEMENT, FACTS, FOUNDER, INTERSECTION, LIFECYCLE, MEDIUM_DESCRIPTION,
  ABOUT_GALLERY, CAREERS_GALLERY, JOURNEY_PHOTOS, PAGE_IMAGES, PAGE_VIDEOS, PHILOSOPHY_STEPS, PROJECTS, QUESTIONS, SHORT_DESCRIPTION, VIDEOS,
} from '../content';
import { Pill, pad } from '../ui';
import { Media, Mosaic, VideoBand } from './media';
import { Block, CtaBand, PageHero, usePageMeta } from './Layout';

export function AboutPage() {
  usePageMeta('About us', SHORT_DESCRIPTION);
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About' }]}
        label="Who we are"
        title={'An AI and technology\nengineering company.'}
        image={PAGE_IMAGES.about}
        video={PAGE_VIDEOS.about}
        intro={<p>{SHORT_DESCRIPTION}</p>}
      >
        <Pill to="/contact">Work with us</Pill>
        <Pill to="/services" variant="ghost">Our services</Pill>
      </PageHero>

      <Block label="Our story" title={'Not merely a\nwebsite agency.'}>
        <div className="split">
          <div className="prose" data-rv>
            {MEDIUM_DESCRIPTION.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <p>We don't focus only on writing code or creating websites. We focus on engineering systems that solve problems and deliver practical value: we identify processes that can be improved, design the right technical solution, build and connect the systems, and deploy something that works.</p>
          </div>
          <aside className="statement-card glass" data-rv>
            <p className="label">Our mission</p>
            <p className="statement-card__quote">{BRAND_STATEMENT}</p>
          </aside>
        </div>
      </Block>

      <Block label="Inside the work" title="What we spend our days on">
        <Mosaic items={ABOUT_GALLERY} />
      </Block>

      <Block label="Core philosophy" title={'Understand. Engineer.\nAutomate. Deliver.'}>
        <ol className="numbered-grid">
          {PHILOSOPHY_STEPS.map((step, i) => (
            <li key={step.title} className="glass" data-rv style={{ '--d': `${i * 60}ms` } as React.CSSProperties}>
              <small>{pad(i + 1)}</small><h3>{step.title}</h3><p>{step.detail}</p>
            </li>
          ))}
        </ol>
      </Block>

      <Block label="What we work across" title="The intersection we work at">
        <ul className="tag-cloud" data-rv>{INTERSECTION.map((item) => <li key={item}>{item}</li>)}</ul>
      </Block>

      <Block label="What we actually do" title={'Four areas.\nOne engineering mindset.'}>
        <div className="areas__grid">
          {AREAS.map((area, i) => (
            <article className="glass areas__card" key={area.title} data-rv style={{ '--d': `${(i % 2) * 70}ms` } as React.CSSProperties}>
              <span className="areas__letter">{area.letter}</span>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
              <ul className="chips">{area.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </Block>

      <Block label="What makes us different" title="How we approach the work">
        <div className="diff">
          {DIFFERENTIATORS.map((item, i) => (
            <article className="glass diff__card" key={item.title} data-rv style={{ '--d': `${(i % 3) * 70}ms` } as React.CSSProperties}>
              <small>{pad(i + 1)}</small><h3>{item.title}</h3><p>{item.detail}</p>
            </article>
          ))}
        </div>
      </Block>

      <Block label="Leadership" title="The team behind the work">
        <div className="founder glass" data-rv>
          <div className="founder__mark" aria-hidden="true">{FOUNDER.name.split(' ').map((part) => part[0]).join('')}</div>
          <div>
            <p className="label">{FOUNDER.role}</p>
            <h3>{FOUNDER.name}</h3>
            <p>{FOUNDER.focus}</p>
            <ul className="chips">{FOUNDER.expertise.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </Block>

      <VideoBand
        video={VIDEOS.meeting}
        label="How we work together"
        title="Close to the problem, close to the people."
        text="Short feedback loops, plain language and working software you can see early."
      />

      <Block label="Our commitments" title={'Credibility is\npart of the product.'} lead={<p>We would rather under-promise and deliver. These are the rules we hold ourselves to when we describe our work.</p>}>
        <div className="numbered-grid numbered-grid--two">
          {COMMITMENTS.map((item, i) => (
            <article key={item.title} className="glass" data-rv style={{ '--d': `${(i % 2) * 60}ms` } as React.CSSProperties}>
              <small>{pad(i + 1)}</small><h3>{item.title}</h3><p>{item.detail}</p>
            </article>
          ))}
        </div>
      </Block>

      <Block label="At a glance" title={`${BRAND} in numbers`} lead={<p>Counts of what is described on this website. We do not publish client or performance figures we cannot evidence.</p>}>
        <ol className="facts">
          {FACTS.map((fact, i) => <li key={fact.label} data-rv style={{ '--d': `${i * 60}ms` } as React.CSSProperties}><small>{pad(i + 1)}</small><b>{fact.value}</b><p>{fact.label}</p></li>)}
        </ol>
      </Block>

      <CtaBand />
    </>
  );
}

export function ProcessPage() {
  usePageMeta('How we work', 'Our seven-step project lifecycle: discovery, requirement analysis, architecture and design, development, testing, deployment, and support.');
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Process' }]}
        label="How we work with customers"
        title={'Seven steps, from\nproblem to production.'}
        image={PAGE_IMAGES.process}
        video={PAGE_VIDEOS.process}
        intro={<p>A clear lifecycle keeps projects predictable. You always know what we are doing, what we need from you, and what comes next.</p>}
      >
        <Pill to="/contact">Start with discovery</Pill>
      </PageHero>

      <Block>
        <ol className="timeline">
          {LIFECYCLE.map((stage, i) => (
            <li key={stage.title} data-rv>
              <div className="timeline__marker"><span>{pad(i + 1)}</span></div>
              <div className="timeline__body glass">
                <div>
                  <p className="label">Step {pad(i + 1)} · {stage.verb}</p>
                  <h2>{stage.title}</h2>
                  <ul className="chips">{stage.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <Media src={JOURNEY_PHOTOS[i]} className="timeline__media" />
              </div>
            </li>
          ))}
        </ol>
      </Block>

      <Block label="Engagement model" title={'Begin focused.\nGrow when it makes sense.'}>
        <ol className="numbered-grid">
          {ENGAGEMENT.map((step, i) => (
            <li key={step.title} className="glass" data-rv style={{ '--d': `${i * 60}ms` } as React.CSSProperties}>
              <small>{pad(i + 1)}</small><h3>{step.title}</h3><p>{step.detail}</p>
            </li>
          ))}
        </ol>
      </Block>

      <VideoBand
        video={VIDEOS.data}
        label="Step 06 and beyond"
        title="Deployed, monitored and improved."
        text="Launch is a milestone, not the finish line. Support and improvement keep the system useful as your business changes."
      />

      <Block label="Questions" title="Frequently asked">
        <dl className="faq-list">
          {QUESTIONS.map((item) => <div key={item.q} className="glass" data-rv><dt>{item.q}</dt><dd>{item.a}</dd></div>)}
        </dl>
      </Block>

      <CtaBand title="Ready for step one?" text="Discovery starts with a conversation about your business, the problem and what a good outcome looks like. No commitment needed." />
    </>
  );
}

export function WorkPage() {
  usePageMeta('Work', 'Selected products and projects: EduPilot, CityTwin Nagpur and SalonSphere.');
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Work' }]}
        label="Products and projects"
        title={'Selected work\nand concepts.'}
        image={PAGE_IMAGES.work}
        video={PAGE_VIDEOS.work}
        intro={<p>A look at the products and projects we have been building. We describe each one by its purpose; we do not publish client results or deployment claims we cannot evidence.</p>}
      />

      <Block>
        <div className="work-list">
          {PROJECTS.map((project, i) => (
            <article key={project.name} className="work-item glass" data-rv>
              <Media src={project.photo} className="work-item__media" />
              <div className="work-item__body">
                <p className="label">{pad(i + 1)} · {project.category}</p>
                <h2>{project.name}</h2>
                <p className="work-item__lead">{project.description}</p>
                <p>{project.details}</p>
                <p className="note">Photo is an illustration. Feature-level specifications were not included in the available brief, and no commercial deployment or client result is implied.</p>
              </div>
            </article>
          ))}
        </div>
      </Block>

      <CtaBand title="Want something built for your business?" />
    </>
  );
}

export function CareersPage() {
  usePageMeta('Careers', `Careers at ${BRAND}: software engineering, AI and machine learning, data engineering, UI/UX design, cloud and DevOps.`);
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Careers' }]}
        label="Careers"
        title={'Build what\ncomes next with us.'}
        image={PAGE_IMAGES.careers}
        video={PAGE_VIDEOS.careers}
        intro={<p>{CAREERS.intro}</p>}
      >
        <Pill href={CAREERS.apply}>Send an open application</Pill>
      </PageHero>

      <Block label="Areas we work in" title="Where you could contribute">
        <div className="numbered-grid">
          {CAREERS.areas.map((area, i) => (
            <article key={area.title} className="glass" data-rv style={{ '--d': `${(i % 3) * 60}ms` } as React.CSSProperties}>
              <small>{pad(i + 1)}</small><h3>{area.title}</h3><p>{area.detail}</p>
            </article>
          ))}
        </div>
      </Block>

      <Block label="Life at Preemptech" title="How the work looks">
        <Mosaic items={CAREERS_GALLERY} />
      </Block>

      <Block label="What we value" title="How we like to work">
        <div className="numbered-grid numbered-grid--two">
          {CAREERS.values.map((value, i) => (
            <article key={value.title} className="glass" data-rv style={{ '--d': `${(i % 2) * 60}ms` } as React.CSSProperties}>
              <small>{pad(i + 1)}</small><h3>{value.title}</h3><p>{value.detail}</p>
            </article>
          ))}
        </div>
      </Block>

      <Block label="Open roles" title="No advertised openings right now">
        <div className="statement-card glass" data-rv>
          <p>When we have specific roles they will be listed here. In the meantime, send an open application with your CV and links to your work (GitHub, portfolio or LinkedIn) and tell us which area interests you. We read every message.</p>
          <div className="hero__cta"><Pill href={CAREERS.apply}>Email your application</Pill></div>
        </div>
      </Block>
    </>
  );
}
