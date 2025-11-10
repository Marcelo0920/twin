// src/components/guardados/ComparisonTab.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaBed,
  FaShower,
  FaRuler,
  FaDollarSign,
  FaBuilding,
  FaMapMarkerAlt,
  FaHospital,
  FaDumbbell,
  FaShoppingCart,
  FaTree,
  FaGraduationCap,
  FaUtensils,
  FaBus,
  FaCoffee,
} from "react-icons/fa";
import { formatPrice } from "../../utils/classic/mapHelpers";
import "./styles/comparisonTab.css";

const ComparisonTab = ({ properties }) => {
  if (properties.length === 0) {
    return (
      <div className="comparison-empty">
        <p>Selecciona al menos 2 propiedades para comparar</p>
      </div>
    );
  }

  // Icon mapping for nearby places
  const getNearbyPlaceIcon = (type) => {
    const iconMap = {
      hospital: <FaHospital />,
      gym: <FaDumbbell />,
      supermarket: <FaShoppingCart />,
      park: <FaTree />,
      school: <FaGraduationCap />,
      restaurant: <FaUtensils />,
      bus: <FaBus />,
      cafe: <FaCoffee />,
    };
    return iconMap[type] || <FaMapMarkerAlt />;
  };

  // Get all unique nearby place types across all properties
  const allNearbyPlaceTypes = Array.from(
    new Set(
      properties.flatMap((p) =>
        (p.nearbyPlaces || []).map((place) => place.type)
      )
    )
  );

  return (
    <div className="comparison-tab-container">
      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="feature-column">Característica</th>
              {properties.map((property, index) => (
                <motion.th
                  key={property.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="property-column"
                >
                  <img
                    src={property.images[0]}
                    alt={property.name}
                    className="property-thumb"
                  />
                  <h3>{property.name}</h3>
                  <p className="property-location">{property.location}</p>
                </motion.th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Price */}
            <tr className="comparison-row">
              <td className="feature-cell">
                <FaDollarSign className="feature-icon" />
                <span>Precio</span>
              </td>
              {properties.map((property) => (
                <td key={property.id} className="value-cell highlight-price">
                  ${formatPrice(property.price)}
                </td>
              ))}
            </tr>

            {/* Property Type */}
            <tr className="comparison-row">
              <td className="feature-cell">
                <FaBuilding className="feature-icon" />
                <span>Tipo</span>
              </td>
              {properties.map((property) => (
                <td key={property.id} className="value-cell">
                  {property.type}
                </td>
              ))}
            </tr>

            {/* Bedrooms */}
            <tr className="comparison-row">
              <td className="feature-cell">
                <FaBed className="feature-icon" />
                <span>Habitaciones</span>
              </td>
              {properties.map((property) => (
                <td
                  key={property.id}
                  className={`value-cell ${
                    property.bedrooms ===
                    Math.max(...properties.map((p) => p.bedrooms))
                      ? "best-value"
                      : ""
                  }`}
                >
                  {property.bedrooms}
                </td>
              ))}
            </tr>

            {/* Bathrooms */}
            <tr className="comparison-row">
              <td className="feature-cell">
                <FaShower className="feature-icon" />
                <span>Baños</span>
              </td>
              {properties.map((property) => (
                <td
                  key={property.id}
                  className={`value-cell ${
                    property.bathrooms ===
                    Math.max(...properties.map((p) => p.bathrooms))
                      ? "best-value"
                      : ""
                  }`}
                >
                  {property.bathrooms}
                </td>
              ))}
            </tr>

            {/* Area */}
            <tr className="comparison-row">
              <td className="feature-cell">
                <FaRuler className="feature-icon" />
                <span>Área</span>
              </td>
              {properties.map((property) => (
                <td
                  key={property.id}
                  className={`value-cell ${
                    property.area === Math.max(...properties.map((p) => p.area))
                      ? "best-value"
                      : ""
                  }`}
                >
                  {property.area} m²
                </td>
              ))}
            </tr>

            {/* Price per m² */}
            <tr className="comparison-row">
              <td className="feature-cell">
                <FaDollarSign className="feature-icon" />
                <span>Precio por m²</span>
              </td>
              {properties.map((property) => {
                const pricePerM2 = (property.price / property.area).toFixed(2);
                const minPricePerM2 = Math.min(
                  ...properties.map((p) => p.price / p.area)
                );
                return (
                  <td
                    key={property.id}
                    className={`value-cell ${
                      parseFloat(pricePerM2) === minPricePerM2
                        ? "best-value"
                        : ""
                    }`}
                  >
                    ${pricePerM2}
                  </td>
                );
              })}
            </tr>

            {/* Nearby Places Section */}
            <tr className="section-header">
              <td colSpan={properties.length + 1}>
                <h3>Lugares Cercanos</h3>
              </td>
            </tr>

            {allNearbyPlaceTypes.map((type) => (
              <tr key={type} className="comparison-row">
                <td className="feature-cell">
                  <span className="feature-icon">{getNearbyPlaceIcon(type)}</span>
                  <span style={{ textTransform: "capitalize" }}>
                    {type === "hospital"
                      ? "Hospital"
                      : type === "gym"
                      ? "Gimnasio"
                      : type === "supermarket"
                      ? "Supermercado"
                      : type === "park"
                      ? "Parque"
                      : type === "school"
                      ? "Escuela"
                      : type === "restaurant"
                      ? "Restaurante"
                      : type === "bus"
                      ? "Parada de Bus"
                      : type === "cafe"
                      ? "Café"
                      : type}
                  </span>
                </td>
                {properties.map((property) => {
                  const place = (property.nearbyPlaces || []).find(
                    (p) => p.type === type
                  );
                  return (
                    <td key={property.id} className="value-cell">
                      {place ? (
                        <div className="nearby-place-info">
                          <div className="place-name">{place.name}</div>
                          <div className="place-distance">{place.distance}</div>
                        </div>
                      ) : (
                        <span className="not-available">N/A</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Best Value Indicator */}
      <div className="comparison-legend">
        <div className="legend-item">
          <div className="legend-badge best"></div>
          <span>Mejor valor en esta categoría</span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTab;
