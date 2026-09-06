# Findings index

This index is a navigation aid for the passive review. Severity describes likely user or maintenance impact, not security impact. Confidence describes how directly the finding is supported by the preserved evidence.

| ID | Area | Finding | Severity | Confidence | Evidence | Recommended action |
|---|---|---|---|---|---|---|
| F-01 | Performance risk | The captured homepage is resource-heavy for a landing page and contains substantial dependency/rendering weight. | Medium | High | `evidence/raw/homepage-2026-09-06.html`, `results/passive-audit.json` | Reduce unnecessary dependencies, defer non-critical resources, and measure Core Web Vitals with an approved performance tool. |
| F-02 | Layout | The supplied capture showed a black first-view field and horizontal overflow. | Medium | Medium | `docs/report.md`, preserved capture/screenshot notes | Reproduce across viewport sizes and fix overflow/initial-state rendering before treating as universally confirmed. |
| F-03 | Accessibility/content | Multiple images lack useful alternative text in the captured HTML. | Medium | High | `results/passive-audit.json` | Add concise, contextual alt text; mark decorative images appropriately. |
| F-04 | Navigation | Many anchors are empty, root-only, or otherwise weakly actionable in the captured HTML. | Medium | High | `results/passive-audit.json` | Replace placeholder links, provide meaningful destinations, and test keyboard navigation. |
| F-05 | Content hierarchy | An older internship bulletin competes visually with the current animated visual system. | Low | Medium | Captured screenshot and `docs/design-consistency.md` | Establish a clear content-priority hierarchy and archive or label outdated notices. |
| F-06 | Publication risk | Public review material should not imply endorsement, expose personal data, or claim a vulnerability without authorization. | High | High | `README.md`, `docs/authorized-test-plan.md` | Keep the review passive, notify the owner privately, remove accidental personal data, and obtain written authorization before intrusive testing. |

## Reading rules

A “Medium” finding is not a claim that the site is unusable. A “Medium confidence” visual finding is reported because it appears in supplied evidence, but it needs independent reproduction before being stated as universal. No finding in this index is a penetration-test result or a verified security vulnerability.
