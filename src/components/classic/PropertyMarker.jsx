// src/components/classic/PropertyMarker.jsx
import { useEffect, useRef, useMemo } from "react";
import { Marker } from "react-leaflet";
import { createCustomMarker } from "../../utils/classic/mapHelpers";

const PropertyMarker = ({
  property,
  selectedMarkerId,
  hoveredPropertyId,
  activeTab,
  onMarkerClick,
}) => {
  const markerRef = useRef(null);

  // Create icon only once
  const icon = useMemo(
    () => createCustomMarker(property, false, false, activeTab),
    [property.id, activeTab]
  );

  // Update marker class without recreating it
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

          // Force smooth transition
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
