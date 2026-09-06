from bs4 import BeautifulSoup
from pathlib import Path
from urllib.parse import urljoin

p = Path('/home/ubuntu/browser_html/isl_ac_in_page_1788707316810.html')
soup = BeautifulSoup(p.read_text(errors='ignore'), 'html.parser')
base = 'https://www.isl.ac.in/'
imgs = soup.find_all('img')
links = soup.find_all('a')
styles = soup.find_all('link', rel=lambda x: x and 'stylesheet' in x)
scripts = soup.find_all('script')
print('title=', soup.title.get_text(' ', strip=True) if soup.title else '')
print('html_bytes=', p.stat().st_size)
print('images=', len(imgs))
print('images_missing_alt=', sum(not (i.get('alt') or '').strip() for i in imgs))
print('links=', len(links))
print('empty_or_root_links=', sum((a.get('href') or '').strip() in ('', '#', '/') for a in links))
print('stylesheets=', len(styles))
print('scripts=', len(scripts))
print('headings=', [(h.name, h.get_text(' ', strip=True)[:80]) for h in soup.find_all(['h1','h2','h3'])[:20]])
print('image_urls_sample=', [urljoin(base, i.get('src','')) for i in imgs[:12]])
print('stylesheet_urls=', [urljoin(base, s.get('href','')) for s in styles])
print('script_urls=', [urljoin(base, s.get('src','')) for s in scripts if s.get('src')])
