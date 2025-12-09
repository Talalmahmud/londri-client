"use client";
import "leaflet/dist/leaflet.css";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import Image from "next/image";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";

/* Fix default marker icons in many bundlers */
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

type Branch = {
  id: string | number;
  name: string;
  address?: string;
  lat: number;
  lng: number;
  phone?: string;
  hours?: string;
};

export default function BranchMapView({
  branches,
  initialCenter = [23.8103, 90.4125], // default Dhaka
  initialZoom = 12,
}: {
  branches: Branch[];
  initialCenter?: LatLngTuple;
  initialZoom?: number;
}) {
  const mapRef = useRef<L.Map | null>(null);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      branches.filter((b) =>
        (b.name + " " + (b.address ?? ""))
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [branches, query]
  );

  // Fit to bounds after mount or when branches change
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !filtered.length) return;

    const bounds = L.latLngBounds(
      filtered.map((b) => [b.lat, b.lng] as LatLngTuple)
    );
    // small timeout to ensure map container is measured properly (fixes SSR/hydration and layout change issues)
    const t = setTimeout(() => {
      map.invalidateSize(); // critical to avoid clipped/shifted maps
      if (filtered.length === 1) {
        map.setView(
          [filtered[0].lat, filtered[0].lng],
          Math.max(initialZoom, 13)
        );
      } else {
        map.fitBounds(bounds, { padding: [60, 60] });
      }
    }, 50);

    return () => clearTimeout(t);
  }, [filtered, initialZoom]);

  // when selectedId changes, pan & open popup
  useEffect(() => {
    const map = mapRef.current;
    if (!map || selectedId == null) return;
    const found = branches.find((b) => b.id === selectedId);
    if (!found) return;
    map.setView([found.lat, found.lng], Math.max(initialZoom, 14), {
      animate: true,
    });
  }, [selectedId, branches, initialZoom]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[720px]">
      {/* Sidebar */}
      <aside className="w-full lg:w-96 bg-white rounded-xl shadow p-4 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Branches</h3>
          <div className="text-sm text-gray-500">{filtered.length} shown</div>
        </div>

        <div className="mt-3">
          <input
            className="w-full px-3 py-2 border rounded-md text-sm"
            placeholder="Search branch name or address..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="mt-4 overflow-y-auto flex-1">
          {filtered.length === 0 ? (
            <div className="text-sm text-gray-500 p-4">
              No branches match your search.
            </div>
          ) : (
            filtered.map((b) => (
              <div
                key={b.id}
                onClick={() => setSelectedId(b.id)}
                className={`p-3 rounded-lg cursor-pointer hover:bg-gray-50 flex items-start gap-3 ${
                  selectedId === b.id
                    ? "ring-2 ring-indigo-300 bg-indigo-50"
                    : ""
                }`}
              >
                <div className="flex-1">
                  <div className="font-medium">{b.name}</div>
                  <div className="text-sm text-gray-500">{b.address}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {b.phone ? `${b.phone} · ` : ""}
                    {b.hours ?? "Hours N/A"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => window.open(`tel:${b.phone ?? ""}`)}
                  >
                    Call
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              const map = mapRef.current;
              if (!map) return;
              map.setView(initialCenter, initialZoom, { animate: true });
            }}
          >
            Reset view
          </Button>
          <Button
            onClick={() => {
              if (!mapRef.current || filtered.length === 0) return;
              const bounds = L.latLngBounds(
                filtered.map((b) => [b.lat, b.lng] as LatLngTuple)
              );
              mapRef.current.fitBounds(bounds, { padding: [60, 60] });
            }}
          >
            Fit branches
          </Button>
        </div>
      </aside>

      {/* Map */}
      <div className="flex-1 rounded-xl overflow-hidden shadow">
        <MapContainer
          whenCreated={(m) => (mapRef.current = m)}
          center={initialCenter}
          zoom={initialZoom}
          scrollWheelZoom={false} // prevents accidental page scroll/zoom
          className="w-full h-full"
          style={{ minHeight: 400 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">Carto</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {filtered.map((b) => (
            <Marker
              key={b.id}
              position={[b.lat, b.lng]}
              eventHandlers={{
                click: () => setSelectedId(b.id),
              }}
            >
              <Popup>
                <div className="max-w-xs">
                  <div className="font-semibold">{b.name}</div>
                  <div className="text-sm text-gray-600">{b.address}</div>
                  {b.phone && (
                    <div className="mt-2">
                      <a
                        href={`tel:${b.phone}`}
                        className="text-indigo-600 text-sm"
                      >
                        Call: {b.phone}
                      </a>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
          <MapAutoOpenPopup selectedId={selectedId} branches={branches} />
        </MapContainer>
      </div>
    </div>
  );
}

/* Helper component: opens popup for selected marker (works by finding layer and opening popup). */
function MapAutoOpenPopup({
  selectedId,
  branches,
}: {
  selectedId: string | number | null;
  branches: Branch[];
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    // invalidate size to fix cases where parent changing size leaves map unresponsive
    map.invalidateSize();

    if (selectedId == null) return;

    // find the marker layer by comparing latlngs
    const target = branches.find((b) => b.id === selectedId);
    if (!target) return;

    // open popup for matching layer
    // Leaflet stores layers; find marker with same latlng
    let foundLayer: L.Layer | null = null;
    map.eachLayer((layer: any) => {
      if (!layer.getLatLng) return;
      const latlng = layer.getLatLng();
      if (!latlng) return;
      if (latlng.lat === target.lat && latlng.lng === target.lng) {
        foundLayer = layer;
      }
    });

    if (foundLayer && (foundLayer as any).openPopup) {
      (foundLayer as any).openPopup();
    } else {
      // fallback: pan to location
      map.panTo([target.lat, target.lng]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, map]);
  return null;
}
