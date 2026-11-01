# rakshithr.github.io

Personal portfolio — React 17, styled-components, Framer Motion.  
**Live:** https://rakshithr.github.io/

## Local development

```powershell
cd react-portfolio
npm install --legacy-peer-deps
$env:NODE_OPTIONS="--openssl-legacy-provider"
$env:BROWSER="none"
npm start
```

Open **http://localhost:3000**

## Edit content

All copy and career data live in one place:

- `react-portfolio/src/data/profile.js` — bio, experience, skills, highlights, agent steps

After edits, refresh the browser (dev) or run deploy below.

## Deploy to GitHub Pages

From repo root:

```powershell
.\scripts\deploy.ps1
git add react-portfolio static index.html asset-manifest.json favicon.ico logo192.png logo512.png manifest.json robots.txt
git commit -m "Deploy portfolio"
git push origin main
```

GitHub Actions (`.github/workflows/deploy-pages.yml`) also rebuilds when you push changes under `react-portfolio/` only.

## Project layout

| Path | Purpose |
|------|---------|
| `react-portfolio/` | Source app (edit here) |
| `static/`, `index.html` | Production build (generated — do not hand-edit) |
| `react-portfolio/src/agent/` | On-site career RAG (retrieve + compose) |
| `react-portfolio/src/components/futuristic/` | Hero, shell, background |

## Pending improvements (backlog)

- Hero interaction polish (full portrait + richer effects)
- Career agent: optional LLM API via serverless endpoint
- Embeddings-based retrieval instead of keyword scoring

## Requirements

- Node.js 18+ (use `NODE_OPTIONS=--openssl-legacy-provider` for CRA 4 builds on Node 17+)
