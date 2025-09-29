// src/pages/Classic/components/FilterSection.jsx
import React from "react";
import { Search } from "lucide-react";
import { FaCity, FaBuilding, FaBed } from "react-icons/fa";
import {
  cities,
  propertyTypes,
  bedroomOptions,
} from "../../data/filterOptions";

const FilterSection = ({
  activeTab,
  setActiveTab,
  filters,
  onFilterChange,
}) => {
  return (
    <div className="filter-section">
      <div className="filter-container">
        <div className="quick-filters">
          {/* Search Tabs */}
          <div className="filter-group">
            <div className="search-tabs">
              {["comprar", "alquilar"].map((tab) => (
                <button
                  key={tab}
                  className={`search-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <div className="input-with-icon">
              <FaCity className="input-icon" />
              <select
                value={filters.city}
                onChange={(e) => onFilterChange("city", e.target.value)}
                className="filter-select with-icon"
              >
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-group">
            <div className="input-with-icon">
              <FaBuilding className="input-icon" />
              <select
                value={filters.propertyType}
                onChange={(e) => onFilterChange("propertyType", e.target.value)}
                className="filter-select with-icon"
              >
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-group">
            <div className="input-with-icon">
              <FaBed className="input-icon" />
              <select
                value={filters.bedrooms}
                onChange={(e) => onFilterChange("bedrooms", e.target.value)}
                className="filter-select with-icon"
              >
                {bedroomOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-actions">
            <button className="search-btn">
              <Search size={18} />
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
