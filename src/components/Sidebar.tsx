"use client";

import { useState } from "react";
import { CATEGORIES } from "@/types/poi";

interface SidebarProps {
  activeLayers: Set<string>;
  onToggleLayer: (category: string) => void;
  baseMap: "streets" | "dark" | "light";
  onBaseMapChange: (map: "streets" | "dark" | "light") => void;
  dark: boolean;
  onDark: (v: boolean) => void;
}

export default function Sidebar({
  activeLayers,
  onToggleLayer,
  baseMap,
  onBaseMapChange,
  dark,
  onDark,
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState<"layers" | "legend" | null>(null);

  return (
    <div className="absolute left-0 top-0 z-20 flex h-full flex-col bg-slate-900/95 backdrop-blur">
      <div className="flex h-16 items-center justify-center border-b border-slate-700 px-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20 text-lg font-bold text-amber-400">
          ST
        </div>
      </div>

      <div className="flex-1 space-y-1 p-2">
        <button
          type="button"
          onClick={() => setActiveTab(activeTab === "layers" ? null : "layers")}
          className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
            activeTab === "layers"
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-slate-800"
          }`}
          title="Layers"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab(activeTab === "legend" ? null : "legend")}
          className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
            activeTab === "legend"
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-slate-800"
          }`}
          title="Legend"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </button>
      </div>

      {activeTab === "layers" && (
        <div className="absolute left-16 top-0 z-30 h-full w-72 bg-slate-800/98 shadow-2xl backdrop-blur">
          <div className="border-b border-slate-700 p-4">
            <h3 className="text-sm font-semibold text-white">Map Layers</h3>
          </div>
          <div className="space-y-2 p-4">
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-300">
                Base Map
              </label>
              <select
                value={baseMap}
                onChange={(e) => onBaseMapChange(e.target.value as "streets" | "dark" | "light")}
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="streets">Streets (OSM)</option>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="mb-2 block text-xs font-medium text-slate-300">
                Points of Interest
              </label>
              <div className="space-y-2">
                {CATEGORIES.filter((c) => c !== "All").map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-2 rounded-lg p-2 hover:bg-slate-700"
                  >
                    <input
                      type="checkbox"
                      checked={activeLayers.has(category)}
                      onChange={() => onToggleLayer(category)}
                      className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-sm text-slate-200">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "legend" && (
        <div className="absolute left-16 top-0 z-30 h-full w-64 bg-slate-800/98 shadow-2xl backdrop-blur">
          <div className="border-b border-slate-700 p-4">
            <h3 className="text-sm font-semibold text-white">Active Legend</h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {CATEGORIES.filter((c) => c !== "All" && activeLayers.has(c)).map(
                (category) => (
                  <div key={category} className="flex items-center gap-3">
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{ background: getCategoryColor(category) }}
                    />
                    <span className="text-sm text-slate-200">{category}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-slate-700 p-2">
        <button
          type="button"
          onClick={() => onDark(!dark)}
          className="flex h-12 w-12 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-slate-800"
          title={dark ? "Light mode" : "Dark mode"}
        >
          {dark ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

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
