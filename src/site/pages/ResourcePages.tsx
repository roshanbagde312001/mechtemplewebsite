// /resources (guide hub) and /resources/<slug> (one guide). Content lives in ../resources.ts.
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BRAND, CAPABILITIES, SERVICE_CATEGORY, SERVICE_IMAGES, SERVICES, serviceSlug } from '../content';
import { ARTICLES, getArticle, type ArticleBlock } from '../resources';
import { Link } from '../router';
import { Pill, pad } from '../ui';
import { Block, CtaBand, PageHero } from './Layout';
import { NotFoundPage } from './LegalPages';

/** Banner photo for a guide: the photo of its main related service. */
const HERO_IMAGE = SERVICE_IMAGES;

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
/** "26 November 2026" from "2026-11-26" (no locale APIs, so prerendered and hydrated output always match). */
const formatDate = (iso: string) => { const [y, m, d] = iso.split('-').map(Number); return `${d} ${MONTHS[m - 1]} ${y}`; };

/** Paragraph text with [anchor](/path) internal links turned into real links. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return <>{parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    return match ? <Link key={i} to={match[2]}>{match[1]}</Link> : <React.Fragment key={i}>{part}</React.Fragment>;
  })}</>;
}

function ArticleBlockView({ block }: { block: ArticleBlock }) {
  if (block.type === 'p') return <p><RichText text={block.text} /></p>;
  if (block.type === 'list') {
    const items = block.items.map((item) => <li key={item}><RichText text={item} /></li>);
    return block.ordered ? <ol className="article__list article__list--ordered">{items}</ol> : <ul className="article__list">{items}</ul>;
  }
  return (
    <div className="compare glass">
      <table>
        <caption className="sr-only">{block.caption}</caption>
        <thead><tr>{block.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
        <tbody>{block.rows.map(([first, ...rest]) => <tr key={first}><th scope="row">{first}</th>{rest.map((cell, i) => <td key={i}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export function ResourcesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Resources' }]}
        label="Guides"
        title={'Guides for building\nbetter business software.'}
        image="/assets/capabilities/cap-software.jpg"
        intro={<p>Practical, plain-language guides on software development, AI and automation, written from how we plan and engineer projects. Each one links to the <Link to="/services">service</Link> it relates to.</p>}
      />
      <Block label="All guides" title="Latest guides">
        <ul className="link-grid">
          {ARTICLES.map((article) => (
            <li key={article.slug} data-rv>
              <Link className="link-card glass" to={`/resources/${article.slug}`}>
                <small>{article.category} · {article.readingMinutes} min read · {formatDate(article.updated)}</small>
                <strong>{article.title}</strong>
                <span>{article.summary}</span>
                <em>Read the guide <ArrowUpRight size={14} /></em>
              </Link>
            </li>
          ))}
        </ul>
      </Block>
      <CtaBand title="Have a question a guide does not answer?" />
    </>
  );
}

export function ArticlePage({ slug }: { slug: string }) {
  const article = getArticle(slug);
  if (!article) return <NotFoundPage />;
  const updated = article.updated !== article.published;
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Resources', to: '/resources' }, { label: article.title }]}
        label={`${article.category} · ${article.readingMinutes} min read`}
        title={article.title}
        image={HERO_IMAGE[article.services[0]] ?? '/assets/capabilities/cap-software.jpg'}
        intro={<p className="article__byline">By <Link to="/about">{BRAND}</Link> · Published <time dateTime={article.published}>{formatDate(article.published)}</time>{updated && <> · Updated <time dateTime={article.updated}>{formatDate(article.updated)}</time></>}</p>}
      />

      <Block label="In short" className="answer">
        <div className="prose" data-rv><p>{article.summary}</p></div>
      </Block>

      <article className="block article">
        <nav className="article__toc glass" aria-label="On this page" data-rv>
          <p className="label">On this page</p>
          <ol>{article.sections.map((section, i) => <li key={section.heading}><a href={`#s${i + 1}`}>{section.heading}</a></li>)}</ol>
        </nav>
        <div className="article__body prose">
          {article.sections.map((section, i) => (
            <section key={section.heading} id={`s${i + 1}`} data-rv>
              <h2>{section.heading}</h2>
              {section.blocks.map((block, j) => <ArticleBlockView key={j} block={block} />)}
            </section>
          ))}
          {article.sources && article.sources.length > 0 && (
            <section id="sources">
              <h2>Sources</h2>
              <ul className="article__list">{article.sources.map((source) => <li key={source.url}><a href={source.url} rel="noopener" target="_blank">{source.label}</a></li>)}</ul>
            </section>
          )}
        </div>
      </article>

      {article.faqs.length > 0 && (
        <Block label="Questions" title="Frequently asked questions">
          <dl className="faq-list">
            {article.faqs.map((item) => <div key={item.q} className="glass" data-rv><dt>{item.q}</dt><dd>{item.a}</dd></div>)}
          </dl>
        </Block>
      )}

      <Block label="Related services" title="Where we can help">
        <ul className="link-grid">
          {article.services.map((i) => (
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
        <div className="hero__cta" data-rv><Pill to="/resources" variant="ghost">All guides</Pill></div>
      </Block>

      <CtaBand title="Want help applying this to your business?" />
    </>
  );
}
