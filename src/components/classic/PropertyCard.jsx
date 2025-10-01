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

const PropertyCard = ({
  property,
  isSelected,
  onClick,
  onHover,
  activeTab,
}) => {
  return (
    <div
      className={`property-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      onMouseEnter={() => onHover(property.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="property-image-container">
        <img
          src={property.images[0]}
          alt={property.name}
          className="property-image"
        />
        <div className="property-price-tag">
          <FaDollarSign size={17} />
          {activeTab === "comprar"
            ? formatPrice(property.price)
            : `${property.price}/mes`}
        </div>

        <div className="property-badges">
          <div className="property-single-badge">
            <FaBuilding size={12} />
            {property.type}
          </div>
          <div className="property-single-badge" style={{ color: "green" }}>
            Negociable
          </div>
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
              <FaBed size={22} />
              <span>{property.bedrooms}</span>
            </div>
            <div className="characteristic">
              <FaShower size={22} />
              <span>{property.bathrooms}</span>
            </div>
            <div className="characteristic">
              <FaRuler size={22} />
              <span>{property.area} m²</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
