# CRACO Configuration Notes

We use @craco/craco to override CRA's webpack config without ejecting.

Purpose:
- Exclude source-map-loader from processing TypeScript sources inside node_modules/preline/** to prevent CRA from parsing `.ts`/`.d.ts`.
- Alias 'preline/src' to the compiled distribution to avoid accidental imports.

Key files:
- craco.config.js: contains the override logic

Scripts:
- package.json scripts use `craco start`, `craco build`, and `craco test`.
