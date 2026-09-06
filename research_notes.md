# Passive Review Notes

## Scope and limitation
Reviewed the public homepage at https://www.isl.ac.in/ using ordinary browser navigation and page rendering only. No login, form submission, payloads, crawling, load generation, exploit attempts, or access to non-public data were performed.

## Initial observations
- Page title: India Space Lab | Home.
- The visible browser rendering showed a predominantly black viewport with only the red winter internship banner visible in the initial capture; the page also exhibited a very wide horizontal overflow bar.
- Extracted public content includes a large navigation structure with many empty or placeholder links marked `/`, multiple external social and outreach links, and a homepage hero with “Lets explore the Universe with us”.
- The extracted text contains apparent spelling/quality issues such as “Autonomus” and “Autonomus part of India Space Week”. These should be reported as content QA defects, not security vulnerabilities.
- The user-provided screenshot shows broken/missing imagery in the astronaut content area, inconsistent typography, large unused black space, and a visible horizontal layout failure. Treat the screenshot as user-supplied evidence; do not claim it was independently reproduced unless later verified.

## Evidence categories to measure next
Performance: document request count, transfer sizes, render-blocking resources, long tasks if observable, and layout dimensions using passive browser/devtools-style inspection only.
Accessibility: missing alt text, heading order, color contrast, keyboard/focus visibility, and horizontal overflow.
Content/design: broken image references, empty links, spelling defects, inconsistent component styling, and oversized dead space.
Security hygiene: only passive headers and publicly visible metadata; do not probe endpoints or attempt exploitation.
