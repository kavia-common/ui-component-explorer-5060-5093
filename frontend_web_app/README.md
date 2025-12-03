# Frontend Web App - UI Component Explorer

This is a React + Vite + TypeScript app configured to bind on `0.0.0.0:3000` for the development server.

Scripts:
- npm run dev (or npm start): Start dev server on 0.0.0.0:3000
- npm run build: Build production bundle
- npm run preview: Preview built app on 0.0.0.0:3000

Environment variables:
- Uses REACT_APP_* variables from .env. They are exposed in code at `import.meta.env.REACT_APP_*`.

Local JSON:
- The app reads local JSON from `src/data/*.json` to render components metadata.

```bash
npm install
npm run dev
```
