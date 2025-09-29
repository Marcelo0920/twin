// src/pages/Classic/components/PropertyList.jsx
import React from "react";
import PropertyCard from "./PropertyCard";

const PropertyList = ({
  properties,
  selectedProperty,
  onCardClick,
  activeTab,
}) => {
  return (
    <div className="properties-list-view">
      <div className="properties-header">
        <h2>Propiedades disponibles</h2>
        <span className="results-count">{properties.length} resultados</span>
      </div>

      <div className="properties-grid">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isSelected={selectedProperty?.id === property.id}
            onClick={() => onCardClick(property)}
            activeTab={activeTab}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
