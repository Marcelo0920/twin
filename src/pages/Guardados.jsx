// src/pages/Guardados.jsx
import React, { useState } from "react";
import Header from "../components/headers/Header";
import SavedPropertyCard from "../components/guardados/SavedPropertyCard";
import ComparisonModal from "../components/guardados/ComparisonModal";
import PropertyDetailModal from "../components/guardados/PropertyDetailModal";
import { mockProperties } from "../data/mockProperties";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/guardados.css";

const Guardados = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [triggerBulletAnimation, setTriggerBulletAnimation] = useState(false);

  // For demo purposes, filter some properties as "saved"
  // In a real app, this would come from user's saved list
  const savedProperties = mockProperties.filter((p) => p.forSale);

  const handlePropertySelect = (propertyId) => {
    setSelectedProperties((prev) => {
      if (prev.includes(propertyId)) {
        return prev.filter((id) => id !== propertyId);
      } else {
        return [...prev, propertyId];
      }
    });
  };

  const handleCompareClick = () => {
    if (selectedProperties.length < 2) {
      // Trigger animation on first bullet
      setTriggerBulletAnimation(true);
      setTimeout(() => {
        setTriggerBulletAnimation(false);
      }, 1000);
    } else {
      setShowComparisonModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowComparisonModal(false);
  };

  const handleCardClick = (property) => {
    setSelectedProperty(property);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setTimeout(() => {
      setSelectedProperty(null);
    }, 300);
  };

  const getSelectedPropertyObjects = () => {
    return savedProperties.filter((p) => selectedProperties.includes(p.id));
  };

  return (
    <div className="guardados-container">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="guardados-content">
        <div className="guardados-header">
          <h1>Propiedades Guardadas</h1>
          <p className="guardados-subtitle">
            {savedProperties.length}{" "}
            {savedProperties.length === 1
              ? "propiedad guardada"
              : "propiedades guardadas"}
          </p>
        </div>

        <motion.button
          className={`comparar-button ${
            selectedProperties.length >= 2 ? "enabled" : "disabled"
          }`}
          onClick={handleCompareClick}
        >
          Comparar ({selectedProperties.length})
        </motion.button>

        <div className="guardados-grid">
          <AnimatePresence mode="popLayout">
            {savedProperties.map((property, index) => (
              <SavedPropertyCard
                key={property.id}
                property={property}
                index={index}
                isSelected={selectedProperties.includes(property.id)}
                onSelect={handlePropertySelect}
                onClick={handleCardClick}
                triggerAnimation={index < 3 && triggerBulletAnimation}
              />
            ))}
          </AnimatePresence>
        </div>

        {savedProperties.length === 0 && (
          <div className="empty-state">
            <p>No tienes propiedades guardadas</p>
          </div>
        )}
      </div>

      <ComparisonModal
        isOpen={showComparisonModal}
        onClose={handleCloseModal}
        properties={getSelectedPropertyObjects()}
      />

      <PropertyDetailModal
        isOpen={showDetailModal}
        onClose={handleCloseDetailModal}
        property={selectedProperty}
      />
    </div>
  );
};

export default Guardados;
