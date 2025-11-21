import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Navigation } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./locationStep.css";

const LocationMarker = ({ position, onPositionChange }) => {
  useMapEvents({
    click(e) {
      onPositionChange([e.latlng.lat, e.latlng.lng]);
    },
  });

  // Custom marker icon
  const customIcon = L.divIcon({
    className: "custom-location-marker",
    html: `
      <div class="property-location-marker">
        <div class="property-marker-circle">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </div>
        <div class="property-marker-arrow"></div>
      </div>
    `,
    iconSize: [48, 56],
    iconAnchor: [24, 56],
    popupAnchor: [0, -56],
  });

  return position ? <Marker position={position} icon={customIcon} /> : null;
};

const LocationStep = ({ location, onLocationChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const defaultCenter = [-17.8146, -63.1561]; // Santa Cruz

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        onLocationChange(newLocation);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("No se pudo obtener tu ubicación. Por favor marca en el mapa.");
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="location-step">
      <p className="step-description">
        Haz clic en el mapa para marcar la ubicación de la propiedad
      </p>

      <div className="map-container-step">
        <MapContainer
          center={location || defaultCenter}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker
            position={location}
            onPositionChange={onLocationChange}
          />
        </MapContainer>

        {/* Current Location Button Overlay */}
        <button
          className="current-location-btn-overlay"
          onClick={handleCurrentLocation}
          disabled={isLoading}
          title="Usar mi ubicación actual"
        >
          <Navigation size={18} />
          <span>{isLoading ? "..." : "Ubicación actual"}</span>
        </button>
      </div>
    </div>
  );
};

export default LocationStep;
