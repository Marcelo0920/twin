import React from "react";
import { motion } from "framer-motion";
import { MapPin, Edit, Eye, Heart, Calendar } from "lucide-react";
import { FaDollarSign, FaBuilding } from "react-icons/fa";
import { formatPrice } from "../../utils/classic/mapHelpers";
import "./styles/myPropertyCard.css";

const MyPropertyCard = ({ property, onEdit, onClick, onShowStats }) => {
  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(property.id);
  };

  const handleStatsClick = (e) => {
    e.stopPropagation();
    onShowStats(property);
  };

  const stats = property.statistics;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className="mis-propiedades-property-card"
      onClick={() => onClick(property.id)}
    >
      <div className="mis-propiedades-image-container">
        {/* Edit Button */}
        <button className="mis-propiedades-edit-btn" onClick={handleEditClick}>
          <Edit size={18} />
        </button>

        <motion.img
          src={property.images[0]}
          alt={property.name}
          className="mis-propiedades-image"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        <div className="mis-propiedades-badges">
          <div className="mis-propiedades-single-badge">
            <FaBuilding size={12} />
            {property.type}
          </div>
          <div
            className="mis-propiedades-single-badge"
            style={{ color: "white", backgroundColor: "#FF9017" }}
          >
            {property.forSale ? "En Venta" : "En Alquiler"}
          </div>
        </div>
      </div>

      <div className="mis-propiedades-content">
        <h3 className="mis-propiedades-name">{property.name}</h3>

        <div className="mis-propiedades-price-tag">
          <FaDollarSign size={17} />
          {property.forSale
            ? formatPrice(property.price)
            : `${property.price}/mes`}
        </div>
        <div className="mis-propiedades-location">
          <MapPin size={14} />
          {property.location}
        </div>

        <div className="mis-propiedades-statistics">
          <div className="mis-propiedades-stats-header">
            <h4>Estadísticas</h4>
            <button
              className="mis-propiedades-ver-mas-btn"
              onClick={handleStatsClick}
            >
              Ver más
            </button>
          </div>
          <div className="mis-propiedades-stats-badges">
            <div className="mis-propiedades-stat-badge">
              <Eye size={16} />
              <span>{stats.views}</span>
            </div>
            <div className="mis-propiedades-stat-badge">
              <Heart size={16} />
              <span>{stats.likes}</span>
            </div>
            <div className="mis-propiedades-stat-badge">
              <Calendar size={16} />
              <span>{stats.scheduledVisits}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MyPropertyCard;
