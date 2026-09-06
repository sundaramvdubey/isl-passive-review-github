# Authorization-Required Test Plan

This document is a planning artifact only. It is not permission to test `isl.ac.in` and must not be executed against the public service until the owner provides written authorization.

## Required authorization package

Before any intrusive test, obtain a signed or clearly attributable authorization that names the legal entity, exact domains and IP ranges, permitted paths, test dates and hours, source IPs, rate ceilings, emergency contact, data-handling rules, and whether third-party services are in scope. The owner should explicitly approve application testing, authenticated testing, API testing, and load testing separately.

## Safe staging preference

The preferred target is a staging clone with production-like assets and synthetic data. If only production is available, begin with passive observation and a single test identity. Production load testing should generally be replaced with capacity testing on a controlled mirror.

## Proposed phases after authorization

| Phase | Goal | Guardrail | Evidence |
|---|---|---|---|
| A | Baseline availability and performance | No more than one request per measurement interval during baseline. | Timestamped browser trace and server-approved metrics. |
| B | Dependency and configuration review | Use owner-provided inventories before active discovery. | Asset inventory, headers, and configuration checklist. |
| C | Authenticated application tests | Use synthetic accounts and approved roles only. | Reproduction steps without secrets or personal data. |
| D | Controlled capacity test | Only on staging or an owner-approved window with an abort threshold. | Ramp profile, RPS, latency, error rate, saturation metrics. |
| E | Retest | Verify fixes without expanding scope. | Before/after matrix and owner sign-off. |

## Load-test guardrails

Do not start with an aggressive concurrency number. Define a low baseline, ramp gradually, and stop when the owner’s agreed threshold is reached. Abort on elevated 5xx responses, queue growth, database saturation, abnormal latency, user reports, or any sign of collateral impact. Never use a public cloud fleet or distributed traffic without explicit approval. Do not test third-party analytics, social platforms, payment providers, or CDN infrastructure unless their operators have also approved it.

## Reporting language

Report confirmed observations, not dramatic labels. A slow response under an authorized synthetic load profile is a capacity observation; it is not automatically a denial-of-service vulnerability. A missing security header is a hardening issue; it is not automatically an exploit. Every finding should include impact, preconditions, reproducibility, evidence, and a remediation path.

## Stop conditions

Stop immediately if authorization is unclear, scope changes, real personal data appears, a control fails unexpectedly, the target becomes unstable, or the owner requests a pause. Preserve logs, do not retry blindly, and notify the emergency contact.
