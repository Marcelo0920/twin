import React, { useState } from "react";
import { X, Edit2, Save } from "lucide-react";
import ImageCarousel from "../classic/ImageCarousel";
import "./styles/propertyDetailModal.css";

const PropertyDetailModal = ({ property, onClose, onSave }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({ ...property });

  const images = property.photos && property.photos.length > 0
    ? property.photos
    : [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      ];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleIndicatorClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleEditToggle = () => {
    if (isEditMode && onSave) {
      onSave(editedData);
    }
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const displayData = isEditMode ? editedData : property;

  const formatOperacion = (op) => {
    const map = { venta: "En Venta", alquiler: "Alquiler", anticretico: "Anticretico" };
    return map[op] || op;
  };

  const formatMoneda = (mon) => {
    const map = { bs: "Bs", usd: "$us" };
    return map[mon] || mon;
  };

  const renderField = (label, field, type = "text", options = null) => {
    const value = displayData[field];
    const displayValue = value || "—";

    return (
      <div className="pdm-field-row">
        <label className="pdm-field-label">{label}</label>
        {isEditMode ? (
          options ? (
            <select
              value={editedData[field] || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="pdm-field-input pdm-select"
            >
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              value={editedData[field] || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="pdm-field-input"
              placeholder={label}
            />
          )
        ) : (
          <span className="pdm-field-value">{displayValue}</span>
        )}
      </div>
    );
  };

  return (
    <div className="pdm-overlay" onClick={onClose}>
      <div className="pdm-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="pdm-header">
          <h2 className="pdm-title">{displayData.direccion || "Detalles de la Propiedad"}</h2>
          <div className="pdm-header-actions">
            <button
              className={`pdm-edit-btn ${isEditMode ? "active" : ""}`}
              onClick={handleEditToggle}
            >
              {isEditMode ? (
                <>
                  <Save size={18} />
                  <span>Guardar</span>
                </>
              ) : (
                <>
                  <Edit2 size={18} />
                  <span>Editar</span>
                </>
              )}
            </button>
            <button className="pdm-close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="pdm-content">
          {/* Image Carousel */}
          <ImageCarousel
            images={images}
            currentIndex={currentImageIndex}
            onNext={handleNextImage}
            onPrev={handlePrevImage}
            onIndicatorClick={handleIndicatorClick}
            propertyName={displayData.direccion}
          />

          {/* Property Details */}
          <div className="pdm-details">
            {/* Basic Info */}
            <div className="pdm-section">
              <h3 className="pdm-section-title">Información Básica</h3>
              <div className="pdm-fields">
                {renderField("Tipo de Vivienda", "tipoVivienda", "text", [
                  { value: "casa", label: "Casa" },
                  { value: "departamento", label: "Departamento" },
                  { value: "terreno", label: "Terreno" },
                ])}
                {renderField("Condición", "condicion", "text", [
                  { value: "nuevo", label: "Nuevo" },
                  { value: "usado", label: "Usado" },
                ])}
                {renderField("Moneda", "moneda", "text", [
                  { value: "bs", label: "Bs" },
                  { value: "usd", label: "$us" },
                ])}
              </div>
            </div>

            {/* Operation */}
            <div className="pdm-section">
              <h3 className="pdm-section-title">Operación</h3>
              <div className="pdm-fields">
                {renderField("Operación", "operacion", "text", [
                  { value: "venta", label: "En Venta" },
                  { value: "alquiler", label: "Alquiler" },
                  { value: "anticretico", label: "Anticretico" },
                ])}
                {renderField("Precio", "precio", "number")}
              </div>
            </div>

            {/* Surfaces */}
            <div className="pdm-section">
              <h3 className="pdm-section-title">Superficies</h3>
              <div className="pdm-fields">
                {renderField("Superficie const.", "construccion", "number")}
                {renderField("Superficie terreno", "terreno", "number")}
              </div>
            </div>

            {/* Rooms */}
            <div className="pdm-section">
              <h3 className="pdm-section-title">Ambientes</h3>
              <div className="pdm-fields">
                {renderField("Habitaciones", "habitaciones", "number")}
                {renderField("Dormitorios", "dormitorios", "number")}
                {renderField("Baños", "banos", "number")}
                {renderField("Garaje", "garaje", "number")}
              </div>
            </div>

            {/* Construction Details */}
            <div className="pdm-section">
              <h3 className="pdm-section-title">Detalles de Construcción</h3>
              <div className="pdm-fields">
                {renderField("Niveles", "niveles", "number")}
                {renderField("Año", "anoConstuccion", "number")}
                {renderField("Tipo de vía", "tipoVia", "text", [
                  { value: "pavimento", label: "Pavimento" },
                  { value: "tierra", label: "Tierra" },
                  { value: "adoquin", label: "Adoquín" },
                ])}
                {renderField("Frente terreno", "frenteTerreno", "number")}
              </div>
            </div>

            {/* Contact Info */}
            <div className="pdm-section">
              <h3 className="pdm-section-title">Información de Contacto</h3>
              <div className="pdm-fields">
                {renderField("Origen", "origen", "text", [
                  { value: "propietario", label: "Propietario" },
                  { value: "inmobiliaria", label: "Inmobiliaria" },
                ])}
                {renderField("Agente", "agente", "text")}
                {renderField("Franquicia", "franquicia", "text")}
                {renderField("Teléfono ref.", "telefonoRef", "text")}
              </div>
            </div>

            {/* Financial */}
            <div className="pdm-section">
              <h3 className="pdm-section-title">Información Financiera</h3>
              <div className="pdm-fields">
                {renderField("Tipo de cambio", "tipoCambio", "number")}
                {renderField("Mi oferta", "miOferta", "number")}
                {renderField("Valor mínimo", "valorMin", "number")}
                {renderField("Valor máximo", "valorMax", "number")}
              </div>
            </div>

            {/* Additional */}
            <div className="pdm-section">
              <h3 className="pdm-section-title">Información Adicional</h3>
              <div className="pdm-fields">
                {renderField("Código", "codigoInterno", "text")}
                {renderField("Ranking", "ranking", "number")}
              </div>
            </div>

            {/* Description */}
            <div className="pdm-section">
              <h3 className="pdm-section-title">Descripción</h3>
              {isEditMode ? (
                <textarea
                  value={editedData.descripcion || ""}
                  onChange={(e) => handleInputChange("descripcion", e.target.value)}
                  className="pdm-field-input pdm-textarea"
                  rows="4"
                  placeholder="Descripción de la propiedad..."
                />
              ) : (
                <p className="pdm-description-text">
                  {displayData.descripcion || "—"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailModal;
