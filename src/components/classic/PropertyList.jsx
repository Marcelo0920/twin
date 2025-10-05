import React from "react";
import { AnimatePresence } from "framer-motion";
import PropertyCard from "./PropertyCard";

const PropertyList = ({
  properties,
  selectedProperty,
  onCardClick,
  onCardHover,
  activeTab,
}) => {
  return (
    <div className="properties-list-view">
      <div className="properties-header">
        <h2>Propiedades disponibles</h2>
        <span className="results-count">{properties.length} resultados</span>
      </div>

      <div className="properties-grid">
        <AnimatePresence mode="popLayout">
          {properties.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              isSelected={selectedProperty?.id === property.id}
              onClick={() => onCardClick(property)}
              onHover={onCardHover}
              activeTab={activeTab}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PropertyList;
