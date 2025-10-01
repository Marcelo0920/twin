// src/components/classic/NearbyPlaceMarker.jsx
import { useEffect, useRef, useMemo } from "react";
import { Marker } from "react-leaflet";
import { createNearbyPlaceMarker } from "../../utils/classic/mapHelpers";

const NearbyPlaceMarker = ({
  place,
  hoveredNearbyPlaceId,
  onNearbyPlaceClick,
  showAnimation = false,
  animationDelay = 0,
}) => {
  const markerRef = useRef(null);

  // Create icon only once
  const icon = useMemo(
    () => createNearbyPlaceMarker(place, false),
    [place.id, place.type]
  );

  // Handle entry animation
  useEffect(() => {
    if (markerRef.current && showAnimation) {
      const markerElement = markerRef.current;
      const iconElement = markerElement.getElement();

      if (iconElement) {
        const placeMarker = iconElement.querySelector(".nearby-place-marker");
        if (placeMarker) {
          // Set animation delay
          placeMarker.style.animationDelay = `${animationDelay}ms`;

          // Add entry animation class
          placeMarker.classList.add("nearby-entering");

          // Remove animation class after animation completes
          setTimeout(() => {
            if (placeMarker) {
              placeMarker.classList.remove("nearby-entering");
              placeMarker.style.animationDelay = "";
            }
          }, 600 + animationDelay);
        }
      }
    }
  }, [showAnimation, animationDelay]);

  // Update marker class for hover without recreating it
  useEffect(() => {
    if (markerRef.current) {
      const markerElement = markerRef.current;
      const iconElement = markerElement.getElement();

      if (iconElement) {
        const placeMarker = iconElement.querySelector(".nearby-place-marker");
        if (placeMarker) {
          const isHovered = hoveredNearbyPlaceId === place.id;

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
