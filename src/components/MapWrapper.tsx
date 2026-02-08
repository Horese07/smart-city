"use client";

import dynamic from "next/dynamic";
import type { POI } from "@/types/poi";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-slate-900">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
        <p className="text-slate-400">Loading map…</p>
      </div>
    </div>
  ),
});

interface MapWrapperProps {
  pois: POI[];
  selectedPOI: POI | null;
  onSelectPOI: (poi: POI) => void;
  filteredIds: Set<number>;
  baseMap: "streets" | "dark" | "light";
  activeLayers: Set<string>;
}

export default function MapWrapper(props: MapWrapperProps) {
  return <Map {...props} />;
}
