# ISL Public Web Review — Detailed Report

**Target:** [https://www.isl.ac.in/](https://www.isl.ac.in/)  
**Review date:** 06 September 2026  
**Review type:** Passive public-web inspection and local source analysis  
**Author:** Manus AI  
**Status:** Evidence report; not a penetration-test certification

## Executive judgement

The homepage has a credibility problem before it has a security problem. A space-adjacent institution is asking users to trust it with education, internships, institutional affiliation, and technical authority. The captured page instead presents a brittle first-view experience, a conspicuous mismatch between a legacy red internship bulletin and contemporary motion-heavy styling, incomplete semantic hygiene, and navigation affordances that frequently do not lead anywhere useful.

The harsh version is simple: the site looks insufficiently inspected after assembly. A missing image marker, horizontal overflow, large unused black space, mixed font treatment, spelling errors, and placeholder links are not subtle defects. They are the sort of defects that a structured pre-release checklist should catch. The visual inconsistency is not itself evidence of “vibe coding”; that is an inference about implementation process and should not be presented as a fact without repository access.

## Scope and ethics

The assessment used normal public browsing, a saved public HTML document, and local parsing. The work did not log in, submit forms, attempt to bypass controls, enumerate hidden endpoints, inject payloads, stress the service, or inspect non-public data. The purpose is to make a responsible quality report, not to create fame by damaging availability or exposing users.

A real penetration test would require written authorization. The correct artifact to publish before authorization is a test plan, not a claim that testing occurred.

## Evidence register

| ID | Evidence | Verified observation | Interpretation |
|---|---|---|---|
| E-01 | Saved public homepage HTML | 93,691 bytes; SHA-256 recorded in `results/passive-audit.json`. | The document is non-trivial before CSS, JS, images, fonts, and third-party requests are counted. |
| E-02 | Static image analysis | 14 image elements; 9 have empty or missing alt text. | Accessibility debt and possible loss of meaning for assistive-technology users. |
| E-03 | Static anchor analysis | 93 anchors; 49 resolve to empty, `#`, or `/`. | Navigation and information architecture are not publication-ready. |
| E-04 | Resource references | 9 stylesheets, 5 scripts, 14 images; Bootstrap, jQuery, Slick, multiple font families, and an external visitor-counter script are referenced. | Dependency sprawl and third-party overhead increase failure modes and first-render work. |
| E-05 | Browser capture | Initial visual capture showed a mostly black viewport with the winter internship banner visible and a horizontal scrollbar. | High-impact first-view reliability defect; timing and device variance require a proper performance run. |
| E-06 | User-supplied screenshot | Missing image marker, oversized black dead space, mixed typography, and visually inconsistent astronaut content presentation. | Reported visual defect; not all details independently reproduced in the same session. |
| E-07 | Public copy | Apparent spelling defects include “Autonomus”, “Employement”, and “Accredation”. | Content QA failure that damages institutional credibility and search clarity. |

## Finding F-01 — First-view rendering failure

**Severity:** High user-impact / not a security finding.  
**Status:** Confirmed as observed in browser capture; device and timing variance remain.

The public page presented a black first-view field rather than immediate, useful content. A horizontal scrollbar was also visible. The user-provided screenshot shows a related composition failure: a large black canvas, isolated content blocks, and a missing image marker. The combination is worse than either defect alone: the user does not receive a clear visual hierarchy, and the page looks unfinished before they can evaluate the institution.

**Likely causes to investigate:** oversized hero or animation containers, layout widths exceeding the viewport, late-loading assets without stable dimensions, hidden content that becomes visible only after scripts run, and CSS or JavaScript transitions that obscure content while dependencies resolve.

**Recommended fix:** establish a no-JavaScript baseline, reserve image dimensions, eliminate horizontal overflow at every breakpoint, expose the hero’s primary content immediately, and gate non-essential motion behind `prefers-reduced-motion`. Capture filmstrips on low-end mobile and desktop before and after the fix.

## Finding F-02 — Heavy dependency surface for a landing page

**Severity:** Medium performance risk.

The saved HTML is 93,691 bytes and references 9 stylesheets and 5 scripts. The references include Bootstrap, jQuery, Slick, multiple font families, theme styles, icon styles, offcanvas navigation, analytics, and an external visitor-counter script. Counts do not prove that every asset is render-blocking or that the page is slow in every environment. They do show that there are many opportunities for blocking, parsing, layout, and third-party failure.

**Recommended fix:** remove unused vendor bundles, consolidate CSS, self-host or subset fonts, defer non-critical scripts, lazy-load below-fold content, avoid duplicate libraries, and replace the visitor counter with a privacy-conscious lightweight analytics approach if analytics are actually needed.

## Finding F-03 — Image semantics are incomplete

**Severity:** Medium accessibility risk.

Nine of the 14 image elements in the saved HTML do not have non-empty alt text. Decorative images should use `alt=""` and be excluded from the accessibility tree; informative images need concise descriptions. A missing alt attribute is not automatically a severe failure, but the count is high enough to justify a systematic audit.

**Recommended fix:** create an image inventory with an explicit semantic role for each asset. Add dimensions, modern formats, lazy-loading where appropriate, and meaningful alternatives for informative content. Verify with a screen reader and automated accessibility tooling.

## Finding F-04 — Placeholder and root links

**Severity:** Medium content and navigation risk.

The static audit counted 49 of 93 anchors as empty, `#`, or `/`. Some may be menu parents intentionally used as non-navigation controls, but the count is still too large to dismiss. Users should not have to guess whether “Admission”, “Courses”, “Affiliation”, “Accredation”, or similar items are live pages or decorative menu labels.

**Recommended fix:** make menu parents explicit buttons when they only open submenus, give every promised destination a real URL, remove dead CTAs, and add automated checks that fail the build when production links contain placeholder values.

## Finding F-05 — Legacy bulletin versus modern motion system

The winter internship bulletin is a red, highly urgent, early-web-style strip with a blinking or animated badge treatment. The rest of the site uses contemporary large hero composition, motion transitions, theme layers, and modern marketing language. This is a major consistency problem because the bulletin is not merely a small component; it is the first signal at the top of the page. It establishes a different era, urgency level, typographic density, and interaction expectation from the rest of the interface.

The correct critique is not “old is bad.” A bulletin can be intentionally direct. The problem is that its visual grammar is ungoverned. The page asks users to read a 2000s-era alert while the surrounding experience behaves like a motion-led campaign site. That mismatch makes the institution appear assembled from unrelated templates.

**Recommended fix:** redesign the bulletin as a structured announcement band with a clear date, concise label, accessible contrast, no blinking, a visible close or dismiss behavior if persistent, and a single semantic link. Preserve urgency through color and placement rather than animation. Use the same type scale and spacing system as the rest of the site.

## Finding F-06 — Animation and theme inconsistency

The homepage references theme CSS, color styles, Slick carousel styles, offcanvas navigation, multiple font families, and a motion-oriented landing-page structure. The supplied screenshot shows content blocks whose typography, image treatment, alignment, and spacing do not share a stable component system.

Calling this “vibe coding” would be speculation. The verifiable criticism is more useful: the visual system lacks a single source of truth. Font choices, heading hierarchy, image framing, motion, and spacing appear to be governed by different local decisions. That creates cognitive noise and makes the page harder to maintain.

**Recommended fix:** establish design tokens for type, color, spacing, borders, motion duration, and image aspect ratios. Define component contracts for banners, cards, headings, and navigation. Use one animation policy, including reduced-motion behavior, and review every motion effect for purpose, duration, and failure state.

## Performance test status

A direct command-line header request timed out after 15 seconds with zero bytes received in this environment. That result is recorded as a failed observation, not converted into a claim that the origin server always takes 15 seconds. The browser session was able to render and extract public HTML, demonstrating that different paths and network layers can behave differently.

A proper follow-up should collect at least five cold and five warm runs from an authorized measurement environment, with browser version, device emulation, connection profile, cache state, DNS/TLS timing, response timing, LCP, CLS, INP, total transfer size, request count, long tasks, and filmstrips. Do not label a single timeout as a definitive origin-performance benchmark.

## What is not established

This report does not establish XSS, SQL injection, SSRF, path traversal, authentication bypass, broken access control, exposed secrets, denial-of-service susceptibility, or any other security vulnerability. It also does not prove that the site was AI-generated, that ISRO endorses every page, or that the visual defects are present for every user and browser.

## Remediation priority

| Priority | Work | Acceptance test |
|---|---|---|
| P0 | Remove first-view blank state and horizontal overflow. | Hero content is visible immediately at mobile and desktop widths; no horizontal scrollbar. |
| P1 | Replace legacy bulletin with accessible announcement component. | No blink; clear label/date/link; keyboard and screen-reader usable. |
| P1 | Reduce dependency and font overhead. | Before/after request waterfall and transfer budget are documented. |
| P1 | Fix placeholder links and spelling errors. | Production link checker reports zero placeholder hrefs; editorial QA passes. |
| P2 | Audit image semantics and dimensions. | Every image has intentional semantic status and stable dimensions. |
| P2 | Establish unified design and motion tokens. | Components use shared tokens and pass reduced-motion review. |

## Responsible disclosure template

**Subject:** Responsible report: homepage rendering, accessibility, and navigation defects

I observed several public-facing quality and accessibility issues on `https://www.isl.ac.in/` during a non-intrusive review on [date/time]. I did not log in, submit forms, inject payloads, enumerate endpoints, or generate load. The attached evidence includes the exact URL, environment, screenshots, and local HTML counts. The highest-impact items are [brief list]. I recommend first checking [specific remediation]. Please confirm receipt and provide a preferred channel for technical follow-up.

## References

[1]: https://www.isl.ac.in/ "India Space Lab homepage"

[2]: https://www.w3.org/WAI/standards-guidelines/wcag/ "W3C Web Content Accessibility Guidelines overview"

[3]: https://web.dev/articles/vitals "Web.dev Core Web Vitals guidance"

[4]: https://owasp.org/www-project-web-security-testing-guide/ "OWASP Web Security Testing Guide"
