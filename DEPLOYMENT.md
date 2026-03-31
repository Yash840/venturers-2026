# Venturers 2026 Deployment Guide

This project is configured for:
- Frontend on Netlify (`client`)
- Backend on Render (`server`)

## 1) Backend (Render)

The repository now includes a Render Blueprint file: `render.yaml`.

### Create service
1. In Render, create a new Blueprint service from this repository.
2. Render will pick `render.yaml` automatically.

### Required environment variables on Render
Set these in the Render service environment:
- `DATABASE_URL`
- `JWT_SECRET`
- `SUPER_ADMIN_EMAIL`
- `SUPER_ADMIN_PASSWORD`
- `CLOUDINARY_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CORS_ORIGINS` (include Netlify URL and local URL if needed)

Notes:
- Health check endpoint is `GET /api/health`.
- Migrations run on deploy via `npm run render:start`.

## 2) Frontend (Netlify)

The repository now includes `netlify.toml` configured with:
- Build base: `client`
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect: all routes -> `/index.html`

### Create site
1. In Netlify, import this repository.
2. Netlify auto-detects `netlify.toml`.

### Required environment variable on Netlify
- `VITE_API_BASE_URL` = your Render backend URL (for example `https://your-service.onrender.com`)

## 3) CORS configuration

Set backend `CORS_ORIGINS` to comma-separated allowed frontend origins, for example:

`https://your-site.netlify.app,http://localhost:5173`

## 4) Local env templates

Template files were added:
- `server/.env.example`
- `client/.env.example`

Copy and fill these for local development.