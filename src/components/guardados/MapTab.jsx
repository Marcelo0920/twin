// src/components/guardados/MapTab.jsx
import React, { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { formatPrice, createNearbyPlaceMarker } from "../../utils/classic/mapHelpers";
import Modal360 from "../classic/Modal360";
import "leaflet/dist/leaflet.css";
import "./styles/mapTab.css";

// Custom marker colors for different properties
const markerColors = [
  "#ff9017",
  "#667eea",
  "#f093fb",
  "#4facfe",
  "#43e97b",
  "#fa709a",
  "#fee140",
  "#30cfd0",
];

// Component to fit bounds to all markers
const FitBounds = ({ properties }) => {
  const map = useMap();

  useEffect(() => {
    if (properties.length > 0) {
      const bounds = L.latLngBounds(properties.map((p) => p.coordinates));
      map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 15,
      });
    }
  }, [properties, map]);

  return null;
};

const MapTab = ({ properties }) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [show360Modal, setShow360Modal] = useState(false);
  const [current360Images, setCurrent360Images] = useState([]);
  const [current360ImageIndex, setCurrent360ImageIndex] = useState(0);
  const [selectedNearbyPlace, setSelectedNearbyPlace] = useState(null);

  // Create custom markers for each property
  const propertyMarkers = useMemo(() => {
    return properties.map((property, index) => {
      const color = markerColors[index % markerColors.length];

      const markerHtml = `
        <div class="custom-comparison-marker" style="background: ${color};">
          <div class="marker-price">${formatPrice(property.price)}</div>
          <div class="marker-pointer" style="border-top-color: ${color};"></div>
        </div>
      `;

      return {
        property,
        icon: L.divIcon({
          html: markerHtml,
          className: "custom-marker-wrapper",
          iconSize: [120, 50],
          iconAnchor: [60, 50],
        }),
      };
    });
  }, [properties]);

  // Calculate center point
  const center = useMemo(() => {
    if (properties.length === 0) return [-17.7833, -63.1667];

    const avgLat =
      properties.reduce((sum, p) => sum + p.coordinates[0], 0) /
      properties.length;
    const avgLng =
      properties.reduce((sum, p) => sum + p.coordinates[1], 0) /
      properties.length;

    return [avgLat, avgLng];
  }, [properties]);

  // Get selected property
  const selectedProperty = properties.find(p => p.id === selectedPropertyId);

  // Handle property marker click
  const handlePropertyClick = (propertyId) => {
    setSelectedPropertyId(prev => prev === propertyId ? null : propertyId);
  };

  // Handle nearby place click
  const handleNearbyPlaceClick = (place) => {
    setSelectedNearbyPlace(place);
    setCurrent360Images([
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop",
    ]);
    setCurrent360ImageIndex(0);
    setShow360Modal(true);
  };

  // Handle close modal
  const handleClose360Modal = () => {
    setShow360Modal(false);
    setCurrent360ImageIndex(0);
  };

  if (properties.length === 0) {
    return (
      <div className="map-tab-empty">
        <p>Selecciona al menos 2 propiedades para comparar en el mapa</p>
      </div>
    );
  }

  return (
    <div className="map-tab-container">
      <MapContainer
        center={center}
        zoom={12}
        className="comparison-map"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds properties={properties} />

        {propertyMarkers.map(({ property, icon }, index) => (
          <Marker
            key={property.id}
            position={property.coordinates}
            icon={icon}
            eventHandlers={{
              click: () => handlePropertyClick(property.id)
            }}
          />
        ))}

        {/* Nearby Place Markers for selected property */}
        {selectedProperty && selectedProperty.nearbyPlaces && selectedProperty.nearbyPlaces.map((place) => (
          <Marker
            key={`nearby-${place.id}`}
            position={place.coordinates}
            icon={createNearbyPlaceMarker(place, false)}
            eventHandlers={{
              click: () => handleNearbyPlaceClick(place)
            }}
          />
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="map-legend">
        <h4>Propiedades</h4>
        {properties.map((property, index) => (
          <div key={property.id} className="legend-item">
            <div
              className="legend-color"
              style={{ background: markerColors[index % markerColors.length] }}
            ></div>
            <span>{property.name}</span>
          </div>
        ))}
      </div>

      {/* Modal360 for nearby places */}
      <Modal360
        isOpen={show360Modal}
        onClose={handleClose360Modal}
        images={current360Images}
        currentIndex={current360ImageIndex}
        onIndexChange={setCurrent360ImageIndex}
        selectedPlace={selectedNearbyPlace}
      />
    </div>
  );
};

export default MapTab;
