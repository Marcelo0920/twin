import React from "react";
import { Search } from "lucide-react";
import { FaCity, FaBuilding, FaBed } from "react-icons/fa";
import CustomDropdown from "../dropdown/Dropdown";
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

          {/* City Dropdown */}
          <div className="filter-group">
            <CustomDropdown
              options={cities}
              value={filters.city}
              onChange={(value) => onFilterChange("city", value)}
              placeholder="Seleccionar ciudad"
              icon={FaCity}
            />
          </div>

          {/* Property Type Dropdown */}
          <div className="filter-group">
            <CustomDropdown
              options={propertyTypes}
              value={filters.propertyType}
              onChange={(value) => onFilterChange("propertyType", value)}
              placeholder="Tipo de propiedad"
              icon={FaBuilding}
            />
          </div>

          {/* Bedrooms Dropdown */}
          <div className="filter-group">
            <CustomDropdown
              options={bedroomOptions}
              value={filters.bedrooms}
              onChange={(value) => onFilterChange("bedrooms", value)}
              placeholder="Dormitorios"
              icon={FaBed}
            />
          </div>

          {/* Search Button */}
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
