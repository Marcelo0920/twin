import React from "react";
import { AnimatePresence } from "framer-motion";
import PropertyCard from "./PropertyCard";

const PropertyList = ({
  properties,
  selectedProperty,
  onCardClick,
  onCardHover,
  activeTab,
  selectedForComparison,
  onToggleComparison,
  onCompareClick,
  showSavedOnly,
}) => {
  const compareCount = selectedForComparison?.length || 0;

  return (
    <div className="properties-list-view">
      <div className="properties-header">
        <div className="properties-header-left">
          <h2>Propiedades disponibles</h2>
          <span className="results-count">{properties.length} resultados</span>
        </div>
        {showSavedOnly && (
          <button
            className="compare-btn"
            disabled={compareCount < 2}
            onClick={onCompareClick}
          >
            Comparar
            {compareCount >= 2 && <span className="compare-count">{compareCount}</span>}
          </button>
        )}
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
              isSelectedForComparison={selectedForComparison?.includes(property.id)}
              onToggleComparison={onToggleComparison}
              showComparisonRing={showSavedOnly}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PropertyList;
