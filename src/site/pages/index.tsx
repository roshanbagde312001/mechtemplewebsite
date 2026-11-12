// Inner-page router. Loaded as its own chunk so these pages never download three.js.
import React from 'react';
import { PageLayout } from './Layout';
import { AboutPage, CareersPage, ProcessPage, WorkPage } from './CompanyPages';
import { ContactPage } from './ContactPage';
import { NotFoundPage, PrivacyPage, TermsPage } from './LegalPages';
import { IndustriesPage, ServiceDetailPage, ServicesPage, SolutionsPage } from './ServicePages';

function route(path: string) {
  if (path.startsWith('/services/')) return <ServiceDetailPage key={path} slug={path.slice('/services/'.length)} />;
  switch (path) {
    case '/about': return <AboutPage />;
    case '/services': return <ServicesPage />;
    case '/solutions': return <SolutionsPage />;
    case '/industries': return <IndustriesPage />;
    case '/work': return <WorkPage />;
    case '/process': return <ProcessPage />;
    case '/careers': return <CareersPage />;
    case '/contact': return <ContactPage />;
    case '/privacy': return <PrivacyPage />;
    case '/terms': return <TermsPage />;
    default: return <NotFoundPage />;
  }
}

export default function InnerPages({ path }: { path: string }) {
  return <PageLayout path={path}>{route(path)}</PageLayout>;
}
