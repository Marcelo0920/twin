import React, { useState, useRef, useEffect } from "react";
import { Search, X, MapPin } from "lucide-react";
import "./styles/citySearchModal.css";

// List of major cities in Bolivia with coordinates
const bolivianCities = [
  { name: "Santa Cruz, Bolivia", lat: -17.8146, lng: -63.1561 },
  { name: "La Paz, Bolivia", lat: -16.5, lng: -68.15 },
  { name: "Cochabamba, Bolivia", lat: -17.3895, lng: -66.1568 },
  { name: "Sucre, Bolivia", lat: -19.0332, lng: -65.2627 },
  { name: "Tarija, Bolivia", lat: -21.5355, lng: -64.7296 },
  { name: "Oruro, Bolivia", lat: -17.9833, lng: -67.15 },
  { name: "Potosí, Bolivia", lat: -19.5836, lng: -65.7531 },
  { name: "Trinidad, Bolivia", lat: -14.8333, lng: -64.9 },
  { name: "Cobija, Bolivia", lat: -11.0267, lng: -68.7692 },
];

const CitySearchModal = ({ onClose, onSelectCity, currentCity }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState(bolivianCities);
  const searchInputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    // Focus on search input when modal opens
    searchInputRef.current?.focus();

    // Handle click outside to close
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    // Filter cities based on search query
    if (searchQuery.trim() === "") {
      setFilteredCities(bolivianCities);
    } else {
      const filtered = bolivianCities.filter((city) =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCities(filtered);
    }
  }, [searchQuery]);

  const handleCityClick = (city) => {
    onSelectCity(city);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="city-search-modal-overlay">
      <div className="city-search-modal" ref={modalRef}>
        <div className="city-search-modal-header">
          <h2 className="city-search-modal-title">Seleccionar Ciudad</h2>
          <button className="city-search-modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="city-search-input-container">
          <Search size={20} className="city-search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            className="city-search-input"
            placeholder="Buscar ciudad..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="city-list">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <button
                key={city.name}
                className={`city-item ${
                  city.name === currentCity ? "selected" : ""
                }`}
                onClick={() => handleCityClick(city)}
              >
                <MapPin size={18} className="city-item-icon" />
                <span className="city-item-name">{city.name}</span>
              </button>
            ))
          ) : (
            <div className="no-results">
              <p>No se encontraron ciudades</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitySearchModal;
