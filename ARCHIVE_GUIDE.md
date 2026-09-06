# Archive Guide

This package is prepared for manual inspection and GitHub upload. It intentionally contains the source code, reports, evidence fixture, audit tooling, test results, and static report application. It intentionally excludes generated dependency and runtime clutter.

## Included

The archive includes the detailed Markdown report, design-consistency critique, responsible-disclosure template, authorization-required test plan, captured public HTML fixture, provenance manifest, machine-readable audit output, test-run record, Python audit and regression scripts, React/Tailwind source, project configuration, and the repository checklist.

## Excluded

The ZIP excludes `.git`, `node_modules`, `dist`, `.manus-logs`, local screenshots, temporary browser captures, cache directories, and environment-specific metadata. These are regenerated locally or may contain machine/session information. The archive does not include secrets.

## Manual inspection

From the extracted project root:

```bash
python3 tools/passive_audit.py \
  --html evidence/raw/homepage-2026-09-06.html \
  --out results/passive-audit-recheck.json
python3 tools/test_passive_audit.py
pnpm install
pnpm check
pnpm build
```

The Python audit and tests do not require a network connection. The frontend build requires Node.js and pnpm. The static report references lifecycle-managed visual assets through `/manus-storage/...` URLs; those URLs work inside the Manus project environment. If you move the frontend outside that environment, replace those asset references with files you own and add them to the repository or your chosen hosting system.

## GitHub upload

Create a new empty repository, extract the archive, inspect the evidence and report, then run:

```bash
git init
git add .
git commit -m "Add ISL passive public web review"
git branch -M main
git remote add origin https://github.com/YOUR-USER/YOUR-REPO.git
git push -u origin main
```

Before pushing publicly, review `evidence/raw/homepage-2026-09-06.html` for accidental personal data, decide on a repository license, and confirm that public disclosure is appropriate. Do not describe this package as a penetration test. The correct label is **passive public-web review** unless separately authorized testing has actually occurred.

## Safety note

The repository contains an authorization-required penetration/load-testing plan, but no intrusive testing code or execution results. Written authorization, a defined test window, rate limits, scope, and an emergency contact are prerequisites for any active assessment.
