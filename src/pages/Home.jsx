import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Settings,
  LogIn,
  Menu,
  X,
  Bed,
  Bath,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronDown,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./styles/home.css";

// Custom Dropdown Component
const CustomDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : options.length - 1
          );
          break;
        case "Enter":
          event.preventDefault();
          if (highlightedIndex >= 0) {
            onChange(options[highlightedIndex].value);
            setIsOpen(false);
            setHighlightedIndex(-1);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, highlightedIndex, options, onChange]);

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button
        type="button"
        className={`dropdown-trigger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span
          className={`dropdown-value ${!selectedOption ? "placeholder" : ""}`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={20}
          className={`dropdown-icon ${isOpen ? "rotated" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-options">
            {options.map((option, index) => (
              <div
                key={option.value}
                className={`dropdown-option ${
                  option.value === value ? "selected" : ""
                } ${index === highlightedIndex ? "highlighted" : ""}`}
                onClick={() => handleOptionClick(option.value)}
                onMouseEnter={() => setHighlightedIndex(index)}
                role="option"
                aria-selected={option.value === value}
              >
                <span className="option-label">{option.label}</span>
                {option.value === value && (
                  <Check size={16} className="check-icon" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("comprar");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedHousingType, setSelectedHousingType] = useState("");
  const [showModal, setShowModal] = useState(false);

  const cities = [
    { value: "", label: "Ciudad" },
    { value: "madrid", label: "Madrid" },
    { value: "barcelona", label: "Barcelona" },
    { value: "valencia", label: "Valencia" },
    { value: "sevilla", label: "Sevilla" },
    { value: "bilbao", label: "Bilbao" },
    { value: "malaga", label: "Málaga" },
    { value: "zaragoza", label: "Zaragoza" },
    { value: "murcia", label: "Murcia" },
  ];

  const housingTypes = [
    { value: "", label: "Tipo de vivienda" },
    { value: "piso", label: "Piso" },
    { value: "casa", label: "Casa" },
    { value: "chalet", label: "Chalet" },
    { value: "apartamento", label: "Apartamento" },
    { value: "duplex", label: "Dúplex" },
    { value: "atico", label: "Ático" },
    { value: "estudio", label: "Estudio" },
    { value: "loft", label: "Loft" },
  ];

  const destinations = [
    {
      id: 1,
      country: "Israel",
      image:
        "https://images.unsplash.com/photo-1544736150-6cc092c24469?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      country: "Belgium",
      image:
        "https://images.unsplash.com/photo-1559564484-e48c87883e5b?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      country: "Mexico",
      image:
        "https://images.unsplash.com/photo-1518105779142-d975f22f1b0b?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      country: "Slovenia",
      image:
        "https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      country: "Cyprus",
      image:
        "https://images.unsplash.com/photo-1539650116574-75c0c6d20e65?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      country: "Guyana",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    },
    {
      id: 7,
      country: "Colombia",
      image:
        "https://images.unsplash.com/photo-1555169062-013468b47731?w=400&h=300&fit=crop",
    },
    {
      id: 8,
      country: "Venezuela",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
    },
  ];

  const featuredProperties = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=400&fit=crop",
      price: "$2,175,000 USD",
      type: "Single Family Home for Sale",
      beds: 4,
      baths: 3,
      location: "Beverly Hills, CA",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=500&h=400&fit=crop",
      price: "$1,850,000 USD",
      type: "Luxury Condo for Sale",
      beds: 3,
      baths: 2,
      location: "Manhattan, NY",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&h=400&fit=crop",
      price: "$3,200,000 USD",
      type: "Waterfront Villa for Sale",
      beds: 5,
      baths: 4,
      location: "Miami Beach, FL",
    },
  ];

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <a href="/" className="logo">
            TWIN®
          </a>

          <div className="header-actions">
            <a href="/login" className="btn btn-primary">
              <LogIn size={18} />
              Login
            </a>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-video-container">
          <video className="hero-video" autoPlay muted loop playsInline>
            <source src="/src/assets/home_hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="hero-overlay"></div>

        <h1 className="hero-title">Encuentra tu hogar perfecto con Twin®</h1>

        <div className="search-card">
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

          <div className="search-form">
            <div className="search-field">
              <CustomDropdown
                options={cities}
                value={selectedCity}
                onChange={setSelectedCity}
                placeholder="Seleccionar ciudad"
              />
            </div>

            <div className="search-field">
              <CustomDropdown
                options={housingTypes}
                value={selectedHousingType}
                onChange={setSelectedHousingType}
                placeholder="Tipo de vivienda"
              />
            </div>

            <div className="search-btn-container">
              <button className="search-btn" onClick={() => setShowModal(true)}>
                <Search size={20} />
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Modal */}
      <div
        className={`modal-overlay ${showModal ? "active" : ""}`}
        onClick={() => setShowModal(false)}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setShowModal(false)}>
            <X size={24} />
          </button>

          <h2 className="modal-title">Elige tu tipo de búsqueda</h2>

          <div className="modal-options">
            <div
              className="modal-option entertaining"
              onClick={() => {
                setShowModal(false);
                navigate("/cortos");
              }}
            >
              Búsqueda entretenida
            </div>

            <div
              className="modal-option classic"
              onClick={() => {
                setShowModal(false);
                console.log("Búsqueda clásica selected");
              }}
            >
              Búsqueda clásica
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
