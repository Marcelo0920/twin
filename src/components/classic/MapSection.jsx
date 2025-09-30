// src/pages/Classic/components/MapSection.jsx
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import PropertyMarker from "./PropertyMarker";
import NearbyPlaceMarker from "./NearbyPlaceMarker";

const MapSection = ({
  mapRef,
  properties,
  selectedProperty,
  selectedMarkerId,
  hoveredPropertyId,
  hoveredNearbyPlaceId,
  activeTab,
  onMarkerClick,
  onNearbyPlaceClick,
}) => {
  return (
    <div className="map-section">
      <MapContainer
        center={[-17.7833, -63.1667]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Property markers - using custom PropertyMarker component */}
        {properties.map((property) => (
          <PropertyMarker
            key={property.id}
            property={property}
            selectedMarkerId={selectedMarkerId}
            hoveredPropertyId={hoveredPropertyId}
            activeTab={activeTab}
            onMarkerClick={onMarkerClick}
          />
        ))}

        {/* Nearby places markers - using custom NearbyPlaceMarker component */}
        {selectedProperty &&
          selectedProperty.nearbyPlaces &&
          selectedProperty.nearbyPlaces.map((place) => (
            <NearbyPlaceMarker
              key={`nearby-${place.id}`}
              place={place}
              hoveredNearbyPlaceId={hoveredNearbyPlaceId}
              onNearbyPlaceClick={onNearbyPlaceClick}
            />
          ))}
      </MapContainer>
    </div>
  );
};

export default MapSection;
