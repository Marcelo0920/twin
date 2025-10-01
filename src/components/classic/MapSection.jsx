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
  showNearbyPlaces,
  hoveredProperty,
  animateDetailNearby,
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

        {/* Nearby places markers - only show for hovered property after 7s */}
        {showNearbyPlaces &&
          hoveredProperty &&
          hoveredProperty.nearbyPlaces &&
          hoveredProperty.nearbyPlaces.map((place, index) => (
            <NearbyPlaceMarker
              key={`nearby-${place.id}`}
              place={place}
              hoveredNearbyPlaceId={hoveredNearbyPlaceId}
              onNearbyPlaceClick={onNearbyPlaceClick}
              showAnimation={true}
              animationDelay={index * 100}
            />
          ))}

        {/* Always show nearby places for selected property in detail view */}
        {selectedProperty &&
          selectedProperty.nearbyPlaces &&
          !showNearbyPlaces &&
          selectedProperty.nearbyPlaces.map((place, index) => (
            <NearbyPlaceMarker
              key={`nearby-selected-${place.id}`}
              place={place}
              hoveredNearbyPlaceId={hoveredNearbyPlaceId}
              onNearbyPlaceClick={onNearbyPlaceClick}
              showAnimation={animateDetailNearby}
              animationDelay={index * 100}
            />
          ))}
      </MapContainer>
    </div>
  );
};

export default MapSection;
