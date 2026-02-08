#  Smart Tourism 

**Smart Tourism Geoportal** for a hackathon demo (RAMADANIA, Morocco). Interactive, mobile-first prototype with **OpenStreetMap + Leaflet** (no API key), business vitrines, and a simulated AI tourist assistant.

## ✨ Features

### 🗺️ **Interactive Map (OpenStreetMap + Leaflet)**
- **No API key required** — uses free OSM and CARTO tile layers
- **Base map switcher** — Streets (OSM), Dark, Light (CARTO)
- **Markers & popups** with POI details, images, “View Products” and “Contact”
- **Layer toggles** — show/hide POI categories from the sidebar
- **Zoom control** (bottom-right)

### 🎛️ **Professional Sidebar**
- **Layer management** — toggle POI categories on/off
- **Base map** — Streets (OSM), Dark, Light
- **Active legend** — see which layers are visible
- **Dark mode toggle**

### 📍 **Points of Interest**
- **~20 POIs** in Tamraght: surf schools, cafés, restaurants, hostels, shops
- **Interactive popups** with images, descriptions, and action buttons
- **Category filtering** via sidebar and search
- **Search** in header

### 🏢 **Business Vitrine**
- **Side panel** (slides in from right)
- **Product/service listings** with images and prices
- **WhatsApp contact** (dummy links)
- **Dark-themed** UI

### 🤖 **Simulated AI Assistant**
- **Floating chat** (bottom-right)
- **Canned responses** (e.g. “Where can I surf?”, “Best café near me?”)
- **No backend** — keyword-based only

### 🎨 **UI/UX**
- **Dark theme** by default
- **Mobile-first**, responsive
- **Professional header** with search and controls
- **“LIVE”** indicator for demo

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS 4
- **Map:** Leaflet + react-leaflet, OpenStreetMap & CARTO tiles (no API key)
- **Data:** Static JSON (`src/data/pois.json`)
- **Hosting:** Vercel-ready

## 📦 Setup

### 1. Install dependencies

```bash
npm install --legacy-peer-deps
```

*(`--legacy-peer-deps` is needed for React 19 with react-leaflet.)*

### 2. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**No API keys or environment variables are required.**

## 🏗️ Build & Deploy

```bash
npm run build
npm start
```

Deploy to Vercel: connect the repo and deploy. No env vars needed.

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Map.tsx          # Leaflet + OSM map
│   ├── MapWrapper.tsx    # Dynamic import wrapper
│   ├── Sidebar.tsx       # Layer controls
│   ├── Header3D.tsx      # Header
│   ├── BusinessPanel.tsx
│   └── ChatWidget.tsx
├── data/
│   ├── pois.json
│   └── chatResponses.ts
└── types/
    └── poi.ts
```

## 📊 Data

All content is static. Edit:
- `src/data/pois.json` — POIs, products, contact links
- `src/data/chatResponses.ts` — AI assistant responses

## 📝 License

MIT.
