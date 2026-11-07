# rakshithr.github.io

Personal portfolio — React 17, styled-components, Framer Motion.  
**Live:** https://rakshithr.github.io/

## Local development

**Easiest (from repo root):**

```powershell
.\scripts\dev.ps1
```

When the terminal shows `Compiled successfully!`, open **http://127.0.0.1:3000** (not `index.html` on disk, not `rakshithr.github.io` unless you deployed).

**If dev shows a red compile screen** (stale server on :3000/:3001): close all terminals, run `.\scripts\dev.ps1` again — it kills old Node processes and clears webpack cache.

**Fallback (always works after build):**

```powershell
.\scripts\preview-build.ps1
```

Then open **http://127.0.0.1:5050**

Or manually:

```powershell
cd react-portfolio
npm install --legacy-peer-deps
npm start
```

`npm start` / `npm run build` set OpenSSL legacy mode automatically (required on Node 18+ with CRA 4).

### Errors or blank page?

| Symptom | Fix |
|---------|-----|
| Red screen / `lucide-react` / `Github is not exported` | Old dev server still running. Run **`.\scripts\dev.ps1`** (it stops port 3000 and restarts). |
| `Something is already running on port 3000` | Close other terminals or use **`.\scripts\dev.ps1`**. |
| `craco` / `tailwindcss` not found | `cd react-portfolio` → **`npm install --legacy-peer-deps`** |
| `digital envelope routines` | Use **`npm start`** from this repo (OpenSSL legacy is set in the script). |
| Opened `index.html` from disk | Use **http://localhost:3000** after compile succeeds. |
| Preview production build | `.\scripts\deploy.ps1` then `.\scripts\preview.ps1` → **http://localhost:5000** |

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
