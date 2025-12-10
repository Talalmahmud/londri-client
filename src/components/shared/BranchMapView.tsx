"use client";

import "leaflet/dist/leaflet.css";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { LatLngTuple, Map as LeafletMap } from "leaflet";
import { Button } from "@/components/ui/button";
import { MyLocationAndRoute } from "./MyLocationAndRoute";

/* ---------------------- Fix Marker Icons (No ANY used) ---------------------- */
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/mark.png",
  iconUrl: "/mark.png",
  shadowUrl: "/mark.png",
});

/* ----------------------------- Branch Type ----------------------------- */
export type Branch = {
  id: string | number;
  name: string;
  address?: string;
  lat: number;
  lng: number;
  phone?: string;
  hours?: string;
};

interface MapAutoOpenPopupProps {
  selectedId: string | number | null;
  branches: Branch[];
}

export interface BranchMarker extends L.Marker {
  branchId: string | number;
}

export function isBranchMarker(layer: L.Layer): layer is BranchMarker {
  return layer instanceof L.Marker && "branchId" in layer;
}

/* --------------------------- Main Component ---------------------------- */
export default function BranchMapView({
  branches,
  initialCenter = [23.8103, 90.4125],
  initialZoom = 12,
}: {
  branches: Branch[];
  initialCenter?: LatLngTuple;
  initialZoom?: number;
}) {
  const mapRef = useRef<LeafletMap | null>(null);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [query, setQuery] = useState("");

  /* Filter branches */
  const filtered = useMemo(
    () =>
      branches.filter((b) =>
        (b.name + " " + (b.address ?? ""))
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [branches, query]
  );

  /* Fit markers into view */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || filtered.length === 0) return;

    const bounds = L.latLngBounds(
      filtered.map((b) => [b.lat, b.lng] as LatLngTuple)
    );

    const t = setTimeout(() => {
      map.invalidateSize();
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

  /* Pan when selecting branch */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedId) return;

    const found = branches.find((b) => b.id === selectedId);
    if (!found) return;

    map.setView([found.lat, found.lng], Math.max(initialZoom, 14), {
      animate: true,
    });
  }, [selectedId, branches, initialZoom]);

  return (
    <div className="flex flex-col lg:flex-row w-full  gap-4 h-[620px]">
      {/* ----------------------- Sidebar ----------------------- */}
      <aside className="w-full lg:w-96 bg-white rounded-xl shadow p-4 flex flex-col">
        <h3 className="text-lg font-semibold flex justify-between">
          Branches
          <span className="text-sm text-gray-500">{filtered.length} shown</span>
        </h3>

        <input
          className="w-full px-3 py-2 border rounded-md text-sm mt-3"
          placeholder="Search branch name or address..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="mt-4 overflow-y-auto px-2 py-2 flex-1">
          {filtered.length === 0 ? (
            <div className="text-sm text-gray-500 p-4">No branches found.</div>
          ) : (
            filtered.map((b) => (
              <div
                key={b.id}
                onClick={() => setSelectedId(b.id)}
                className={`p-3 rounded-lg cursor-pointer hover:bg-gray-50 flex items-start mt-2 gap-3 ${
                  selectedId === b.id
                    ? "ring-2 ring-indigo-300 bg-indigo-50"
                    : ""
                }`}
              >
                <div className="flex-1">
                  <div className="font-medium">{b.name}</div>
                  <div className="text-sm text-gray-500">{b.address}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {b.phone && `${b.phone} ·`}
                    {b.hours ?? " Hours N/A"}
                  </div>
                </div>

                <Button
                  size="sm"
                  onClick={() => window.open(`tel:${b.phone ?? ""}`)}
                >
                  Call
                </Button>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              if (!mapRef.current) return;
              mapRef.current.setView(initialCenter, initialZoom, {
                animate: true,
              });
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

      {/* ----------------------- Map ----------------------- */}
      <div className="flex-1 rounded-xl overflow-hidden shadow">
        <MapContainer
          ref={mapRef}
          center={initialCenter}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filtered.map((b) => (
            <Marker
              key={b.id}
              position={[b.lat, b.lng]}
              icon={L.icon({
                iconUrl: "/marker-icon-2x.png", // ← your custom blue-dot icon
                iconSize: [20, 20],
                iconAnchor: [10, 10],
              })}
              eventHandlers={{
                click: () => setSelectedId(b.id),
              }}
            >
              <Popup>
                <div className="max-w-xs">
                  <div className="font-semibold">{b.name}</div>
                  <div className="text-sm text-gray-600">{b.address}</div>

                  {b.phone && (
                    <a
                      href={`tel:${b.phone}`}
                      className="text-indigo-600 text-sm mt-2 block"
                    >
                      Call: {b.phone}
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

          <MyLocationAndRoute selectedId={selectedId} branches={branches} />
        </MapContainer>
      </div>
    </div>
  );
}

/* ------------------ Auto-open Popup Component (Typed) ------------------ */
export function MapAutoOpenPopup({
  selectedId,
  branches,
}: MapAutoOpenPopupProps) {
  const map = useMap();

  useEffect(() => {
    if (!map || selectedId == null) return;

    const target = branches.find((b) => b.id === selectedId);
    if (!target) return;

    map.invalidateSize();

    setTimeout(() => {
      let targetMarker: BranchMarker | null = null;

      map.eachLayer((layer) => {
        if (isBranchMarker(layer)) {
          if (layer.branchId === selectedId) {
            targetMarker = layer;
          }
        }
      });

      // if (targetMarker) {
      //   targetMarker.openPopup();
      //   map.panTo(targetMarker.getLatLng());
      // } else {
      //   map.panTo([target.lat, target.lng]);
      // }
    }, 80);
  }, [selectedId, branches, map]);

  return null;
}
