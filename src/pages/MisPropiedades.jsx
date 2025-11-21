import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Home, Filter, ArrowUpDown } from "lucide-react";
import MyPropertiesHeader from "../components/headers/MyPropertiesHeader";
import MyPropertyCard from "../components/misPropiedades/MyPropertyCard";
import StatisticsModal from "../components/misPropiedades/StatisticsModal";
import CreatePropertyModal from "../components/misPropiedades/CreatePropertyModal";
import CustomDropdown from "../components/dropdown/Dropdown";
import "./styles/misPropiedades.css";

// Mock data for user's properties with statistics
const mockUserProperties = [
  {
    id: 1,
    name: "Casa Moderna Equipetrol",
    price: 450000,
    type: "Casa",
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    location: "Equipetrol Norte, Santa Cruz",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=700&fit=crop",
    ],
    forSale: true,
    statistics: {
      views: 1247,
      uniqueVisitors: 892,
      likes: 156,
      shares: 43,
      clickThroughRate: 12.5,
      scheduledVisits: 28,
      completedVisits: 21,
      virtualTours: 89,
      photoGalleryViews: 623,
      videoViews: 234,
      whatsappClicks: 67,
      phoneCalls: 34,
      addedToComparisons: 52,
      averageTimeOnPage: 245,
      bounceRate: 23.4,
      daysOnMarket: 45,
      responseRate: 94.2,
      responseTime: 2.5,
      conversionRate: 8.7,
      topLocations: ["Santa Cruz", "La Paz", "Cochabamba"],
      mobileViews: 748,
      desktopViews: 499,
      rankingInSearch: 3,
      similarPropertiesCompared: 12,
      pricePosition: "competitive",
    },
  },
  {
    id: 2,
    name: "Departamento Vista al Parque",
    price: 3500,
    type: "Departamento",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    location: "Equipetrol, Santa Cruz",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    ],
    forSale: false,
    statistics: {
      views: 892,
      uniqueVisitors: 654,
      likes: 98,
      shares: 28,
      clickThroughRate: 10.2,
      scheduledVisits: 19,
      completedVisits: 15,
      virtualTours: 67,
      photoGalleryViews: 445,
      videoViews: 178,
      whatsappClicks: 52,
      phoneCalls: 23,
      addedToComparisons: 38,
      averageTimeOnPage: 198,
      bounceRate: 28.7,
      daysOnMarket: 32,
      responseRate: 91.5,
      responseTime: 3.2,
      conversionRate: 7.1,
      topLocations: ["Santa Cruz", "Tarija", "Sucre"],
      mobileViews: 567,
      desktopViews: 325,
      rankingInSearch: 5,
      similarPropertiesCompared: 9,
      pricePosition: "above-average",
    },
  },
  {
    id: 3,
    name: "Penthouse de Lujo",
    price: 850000,
    type: "Penthouse",
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    location: "Las Palmas, Santa Cruz",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    ],
    forSale: true,
    statistics: {
      views: 2103,
      uniqueVisitors: 1456,
      likes: 287,
      shares: 76,
      clickThroughRate: 15.8,
      scheduledVisits: 42,
      completedVisits: 32,
      virtualTours: 156,
      photoGalleryViews: 987,
      videoViews: 423,
      whatsappClicks: 98,
      phoneCalls: 56,
      addedToComparisons: 81,
      averageTimeOnPage: 312,
      bounceRate: 18.3,
      daysOnMarket: 28,
      responseRate: 96.8,
      responseTime: 1.8,
      conversionRate: 11.2,
      topLocations: ["Santa Cruz", "La Paz", "Miami"],
      mobileViews: 1134,
      desktopViews: 969,
      rankingInSearch: 1,
      similarPropertiesCompared: 23,
      pricePosition: "premium",
    },
  },
];

const MisPropiedades = () => {
  const navigate = useNavigate();
  const [properties] = useState(mockUserProperties);
  const [selectedPropertyForStats, setSelectedPropertyForStats] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Filter states
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortFilter, setSortFilter] = useState("recent");

  // Filter options
  const statusOptions = [
    { label: "Todas", value: "all" },
    { label: "En Venta", value: "sale" },
    { label: "En Alquiler", value: "rent" },
  ];

  const typeOptions = [
    { label: "Todos", value: "all" },
    { label: "Casa", value: "casa" },
    { label: "Departamento", value: "departamento" },
    { label: "Penthouse", value: "penthouse" },
    { label: "Terreno", value: "terreno" },
  ];

  const sortOptions = [
    { label: "Más recientes", value: "recent" },
    { label: "Precio: Mayor a Menor", value: "price-high" },
    { label: "Precio: Menor a Mayor", value: "price-low" },
    { label: "Más vistas", value: "views" },
  ];

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const handleEditProperty = (propertyId) => {
    console.log("Edit property:", propertyId);
    // TODO: Navigate to edit page or open edit modal
    // navigate(`/edit-property/${propertyId}`);
  };

  const handleShowStats = (property) => {
    setSelectedPropertyForStats(property);
  };

  const handleCloseStats = () => {
    setSelectedPropertyForStats(null);
  };

  const handleCreateProperty = (propertyData) => {
    console.log("New property data:", propertyData);
    // TODO: Submit property data to backend
    // After successful submission, refresh properties list
  };

  return (
    <div className="mis-propiedades-page">
      <MyPropertiesHeader />

      <div className="mis-propiedades-container">
        <div className="mis-propiedades-header">
          <div className="header-text">
            <h1 className="page-title">Mis Propiedades</h1>
            <p className="page-subtitle">
              Gestiona y administra tus propiedades publicadas
            </p>
          </div>

          <div className="controls-row">
            <div className="filter-section">
              <CustomDropdown
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
                placeholder="Estado"
                icon={Filter}
                textColor="#5a2d95"
              />
              <CustomDropdown
                options={typeOptions}
                value={typeFilter}
                onChange={setTypeFilter}
                placeholder="Tipo"
                icon={Home}
                textColor="#5a2d95"
              />
              <CustomDropdown
                options={sortOptions}
                value={sortFilter}
                onChange={setSortFilter}
                placeholder="Ordenar"
                icon={ArrowUpDown}
                textColor="#5a2d95"
              />
            </div>

            <button
              className="create-property-btn"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus size={20} />
              Vender Nueva Propiedad
            </button>
          </div>
        </div>

        <div className="mis-propiedades-grid">
          {properties.map((property) => (
            <MyPropertyCard
              key={property.id}
              property={property}
              onClick={handlePropertyClick}
              onEdit={handleEditProperty}
              onShowStats={handleShowStats}
            />
          ))}
        </div>

        {properties.length === 0 && (
          <div className="empty-state">
            <p>No tienes propiedades publicadas</p>
            <button className="add-property-btn">Agregar Propiedad</button>
          </div>
        )}
      </div>

      {/* Statistics Modal */}
      {selectedPropertyForStats && (
        <StatisticsModal
          property={selectedPropertyForStats}
          onClose={handleCloseStats}
        />
      )}

      {/* Create Property Modal */}
      <CreatePropertyModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateProperty}
      />
    </div>
  );
};

export default MisPropiedades;
