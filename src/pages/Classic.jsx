import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, DivIcon } from "leaflet";
import { Search, ChevronDown, MapPin, X } from "lucide-react";
import {
  FaBed,
  FaShower,
  FaRuler,
  FaHome,
  FaDollarSign,
  FaBuilding,
  FaMapMarkerAlt,
  FaCity,
} from "react-icons/fa";
import Header from "../components/Header";
import "./styles/classic.css";

const Classic = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("comprar");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const mapRef = useRef(null);

  // Filter states
  const [filters, setFilters] = useState({
    city: "",
    propertyType: "",
    priceRange: [0, 1000000],
    bedrooms: "",
    zone: "",
  });

  // Mock property data for Santa Cruz, Bolivia
  const properties = [
    {
      id: 1,
      name: "Casa Moderna Equipetrol",
      price: 450000,
      type: "Casa",
      bedrooms: 4,
      bathrooms: 3,
      area: 280,
      location: "Equipetrol Norte",
      coordinates: [-17.7833, -63.1667],
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=400&fit=crop",
      forSale: true,
    },
    {
      id: 2,
      name: "Departamento Las Palmas",
      price: 280000,
      type: "Departamento",
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      location: "Las Palmas",
      coordinates: [-17.79, -63.16],
      image:
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=500&h=400&fit=crop",
      forSale: true,
    },
    {
      id: 3,
      name: "Casa Familiar Urbari",
      price: 3500,
      type: "Casa",
      bedrooms: 3,
      bathrooms: 2,
      area: 200,
      location: "Urbari",
      coordinates: [-17.77, -63.18],
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&h=400&fit=crop",
      forSale: false,
    },
    {
      id: 4,
      name: "Penthouse Centro",
      price: 650000,
      type: "Penthouse",
      bedrooms: 4,
      bathrooms: 4,
      area: 180,
      location: "Centro",
      coordinates: [-17.78, -63.182],
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=400&fit=crop",
      forSale: true,
    },
    {
      id: 5,
      name: "Apartamento Barrio Norte",
      price: 2800,
      type: "Apartamento",
      bedrooms: 2,
      bathrooms: 2,
      area: 85,
      location: "Barrio Norte",
      coordinates: [-17.765, -63.175],
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop",
      forSale: false,
    },
    {
      id: 6,
      name: "Casa Colonial Plan 3000",
      price: 320000,
      type: "Casa",
      bedrooms: 5,
      bathrooms: 3,
      area: 350,
      location: "Plan 3000",
      coordinates: [-17.795, -63.15],
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=400&fit=crop",
      forSale: true,
    },
  ];

  // Filter options
  const cities = [
    { value: "", label: "Todas las ciudades" },
    { value: "santa-cruz", label: "Santa Cruz" },
    { value: "equipetrol", label: "Equipetrol" },
    { value: "las-palmas", label: "Las Palmas" },
    { value: "centro", label: "Centro" },
  ];

  const propertyTypes = [
    { value: "", label: "Todos los tipos" },
    { value: "casa", label: "Casa" },
    { value: "departamento", label: "Departamento" },
    { value: "apartamento", label: "Apartamento" },
    { value: "penthouse", label: "Penthouse" },
  ];

  const bedroomOptions = [
    { value: "", label: "Cualquier cantidad" },
    { value: "1", label: "1 dormitorio" },
    { value: "2", label: "2 dormitorios" },
    { value: "3", label: "3 dormitorios" },
    { value: "4", label: "4+ dormitorios" },
  ];

  const zones = [
    { value: "", label: "Todas las zonas" },
    { value: "norte", label: "Zona Norte" },
    { value: "centro", label: "Zona Centro" },
    { value: "sur", label: "Zona Sur" },
    { value: "este", label: "Zona Este" },
  ];

  // Filter current properties based on activeTab
  const filteredProperties = properties.filter((property) => {
    if (activeTab === "comprar") {
      return property.forSale;
    } else {
      return !property.forSale;
    }
  });

  // Format price
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(0)}K`;
    } else {
      return `${price}`;
    }
  };

  // Create custom marker with price
  const createCustomMarker = (property) => {
    const price =
      activeTab === "comprar"
        ? formatPrice(property.price)
        : `${property.price}/mes`;

    return new DivIcon({
      html: `
        <div class="custom-marker">
          <div class="price-bubble">
            ${price}
          </div>
          <div class="marker-pin">
            <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        </div>
      `,
      className: "custom-div-icon",
      iconSize: [60, 70],
      iconAnchor: [30, 65],
      popupAnchor: [0, -65],
    });
  };

  // Handle card click
  const handleCardClick = (property) => {
    setSelectedProperty(property);
    if (mapRef.current) {
      mapRef.current.setView(property.coordinates, 15);
    }
  };

  // Handle filter changes
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      city: "",
      propertyType: "",
      priceRange: [0, 1000000],
      bedrooms: "",
      zone: "",
    });
  };

  return (
    <div className="classic-container">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-container">
          {/* Quick Filters */}
          <div className="quick-filters">
            {/* Search Tabs */}
            <div className="filter-group">
              <div className="search-tabs">
                {["comprar", "alquilar"].map((tab) => (
                  <button
                    key={tab}
                    className={`search-tab ${
                      activeTab === tab ? "active" : ""
                    }`}
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
                  onChange={(e) => handleFilterChange("city", e.target.value)}
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
                  onChange={(e) =>
                    handleFilterChange("propertyType", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleFilterChange("bedrooms", e.target.value)
                  }
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

      {/* Main Content */}
      <div className="main-content">
        {/* Properties Cards Section */}
        <div className="properties-section">
          <div className="properties-header">
            <h2>Propiedades disponibles</h2>
            <span className="results-count">
              {filteredProperties.length} resultados
            </span>
          </div>

          <div className="properties-grid">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className={`property-card ${
                  selectedProperty?.id === property.id ? "selected" : ""
                }`}
                onClick={() => handleCardClick(property)}
              >
                <div className="property-image-container">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="property-image"
                  />
                  <div className="property-price-tag">
                    <FaDollarSign size={12} />
                    {activeTab === "comprar"
                      ? formatPrice(property.price)
                      : `$${property.price}/mes`}
                  </div>
                </div>

                <div className="property-content">
                  <h3 className="property-name">{property.name}</h3>

                  <div className="property-location">
                    <MapPin size={14} />
                    {property.location}
                  </div>

                  <div className="property-characteristics">
                    <h4>Características</h4>
                    <div className="characteristics-list">
                      <div className="characteristic">
                        <FaBed size={14} />
                        <span>{property.bedrooms} dorm.</span>
                      </div>
                      <div className="characteristic">
                        <FaShower size={14} />
                        <span>{property.bathrooms} baños</span>
                      </div>
                      <div className="characteristic">
                        <FaRuler size={14} />
                        <span>{property.area} m²</span>
                      </div>
                    </div>
                  </div>

                  <div className="property-type-badge">
                    <FaBuilding size={12} />
                    {property.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <MapContainer
            center={[-17.7833, -63.1667]} // Santa Cruz, Bolivia coordinates
            zoom={12}
            style={{ height: "100%", width: "100%" }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {filteredProperties.map((property) => (
              <Marker
                key={property.id}
                position={property.coordinates}
                icon={createCustomMarker(property)}
                eventHandlers={{
                  click: () => setSelectedProperty(property),
                }}
              >
                <Popup>
                  <div className="map-popup">
                    <img
                      src={property.image}
                      alt={property.name}
                      className="popup-image"
                    />
                    <h3>{property.name}</h3>
                    <p className="popup-price">
                      {activeTab === "comprar"
                        ? formatPrice(property.price)
                        : `$${property.price}/mes`}
                    </p>
                    <p className="popup-location">
                      <MapPin size={12} />
                      {property.location}
                    </p>
                    <div className="popup-characteristics">
                      <span>
                        <FaBed size={12} /> {property.bedrooms}
                      </span>
                      <span>
                        <FaShower size={12} /> {property.bathrooms}
                      </span>
                      <span>
                        <FaRuler size={12} /> {property.area}m²
                      </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Classic;
