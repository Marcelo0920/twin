import { useEffect, useRef, useMemo, useState } from "react";
import { Marker } from "react-leaflet";
import { createCustomMarker } from "../../utils/classic/mapHelpers";

const PropertyMarker = ({
  property,
  selectedMarkerId,
  hoveredPropertyId,
  activeTab,
  onMarkerClick,
  index = 0,
}) => {
  const markerRef = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);

  // Create icon only once
  const icon = useMemo(
    () => createCustomMarker(property, false, false, activeTab),
    [property.id, activeTab]
  );

  // Entry animation when marker first appears
  useEffect(() => {
    if (markerRef.current && !hasEntered) {
      const markerElement = markerRef.current;
      const iconElement = markerElement.getElement();

      if (iconElement) {
        const priceMarker = iconElement.querySelector(".price-marker");
        if (priceMarker) {
          // Add entry animation with staggered delay
          priceMarker.style.animationDelay = `${index * 50}ms`;
          priceMarker.classList.add("marker-entering");

          // Remove animation class after it completes
          setTimeout(() => {
            if (priceMarker) {
              priceMarker.classList.remove("marker-entering");
              priceMarker.style.animationDelay = "";
              setHasEntered(true);
            }
          }, 800 + index * 50);
        }
      }
    }
  }, [hasEntered, index]);

  // Update marker class for selection/hover without recreating it
  useEffect(() => {
    if (markerRef.current) {
      const markerElement = markerRef.current;
      const icon = markerElement.getElement();

      if (icon) {
        const priceMarker = icon.querySelector(".price-marker");
        if (priceMarker) {
          const isHighlighted =
            selectedMarkerId === property.id ||
            hoveredPropertyId === property.id;

          if (isHighlighted) {
            priceMarker.classList.add("selected");
          } else {
            priceMarker.classList.remove("selected");
          }
        }
      }
    }
  }, [selectedMarkerId, hoveredPropertyId, property.id]);

  return (
    <Marker
      ref={markerRef}
      position={property.coordinates}
      icon={icon}
      eventHandlers={{
        click: () => onMarkerClick(property),
      }}
    />
  );
};

export default PropertyMarker;
