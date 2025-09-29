// src/pages/Classic/components/PropertyCard.jsx
import React from "react";
import { MapPin } from "lucide-react";
import {
  FaBed,
  FaShower,
  FaRuler,
  FaDollarSign,
  FaBuilding,
} from "react-icons/fa";
import { formatPrice } from "../../utils/classic/mapHelpers";

const PropertyCard = ({ property, isSelected, onClick, activeTab }) => {
  return (
    <div
      className={`property-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="property-image-container">
        <img
          src={property.images[0]}
          alt={property.name}
          className="property-image"
        />
        <div className="property-price-tag">
          <FaDollarSign size={12} />
          {activeTab === "comprar"
            ? formatPrice(property.price)
            : `${property.price}/mes`}
        </div>
      </div>

      <div className="property-content">
        <h3 className="property-name">{property.name}</h3>

        <div className="property-location">
          <MapPin size={14} />
          {property.location}
        </div>

        <div className="property-characteristics">
          <h4>Características</h4>
          <div className="characteristics-list">
            <div className="characteristic">
              <FaBed size={14} />
              <span>{property.bedrooms} dorm.</span>
            </div>
            <div className="characteristic">
              <FaShower size={14} />
              <span>{property.bathrooms} baños</span>
            </div>
            <div className="characteristic">
              <FaRuler size={14} />
              <span>{property.area} m²</span>
            </div>
          </div>
        </div>

        <div className="property-type-badge">
          <FaBuilding size={12} />
          {property.type}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
