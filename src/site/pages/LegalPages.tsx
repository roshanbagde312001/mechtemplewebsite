import React from 'react';
import { LEGAL_UPDATED, PRIVACY, TERMS } from '../content';
import { Pill } from '../ui';
import { Block, PageHero } from './Layout';

function LegalPage({ title, sections }: { title: string; sections: { heading: string; body: string[] }[] }) {
  return (
    <>
      <PageHero crumbs={[{ label: title }]} label="Legal" title={title} intro={<p>Last updated {LEGAL_UPDATED}.</p>} />
      <Block>
        <article className="legal glass">
          {sections.map((section, i) => (
            <section key={section.heading}>
              <h2>{i + 1}. {section.heading}</h2>
              {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
        </article>
      </Block>
    </>
  );
}

export function PrivacyPage() {
  return <LegalPage title="Privacy policy" sections={PRIVACY} />;
}

export function TermsPage() {
  return <LegalPage title="Terms of use" sections={TERMS} />;
}

export function NotFoundPage() {
  return (
    <PageHero crumbs={[{ label: 'Not found' }]} label="Error 404" title={'This page does\nnot exist.'} intro={<p>The link may be old or mistyped. Try one of these instead.</p>}>
      <Pill to="/">Go to the home page</Pill>
      <Pill to="/services" variant="ghost">Our services</Pill>
      <Pill to="/contact" variant="ghost">Contact us</Pill>
    </PageHero>
  );
}
