# Orbit EO (frontend)

## Run
    npm install
    npm run dev          # http://localhost:5173

## Install the real hero (required for the 3D globe)
1. Paste your original hero code into `src/components/ui/orbit-delivery-hero.original.tsx`
2. `npm run patch-hero`   (wires nav buttons to routes; theme/animation untouched)
3. `npm run dev`

Backend: Vite proxies `/api` to http://localhost:3000 (your Express API). Without it, the dashboard shows empty states and search reports "unavailable".
