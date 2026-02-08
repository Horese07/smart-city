"use client";

import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { POI } from "@/types/poi";

const TILE_LAYERS: Record<string, { url: string; attribution: string }> = {
  streets: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  dark: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  light: {
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
};

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    "Surf School": "#3b82f6",
    Café: "#f59e0b",
    Restaurant: "#ef4444",
    Hostel: "#8b5cf6",
    Shop: "#10b981",
  };
  return colors[category] || "#6b7280";
}

function createPopupContent(poi: POI, onSelectPOI: (poi: POI) => void): HTMLElement {
  const div = document.createElement("div");
  div.className = "min-w-[200px] text-left";
  div.innerHTML = `
    <img src="${poi.image}" alt="${poi.name}" class="mb-2 h-24 w-full rounded object-cover" />
    <p class="text-xs font-medium uppercase tracking-wide" style="color: ${getCategoryColor(poi.category)}">${poi.category}</p>
    <h3 class="font-semibold text-gray-900 dark:text-white">${poi.name}</h3>
    <p class="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">${poi.description}</p>
    <div class="mt-3 flex gap-2">
      <button type="button" data-poi-id="${poi.id}" class="rounded bg-amber-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-600">View Products</button>
      <a href="${poi.contact}" target="_blank" rel="noopener noreferrer" class="rounded border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">Contact</a>
    </div>
  `;
  div.querySelector("button[data-poi-id]")?.addEventListener("click", () => onSelectPOI(poi));
  return div;
}

interface MapProps {
  pois: POI[];
  selectedPOI: POI | null;
  onSelectPOI: (poi: POI) => void;
  filteredIds: Set<number>;
  baseMap: "streets" | "dark" | "light";
  activeLayers: Set<string>;
}

export default function Map({
  pois,
  selectedPOI,
  onSelectPOI,
  filteredIds,
  baseMap,
  activeLayers,
}: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const visiblePOIs = useMemo(
    () =>
      pois.filter(
        (p) => filteredIds.has(p.id) && activeLayers.has(p.category)
      ),
    [pois, filteredIds, activeLayers]
  );

  useEffect(() => {
    if (!containerRef.current) return;

    mapRef.current = L.map(containerRef.current, {
      center: [30.511, -9.677],
      zoom: 15,
      zoomControl: false,
    });

    L.control.zoom({ position: "bottomright" }).addTo(mapRef.current);

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      if (tileLayerRef.current) {
        tileLayerRef.current.remove();
        tileLayerRef.current = null;
      }
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    const tiles = TILE_LAYERS[baseMap] ?? TILE_LAYERS.streets;
    if (tileLayerRef.current) tileLayerRef.current.remove();
    tileLayerRef.current = L.tileLayer(tiles.url, { attribution: tiles.attribution }).addTo(mapRef.current);
  }, [baseMap]);

  useEffect(() => {
    if (!mapRef.current) return;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    visiblePOIs.forEach((poi) => {
      const marker = L.marker([poi.lat, poi.lng])
        .addTo(mapRef.current!)
        .bindPopup(createPopupContent(poi, onSelectPOI));
      markersRef.current.push(marker);
    });
  }, [visiblePOIs, onSelectPOI]);

  useEffect(() => {
    if (!mapRef.current || !selectedPOI) return;
    mapRef.current.setView([selectedPOI.lat, selectedPOI.lng], mapRef.current.getZoom());
  }, [selectedPOI]);

  return <div ref={containerRef} className="absolute inset-0 z-0 h-full w-full" />;
}
