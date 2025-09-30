// src/pages/Classic.jsx
import React, { useState, useRef } from "react";
import Header from "../components/Header";
import FilterSection from "../components/classic/FilterSection";
import PropertyList from "../components/classic/PropertyList";
import DetailedPropertyView from "../components/classic/DetailedPropertyView";
import MapSection from "../components/classic/MapSection";
import Modal360 from "../components/classic/Modal360";
import { mockProperties } from "../data/mockProperties";
import { formatPrice } from "../utils/classic/mapHelpers";
import "./styles/classic.css";

const Classic = () => {
  // State management
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("comprar");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [show360Modal, setShow360Modal] = useState(false);
  const [current360Images, setCurrent360Images] = useState([]);
  const [current360ImageIndex, setCurrent360ImageIndex] = useState(0);
  const [selectedNearbyPlace, setSelectedNearbyPlace] = useState(null);
  const mapRef = useRef(null);

  // Filter states - NOW WITH ALL THE NEW FILTERS INCLUDING ADVANCED ONES
  const [filters, setFilters] = useState({
    city: "",
    propertyType: "",
    priceRange: [0, 1000000],
    bedrooms: "",
    // Advanced filters
    bathrooms: "",
    garages: "",
    minArea: "",
    maxArea: "",
    yearBuilt: "",
    condition: "",
    amenities: [],
    zone: "",
  });

  // Filter properties based on activeTab and filters
  const filteredProperties = mockProperties.filter((property) => {
    // Tab filter (buy/rent)
    const matchesTab =
      activeTab === "comprar" ? property.forSale : !property.forSale;
    if (!matchesTab) return false;

    // City filter
    if (
      filters.city &&
      !property.location.toLowerCase().includes(filters.city.toLowerCase())
    ) {
      return false;
    }

    // Property type filter
    if (
      filters.propertyType &&
      property.type.toLowerCase() !== filters.propertyType.toLowerCase()
    ) {
      return false;
    }

    // Bedrooms filter
    if (filters.bedrooms) {
      const bedroomCount = parseInt(filters.bedrooms);
      if (filters.bedrooms === "5") {
        if (property.bedrooms < 5) return false;
      } else {
        if (property.bedrooms !== bedroomCount) return false;
      }
    }

    // Price range filter
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      if (property.price < minPrice || property.price > maxPrice) {
        return false;
      }
    }

    // ADVANCED FILTERS

    // Bathrooms filter
    if (filters.bathrooms) {
      const bathroomCount = parseInt(filters.bathrooms);
      if (filters.bathrooms === "4") {
        if (property.bathrooms < 4) return false;
      } else {
        if (property.bathrooms !== bathroomCount) return false;
      }
    }

    // Garages filter - add garages field to mockProperties
    if (filters.garages && property.garages) {
      const garageCount = parseInt(filters.garages);
      if (filters.garages === "3") {
        if (property.garages < 3) return false;
      } else {
        if (property.garages !== garageCount) return false;
      }
    }

    // Area filter - add to mockProperties if needed
    if (filters.minArea && property.area < parseInt(filters.minArea)) {
      return false;
    }
    if (filters.maxArea && property.area > parseInt(filters.maxArea)) {
      return false;
    }

    // Year built filter - add to mockProperties if needed
    if (filters.yearBuilt && property.yearBuilt) {
      const filterYear = parseInt(filters.yearBuilt);
      if (property.yearBuilt < filterYear) return false;
    }

    // Condition filter - add to mockProperties if needed
    if (filters.condition && property.condition) {
      if (property.condition !== filters.condition) return false;
    }

    // Amenities filter - add to mockProperties if needed
    if (
      filters.amenities &&
      filters.amenities.length > 0 &&
      property.amenities
    ) {
      const hasAllAmenities = filters.amenities.every((amenity) =>
        property.amenities.includes(amenity)
      );
      if (!hasAllAmenities) return false;
    }

    return true;
  });

  // Handlers
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMarkerClick = (property) => {
    setSelectedProperty(property);
    setSelectedMarkerId(property.id);
    setShowDetailView(true);
    if (mapRef.current) {
      mapRef.current.setView(property.coordinates, 15);
    }
  };

  const handleCardClick = (property) => {
    setSelectedProperty(property);
    setSelectedMarkerId(property.id);
    setShowDetailView(true);
    if (mapRef.current) {
      mapRef.current.setView(property.coordinates, 15);
    }
  };

  const handleBackToList = () => {
    setShowDetailView(false);
    setTimeout(() => {
      setSelectedProperty(null);
      setSelectedMarkerId(null);
    }, 300);
  };

  const handleNearbyPlaceClick = (place) => {
    setSelectedNearbyPlace(place);
    setCurrent360Images([
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop",
    ]);
    setCurrent360ImageIndex(0);
    setShow360Modal(true);
  };

  const handleStreet360Click = (image) => {
    setCurrent360Images([image]);
    setSelectedNearbyPlace(null);
    setCurrent360ImageIndex(0);
    setShow360Modal(true);
  };

  const handleClose360Modal = () => {
    setShow360Modal(false);
    setCurrent360ImageIndex(0);
  };

  return (
    <div className="classic-container">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <FilterSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <div className="main-content">
        <div className="properties-section">
          <div
            className={`properties-container ${
              showDetailView ? "show-detail" : "show-list"
            }`}
          >
            <PropertyList
              properties={filteredProperties}
              selectedProperty={selectedProperty}
              onCardClick={handleCardClick}
              activeTab={activeTab}
            />

            <div className="properties-detail-view">
              <DetailedPropertyView
                property={selectedProperty}
                activeTab={activeTab}
                onBack={handleBackToList}
                onNearbyPlaceClick={handleNearbyPlaceClick}
                onStreet360Click={handleStreet360Click}
              />
            </div>
          </div>
        </div>

        <MapSection
          mapRef={mapRef}
          properties={filteredProperties}
          selectedProperty={selectedProperty}
          selectedMarkerId={selectedMarkerId}
          activeTab={activeTab}
          onMarkerClick={handleMarkerClick}
          onNearbyPlaceClick={handleNearbyPlaceClick}
        />
      </div>

      <Modal360
        isOpen={show360Modal}
        onClose={handleClose360Modal}
        images={current360Images}
        currentIndex={current360ImageIndex}
        onIndexChange={setCurrent360ImageIndex}
        selectedPlace={selectedNearbyPlace}
      />
    </div>
  );
};

export default Classic;
