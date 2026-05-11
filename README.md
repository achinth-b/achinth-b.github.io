# achinth's site

A minimalist, high-performance personal website and blog.

## Architecture

This is a "basic" website focused on speed and simplicity:
- **Core**: Static HTML files (index.html, quotes/, etc.).
- **Blog**: Powered by a custom `build.js` script that converts Markdown in `content/posts/` to HTML in `posts/`.
- **Styling**: Vanilla CSS in `style.css`.
- **Theme**: Minimal dark/light mode with a manual toggle.

## Development

### Prerequisites
- Node.js (for building the blog)
- Python 3 (for local preview)

### Build the Blog
To regenerate the blog posts from markdown:
```bash
npm run build
```

### Local Preview
To start a local development server:
```bash
npm run dev
```
The site will be available at `http://localhost:8765`.

## Deployment
The site is hosted on GitHub Pages. Pushing to the `master` branch triggers a deployment.
