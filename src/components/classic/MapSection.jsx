// src/pages/Classic/components/MapSection.jsx
import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import {
  createCustomMarker,
  createNearbyPlaceMarker,
} from "../../utils/classic/mapHelpers";

const MapSection = ({
  mapRef,
  properties,
  selectedProperty,
  selectedMarkerId,
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

        {/* Property markers */}
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={property.coordinates}
            icon={createCustomMarker(property, selectedMarkerId, activeTab)}
            eventHandlers={{
              click: () => onMarkerClick(property),
            }}
          />
        ))}

        {/* Nearby places markers */}
        {selectedProperty &&
          selectedProperty.nearbyPlaces &&
          selectedProperty.nearbyPlaces.map((place) => (
            <Marker
              key={`nearby-${place.id}`}
              position={place.coordinates}
              icon={createNearbyPlaceMarker(place)}
              eventHandlers={{
                click: () => onNearbyPlaceClick(place),
              }}
            />
          ))}
      </MapContainer>
    </div>
  );
};

export default MapSection;
