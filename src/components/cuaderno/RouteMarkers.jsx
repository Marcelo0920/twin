import React from "react";
import { Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "./styles/routeMarkers.css";

const RouteMarkers = ({ markers, onMarkerDrag, isEditable }) => {
  // Create custom numbered icons
  const createNumberedIcon = (number) => {
    return L.divIcon({
      className: "custom-numbered-marker",
      html: `<div class="marker-number">${number}</div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18], // Center the icon so the line passes through the middle
    });
  };

  // Extract positions for the polyline
  const positions = markers.map((marker) => marker.position);

  return (
    <>
      {/* Draw polyline connecting the markers */}
      {markers.length > 1 && (
        <Polyline
          positions={positions}
          color="#ff9017"
          weight={4}
          opacity={0.7}
        />
      )}

      {/* Render markers */}
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          icon={createNumberedIcon(marker.order)}
          draggable={isEditable}
          eventHandlers={{
            dragend: (e) => {
              const newPos = e.target.getLatLng();
              onMarkerDrag(marker.id, [newPos.lat, newPos.lng]);
            },
          }}
        />
      ))}
    </>
  );
};

export default RouteMarkers;
