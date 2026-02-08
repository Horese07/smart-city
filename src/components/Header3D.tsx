"use client";

interface Header3DProps {
  search: string;
  onSearch: (v: string) => void;
  resultCount: number;
}

export default function Header3D({ search, onSearch, resultCount }: Header3DProps) {
  return (
    <header className="absolute left-0 right-0 top-0 z-10 flex h-16 items-center justify-between bg-slate-900/95 px-6 shadow-lg backdrop-blur">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-amber-500 text-sm font-bold text-white">
            ST
          </div>
          <div>
            <h1 className="text-base font-bold text-white">RAMADANIA Smart Tourism</h1>
            <p className="text-xs text-slate-400">Tamraght, Agadir</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-lg bg-green-500/20 px-3 py-1.5 sm:flex">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
          <span className="text-xs font-medium text-green-400">LIVE</span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="hidden items-center gap-2 text-sm text-slate-300 sm:flex">
          <span className="text-slate-400">{resultCount}</span>
          <span className="text-slate-500">places</span>
        </div>
        <div className="relative w-full max-w-md">
          <input
            type="search"
            placeholder="Rechercher un lieu..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 pl-10 text-sm text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-slate-800"
            title="Notifications"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-slate-800"
            title="Settings"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-xs font-medium text-white">
            U
          </div>
        </div>
      </div>
    </header>
  );
}
