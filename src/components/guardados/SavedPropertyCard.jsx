// src/components/guardados/SavedPropertyCard.jsx
import React from "react";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import {
  FaBed,
  FaShower,
  FaRuler,
  FaDollarSign,
  FaBuilding,
  FaCheckCircle,
} from "react-icons/fa";
import { formatPrice } from "../../utils/classic/mapHelpers";
import "./styles/savedPropertyCard.css";

const SavedPropertyCard = ({ property, index, isSelected, onSelect, onClick, triggerAnimation }) => {
  const handleBulletClick = (e) => {
    e.stopPropagation();
    onSelect(property.id);
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(property);
    }
  };

  return (
    <motion.div
      layout
      className={`saved-property-card ${isSelected ? "selected" : ""}`}
      onClick={handleCardClick}
    >
      <div className="property-image-container">
        <img
          src={property.images[0]}
          alt={property.name}
          className="property-image"
        />

        {/* Selection Bullet Button */}
        <motion.button
          className={`selection-bullet ${isSelected ? "selected" : ""} ${triggerAnimation ? "animate-attention" : ""}`}
          onClick={handleBulletClick}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            borderColor: triggerAnimation ? ["#e2e8f0", "#ff9017", "#ff9017", "#ff9017", "#e2e8f0"] : "#e2e8f0"
          }}
          transition={{
            borderColor: { duration: 1, times: [0, 0.2, 0.5, 0.8, 1] }
          }}
        >
          {isSelected && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.3, ease: "backOut" }}
            >
              <FaCheckCircle size={20} />
            </motion.div>
          )}
        </motion.button>

        <div className="property-price-tag">
          <FaDollarSign size={17} />
          {formatPrice(property.price)}
        </div>

        <div className="property-badges">
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
    </motion.div>
  );
};

export default SavedPropertyCard;
