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

const TwinHomepage = () => {
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
    <div
      style={{ minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #3f3f46;
          background-color: #fefce8;
        }

        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: transparent;
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1rem 0;
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
          text-decoration: none;
          letter-spacing: -0.02em;
        }

        .nav {
          display: flex;
          list-style: none;
          gap: 2rem;
        }

        .nav a {
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav a:hover {
          color: white;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 0.875rem;
        }

        .btn-primary {
          background: #8b5cf6;
          color: white;
        }

        .btn-primary:hover {
          background: #7c3aed;
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: white;
          color: #3f3f46;
          border: 1px solid #e4e4e7;
        }

        .btn-secondary:hover {
          background: #fefce8;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
        }

        .hero {
          height: 100vh;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
        }

        .hero-video-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: -2;
        }

        .hero-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(88, 28, 135, 0.6) 100%);
          z-index: -1;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 3rem;
          letter-spacing: -0.02em;
          max-width: 800px;
          z-index: 1;
          background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .search-card {
          background: linear-gradient(145deg, 
            rgba(255, 255, 255, 0.25) 0%, 
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0.05) 100%);
          backdrop-filter: blur(25px);
          border-radius: 24px;
          padding: 2.5rem;
          width: 100%;
          max-width: 700px;
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 1;
          position: relative;
        }

        .search-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(139, 92, 246, 0.1) 0%, 
            rgba(168, 85, 247, 0.1) 100%);
          pointer-events: none;
          z-index: -1;
        }

        .search-tabs {
          display: flex;
          border-radius: 16px;
          padding: 6px;
          margin-bottom: 2rem;
          gap: 4px;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .search-tab {
          flex: 1;
          background: transparent;
          border: none;
          padding: 12px 16px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          color: rgba(255, 255, 255, 0.7);
          position: relative;
          overflow: hidden;
        }

        .search-tab::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 12px;
        }

        .search-tab:hover::before {
          opacity: 1;
        }

        .search-tab.active {
          color: white;
          background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
          box-shadow: 
            0 8px 16px rgba(139, 92, 246, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
        }

        .search-tab.active::before {
          display: none;
        }

        .search-form {
          display: flex;
          gap: 1rem;
          margin-bottom: 0;
          flex-wrap: wrap;
        }

        .search-field {
          flex: 1;
          min-width: 200px;
          position: relative;
        }

        /* Custom Dropdown Styles */
        .custom-dropdown {
          position: relative;
          width: 100%;
        }

        .dropdown-trigger {
          width: 100%;
          padding: 18px 20px;
          border: 2px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          color: white;
          font-size: 1.1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          outline: none;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .dropdown-trigger:hover {
          border-color: rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-1px);
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }

        .dropdown-trigger:focus,
        .dropdown-trigger.open {
          border-color: rgba(139, 92, 246, 0.6);
          background: rgba(139, 92, 246, 0.1);
          box-shadow: 
            0 0 0 4px rgba(139, 92, 246, 0.2),
            0 12px 40px rgba(139, 92, 246, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .dropdown-value {
          flex: 1;
          text-align: left;
        }

        .dropdown-value.placeholder {
          opacity: 0.7;
        }

        .dropdown-icon {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0.7;
        }

        .dropdown-icon.rotated {
          transform: rotate(180deg);
          opacity: 1;
        }

        .dropdown-menu {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 0;
          right: 0;
          z-index: 9999;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(25px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          overflow: hidden;
          animation: dropdownAppearUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes dropdownAppear {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes dropdownAppearUp {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .dropdown-options {
          max-height: 300px;
          overflow-y: auto;
          padding: 8px;
        }

        .dropdown-options::-webkit-scrollbar {
          width: 6px;
        }

        .dropdown-options::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }

        .dropdown-options::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 10px;
        }

        .dropdown-options::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }

        .dropdown-option {
          padding: 16px 20px;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #1f2937;
          font-weight: 500;
          margin-bottom: 2px;
          position: relative;
          overflow: hidden;
        }

        .dropdown-option::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(139, 92, 246, 0.1) 0%, 
            rgba(168, 85, 247, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.2s ease;
          border-radius: 14px;
        }

        .dropdown-option:hover::before,
        .dropdown-option.highlighted::before {
          opacity: 1;
        }

        .dropdown-option:hover,
        .dropdown-option.highlighted {
          background: rgba(139, 92, 246, 0.08);
          transform: translateX(4px);
          box-shadow: 
            0 4px 20px rgba(139, 92, 246, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .dropdown-option.selected {
          background: linear-gradient(135deg, 
            rgba(139, 92, 246, 0.15) 0%, 
            rgba(168, 85, 247, 0.15) 100%);
          color: #7c3aed;
          font-weight: 600;
          box-shadow: 
            0 4px 20px rgba(139, 92, 246, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .dropdown-option.selected:hover {
          background: linear-gradient(135deg, 
            rgba(139, 92, 246, 0.2) 0%, 
            rgba(168, 85, 247, 0.2) 100%);
        }

        .option-label {
          flex: 1;
          position: relative;
          z-index: 1;
        }

        .check-icon {
          color: #8b5cf6;
          opacity: 0.8;
          position: relative;
          z-index: 1;
        }

        .dropdown-option:active {
          transform: scale(0.98) translateX(4px);
        }

        .search-btn-container {
          display: flex;
          align-items: flex-end;
        }

        .search-btn {
          padding: 18px 24px;
          background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
          color: white;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: 600;
          font-size: 1rem;
          box-shadow: 
            0 4px 12px rgba(139, 92, 246, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          white-space: nowrap;
        }

        .search-btn:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 6px 16px rgba(139, 92, 246, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.2);
        }

        .search-btn:active {
          transform: translateY(0);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .modal-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .modal-content {
          background: linear-gradient(145deg, 
            rgba(255, 255, 255, 0.25) 0%, 
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0.05) 100%);
          backdrop-filter: blur(25px);
          border-radius: 24px;
          padding: 3rem;
          width: 100%;
          max-width: 500px;
          margin: 2rem;
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          transform: scale(0.8);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .modal-overlay.active .modal-content {
          transform: scale(1);
        }

        .modal-title {
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 2rem;
        }

        .modal-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .modal-option {
          padding: 1.5rem 2rem;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
          font-weight: 600;
          font-size: 1.1rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.9);
        }

        .modal-option:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .modal-option.entertaining {
          position: relative;
          overflow: hidden;
        }

        .modal-option.entertaining::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: 16px;
          background: linear-gradient(45deg, #8b5cf6, #06b6d4, #10b981, #f59e0b, #ef4444, #8b5cf6);
          background-size: 300% 300%;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .modal-option.entertaining:hover::before {
          opacity: 1;
          animation: shine 2s linear infinite;
        }

        @keyframes shine {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          padding: 0.5rem;
          transition: color 0.3s ease;
        }

        .modal-close:hover {
          color: white;
        }

        .section {
          padding: 5rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #18181b;
          letter-spacing: -0.02em;
        }

        .destinations-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .destination-card {
          position: relative;
          border-radius: 1rem;
          overflow: hidden;
          height: 250px;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .destination-card:hover {
          transform: scale(1.05);
        }

        .destination-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .destination-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
          padding: 2rem 1.5rem 1.5rem;
          color: white;
        }

        .destination-name {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .properties-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .property-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .property-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
        }

        .property-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }

        .property-content {
          padding: 1.5rem;
        }

        .property-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: #18181b;
          margin-bottom: 0.5rem;
        }

        .property-type {
          color: #6b7280;
          margin-bottom: 1rem;
        }

        .property-details {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .property-detail {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .property-location {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .footer {
          background: #18181b;
          color: white;
          padding: 4rem 0 2rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 2rem;
        }

        .footer-section h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .footer-section p {
          color: #d4d4d8;
          margin-bottom: 1.5rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: #3f3f46;
          border-radius: 50%;
          color: white;
          text-decoration: none;
          transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-link:hover {
          background: #8b5cf6;
        }

        .footer-links {
          list-style: none;
        }

        .footer-links li {
          margin-bottom: 0.5rem;
        }

        .footer-links a {
          color: #d4d4d8;
          text-decoration: none;
          transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .footer-links a:hover {
          color: #8b5cf6;
        }

        .footer-bottom {
          border-top: 1px solid #3f3f46;
          padding-top: 2rem;
          text-align: center;
          color: #d4d4d8;
        }

        @media (max-width: 768px) {
          .nav {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .search-card {
            margin: 0 1rem;
            padding: 2rem;
          }

          .search-form {
            flex-direction: column;
            gap: 1rem;
          }

          .search-field {
            min-width: 100%;
          }

          .search-btn-container {
            align-items: stretch;
          }

          .search-btn {
            width: 100%;
            justify-content: center;
          }

          .modal-content {
            margin: 1rem;
            padding: 2rem;
          }

          .modal-title {
            font-size: 1.25rem;
          }

          .destinations-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .properties-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .dropdown-trigger {
            padding: 16px 18px;
            font-size: 1rem;
          }

          .dropdown-option {
            padding: 14px 18px;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .destinations-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

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
                console.log("Búsqueda entretenida selected");
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

      {/* Footer */}
      {/*  <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>TWIN®</h3>
              <p>
                The world's largest real estate franchise network with over
                14,000 offices in more than 80 countries and territories
                worldwide.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <Facebook size={20} />
                </a>
                <a href="#" className="social-link">
                  <Twitter size={20} />
                </a>
                <a href="#" className="social-link">
                  <Instagram size={20} />
                </a>
                <a href="#" className="social-link">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h3>Properties</h3>
              <ul className="footer-links">
                <li>
                  <a href="/buy">Buy Property</a>
                </li>
                <li>
                  <a href="/rent">Rent Property</a>
                </li>
                <li>
                  <a href="/agents">Find Agents</a>
                </li>
                <li>
                  <a href="/offices">Our Offices</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li>
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a href="/careers">Careers</a>
                </li>
                <li>
                  <a href="/franchise">Franchise</a>
                </li>
                <li>
                  <a href="/news">News</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Support</h3>
              <ul className="footer-links">
                <li>
                  <a href="/contact">Contact Us</a>
                </li>
                <li>
                  <a href="/help">Help Center</a>
                </li>
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 Twin Global. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default TwinHomepage;
