import React from "react";
import { MapPin, Check } from "lucide-react";
import { motion } from "framer-motion";
import {
  FaBed,
  FaShower,
  FaRuler,
  FaDollarSign,
  FaBuilding,
} from "react-icons/fa";
import { formatPrice } from "../../utils/classic/mapHelpers";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({
  property,
  isSelected,
  onClick,
  onHover,
  activeTab,
  index = 0,
  isSelectedForComparison = false,
  onToggleComparison,
  showComparisonRing = false,
}) => {
  const handleComparisonClick = (e) => {
    e.stopPropagation();
    onToggleComparison?.(property.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20, rotateX: -15 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
      exit={{
        opacity: 0,
        scale: 0.6,
        y: -30,
        rotateX: 15,
        transition: {
          duration: 0.3,
          ease: [0.43, 0.13, 0.23, 0.96],
        },
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className={`property-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      onMouseEnter={() => onHover(property.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="property-image-container">
        {/* Selection Ring - Only show when showComparisonRing is true */}
        {showComparisonRing && (
          <div
            className={`property-selection-ring ${isSelectedForComparison ? "selected" : ""}`}
            onClick={handleComparisonClick}
          >
            {isSelectedForComparison && <Check size={16} strokeWidth={3} />}
          </div>
        )}

        <motion.img
          src={property.images[0]}
          alt={property.name}
          className="property-image"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.div
          className="property-price-tag"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
        >
          <FaDollarSign size={17} />
          {activeTab === "comprar"
            ? formatPrice(property.price)
            : `${property.price}/mes`}
        </motion.div>

        <motion.div
          className="property-badges"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
        >
          <div className="property-single-badge">
            <FaBuilding size={12} />
            {property.type}
          </div>
          <div
            className="property-single-badge"
            style={{ color: "white", backgroundColor: "#df9a51ff" }}
          >
            Negociable
          </div>
        </motion.div>
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
    </motion.div>
  );
};

export default PropertyCard;
