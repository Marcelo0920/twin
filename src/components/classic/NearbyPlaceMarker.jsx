// src/components/classic/NearbyPlaceMarker.jsx
import { useEffect, useRef, useMemo } from "react";
import { Marker } from "react-leaflet";
import { createNearbyPlaceMarker } from "../../utils/classic/mapHelpers";

const NearbyPlaceMarker = ({
  place,
  hoveredNearbyPlaceId,
  onNearbyPlaceClick,
}) => {
  const markerRef = useRef(null);

  // Create icon only once
  const icon = useMemo(
    () => createNearbyPlaceMarker(place, false),
    [place.id, place.type]
  );

  // Update marker class without recreating it
  useEffect(() => {
    if (markerRef.current) {
      const markerElement = markerRef.current;
      const iconElement = markerElement.getElement();

      if (iconElement) {
        const placeMarker = iconElement.querySelector(".nearby-place-marker");
        if (placeMarker) {
          const isHovered = hoveredNearbyPlaceId === place.id;

          // Force smooth transition
          if (isHovered) {
            placeMarker.classList.add("hovered");
          } else {
            placeMarker.classList.remove("hovered");
          }
        }
      }
    }
  }, [hoveredNearbyPlaceId, place.id]);

  return (
    <Marker
      ref={markerRef}
      position={place.coordinates}
      icon={icon}
      eventHandlers={{
        click: () => onNearbyPlaceClick(place),
      }}
    />
  );
};

export default NearbyPlaceMarker;
