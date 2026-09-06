# Design Consistency Critique

## Thesis

The homepage does not have one coherent visual language. It has multiple visual eras coexisting without a governing system: a red early-web bulletin, a high-motion hero, institutional copy, carousel-like content, and astronaut biography blocks that do not share a stable image or typography contract.

## Winter internship bulletin

The top bulletin is functionally important but visually under-designed. Its red text and animated badge communicate urgency through an old “ticker” grammar. That grammar is not inherently wrong; the problem is that the component appears to have no relationship to the surrounding design system. It has different density, contrast behavior, motion expectations, and typographic voice.

A better component would use a small announcement label, a date or deadline, one sentence of context, and one clear link. It should be visually distinct but not visually primitive. Red should communicate a defined status such as “deadline” or “new,” not simply decorate the page. Blinking should be removed. If the message is persistent, users need an accessible dismissal or acknowledgement mechanism.

## Motion system

Animation should explain hierarchy, not hide loading. The observed first-view black field makes motion a suspect even though runtime profiling was not performed. The correct engineering response is to test animation timing and content visibility, not to assume that every transition is responsible.

The site should document a motion policy: entrance transitions under 220 ms, no layout-affecting animation, no scroll-jacking, no infinite decorative loops, and a reduced-motion path that exposes the same content without delay. Every animated region should have a stable initial state that is useful if JavaScript fails.

## Typography system

The HTML references multiple font families including Bebas Neue, Lato, Poppins, and Syncopate. Multiple typefaces can be intentional, but here the combination creates a risk of local styling decisions overpowering hierarchy. A professional system would assign roles: one display family, one reading family, and one metadata family. Weight, case, tracking, and line length should be tokenized rather than set ad hoc.

## Image treatment

The supplied screenshot reports a missing image marker and inconsistent astronaut image framing. A stable image contract should define aspect ratio, object positioning, fallback treatment, loading behavior, and alt-text responsibility. Biography cards should not shift layout when an image fails. A broken image should be replaced with an intentional neutral fallback, never a browser-native missing-image artifact.

## Layout discipline

The horizontal scrollbar is a hard failure because it reveals that the composition was not tested against the viewport. A page may have a wide visual canvas, but it must still control overflow intentionally. Every hero, carousel, offcanvas menu, and decorative layer should be tested at 320px, 375px, 768px, 1024px, and 1440px widths.

## Connoisseur verdict

The site’s problem is not that it is “too modern” or “too old.” It is that its modern and old elements do not negotiate with each other. The internship bulletin shouts in one dialect, the hero performs in another, and the content cards speak in a third. The fix is governance: a component library, content QA, a type system, a motion contract, stable image fallbacks, and a release checklist.
