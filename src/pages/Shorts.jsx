import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Filter,
  Heart,
  MapPin,
  Phone,
  Calculator,
  ChevronUp,
  ChevronDown,
  X,
  Volume2,
  VolumeX,
} from "lucide-react";
import "./styles/shorts.css";

const Shorts = () => {
  const navigate = useNavigate();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [savedVideos, setSavedVideos] = useState(new Set());
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [slideDirection, setSlideDirection] = useState(null);
  const [nextVideoIndex, setNextVideoIndex] = useState(1);
  const [prevVideoIndex, setPrevVideoIndex] = useState(2);
  const [disableTransition, setDisableTransition] = useState(false);

  const videoRef = useRef(null);
  const nextVideoRef = useRef(null);
  const prevVideoRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // States for filters
  const [filters, setFilters] = useState({
    transactionType: "comprar",
    priceRange: [0, 3000000],
    ciudad: "",
    tipo: "",
    zona: "",
  });

  // Filter options data
  const cities = [
    { value: "", label: "Todas las ciudades" },
    { value: "madrid", label: "Madrid" },
    { value: "barcelona", label: "Barcelona" },
    { value: "valencia", label: "Valencia" },
    { value: "sevilla", label: "Sevilla" },
    { value: "bilbao", label: "Bilbao" },
    { value: "malaga", label: "Málaga" },
    { value: "zaragoza", label: "Zaragoza" },
    { value: "murcia", label: "Murcia" },
  ];

  const propertyTypes = [
    { value: "", label: "Todos los tipos" },
    { value: "piso", label: "Piso" },
    { value: "casa", label: "Casa" },
    { value: "chalet", label: "Chalet" },
    { value: "apartamento", label: "Apartamento" },
    { value: "duplex", label: "Dúplex" },
    { value: "atico", label: "Ático" },
    { value: "estudio", label: "Estudio" },
    { value: "loft", label: "Loft" },
  ];

  const zones = [
    { value: "", label: "Todas las zonas" },
    { value: "centro", label: "Centro" },
    { value: "norte", label: "Norte" },
    { value: "sur", label: "Sur" },
    { value: "este", label: "Este" },
    { value: "oeste", label: "Oeste" },
    { value: "periferia", label: "Periferia" },
  ];

  // Video data - same as Cortos.jsx
  const videos = [
    {
      id: 1,
      src: "/assets/Amoblare_2.mp4",
      title: "TOMORROW X TOGETHER 🔥",
      description: "Let's keep dancing until the sun rises😳",
      location: "San Francisco, CA",
      price: "$2,500,000",
      type: "Luxury Apartment",
    },
    {
      id: 2,
      src: "/assets/Atitulos.mp4",
      title: "Modern Living Space",
      description: "Beautiful penthouse with city views",
      location: "New York, NY",
      price: "$3,800,000",
      type: "Penthouse",
    },
    {
      id: 3,
      src: "/assets/Ikea.mp4",
      title: "Cozy Family Home",
      description: "Perfect home for growing families",
      location: "Los Angeles, CA",
      price: "$1,900,000",
      type: "Family House",
    },
  ];

  // Update video indices when current video changes
  useEffect(() => {
    setNextVideoIndex((currentVideoIndex + 1) % videos.length);
    setPrevVideoIndex(
      currentVideoIndex === 0 ? videos.length - 1 : currentVideoIndex - 1
    );
  }, [currentVideoIndex, videos.length]);

  // Format price for display
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    } else {
      return `$${price}`;
    }
  };

  // Handle filter changes
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Get active filters count
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 3000000) count++;
    if (filters.ciudad) count++;
    if (filters.tipo) count++;
    if (filters.zona) count++;
    return count;
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      transactionType: "comprar",
      priceRange: [0, 3000000],
      ciudad: "",
      tipo: "",
      zona: "",
    });
  };

  // Apply filters
  const applyFilters = () => {
    console.log("Applying filters:", filters);
    setShowFilters(false);
  };

  // Toggle save video
  const toggleSave = (videoId) => {
    setSavedVideos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Update progress
  const updateProgress = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  // Start progress tracking
  const startProgressTracking = () => {
    progressIntervalRef.current = setInterval(updateProgress, 100);
  };

  // Stop progress tracking
  const stopProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  // Change video
  const changeVideo = (direction) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    stopProgressTracking();
    setProgress(0);

    // Start the slide animation
    setSlideDirection(direction);

    // After animation completes, update the video index
    setTimeout(() => {
      // Update video index first
      if (direction === "next") {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
      } else {
        setCurrentVideoIndex((prev) =>
          prev === 0 ? videos.length - 1 : prev - 1
        );
      }

      // Wait for React to update the DOM with new video
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Now disable transitions and reset slide direction
          setDisableTransition(true);
          setSlideDirection(null);

          // Re-enable transitions after reset
          requestAnimationFrame(() => {
            setDisableTransition(false);
            setIsTransitioning(false);
          });
        });
      });
    }, 400);
  };

  // Auto-play video when it changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      startProgressTracking();
    }
    return () => stopProgressTracking();
  }, [currentVideoIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showFilters) return;

      if (e.key === "ArrowUp") {
        e.preventDefault();
        changeVideo("prev");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        changeVideo("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showFilters, isTransitioning]);

  // Handle mouse wheel navigation
  useEffect(() => {
    let scrollTimeout;

    const handleWheel = (e) => {
      if (showFilters || isTransitioning) return;

      e.preventDefault();

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0) {
          // Scrolling down - next video
          changeVideo("next");
        } else if (e.deltaY < 0) {
          // Scrolling up - previous video
          changeVideo("prev");
        }
      }, 150);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [showFilters, isTransitioning]);

  const currentVideo = videos[currentVideoIndex];

  return (
    <div className="shorts-container">
      {/* Left Sidebar - Only Filtros button */}
      <div className="shorts-left-sidebar">
        <button
          className="shorts-filter-btn"
          onClick={() => setShowFilters(true)}
        >
          <Filter size={24} />
          <span>Filtros</span>
          {getActiveFiltersCount() > 0 && (
            <span className="filter-badge">{getActiveFiltersCount()}</span>
          )}
        </button>
      </div>

      {/* Center - Video Stack */}
      <div className="shorts-video-wrapper">
        <div className="shorts-video-stack">
          {/* Previous Video */}
          <div
            className={`shorts-video-slide prev-slide ${
              slideDirection === "prev" ? "active" : ""
            } ${disableTransition ? "no-transition" : ""}`}
          >
            <video
              ref={prevVideoRef}
              src={videos[prevVideoIndex].src}
              className="shorts-video"
              loop
              muted
              preload="metadata"
            />
          </div>

          {/* Current Video */}
          <div
            className={`shorts-video-slide current-slide ${
              slideDirection ? `slide-${slideDirection}` : ""
            } ${disableTransition ? "no-transition" : ""}`}
          >
            <div className="shorts-video-container">
              <video
                ref={videoRef}
                src={currentVideo.src}
                className="shorts-video"
                autoPlay
                loop
                muted={isMuted}
              />

              {/* Mute/Unmute Button */}
              <button className="shorts-mute-btn" onClick={toggleMute}>
                {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
              </button>

              {/* Progress Bar */}
              <div className="shorts-progress-bar">
                <div
                  className="shorts-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Video Info Overlay */}
              <div className="shorts-video-info">
                <h3 className="shorts-video-title">{currentVideo.title}</h3>
                <p className="shorts-video-description">
                  {currentVideo.description}
                </p>
                <div className="shorts-property-info">
                  <span className="shorts-price">{currentVideo.price}</span>
                  <div className="shorts-location">
                    <MapPin size={14} />
                    {currentVideo.location}
                  </div>
                </div>
              </div>

              {/* Action Buttons - Right side of video */}
              <div className="shorts-action-buttons">
                <button
                  className={`shorts-action-btn ${
                    savedVideos.has(currentVideo.id) ? "saved" : ""
                  }`}
                  onClick={() => toggleSave(currentVideo.id)}
                >
                  <Heart
                    size={24}
                    fill={
                      savedVideos.has(currentVideo.id) ? "currentColor" : "none"
                    }
                  />
                  <span>Guardar</span>
                </button>

                <button className="shorts-action-btn">
                  <MapPin size={24} />
                  <span>Visitar</span>
                </button>

                <button className="shorts-action-btn">
                  <Phone size={24} />
                  <span>Contactar</span>
                </button>

                <button className="shorts-action-btn">
                  <Calculator size={24} />
                  <span>Calcular</span>
                </button>
              </div>
            </div>
          </div>

          {/* Next Video */}
          <div
            className={`shorts-video-slide next-slide ${
              slideDirection === "next" ? "active" : ""
            } ${disableTransition ? "no-transition" : ""}`}
          >
            <video
              ref={nextVideoRef}
              src={videos[nextVideoIndex].src}
              className="shorts-video"
              loop
              muted
              preload="metadata"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons - Right border */}
      <div className="shorts-nav-buttons">
        <button
          className="shorts-nav-btn"
          onClick={() => changeVideo("prev")}
          disabled={isTransitioning}
        >
          <ChevronUp size={32} />
        </button>

        <button
          className="shorts-nav-btn"
          onClick={() => changeVideo("next")}
          disabled={isTransitioning}
        >
          <ChevronDown size={32} />
        </button>
      </div>

      {/* Filters Modal */}
      <div className={`shorts-filters-modal ${showFilters ? "active" : ""}`}>
        <div className="shorts-modal-content">
          <div className="shorts-modal-header">
            <h3>Filtros de búsqueda</h3>
            <button
              className="shorts-close-btn"
              onClick={() => setShowFilters(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div className="shorts-filters-content">
            {/* Transaction Type Toggle */}
            <div className="shorts-filter-group">
              <label>Tipo de transacción</label>
              <div className="shorts-transaction-toggle">
                <button
                  className={`shorts-toggle-btn ${
                    filters.transactionType === "comprar" ? "active" : ""
                  }`}
                  onClick={() =>
                    handleFilterChange("transactionType", "comprar")
                  }
                >
                  Comprar
                </button>
                <button
                  className={`shorts-toggle-btn ${
                    filters.transactionType === "alquilar" ? "active" : ""
                  }`}
                  onClick={() =>
                    handleFilterChange("transactionType", "alquilar")
                  }
                >
                  Alquilar
                </button>
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="shorts-filter-group">
              <label>Rango de precio</label>
              <div className="shorts-price-slider-container">
                <div className="shorts-price-range-inputs">
                  <input
                    type="range"
                    min="0"
                    max="3000000"
                    step="50000"
                    value={filters.priceRange[0]}
                    onChange={(e) => {
                      const newMin = parseInt(e.target.value);
                      if (newMin <= filters.priceRange[1]) {
                        handleFilterChange("priceRange", [
                          newMin,
                          filters.priceRange[1],
                        ]);
                      }
                    }}
                    className="shorts-price-slider"
                  />
                  <input
                    type="range"
                    min="0"
                    max="3000000"
                    step="50000"
                    value={filters.priceRange[1]}
                    onChange={(e) => {
                      const newMax = parseInt(e.target.value);
                      if (newMax >= filters.priceRange[0]) {
                        handleFilterChange("priceRange", [
                          filters.priceRange[0],
                          newMax,
                        ]);
                      }
                    }}
                    className="shorts-price-slider"
                  />
                </div>
                <div className="shorts-price-labels">
                  <span>{formatPrice(filters.priceRange[0])}</span>
                  <span>{formatPrice(filters.priceRange[1])}</span>
                </div>
              </div>
            </div>

            {/* City */}
            <div className="shorts-filter-group">
              <label>Ciudad</label>
              <select
                value={filters.ciudad}
                onChange={(e) => handleFilterChange("ciudad", e.target.value)}
                className="shorts-filter-select"
              >
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div className="shorts-filter-group">
              <label>Tipo de propiedad</label>
              <select
                value={filters.tipo}
                onChange={(e) => handleFilterChange("tipo", e.target.value)}
                className="shorts-filter-select"
              >
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Zone */}
            <div className="shorts-filter-group">
              <label>Zona</label>
              <select
                value={filters.zona}
                onChange={(e) => handleFilterChange("zona", e.target.value)}
                className="shorts-filter-select"
              >
                {zones.map((zone) => (
                  <option key={zone.value} value={zone.value}>
                    {zone.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="shorts-filter-actions">
            <button className="shorts-clear-btn" onClick={clearFilters}>
              Limpiar
            </button>
            <button className="shorts-apply-btn" onClick={applyFilters}>
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shorts;
