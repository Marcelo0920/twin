// src/pages/Classic/components/Modal360.jsx
import React from "react";
import { X } from "lucide-react";
import {
  getNearbyPlaceIcon,
  getNearbyPlaceColor,
} from "../../utils/classic/mapHelpers";

const Modal360 = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
  selectedPlace,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay-classic" onClick={onClose}>
      <div
        className="modal-content-classic"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-classic" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-360-viewer">
          <img
            src={images[currentIndex]}
            alt="360 view"
            className="viewer-360-image"
          />

          {selectedPlace && (
            <div className="place-info-overlay">
              <div className="place-overlay-content">
                <div className="place-icon-container">
                  {React.createElement(getNearbyPlaceIcon(selectedPlace.type), {
                    size: 24,
                    style: { color: getNearbyPlaceColor(selectedPlace.type) },
                  })}
                </div>
                <div className="place-details">
                  <h3>{selectedPlace.name}</h3>
                  <p>Vista 360° • {selectedPlace.distance}</p>
                </div>
              </div>
            </div>
          )}

          {images.length > 1 && (
            <div className="viewer-navigation">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`nav-dot ${idx === currentIndex ? "active" : ""}`}
                  onClick={() => onIndexChange(idx)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal360;
