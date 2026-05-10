#!/usr/bin/env node
/**
 * build.js — Markdown → HTML for posts only.
 *
 * Reads:   content/posts/*.md
 * Writes:  posts/<slug>/index.html   (one per published post)
 *          posts/index.html           (regenerated post listing)
 *
 * To publish a post: set `draft: false` in the frontmatter, then push.
 * All static pages (index.html, experience/, quotes/, etc.) are untouched.
 */

const fs             = require('fs');
const path           = require('path');
const { marked }     = require('marked');
const markedFootnote = require('marked-footnote');

marked.use(markedFootnote());

// ── Config ────────────────────────────────────────────────────────────────────
const CONTENT_DIR = path.join(__dirname, 'content', 'posts');
const OUTPUT_DIR  = path.join(__dirname, 'posts');

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Parse YAML-ish frontmatter (handles: title, date, draft, tags). */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const meta = {};
  match[1].split('\n').forEach(line => {
    const kv = line.match(/^(\w[\w-]*):\s*(.+)$/);
    if (!kv) return;
    const [, key, val] = kv;
    if (key === 'draft') meta.draft = val.trim() === 'true';
    else if (key === 'date') meta.date = val.trim().replace(/^"|"$/g, '');
    else if (key === 'title') meta.title = val.trim().replace(/^"|"$/g, '');
    else meta[key] = val.trim().replace(/^"|"$/g, '');
  });

  return { meta, body: match[2] };
}

/** Derive a URL slug from the filename (strip .md, lowercase). */
function slugify(filename) {
  return path.basename(filename, '.md').toLowerCase();
}

/** Format a date string as "Month D, YYYY". */
function fmtDate(str) {
  const d = new Date(str + 'T12:00:00Z');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

/** Shared sidebar + theme toggle used on every page. */
function sidebar() {
  return `
    <aside class="site-sidebar">
      <span class="site-name"><a href="/">achinth</a></span>
      <ul class="site-nav">
        <li><a href="/posts">posts</a></li>
        <li><a href="/quotes">quotes</a></li>
        <li><a href="/love-letters">love letters</a></li>
      </ul>
      <button id="theme-toggle" aria-label="Toggle theme">light</button>
    </aside>`.trim();
}

/** Inline theme toggle script (shared by every page). */
function themeScript() {
  return `
  <script>
    (function(){
      var btn = document.getElementById('theme-toggle');
      var root = document.documentElement;
      function sync(){ btn.textContent = root.getAttribute('data-theme') !== 'light' ? 'light' : 'dark'; }
      sync();
      btn.addEventListener('click', function(){
        var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        sync();
      });
    })();
  </script>`.trim();
}

/** HTML shell for a single post page. */
function postHTML({ title, date, slug, bodyHTML, prev, next }) {
  const prevLink = prev
    ? `<a href="/posts/${prev.slug}/">← ${prev.title}</a>`
    : `<a href="/posts">← all posts</a>`;
  const nextLink = next
    ? `<a href="/posts/${next.slug}/">${next.title} →</a>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <script>(function(){ var t=localStorage.getItem('theme'); if(t) document.documentElement.setAttribute('data-theme',t); })();</script>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escHtml(title)} | achinth</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <div class="wrap">
    <main>
      <article>
        <header class="post-header">
          <h1>${escHtml(title)}</h1>
          <p class="post-meta">${fmtDate(date)}</p>
        </header>
        <div class="post-content">
${bodyHTML}
        </div>
        <nav class="post-nav">
          ${prevLink}
          ${nextLink}
        </nav>
      </article>
    </main>
    ${sidebar()}
    <footer class="site-footer"><p>&copy; ${new Date().getFullYear()} Achinth</p></footer>
  </div>
  ${themeScript()}
</body>
</html>`;
}

/** HTML for the posts index page. */
function postsIndexHTML(posts) {
  // Group by year
  const byYear = {};
  posts.forEach(p => {
    const yr = p.date.slice(0, 4);
    (byYear[yr] = byYear[yr] || []).push(p);
  });

  const years = Object.keys(byYear).sort((a, b) => b - a);
  const groups = years.map(yr => {
    const rows = byYear[yr].map(p => {
      const mmdd = new Date(p.date + 'T12:00:00Z')
        .toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
      return `        <div class="post-row">
          <span class="post-date">${mmdd}</span>
          <a href="/posts/${p.slug}/">${escHtml(p.title)}</a>
        </div>`;
    }).join('\n');

    return `      <div class="year-group">
        <h2 class="year-heading">${yr}</h2>
${rows}
      </div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <script>(function(){ var t=localStorage.getItem('theme'); if(t) document.documentElement.setAttribute('data-theme',t); })();</script>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>posts | achinth</title>
  <meta name="description" content="Achinth Bharadwaj's writing on AI, interpretability, and the world.">
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <div class="wrap">
    <main>
      <h1>posts</h1>
      <p style="color:var(--muted);font-size:0.88rem;margin-bottom:2rem;">my thoughts on AI, interpretability, and other things that catch my attention.</p>
${groups || '      <p style="color:var(--muted);font-size:0.88rem;">nothing published yet. check back soon.</p>'}
    </main>
    ${sidebar()}
    <footer class="site-footer"><p>&copy; ${new Date().getFullYear()} Achinth</p></footer>
  </div>
  ${themeScript()}
</body>
</html>`;
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Main ──────────────────────────────────────────────────────────────────────

function build() {
  // 1. Read all .md files
  const files = fs.readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.md') && f !== '_index.md');

  // 2. Parse frontmatter, skip drafts
  const posts = files
    .map(f => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, f), 'utf8');
      const { meta, body } = parseFrontmatter(raw);
      return { ...meta, slug: slugify(f), body };
    })
    .filter(p => p.draft !== true && p.date && p.title)
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // oldest first for prev/next

  console.log(`Building ${posts.length} published post(s)…`);

  // 3. Write each post HTML
  posts.forEach((post, i) => {
    const bodyHTML = marked.parse(post.body, { async: false });
    const dir = path.join(OUTPUT_DIR, post.slug);
    fs.mkdirSync(dir, { recursive: true });

    const html = postHTML({
      title:   post.title,
      date:    post.date,
      slug:    post.slug,
      bodyHTML,
      prev: i > 0 ? posts[i - 1] : null,
      next: i < posts.length - 1 ? posts[i + 1] : null,
    });

    fs.writeFileSync(path.join(dir, 'index.html'), html);
    console.log(`  ✓ posts/${post.slug}/`);
  });

  // 4. Regenerate posts/index.html
  const reversedPosts = [...posts].reverse(); // newest first for listing
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'index.html'),
    postsIndexHTML(reversedPosts)
  );
  console.log('  ✓ posts/index.html');
  console.log('Done.');
}

build();
