# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- Lightweight: No heavy UI frameworks - uses only React and Tailwind
- Modern UI: Clean, responsive design styled with the "Ocean Professional" theme
- Routing: `react-router-dom` v6 configured with core pages and layout
- Responsive Layout: Header, collapsible Sidebar, Footer; mobile optimized
- Theme: Light/Dark mode toggle, aligned with Tailwind `dark` mode

## App Structure

```
src/
  components/
    common/
      SearchBar.jsx
      ThemeToggle.jsx
  layouts/
    MainLayout.jsx
  pages/
    Home.jsx
    Category.jsx
    ComponentDetail.jsx
  routes/
    index.jsx
  index.js
  index.css
  App.css
```

## Routes

- `/` Home
- `/category/:slug` Category page
- `/component/:id` Component detail page

## Development

- Start: `npm start`
- Build: `npm run build`
- Test: `npm test`

## Notes

- The Sidebar is collapsible on mobile and auto-closes on navigation.
- The ThemeToggle synchronizes both `data-theme` attribute and Tailwind's `dark` class.
- Future phases should load component metadata from `src/data/` and implement live previews and code copy.

## Preline Integration

To avoid Webpack attempting to parse TypeScript sources from Preline, the app is configured to use Preline’s compiled JS build only.

- Import/Initialization:
  - We initialize Preline dynamically from the compiled build in `src/utils/preline.js`:
    - Do NOT import from `preline/src` or any `.ts` paths.
    - Use the helper: `import { initPreline } from './utils/preline';` then call `initPreline()`.

- Tailwind:
  - Plugin is required via `preline/plugin` (with a safe fallback to `preline/plugin.cjs`) in `tailwind.config.js`.
  - Tailwind `content` includes `./node_modules/preline/**/*.js` so only compiled JS is scanned.

- CRA build (source maps):
  - `.env` sets `GENERATE_SOURCEMAP=false` for production builds to prevent `source-map-loader` from traversing TypeScript files in dependencies.
  - If a developer needs source maps, temporarily set to `true` but ensure no tooling pulls in `preline/src`.

- Troubleshooting:
  - If you still see an error similar to `declare var _: any;` during build, ensure there are no imports from `preline/src` anywhere in the codebase, clear caches, and restart:
    - `rm -rf node_modules/.cache`
    - Restart dev server or rerun build
  - If needed for local development, consider excluding `node_modules/preline/**` from `source-map-loader` via a CRACO or react-app-rewired override (not included by default).
