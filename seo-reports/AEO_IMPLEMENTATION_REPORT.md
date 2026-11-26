# AEO Implementation Report (Answer Engine Optimization)

Goal: make PrimpTech's answers easy for Google (featured snippets, AI Overviews), Bing/Copilot, ChatGPT search and Perplexity to find, extract and attribute. Nothing here guarantees a snippet, an AI citation or FAQ rich results.

## What was implemented

| Technique | Where | Status |
| --- | --- | --- |
| **Answer first**: every service page opens with a question heading ("What is …?") and a 2–3 sentence definition before any detail | 13 service pages (`SERVICE_SEO[].question/answer`) | Tested locally |
| **Guides open with an "In short" answer** to the guide's own question | 2 guides (`summary`) | Tested locally |
| **Question-cluster FAQs**, specific to each page (no generic FAQ repeated across services) | 13 service pages (3–4 each), 2 guides, process page | Tested locally |
| **Comparison tables** as real `<table>` markup with header cells and captions | Website vs web app, custom vs off-the-shelf, AI vs ML, rule-based vs AI automation, native vs cross-platform, SaaS vs internal software, plus one in the custom-software guide | Tested locally |
| **Step-by-step lists** (`<ol>`) for processes | Automation guide (9 steps, workflow anatomy, lead-management flow), decision steps in the custom-software guide | Tested locally |
| **FAQPage markup** matching the visible questions word for word (the audit fails a page if not) | Service pages, guides, process page | Tested locally |
| **Semantic HTML**: one H1, logical H2/H3, `<dl>` for FAQs, `<time datetime>` for dates, table of contents with anchors | All pages | Audit P8/P9 PASS |
| **All answers in served HTML** (prerendered), not only after JavaScript | All 27 pages | Audit P27 PASS; verified with crawler user agents in production (phase 1 pages) |

## Brief questions and where they are answered

| Question | Page |
| --- | --- |
| What is custom software development? | /services/custom-software-development (definition) |
| How much does custom software development cost? | /services/custom-software-development (FAQ) and the custom-software guide (cost factors) |
| How much does website development cost? | /services/website-development (FAQ: cost drivers, no prices) |
| Why does a business need a website? | /services/website-development (FAQ) |
| What is business process automation? | /services/intelligent-process-automation (FAQ) |
| How can AI automate business operations? / How can AI automation help businesses? | /services/artificial-intelligence-development (FAQ) |
| What is SaaS application development? | /services/saas-application-development (definition) |
| What is the difference between AI and automation? | /services/intelligent-process-automation (FAQ + comparison table) |
| What is the difference between AI and machine learning? | /services/machine-learning-solutions (FAQ + comparison table) |
| How do businesses implement AI solutions? | /services/artificial-intelligence-development (FAQ, 7 steps) |
| How can a business develop a SaaS application? | /services/saas-application-development (FAQ) |

## Deliberately not done

- **No prices** in cost answers: no verified PrimpTech price ranges exist. The answers explain cost drivers instead. A "Website development cost in India" guide needs real ranges (see `REMAINING_ACTIONS.md`).
- **No FAQ rich-result promise**: Google shows FAQ rich results only for some authoritative government and health sites. The markup is still valid and helps other engines parse the Q&A.
- **No duplicate FAQs across pages**: "How can a business develop a SaaS application?" moved from the web-application page to the new SaaS page.
