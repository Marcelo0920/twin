import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, MapPin, Phone, Calculator, X } from "lucide-react";
import "./styles/cortos.css";

const Cortos = () => {
  const navigate = useNavigate();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoContainerRef = useRef(null);

  // Mock video data - replace with your actual data
  const videos = [
    {
      id: 1,
      src: "/src/assets/Amoblare_2.mp4",
      title: "TOMORROW X TOGETHER 🔥",
      description: "Let's keep dancing until the sun rises😳",
      location: "San Francisco, CA",
      price: "$2,500,000",
      type: "Luxury Apartment",
    },
    {
      id: 2,
      src: "/src/assets/Atitulos.mp4",
      title: "Modern Living Space",
      description: "Beautiful penthouse with city views",
      location: "New York, NY",
      price: "$3,800,000",
      type: "Penthouse",
    },
    {
      id: 3,
      src: "/src/assets/Ikea.mp4",
      title: "Cozy Family Home",
      description: "Perfect home for growing families",
      location: "Los Angeles, CA",
      price: "$1,900,000",
      type: "Family House",
    },
  ];

  useEffect(() => {
    let scrollTimeout;

    const handleWheel = (e) => {
      e.preventDefault();

      if (isTransitioning) return;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0) {
          // Scroll down - next video
          setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
        } else {
          // Scroll up - previous video
          setCurrentVideoIndex((prev) =>
            prev === 0 ? videos.length - 1 : prev - 1
          );
        }
        setIsTransitioning(true);
        setTimeout(() => setIsTransitioning(false), 300);
      }, 100);
    };

    const container = videoContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
      clearTimeout(scrollTimeout);
    };
  }, [videos.length, isTransitioning]);

  const currentVideo = videos[currentVideoIndex];

  return (
    <div className="cortos-container">
      {/* Left Sidebar - Options */}
      <div className="left-sidebar">
        <div className="logo-section">
          <div className="logo" onClick={() => navigate("/")}>
            TWIN®
          </div>
        </div>

        <div className="sidebar-buttons">
          <button className="sidebar-btn active">Cortos</button>
          <button className="sidebar-btn" onClick={() => setShowFilters(true)}>
            <Filter size={18} />
            Filtros
          </button>
        </div>
      </div>

      {/* Center - Video */}
      <div className="video-section" ref={videoContainerRef}>
        <div
          className={`video-container ${
            isTransitioning ? "transitioning" : ""
          }`}
        >
          <video
            key={currentVideo.id}
            src={currentVideo.src}
            autoPlay
            loop
            muted
            className="main-video"
          />

          {/* Video Description Overlay */}
          <div className="video-overlay">
            <div className="video-info">
              <h3 className="video-title">{currentVideo.title}</h3>
              <p className="video-description">{currentVideo.description}</p>
              <div className="property-info">
                <span className="price">{currentVideo.price}</span>
                <div className="location">
                  <MapPin size={14} />
                  {currentVideo.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Action Buttons */}
      <div className="right-sidebar">
        <div className="action-buttons">
          <button className="action-btn visit-btn">
            <MapPin size={20} />
            <span>Visitar</span>
          </button>

          <button className="action-btn contact-btn">
            <Phone size={20} />
            <span>Contactar</span>
          </button>

          <button className="action-btn calculate-btn">
            <Calculator size={20} />
            <span>Calcular</span>
          </button>
        </div>
      </div>

      {/* Filters Modal */}
      <div className={`filters-modal ${showFilters ? "active" : ""}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h3>Filtros</h3>
            <button className="close-btn" onClick={() => setShowFilters(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="filters-content">
            <div className="filter-group">
              <label>Precio</label>
              <div className="price-range">
                <input type="range" min="0" max="5000000" />
                <div className="price-labels">
                  <span>$0</span>
                  <span>$5M+</span>
                </div>
              </div>
            </div>

            <div className="filter-group">
              <label>Ubicación</label>
              <select>
                <option>Todas las ciudades</option>
                <option>San Francisco</option>
                <option>New York</option>
                <option>Los Angeles</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Tipo de propiedad</label>
              <div className="property-types">
                <button className="property-type-btn active">Todos</button>
                <button className="property-type-btn">Casa</button>
                <button className="property-type-btn">Apartamento</button>
                <button className="property-type-btn">Penthouse</button>
              </div>
            </div>

            <div className="filter-actions">
              <button
                className="clear-btn"
                onClick={() => setShowFilters(false)}
              >
                Limpiar
              </button>
              <button
                className="apply-btn"
                onClick={() => setShowFilters(false)}
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cortos;
