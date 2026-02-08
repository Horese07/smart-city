"use client";

import type { POI } from "@/types/poi";

interface BusinessPanelProps {
  poi: POI;
  onClose: () => void;
}

export default function BusinessPanel({ poi, onClose }: BusinessPanelProps) {
  return (
    <div className="flex h-full flex-col bg-slate-900 shadow-xl text-white">
      <div className="relative h-44 shrink-0 overflow-hidden">
        <img
          src={poi.image}
          alt={poi.name}
          className="h-full w-full object-cover"
        />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-amber-300">
            {poi.category}
          </p>
          <h2 className="text-lg font-bold text-white">{poi.name}</h2>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-sm text-slate-300">{poi.description}</p>
        <h3 className="mt-4 font-semibold text-white">
          Products &amp; services
        </h3>
        <ul className="mt-2 space-y-3">
          {poi.products.map((product, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-lg border border-slate-700 bg-slate-800 p-3"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-16 w-20 shrink-0 rounded object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-white">
                  {product.name}
                </p>
                <p className="text-sm font-semibold text-amber-400">
                  {product.price}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <a
          href={poi.contact}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 font-medium text-white hover:bg-green-700"
        >
          <span>Contact via WhatsApp</span>
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
