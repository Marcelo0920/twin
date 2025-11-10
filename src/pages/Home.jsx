import React, { useState, useRef, useEffect } from "react";
import { Search, X, ChevronDown, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/headers/Header";
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

  return (
    <div className="home-container">
      {/* Header */}
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

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
          <div className="search-tabs-home">
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
              <button
                className="search-btn-home"
                onClick={() => setShowModal(true)}
              >
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
                navigate("/classic");
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
