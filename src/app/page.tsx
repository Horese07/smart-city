"use client";

import { useMemo, useState, useEffect } from "react";
import poisData from "@/data/pois.json";
import { CATEGORIES, type POI } from "@/types/poi";
import Header3D from "@/components/Header3D";
import MapWrapper from "@/components/MapWrapper";
import Sidebar from "@/components/Sidebar";
import BusinessPanel from "@/components/BusinessPanel";
import ChatWidget from "@/components/ChatWidget";

const pois = poisData as POI[];

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [dark, setDark] = useState(true);
  const [baseMap, setBaseMap] = useState<"streets" | "dark" | "light">("dark");
  const [activeLayers, setActiveLayers] = useState<Set<string>>(
    new Set(CATEGORIES.filter((c) => c !== "All"))
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const filteredIds = useMemo(() => {
    const q = search.toLowerCase().trim();
    const bySearch = q
      ? pois.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        )
      : pois;
    return new Set(bySearch.map((p) => p.id));
  }, [search]);

  const toggleLayer = (category: string) => {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-slate-900">
      <Header3D search={search} onSearch={setSearch} resultCount={filteredIds.size} />
      <Sidebar
        activeLayers={activeLayers}
        onToggleLayer={toggleLayer}
        baseMap={baseMap}
        onBaseMapChange={setBaseMap}
        dark={dark}
        onDark={setDark}
      />
      <div className="absolute left-0 right-0 top-0 flex h-full pt-16">
        <div className="relative flex-1">
          <MapWrapper
            pois={pois}
            selectedPOI={selectedPOI}
            onSelectPOI={setSelectedPOI}
            filteredIds={filteredIds}
            baseMap={baseMap}
            activeLayers={activeLayers}
          />
        </div>
        {selectedPOI && (
          <aside className="absolute right-0 top-0 z-20 h-full w-full shrink-0 border-l border-slate-700 bg-slate-900 shadow-2xl transition-all duration-300 sm:w-96">
            <BusinessPanel poi={selectedPOI} onClose={() => setSelectedPOI(null)} />
          </aside>
        )}
      </div>
      <ChatWidget />
    </div>
  );
}
