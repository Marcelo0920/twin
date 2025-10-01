// src/pages/Classic.jsx
import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import FilterSection from "../components/classic/FilterSection";
import PropertyList from "../components/classic/PropertyList";
import DetailedPropertyView from "../components/classic/DetailedPropertyView";
import MapSection from "../components/classic/MapSection";
import Modal360 from "../components/classic/Modal360";
import { mockProperties } from "../data/mockProperties";
import { formatPrice } from "../utils/classic/mapHelpers";
import "./styles/classic.css";
import "../components/classic/styles/properties.css";

const Classic = () => {
  // State management
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("comprar");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [hoveredPropertyId, setHoveredPropertyId] = useState(null);
  const [hoveredNearbyPlaceId, setHoveredNearbyPlaceId] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [show360Modal, setShow360Modal] = useState(false);
  const [current360Images, setCurrent360Images] = useState([]);
  const [current360ImageIndex, setCurrent360ImageIndex] = useState(0);
  const [selectedNearbyPlace, setSelectedNearbyPlace] = useState(null);
  const [showNearbyPlaces, setShowNearbyPlaces] = useState(false);
  const [animateDetailNearby, setAnimateDetailNearby] = useState(false);

  const mapRef = useRef(null);
  const hoverTimerRef = useRef(null);
  const panTimerRef = useRef(null);

  // Filter states
  const [filters, setFilters] = useState({
    city: "",
    propertyType: "",
    priceRange: [0, 1000000],
    bedrooms: "",
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
    const matchesTab =
      activeTab === "comprar" ? property.forSale : !property.forSale;
    if (!matchesTab) return false;

    if (
      filters.city &&
      !property.location.toLowerCase().includes(filters.city.toLowerCase())
    ) {
      return false;
    }

    if (
      filters.propertyType &&
      property.type.toLowerCase() !== filters.propertyType.toLowerCase()
    ) {
      return false;
    }

    if (filters.bedrooms) {
      const bedroomCount = parseInt(filters.bedrooms);
      if (filters.bedrooms === "5") {
        if (property.bedrooms < 5) return false;
      } else {
        if (property.bedrooms !== bedroomCount) return false;
      }
    }

    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      if (property.price < minPrice || property.price > maxPrice) {
        return false;
      }
    }

    if (filters.bathrooms) {
      const bathroomCount = parseInt(filters.bathrooms);
      if (filters.bathrooms === "4") {
        if (property.bathrooms < 4) return false;
      } else {
        if (property.bathrooms !== bathroomCount) return false;
      }
    }

    if (filters.garages && property.garages) {
      const garageCount = parseInt(filters.garages);
      if (filters.garages === "3") {
        if (property.garages < 3) return false;
      } else {
        if (property.garages !== garageCount) return false;
      }
    }

    if (filters.minArea && property.area < parseInt(filters.minArea)) {
      return false;
    }
    if (filters.maxArea && property.area > parseInt(filters.maxArea)) {
      return false;
    }

    if (filters.yearBuilt && property.yearBuilt) {
      const filterYear = parseInt(filters.yearBuilt);
      if (property.yearBuilt < filterYear) return false;
    }

    if (filters.condition && property.condition) {
      if (property.condition !== filters.condition) return false;
    }

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

  // Check if marker is visible in map bounds
  const isMarkerVisible = (coordinates) => {
    if (!mapRef.current) return true;
    const bounds = mapRef.current.getBounds();
    return bounds.contains(coordinates);
  };

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
    setAnimateDetailNearby(true);

    if (mapRef.current) {
      mapRef.current.setView(property.coordinates, 15);
    }

    // Reset animation flag after animation completes
    setTimeout(() => {
      setAnimateDetailNearby(false);
    }, 800);
  };

  const handleCardClick = (property) => {
    setSelectedProperty(property);
    setSelectedMarkerId(property.id);
    setShowDetailView(true);
    setAnimateDetailNearby(true);

    if (mapRef.current) {
      mapRef.current.setView(property.coordinates, 15);
    }

    // Reset animation flag after animation completes
    setTimeout(() => {
      setAnimateDetailNearby(false);
    }, 800);
  };

  const handleCardHover = (propertyId) => {
    // Clear existing timers
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (panTimerRef.current) {
      clearTimeout(panTimerRef.current);
      panTimerRef.current = null;
    }

    setHoveredPropertyId(propertyId);

    if (propertyId) {
      const property = filteredProperties.find((p) => p.id === propertyId);

      if (property) {
        // Set timer for panning to marker if not visible (5 seconds)
        panTimerRef.current = setTimeout(() => {
          if (!isMarkerVisible(property.coordinates) && mapRef.current) {
            mapRef.current.flyTo(property.coordinates, 15, {
              duration: 1.5,
              easeLinearity: 0.25,
            });
          }
        }, 1500);

        // Set timer for showing nearby places (7 seconds)
        hoverTimerRef.current = setTimeout(() => {
          setShowNearbyPlaces(true);
        }, 3000);
      }
    } else {
      // Hide nearby places when hover ends
      setShowNearbyPlaces(false);
    }
  };

  const handleNearbyPlaceHover = (placeId) => {
    setHoveredNearbyPlaceId(placeId);
  };

  const handleBackToList = () => {
    setShowDetailView(false);
    setShowNearbyPlaces(false);
    setAnimateDetailNearby(false);
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

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      if (panTimerRef.current) clearTimeout(panTimerRef.current);
    };
  }, []);

  // Get the hovered property to show nearby places
  const hoveredProperty = hoveredPropertyId
    ? filteredProperties.find((p) => p.id === hoveredPropertyId)
    : null;

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
              onCardHover={handleCardHover}
              activeTab={activeTab}
            />

            <div className="properties-detail-view">
              <DetailedPropertyView
                property={selectedProperty}
                activeTab={activeTab}
                onBack={handleBackToList}
                onNearbyPlaceClick={handleNearbyPlaceClick}
                onNearbyPlaceHover={handleNearbyPlaceHover}
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
          hoveredPropertyId={hoveredPropertyId}
          hoveredNearbyPlaceId={hoveredNearbyPlaceId}
          activeTab={activeTab}
          onMarkerClick={handleMarkerClick}
          onNearbyPlaceClick={handleNearbyPlaceClick}
          showNearbyPlaces={showNearbyPlaces}
          hoveredProperty={hoveredProperty}
          animateDetailNearby={animateDetailNearby}
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
