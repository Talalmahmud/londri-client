/* ------------------ User Location + Polyline Component ------------------ */
import { Marker, Polyline, Popup, useMap } from "react-leaflet";
import { Branch } from "./BranchMapView";
import { useEffect, useState } from "react";
import L, { LatLngTuple, Map as LeafletMap } from "leaflet";

export function MyLocationAndRoute({
  selectedId,
  branches,
}: {
  selectedId: string | number | null;
  branches: Branch[];
}) {
  const map = useMap();
  const [myPos, setMyPos] = useState<LatLngTuple | null>(null);

  /* Get My Geolocation */
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: LatLngTuple = [pos.coords.latitude, pos.coords.longitude];
        setMyPos(coords);

        // Center map on user when loaded
        map.setView(coords, 14);
      },
      () => {}
    );
  }, [map]);

  /* Find selected branch */
  const selectedBranch = branches.find((b) => b.id === selectedId);

  return (
    <>
      {/* My location marker */}
      {myPos && (
        <Marker
          position={myPos}
          icon={L.icon({
            iconUrl: "/marker-icon-2x.png", // ← your custom blue-dot icon
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          })}
        >
          <Popup>You are here</Popup>
        </Marker>
      )}

      {/* Route line */}
      {myPos && selectedBranch && (
        <Polyline
          positions={[myPos, [selectedBranch.lat, selectedBranch.lng]]}
        />
      )}
    </>
  );
}
