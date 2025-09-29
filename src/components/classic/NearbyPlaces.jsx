// src/pages/Classic/components/NearbyPlaces.jsx
import React from "react";
import {
  getNearbyPlaceIcon,
  getNearbyPlaceColor,
} from "../../utils/classic/mapHelpers";

const NearbyPlaces = ({ places, onPlaceClick }) => {
  return (
    <div className="nearby-places-section">
      <h3>Lugares Cercanos</h3>
      <div className="nearby-places-grid">
        {places.map((place) => {
          const IconComponent = getNearbyPlaceIcon(place.type);
          return (
            <div
              key={place.id}
              className="nearby-place-card"
              onClick={() => onPlaceClick(place)}
            >
              <div
                className="nearby-place-icon"
                style={{
                  background: `${getNearbyPlaceColor(place.type)}20`,
                }}
              >
                <IconComponent
                  size={24}
                  style={{ color: getNearbyPlaceColor(place.type) }}
                />
              </div>
              <div className="nearby-place-info">
                <h4>{place.name}</h4>
                <span className="distance">{place.distance}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NearbyPlaces;
