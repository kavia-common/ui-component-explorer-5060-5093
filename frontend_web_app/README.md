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
