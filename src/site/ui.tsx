// Small UI pieces shared by the home page and the inner pages.
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from './router';

export const pad = (value: number) => String(value).padStart(2, '0');

/** Headline whose words rise from behind a mask as it enters view (the `in` class is added by the reveal observer). */
export function Rise({ text, as: Tag = 'h2', className = '', id }: { text: string; as?: 'h1' | 'h2' | 'h3' | 'p'; className?: string; id?: string }) {
  const lines = text.split('\n');
  const total = text.split(/\s+/).length;
  let index = 0;
  // Each word sits in its own mask, so real spaces are added between words (zero-width, see .rise__sp): the heading's
  // text then reads "Services built around…" for search engines, copy-paste and reader modes, not "Servicesbuiltaround…".
  return (
    <Tag className={`rise ${className}`} id={id} data-h aria-label={text.replace(/\n/g, ' ')}>
      {lines.map((line, lineIndex) => (
        <span className="rise__line" key={lineIndex} aria-hidden="true">
          {line.split(' ').map((word, wordIndex) => {
            const position = index++;
            return (
              <React.Fragment key={wordIndex}>
                <span className="rise__mask">
                  <span className="rise__word" style={{ transitionDelay: `${position * 55}ms` }}>{word}</span>
                </span>
                {position < total - 1 && <span className="rise__sp"> </span>}
              </React.Fragment>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

type PillProps = { children: string; href?: string; to?: string; onClick?: () => void; variant?: 'solid' | 'ghost' | 'light'; type?: 'button' | 'submit' };

/** Pill button: the label rolls on hover. `to` is an internal page link, `href` an external/mailto link. */
export function Pill({ children, href, to, onClick, variant = 'solid', type = 'button' }: PillProps) {
  const inner = (
    <>
      <span className="pill__roll"><span>{children}</span><span aria-hidden="true">{children}</span></span>
      <span className="pill__icon"><ArrowUpRight size={14} /></span>
    </>
  );
  const className = `pill pill--${variant}`;
  if (to) return <Link className={className} to={to} data-magnetic>{inner}</Link>;
  if (href) return <a className={className} href={href} data-magnetic>{inner}</a>;
  return <button type={type} className={className} onClick={onClick} data-magnetic>{inner}</button>;
}

export function Label({ children, className = '' }: { children: string; className?: string }) {
  return <p className={`label ${className}`} data-scramble>{children}</p>;
}
