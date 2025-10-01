import React, { useState } from "react";
import { Search, Sliders } from "lucide-react";
import { FaCity, FaBuilding, FaBed } from "react-icons/fa";
import CustomDropdown from "../dropdown/Dropdown";
import AdvancedFiltersModal from "./modals/AdvancedFiltersModal";
import {
  cities,
  propertyTypes,
  bedroomOptions,
} from "../../data/filterOptions";

// Inline PriceRangeSlider for the main filter bar
const CompactPriceSlider = ({ value, onChange, min, max }) => {
  const [minValue, setMinValue] = useState(value?.[0] || min);
  const [maxValue, setMaxValue] = useState(value?.[1] || max);
  const [isDragging, setIsDragging] = useState(null);
  const sliderRef = React.useRef(null);

  React.useEffect(() => {
    if (value) {
      setMinValue(value[0]);
      setMaxValue(value[1]);
    }
  }, [value]);

  const formatPrice = (price) => {
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`;
    return `$${price}`;
  };

  const handleMouseDown = (type) => (e) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    );
    const newValue = Math.round(min + percent * (max - min));

    if (isDragging === "min") {
      const clampedValue = Math.min(newValue, maxValue - 10000);
      setMinValue(clampedValue);
      onChange?.([clampedValue, maxValue]);
    } else if (isDragging === "max") {
      const clampedValue = Math.max(newValue, minValue + 10000);
      setMaxValue(clampedValue);
      onChange?.([minValue, clampedValue]);
    }
  };

  const handleMouseUp = () => setIsDragging(null);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, minValue, maxValue]);

  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        width: "100%",
      }}
    >
      <div
        style={{
          color: "rgba(255,255,255,0.85)",
          fontSize: "0.75rem",
          fontWeight: "600",
        }}
      >
        Precio
      </div>
      <div style={{ padding: "6px 0" }}>
        <div
          ref={sliderRef}
          style={{
            position: "relative",
            height: "4px",
            background: "rgba(255,255,255,0.15)",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              position: "absolute",
              height: "100%",
              background: "linear-gradient(90deg, #8b5cf6, #a855f7)",
              borderRadius: "10px",
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: `${minPercent}%`,
              width: "16px",
              height: "16px",
              background: "white",
              border: "2px solid #8b5cf6",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              cursor: "grab",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
            onMouseDown={handleMouseDown("min")}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: `${maxPercent}%`,
              width: "16px",
              height: "16px",
              background: "white",
              border: "2px solid #8b5cf6",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              cursor: "grab",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
            onMouseDown={handleMouseDown("max")}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.75rem",
          color: "white",
          fontWeight: "600",
        }}
      >
        <span>{formatPrice(minValue)}</span>
        <span>{formatPrice(maxValue)}</span>
      </div>
    </div>
  );
};

const FilterSection = ({
  activeTab,
  setActiveTab,
  filters,
  onFilterChange,
}) => {
  const [showAdvancedModal, setShowAdvancedModal] = useState(false);

  const handleAdvancedFiltersApply = (advancedFilters) => {
    Object.entries(advancedFilters).forEach(([key, value]) => {
      onFilterChange(key, value);
    });
  };

  const hasAdvancedFilters = () => {
    return (
      filters.bathrooms ||
      filters.garages ||
      filters.minArea ||
      filters.maxArea ||
      filters.yearBuilt ||
      filters.condition ||
      (filters.amenities && filters.amenities.length > 0)
    );
  };

  return (
    <>
      <div style={styles.section}>
        <div style={styles.container}>
          <div style={styles.filtersRow}>
            {/* Tabs */}

            {/* Main Filters */}
            <div style={styles.mainFilters}>
              <div style={styles.tabsWrapper}>
                <div style={styles.searchTabs}>
                  {["comprar", "alquilar"].map((tab) => (
                    <button
                      key={tab}
                      style={{
                        ...styles.searchTab,
                        ...(activeTab === tab ? styles.searchTabActive : {}),
                      }}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* City */}
              <div style={styles.filterItem}>
                <CustomDropdown
                  options={cities}
                  value={filters.city}
                  onChange={(value) => onFilterChange("city", value)}
                  placeholder="Ciudad"
                  icon={FaCity}
                />
              </div>

              {/* Property Type */}
              <div style={styles.filterItem}>
                <CustomDropdown
                  options={propertyTypes}
                  value={filters.propertyType}
                  onChange={(value) => onFilterChange("propertyType", value)}
                  placeholder="Tipo"
                  icon={FaBuilding}
                />
              </div>

              {/* Bedrooms */}
              <div style={styles.filterItemSmall}>
                <CustomDropdown
                  options={bedroomOptions}
                  value={filters.bedrooms}
                  onChange={(value) => onFilterChange("bedrooms", value)}
                  placeholder="Dorm."
                  icon={FaBed}
                />
              </div>

              {/* Price Slider */}
              <div style={styles.filterItemWide}>
                <CompactPriceSlider
                  value={filters.priceRange || [0, 1000000]}
                  onChange={(value) => onFilterChange("priceRange", value)}
                  min={0}
                  max={1000000}
                />
              </div>

              {/* Advanced Filters Button */}
              <div style={styles.filterItemBtn}>
                <button
                  style={{
                    ...styles.advancedBtn,
                    ...(hasAdvancedFilters() ? styles.advancedBtnActive : {}),
                  }}
                  onClick={() => setShowAdvancedModal(true)}
                >
                  <Sliders size={16} />
                  {hasAdvancedFilters() && <span style={styles.badge}>●</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdvancedFiltersModal
        isOpen={showAdvancedModal}
        onClose={() => setShowAdvancedModal(false)}
        filters={filters}
        onFilterChange={onFilterChange}
        onApply={handleAdvancedFiltersApply}
      />
    </>
  );
};

const styles = {
  section: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "5rem 0 1.75rem",
    color: "white",
    position: "relative",
    overflow: "visible",
    zIndex: 10,
  },
  container: {
    maxWidth: "100%",
    margin: "0 auto",
    padding: "0 2rem",
    position: "relative",
    zIndex: 1,
  },
  filtersRow: {
    display: "flex",
    alignItems: "end",
    gap: "1rem",
  },
  tabsWrapper: {
    flexShrink: 0,
  },
  searchTabs: {
    display: "flex",
    gap: "4px",
    background: "rgba(255, 255, 255, 0.1)",
    padding: "6px",
    borderRadius: "12px",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  searchTab: {
    background: "transparent",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "600",
    fontSize: "0.9rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    minWidth: "100px",
  },
  searchTabActive: {
    background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
    color: "white",
    boxShadow: "0 4px 16px rgba(139, 92, 246, 0.4)",
    transform: "translateY(-1px)",
  },
  mainFilters: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: " 1fr 1.1fr 1fr 0.75fr 1.3fr 0.5fr",
    gap: "2.2rem",
    alignItems: "end",
  },
  filterItem: {},
  filterItemSmall: {},
  filterItemWide: {},
  filterItemBtn: {},
  advancedBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "12px 14px",
    width: "maxWidth",
    border: "2px solid rgba(255, 255, 255, 0.25)",
    borderRadius: "10px",
    background: "rgba(255, 255, 255, 0.1)",
    color: "white",
    fontSize: "0.85rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
    position: "relative",
    whiteSpace: "nowrap",
  },
  advancedBtnActive: {
    background: "rgba(255, 255, 255, 0.2)",
    borderColor: "rgba(255, 255, 255, 0.4)",
    boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.1)",
  },
  advancedBtnText: {
    display: "inline",
  },
  badge: {
    position: "absolute",
    top: "-4px",
    right: "-4px",
    color: "#ef4444",
    fontSize: "1.2rem",
    lineHeight: 1,
    animation: "pulse 2s ease-in-out infinite",
  },
  searchBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "12px 16px",
    width: "100%",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "0.9rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
    color: "white",
    boxShadow: "0 4px 16px rgba(139, 92, 246, 0.3)",
    whiteSpace: "nowrap",
  },
};

export default FilterSection;
