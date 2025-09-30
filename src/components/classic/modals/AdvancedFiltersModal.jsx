import React, { useState } from "react";
import { X, Check } from "lucide-react";
import {
  FaShower,
  FaCar,
  FaRuler,
  FaCalendar,
  FaCheckCircle,
} from "react-icons/fa";
import CustomDropdown from "../../dropdown/Dropdown";
import { bathroomOptions, garageOptions } from "../../../data/filterOptions";

const AdvancedFiltersModal = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onApply,
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  if (!isOpen) return null;

  const handleLocalChange = (field, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleClear = () => {
    const cleared = {
      bathrooms: "",
      garages: "",
      minArea: "",
      maxArea: "",
      yearBuilt: "",
      condition: "",
      amenities: [],
    };
    setLocalFilters((prev) => ({ ...prev, ...cleared }));
  };

  const conditionOptions = [
    { value: "", label: "Cualquier estado" },
    { value: "nuevo", label: "Nuevo" },
    { value: "usado", label: "Usado" },
    { value: "construccion", label: "En construcción" },
    { value: "remodelado", label: "Remodelado" },
  ];

  const yearOptions = [
    { value: "", label: "Cualquier año" },
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2020", label: "2020 o más" },
    { value: "2015", label: "2015 o más" },
    { value: "2010", label: "2010 o más" },
  ];

  const amenitiesList = [
    { id: "pool", label: "Piscina" },
    { id: "gym", label: "Gimnasio" },
    { id: "garden", label: "Jardín" },
    { id: "security", label: "Seguridad 24/7" },
    { id: "elevator", label: "Ascensor" },
    { id: "ac", label: "Aire Acondicionado" },
    { id: "heating", label: "Calefacción" },
    { id: "furnished", label: "Amoblado" },
  ];

  const toggleAmenity = (id) => {
    const current = localFilters.amenities || [];
    const updated = current.includes(id)
      ? current.filter((a) => a !== id)
      : [...current, id];
    handleLocalChange("amenities", updated);
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>Filtros Avanzados</h2>
          <button style={styles.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div style={styles.content}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Características Básicas</h3>
            <div style={styles.grid}>
              <div style={styles.filterGroup}>
                <label style={styles.label}>
                  <FaShower style={styles.labelIcon} />
                  Baños
                </label>
                <CustomDropdown
                  options={bathroomOptions}
                  value={localFilters.bathrooms}
                  onChange={(value) => handleLocalChange("bathrooms", value)}
                  placeholder="Seleccionar"
                />
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.label}>
                  <FaCar style={styles.labelIcon} />
                  Garajes
                </label>
                <CustomDropdown
                  options={garageOptions}
                  value={localFilters.garages}
                  onChange={(value) => handleLocalChange("garages", value)}
                  placeholder="Seleccionar"
                />
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Área (m²)</h3>
            <div style={styles.areaInputs}>
              <div style={styles.inputWrapper}>
                <FaRuler style={styles.inputIcon} />
                <input
                  type="number"
                  placeholder="Mín"
                  value={localFilters.minArea || ""}
                  onChange={(e) => handleLocalChange("minArea", e.target.value)}
                  style={styles.input}
                />
              </div>
              <span style={styles.separator}>—</span>
              <div style={styles.inputWrapper}>
                <FaRuler style={styles.inputIcon} />
                <input
                  type="number"
                  placeholder="Máx"
                  value={localFilters.maxArea || ""}
                  onChange={(e) => handleLocalChange("maxArea", e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Estado y Antigüedad</h3>
            <div style={styles.grid}>
              <div style={styles.filterGroup}>
                <label style={styles.label}>
                  <FaCheckCircle style={styles.labelIcon} />
                  Estado
                </label>
                <CustomDropdown
                  options={conditionOptions}
                  value={localFilters.condition}
                  onChange={(value) => handleLocalChange("condition", value)}
                  placeholder="Seleccionar"
                />
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.label}>
                  <FaCalendar style={styles.labelIcon} />
                  Año de Construcción
                </label>
                <CustomDropdown
                  options={yearOptions}
                  value={localFilters.yearBuilt}
                  onChange={(value) => handleLocalChange("yearBuilt", value)}
                  placeholder="Seleccionar"
                />
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Comodidades</h3>
            <div style={styles.amenitiesGrid}>
              {amenitiesList.map((amenity) => (
                <button
                  key={amenity.id}
                  style={{
                    ...styles.amenityBtn,
                    ...(localFilters.amenities?.includes(amenity.id)
                      ? styles.amenityBtnActive
                      : {}),
                  }}
                  onClick={() => toggleAmenity(amenity.id)}
                >
                  {localFilters.amenities?.includes(amenity.id) && (
                    <Check size={16} style={styles.checkIcon} />
                  )}
                  {amenity.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.footer}>
          <button style={styles.clearBtn} onClick={handleClear}>
            Limpiar Filtros
          </button>
          <button style={styles.applyBtn} onClick={handleApply}>
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99999,
    padding: "20px",
    animation: "fadeIn 0.3s ease",
  },
  modal: {
    background: "white",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "700px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    animation: "slideUp 0.3s ease",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 28px",
    borderBottom: "2px solid #f1f5f9",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#1e293b",
    margin: 0,
  },
  closeBtn: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    background: "#f1f5f9",
    color: "#64748b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "24px 28px",
  },
  section: {
    marginBottom: "28px",
  },
  sectionTitle: {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#334155",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#475569",
  },
  labelIcon: {
    color: "#667eea",
    fontSize: "14px",
  },
  areaInputs: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  inputWrapper: {
    flex: 1,
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#667eea",
    fontSize: "14px",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "12px 12px 12px 38px",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "0.95rem",
    fontWeight: "500",
    color: "#1e293b",
    outline: "none",
    transition: "all 0.2s",
  },
  separator: {
    color: "#cbd5e1",
    fontWeight: "600",
  },
  amenitiesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "10px",
  },
  amenityBtn: {
    padding: "12px 16px",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    background: "white",
    color: "#64748b",
    fontSize: "0.875rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    justifyContent: "center",
  },
  amenityBtnActive: {
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    borderColor: "#667eea",
    color: "white",
  },
  checkIcon: {
    flexShrink: 0,
  },
  footer: {
    padding: "20px 28px",
    borderTop: "2px solid #f1f5f9",
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
  },
  clearBtn: {
    padding: "12px 24px",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    background: "white",
    color: "#64748b",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  applyBtn: {
    padding: "12px 32px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 4px 16px rgba(102, 126, 234, 0.3)",
  },
};

// Animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(40px) scale(0.95);
    }
    to { 
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;
document.head.appendChild(styleSheet);

export default AdvancedFiltersModal;
