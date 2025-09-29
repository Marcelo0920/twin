import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon, DivIcon } from "leaflet";
import {
  Search,
  ChevronDown,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  FaBed,
  FaShower,
  FaRuler,
  FaHome,
  FaDollarSign,
  FaBuilding,
  FaMapMarkerAlt,
  FaCity,
  FaArrowLeft,
  FaHeart,
  FaShare,
  FaPhone,
  FaEnvelope,
  FaHospital,
  FaDumbbell,
  FaShoppingCart,
  FaTree,
  FaSchool,
  FaBus,
  FaUtensils,
  FaCoffee,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaWhatsapp,
} from "react-icons/fa";
import Header from "../components/Header";
import "./styles/classic.css";

const Classic = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("comprar");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [show360Modal, setShow360Modal] = useState(false);
  const [current360Images, setCurrent360Images] = useState([]);
  const [current360ImageIndex, setCurrent360ImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedNearbyPlace, setSelectedNearbyPlace] = useState(null);
  const mapRef = useRef(null);

  // Filter states
  const [filters, setFilters] = useState({
    city: "",
    propertyType: "",
    priceRange: [0, 1000000],
    bedrooms: "",
    zone: "",
  });

  // Generate available dates for the next 30 days
  function generateAvailableDates() {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const status =
        Math.random() > 0.7
          ? "taken"
          : Math.random() > 0.3
          ? "available"
          : "unavailable";
      dates.push({
        date: date,
        status: status,
      });
    }
    return dates;
  }

  // Get icon for nearby place type
  const getNearbyPlaceIcon = (type) => {
    const icons = {
      hospital: FaHospital,
      gym: FaDumbbell,
      supermarket: FaShoppingCart,
      park: FaTree,
      school: FaSchool,
      bus: FaBus,
      restaurant: FaUtensils,
      cafe: FaCoffee,
    };
    return icons[type] || FaMapMarkerAlt;
  };

  // Get color for nearby place type
  const getNearbyPlaceColor = (type) => {
    const colors = {
      hospital: "#ef4444",
      gym: "#f59e0b",
      supermarket: "#10b981",
      park: "#22c55e",
      school: "#3b82f6",
      bus: "#8b5cf6",
      restaurant: "#ec4899",
      cafe: "#f97316",
    };
    return colors[type] || "#6b7280";
  };

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
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
      ],
      forSale: true,
      nearbyPlaces: [
        {
          id: 1,
          type: "hospital",
          name: "Hospital Equipetrol",
          distance: "1.2 km",
          coordinates: [-17.7843, -63.1677],
        },
        {
          id: 2,
          type: "gym",
          name: "Fitness Center",
          distance: "0.5 km",
          coordinates: [-17.7823, -63.1657],
        },
        {
          id: 3,
          type: "supermarket",
          name: "Supermercado",
          distance: "0.8 km",
          coordinates: [-17.7853, -63.1687],
        },
        {
          id: 4,
          type: "park",
          name: "Parque Urbano",
          distance: "0.3 km",
          coordinates: [-17.7813, -63.1647],
        },
      ],
      availableDates: generateAvailableDates(),
      street360Images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
      ],
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
      images: [
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      ],
      forSale: true,
      nearbyPlaces: [
        {
          id: 5,
          type: "school",
          name: "Colegio Internacional",
          distance: "0.7 km",
          coordinates: [-17.791, -63.161],
        },
        {
          id: 6,
          type: "restaurant",
          name: "Restaurant Gourmet",
          distance: "0.4 km",
          coordinates: [-17.789, -63.159],
        },
      ],
      availableDates: generateAvailableDates(),
      street360Images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      ],
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
      images: [
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      ],
      forSale: false,
      nearbyPlaces: [
        {
          id: 7,
          type: "bus",
          name: "Parada de Bus",
          distance: "0.2 km",
          coordinates: [-17.771, -63.181],
        },
        {
          id: 8,
          type: "cafe",
          name: "Café Urbano",
          distance: "0.6 km",
          coordinates: [-17.769, -63.179],
        },
      ],
      availableDates: generateAvailableDates(),
      street360Images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      ],
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
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
      ],
      forSale: true,
      nearbyPlaces: [
        {
          id: 9,
          type: "hospital",
          name: "Clínica Central",
          distance: "1.0 km",
          coordinates: [-17.781, -63.183],
        },
        {
          id: 10,
          type: "gym",
          name: "PowerGym",
          distance: "0.3 km",
          coordinates: [-17.779, -63.181],
        },
      ],
      availableDates: generateAvailableDates(),
      street360Images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      ],
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
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      ],
      forSale: false,
      nearbyPlaces: [
        {
          id: 11,
          type: "supermarket",
          name: "Super Norte",
          distance: "0.5 km",
          coordinates: [-17.766, -63.176],
        },
        {
          id: 12,
          type: "park",
          name: "Parque Norte",
          distance: "0.4 km",
          coordinates: [-17.764, -63.174],
        },
      ],
      availableDates: generateAvailableDates(),
      street360Images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      ],
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
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      ],
      forSale: true,
      nearbyPlaces: [
        {
          id: 13,
          type: "school",
          name: "Escuela Plan 3000",
          distance: "0.9 km",
          coordinates: [-17.796, -63.151],
        },
        {
          id: 14,
          type: "bus",
          name: "Terminal",
          distance: "1.5 km",
          coordinates: [-17.794, -63.149],
        },
      ],
      availableDates: generateAvailableDates(),
      street360Images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      ],
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
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    } else {
      return `$${price}`;
    }
  };

  // Create custom marker with price
  const createCustomMarker = (property) => {
    const price =
      activeTab === "comprar"
        ? formatPrice(property.price)
        : `$${property.price}/mes`;

    const isSelected = selectedMarkerId === property.id;

    return new DivIcon({
      html: `
        <div class="price-marker ${isSelected ? "selected" : ""}">
          ${price}
        </div>
      `,
      className: "custom-price-marker",
      iconSize: [60, 30],
      iconAnchor: [30, 15],
      popupAnchor: [0, -15],
    });
  };

  // Handle marker click
  const handleMarkerClick = (property) => {
    setSelectedProperty(property);
    setSelectedMarkerId(property.id);
    setShowDetailView(true);
    setCurrentImageIndex(0);
    if (mapRef.current) {
      mapRef.current.setView(property.coordinates, 15);
    }
  };

  // Handle card click
  const handleCardClick = (property) => {
    setSelectedProperty(property);
    setSelectedMarkerId(property.id);
    setShowDetailView(true);
    setCurrentImageIndex(0);
    if (mapRef.current) {
      mapRef.current.setView(property.coordinates, 15);
    }
  };

  // Handle back to list view
  const handleBackToList = () => {
    setShowDetailView(false);
    setTimeout(() => {
      setSelectedProperty(null);
      setSelectedMarkerId(null);
      setCurrentImageIndex(0);
    }, 300);
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

  // Create marker for nearby places
  const createNearbyPlaceMarker = (place) => {
    const color = getNearbyPlaceColor(place.type);

    return new DivIcon({
      html: `
        <div class="nearby-place-marker" style="background-color: ${color};">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18" height="18">
            ${getIconSvgPath(place.type)}
          </svg>
        </div>
      `,
      className: "custom-nearby-marker",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  };

  // Helper function to get SVG path for icons
  const getIconSvgPath = (type) => {
    const paths = {
      hospital:
        '<path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm-1 16h-2v-3H6v-2h3V10h2v3h3v2h-3v3z"/>',
      gym: '<path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>',
      supermarket:
        '<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>',
      park: '<path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/>',
      school:
        '<path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>',
      bus: '<path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>',
      restaurant:
        '<path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>',
      cafe: '<path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM2 21h18v-2H2v2z"/>',
    };
    return paths[type] || paths.park;
  };

  // 360 Modal Component
  const Modal360 = () => {
    if (!show360Modal) return null;

    return (
      <div
        className="modal-overlay-classic"
        onClick={() => {
          setShow360Modal(false);
          setCurrent360ImageIndex(0);
        }}
      >
        <div
          className="modal-content-classic"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="modal-close-classic"
            onClick={() => {
              setShow360Modal(false);
              setCurrent360ImageIndex(0);
            }}
          >
            <X size={24} />
          </button>

          <div className="modal-360-viewer">
            <img
              src={current360Images[current360ImageIndex]}
              alt="360 view"
              className="viewer-360-image"
            />

            {selectedNearbyPlace && (
              <div className="place-info-overlay">
                <div className="place-overlay-content">
                  <div className="place-icon-container">
                    {React.createElement(
                      getNearbyPlaceIcon(selectedNearbyPlace.type),
                      {
                        size: 24,
                        style: {
                          color: getNearbyPlaceColor(selectedNearbyPlace.type),
                        },
                      }
                    )}
                  </div>
                  <div className="place-details">
                    <h3>{selectedNearbyPlace.name}</h3>
                    <p>Vista 360° • {selectedNearbyPlace.distance}</p>
                  </div>
                </div>
              </div>
            )}

            {current360Images.length > 1 && (
              <div className="viewer-navigation">
                {current360Images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`nav-dot ${
                      idx === current360ImageIndex ? "active" : ""
                    }`}
                    onClick={() => setCurrent360ImageIndex(idx)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Detailed Property View Component
  const DetailedPropertyView = ({ property }) => {
    if (!property) return null;

    // Carousel handlers
    const nextImage = () => {
      setCurrentImageIndex((prev) =>
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    };

    const prevImage = () => {
      setCurrentImageIndex((prev) =>
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    };

    // Handle nearby place click
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

    // Handle street 360 click
    const handleStreet360Click = (image) => {
      setCurrent360Images([image]);
      setSelectedNearbyPlace(null);
      setCurrent360ImageIndex(0);
      console.log("showing street view");
      setShow360Modal(true);
    };

    // Calendar component
    const Calendar = () => {
      const monthNames = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const getDayStatus = (date) => {
        const dateObj = property.availableDates.find(
          (d) => d.date.toDateString() === date.toDateString()
        );
        return dateObj?.status || "unavailable";
      };

      const renderCalendarDays = () => {
        const days = [];
        const today = new Date();

        for (let i = 0; i < 30; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          const status = getDayStatus(date);

          days.push(
            <div
              key={i}
              className={`calendar-day ${status} ${
                selectedDate?.toDateString() === date.toDateString()
                  ? "selected"
                  : ""
              }`}
              onClick={() => status === "available" && setSelectedDate(date)}
            >
              <div className="day-number">{date.getDate()}</div>
              <div className="day-name">{dayNames[date.getDay()]}</div>
              {status === "available" && <FaCheckCircle className="day-icon" />}
              {status === "taken" && (
                <FaExclamationCircle className="day-icon" />
              )}
              {status === "unavailable" && (
                <FaTimesCircle className="day-icon" />
              )}
            </div>
          );
        }

        return days;
      };

      return (
        <div className="calendar-widget">
          <div className="calendar-header">
            <h3>
              <FaCalendarAlt /> Agendar Visita
            </h3>
            <div className="calendar-legend">
              <div className="legend-item">
                <FaCheckCircle style={{ color: "#10b981" }} />
                <span>Disponible</span>
              </div>
              <div className="legend-item">
                <FaExclamationCircle style={{ color: "#f59e0b" }} />
                <span>Reservado</span>
              </div>
              <div className="legend-item">
                <FaTimesCircle style={{ color: "#ef4444" }} />
                <span>No disponible</span>
              </div>
            </div>
          </div>
          <div className="calendar-month">
            {monthNames[currentMonth]} {currentYear}
          </div>
          <div className="calendar-grid">{renderCalendarDays()}</div>
          {selectedDate && (
            <div className="selected-date-info">
              <FaClock />
              <span>
                Visita agendada para:{" "}
                {selectedDate.toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <button className="confirm-visit-btn">Confirmar Visita</button>
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="detailed-property-view">
        <div className="detail-header">
          <button className="back-button" onClick={handleBackToList}>
            <FaArrowLeft size={18} />
          </button>
          <div className="detail-actions">
            <button className="action-btn-classic">
              <FaHeart size={16} />
            </button>
            <button className="action-btn-classic">
              <FaShare size={16} />
            </button>
          </div>
        </div>

        <div className="detail-content">
          {/* Image Carousel */}
          <div className="property-carousel">
            <div className="carousel-container">
              <div
                className="carousel-track"
                style={{
                  transform: `translateX(-${currentImageIndex * 100}%)`,
                }}
              >
                {property.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${property.name} - Image ${idx + 1}`}
                    className="carousel-image"
                  />
                ))}
              </div>
              {property.images.length > 1 && (
                <>
                  <button className="carousel-btn prev" onClick={prevImage}>
                    <ChevronLeft size={24} />
                  </button>
                  <button className="carousel-btn next" onClick={nextImage}>
                    <ChevronRight size={24} />
                  </button>
                  <div className="carousel-indicators">
                    {property.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`indicator ${
                          idx === currentImageIndex ? "active" : ""
                        }`}
                        onClick={() => setCurrentImageIndex(idx)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="property-info">
            <h1 className="property-title">{property.name}</h1>

            <div className="property-price-detail">
              <span className="price-amount">
                {activeTab === "comprar"
                  ? formatPrice(property.price)
                  : `$${property.price}/mes`}
              </span>
              <span className="price-type">
                {activeTab === "comprar" ? "Venta" : "Alquiler"}
              </span>
            </div>

            <div className="property-location-detail">
              <MapPin size={16} />
              {property.location}
            </div>

            <div className="property-details-grid">
              <div className="detail-item">
                <FaBed size={20} />
                <div>
                  <span className="detail-value">{property.bedrooms}</span>
                  <span className="detail-label">Dormitorios</span>
                </div>
              </div>
              <div className="detail-item">
                <FaShower size={20} />
                <div>
                  <span className="detail-value">{property.bathrooms}</span>
                  <span className="detail-label">Baños</span>
                </div>
              </div>
              <div className="detail-item">
                <FaRuler size={20} />
                <div>
                  <span className="detail-value">{property.area}</span>
                  <span className="detail-label">m²</span>
                </div>
              </div>
              <div className="detail-item">
                <FaBuilding size={20} />
                <div>
                  <span className="detail-value">{property.type}</span>
                  <span className="detail-label">Tipo</span>
                </div>
              </div>
            </div>

            {/* Calendar Section */}
            <Calendar />

            {/* Nearby Places Section */}
            <div className="nearby-places-section">
              <h3>Lugares Cercanos</h3>
              <div className="nearby-places-grid">
                {property.nearbyPlaces.map((place) => {
                  const IconComponent = getNearbyPlaceIcon(place.type);
                  return (
                    <div
                      key={place.id}
                      className="nearby-place-card"
                      onClick={() => handleNearbyPlaceClick(place)}
                    >
                      <div
                        className="nearby-place-icon"
                        style={{
                          background: `${getNearbyPlaceColor(place.type)}20`,
                        }}
                      >
                        <IconComponent
                          size={24}
                          style={{ color: getNearbyPlaceColor(place.type) }}
                        />
                      </div>
                      <div className="nearby-place-info">
                        <h4>{place.name}</h4>
                        <span className="distance">{place.distance}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Conoce la zona Section */}
            <div className="street-view-section">
              <h3>Conoce la Zona</h3>
              <p className="section-description">
                Explora la zona en 360° para conocer mejor el entorno
              </p>
              <div className="street-view-grid">
                {property.street360Images.map((img, idx) => (
                  <div
                    key={idx}
                    className="street-view-card"
                    onClick={() => handleStreet360Click(img)}
                  >
                    <img src={img} alt={`Vista ${idx + 1}`} />
                    <div className="street-view-overlay">
                      <span>Vista 360° #{idx + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="property-description">
              <h3>Descripción</h3>
              <p>
                Esta hermosa propiedad ofrece un estilo de vida excepcional en
                una de las zonas más exclusivas de la ciudad. Con espacios
                amplios y luminosos, acabados de primera calidad y una ubicación
                privilegiada que garantiza comodidad y tranquilidad para toda la
                familia.
              </p>
            </div>

            <div className="property-features">
              <h3>Características</h3>
              <div className="features-grid">
                <span className="feature-tag">Garage</span>
                <span className="feature-tag">Jardín</span>
                <span className="feature-tag">Piscina</span>
                <span className="feature-tag">Seguridad 24h</span>
                <span className="feature-tag">Ascensor</span>
                <span className="feature-tag">Aire Acondicionado</span>
              </div>
            </div>

            <div className="contact-section">
              <h3>Contactar</h3>
              <div className="contact-buttons">
                <button className="contact-btn whatsapp">
                  <FaWhatsapp size={16} />
                  Contactar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
          <div
            className={`properties-container ${
              showDetailView ? "show-detail" : "show-list"
            }`}
          >
            {/* List View */}
            <div className="properties-list-view">
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
                        src={property.images[0]}
                        alt={property.name}
                        className="property-image"
                      />
                      <div className="property-price-tag">
                        <FaDollarSign size={12} />
                        {activeTab === "comprar"
                          ? formatPrice(property.price)
                          : `${property.price}/mes`}
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

            {/* Detail View */}
            <div className="properties-detail-view">
              <DetailedPropertyView property={selectedProperty} />
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <MapContainer
            center={[-17.7833, -63.1667]}
            zoom={12}
            style={{ height: "100%", width: "100%" }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Property markers */}
            {filteredProperties.map((property) => (
              <Marker
                key={property.id}
                position={property.coordinates}
                icon={createCustomMarker(property)}
                eventHandlers={{
                  click: () => handleMarkerClick(property),
                }}
              />
            ))}

            {/* Nearby places markers */}
            {selectedProperty &&
              selectedProperty.nearbyPlaces &&
              selectedProperty.nearbyPlaces.map((place) => (
                <Marker
                  key={`nearby-${place.id}`}
                  position={place.coordinates}
                  icon={createNearbyPlaceMarker(place)}
                  eventHandlers={{
                    click: () => {
                      setSelectedNearbyPlace(place);
                      setCurrent360Images([
                        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
                        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
                        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop",
                      ]);
                      setCurrent360ImageIndex(0);
                      setShow360Modal(true);
                    },
                  }}
                />
              ))}
          </MapContainer>
        </div>
      </div>

      {/* 360 Modal */}
      <Modal360 />
    </div>
  );
};

export default Classic;
