import React from "react";
import { MapPin, X, Navigation } from "lucide-react";
import "./styles/locationPermissionModal.css";

const LocationPermissionModal = ({ onAllow, onDeny }) => {
  return (
    <div className="location-permission-modal-overlay">
      <div className="location-permission-modal">
        <div className="location-permission-header">
          <div className="location-permission-icon">
            <Navigation size={32} />
          </div>
          <button className="location-permission-close" onClick={onDeny}>
            <X size={20} />
          </button>
        </div>

        <div className="location-permission-content">
          <h2 className="location-permission-title">Compartir ubicación</h2>
          <p className="location-permission-message">
            Para seguir la ruta en tiempo real, necesitamos acceso a tu
            ubicación actual.
          </p>
          <div className="location-permission-benefits">
            <div className="benefit-item">
              <MapPin size={18} />
              <span>Navega por la ruta paso a paso</span>
            </div>
            <div className="benefit-item">
              <MapPin size={18} />
              <span>Visualiza tu progreso en tiempo real</span>
            </div>
          </div>
        </div>

        <div className="location-permission-footer">
          <button className="location-permission-deny-btn" onClick={onDeny}>
            Cancelar
          </button>
          <button className="location-permission-allow-btn" onClick={onAllow}>
            <Navigation size={18} />
            <span>Permitir ubicación</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPermissionModal;
