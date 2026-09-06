# ISL Public Web Review

> A non-intrusive, evidence-led review of the public India Space Lab homepage at [isl.ac.in](https://www.isl.ac.in/).

## Purpose

This repository documents public-facing reliability, performance-risk, accessibility, content-quality, and design-consistency observations. It is deliberately not an exploit repository. The project separates measured facts from interpretation, and it does not claim a security vulnerability where the evidence only demonstrates poor rendering, slow delivery risk, broken navigation, or weak quality assurance.

The central finding is blunt: the page can fail its first impression before it becomes useful. The public HTML is resource-heavy for a landing page, the captured rendering showed a black first-view field and horizontal overflow, and the source contains substantial navigation and semantic debt. The supplied screenshot also shows a missing-image marker, large unused space, mixed typography, and an outdated red internship bulletin competing with a modern animated visual system.

## Safety boundary

No exploitation, credential testing, authentication bypass, endpoint fuzzing, injection, file access attempt, API enumeration, rate-limit testing, concurrency test, load test, stress test, or destructive action was performed. The included audit script accepts a local fixture or makes one ordinary GET request only. It does not crawl and it does not generate traffic intended to affect availability.

Intrusive penetration or load testing requires written authorization from the site owner, a defined scope, a test window, a source IP or test identity, rate limits, an emergency contact, and explicit permission for each class of test. Until those conditions exist, the `docs/authorized-test-plan.md` file is a plan only and must not be treated as permission.

## Repository map

| Path | Purpose |
|---|---|
| `tools/passive_audit.py` | Reproducible local-HTML or single-request public-page audit. |
| `evidence/raw/` | Captured public HTML fixture and provenance manifest. |
| `results/passive-audit.json` | Machine-readable result generated from the fixture. |
| `docs/report.md` | Detailed narrative report with findings and remediation. |
| `docs/authorized-test-plan.md` | Non-executed plan for future authorized testing. |
| `todo.md` | Work checklist and scope guardrails. |
| `docs/findings-index.md` | Severity/confidence index for the current findings. |
| `evidence/raw/manifest.txt` | Capture metadata, scope, byte count, and SHA-256 provenance. |
| `.github/workflows/quality.yml` | Automated deterministic audit and TypeScript checks. |
| `client/` | Static interactive report webpage built from the findings. |

### Quality and evidence index

The [findings index](docs/findings-index.md) separates impact, confidence, evidence, and remediation. The [evidence manifest](evidence/raw/manifest.txt) records the captured source, scope, timestamp, byte count, and SHA-256 hash. Every push and pull request runs the deterministic passive-audit tests and the web-project type check through GitHub Actions.

## Reproduce the safe audit

The fixture run is deterministic with respect to the captured HTML:

```bash
python3 tools/passive_audit.py \
  --html evidence/raw/homepage-2026-09-06.html \
  --out results/passive-audit.json
```

The script prints the counts and writes JSON. URL mode is intentionally limited to one ordinary request:

```bash
python3 tools/passive_audit.py \
  --url https://www.isl.ac.in/ \
  --out results/live-single-request.json
```

A timeout or blocked request is a result, not a reason to increase traffic. Repeat runs should record the timestamp, network context, browser, and tool version. Do not compare a fixture count to a live count without preserving both artifacts.

## Interpretation rules

The phrase **performance risk** is used for heavy HTML, multiple dependencies, render-blocking resources, or visible delays. It is not a measured Core Web Vital unless a performance tool produced that metric. The phrase **security vulnerability** is reserved for a verified security-impacting weakness under an authorized test. This repository does not establish one.

The phrase **reported visual defect** identifies an issue visible in the user-provided screenshot that was not necessarily independently reproduced by the passive browser capture. The phrase **measured** is reserved for counts extracted from the saved public HTML fixture.

## Suggested issue structure

Each GitHub issue should state the URL, date and time, device/browser, exact reproduction path, expected behavior, observed behavior, impact, evidence file, and remediation suggestion. Avoid publishing personal data, session identifiers, internal paths, or exploit payloads.

## License and publication note

Before public publication, choose a license appropriate to your own prose and code, review the evidence for accidental personal data, check the site’s terms and disclosure preferences, and offer the site owner a private notification. Do not imply endorsement by ISRO, India Space Lab, India Space Week, or any partner.
