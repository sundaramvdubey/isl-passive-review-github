#!/usr/bin/env python3
"""Low-impact public HTML audit.

This tool intentionally performs no crawling, fuzzing, authentication testing,
concurrency, payload injection, or endpoint discovery. URL mode makes one GET
request only and is not a load test.
"""
from __future__ import annotations
import argparse, hashlib, json, ssl, sys, time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup


def load_source(path: str | None, url: str | None) -> tuple[str, str, dict]:
    if path:
        p = Path(path)
        raw = p.read_bytes()
        return raw.decode("utf-8", errors="replace"), f"file://{p.resolve()}", {"mode": "fixture", "bytes": len(raw)}
    if not url:
        raise SystemExit("Provide --html or --url")
    req = Request(url, headers={"User-Agent": "ISL-passive-audit/1.0 (single-request research)"})
    started = time.perf_counter()
    with urlopen(req, timeout=15, context=ssl.create_default_context()) as response:
        raw = response.read()
        meta = {"mode": "single_get", "status": response.status, "bytes": len(raw), "elapsed_ms": round((time.perf_counter() - started) * 1000, 2), "headers": dict(response.headers.items())}
    return raw.decode("utf-8", errors="replace"), url, meta


def audit(html: str, source: str, meta: dict) -> dict:
    soup = BeautifulSoup(html, "html.parser")
    images = soup.find_all("img")
    anchors = soup.find_all("a")
    stylesheets = soup.find_all("link", rel=lambda x: x and "stylesheet" in x)
    scripts = soup.find_all("script")
    headings = soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6"])
    empty_alt = [str(i.get("src", "")) for i in images if not (i.get("alt") or "").strip()]
    placeholder_links = [str(a.get("href", "")) for a in anchors if (a.get("href") or "").strip() in ("", "#", "/")]
    text = soup.get_text(" ", strip=True)
    spelling_flags = [word for word in ("Autonomus", "Employement", "Accredation") if word.lower() in text.lower()]
    return {
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "source": source,
        "sha256": hashlib.sha256(html.encode()).hexdigest(),
        "request": meta,
        "counts": {"html_bytes": len(html.encode()), "images": len(images), "images_without_useful_alt": len(empty_alt), "anchors": len(anchors), "empty_or_root_links": len(placeholder_links), "stylesheets": len(stylesheets), "scripts": len(scripts), "headings": len(headings)},
        "image_alt_issues": empty_alt,
        "placeholder_link_samples": placeholder_links[:60],
        "stylesheet_urls": [urljoin(source, str(s.get("href", ""))) for s in stylesheets],
        "script_urls": [urljoin(source, str(s.get("src", ""))) for s in scripts if s.get("src")],
        "heading_outline": [{"tag": h.name, "text": h.get_text(" ", strip=True)[:140]} for h in headings],
        "content_quality_flags": spelling_flags,
        "limitations": ["Counts reflect the captured HTML only.", "No CSS layout or runtime animation performance is inferred from HTML counts.", "No exploit, vulnerability, authentication, endpoint, concurrency, or load test was performed."],
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    source = parser.add_mutually_exclusive_group(required=True)
    source.add_argument("--html", help="Analyze a local HTML fixture")
    source.add_argument("--url", help="Make one ordinary GET request; never crawls")
    parser.add_argument("--out", default="results/passive-audit.json")
    args = parser.parse_args()
    try:
        html, origin, meta = load_source(args.html, args.url)
        result = audit(html, origin, meta)
        Path(args.out).parent.mkdir(parents=True, exist_ok=True)
        Path(args.out).write_text(json.dumps(result, indent=2) + "\n")
        print(json.dumps(result["counts"], indent=2))
        return 0
    except Exception as exc:
        print(f"audit failed safely: {type(exc).__name__}: {exc}", file=sys.stderr)
        return 2

if __name__ == "__main__":
    raise SystemExit(main())
