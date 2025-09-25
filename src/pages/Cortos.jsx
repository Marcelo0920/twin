import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Filter,
  MapPin,
  Phone,
  Calculator,
  X,
  Volume2,
  VolumeX,
} from "lucide-react";
import "./styles/cortos.css";

const Cortos = () => {
  const navigate = useNavigate();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // States for stacking slide effect
  const [slideOffset, setSlideOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [nextVideoIndex, setNextVideoIndex] = useState(1);
  const [prevVideoIndex, setPrevVideoIndex] = useState(2);

  // States for filters
  const [filters, setFilters] = useState({
    transactionType: "comprar", // "comprar" or "alquilar"
    priceRange: [0, 3000000], // [min, max] in Bolivianos
    ciudad: "",
    tipo: "",
    zona: "",
  });

  const videoContainerRef = useRef(null);
  const currentVideoRef = useRef(null);
  const nextVideoRef = useRef(null);
  const prevVideoRef = useRef(null);
  const progressIntervalRef = useRef(null);

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

  // Apply filters (you can add your filtering logic here)
  const applyFilters = () => {
    console.log("Applying filters:", filters);
    setShowFilters(false);
    // Add your filtering logic here
  };

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

  // Update video indices when current video changes
  useEffect(() => {
    setNextVideoIndex((currentVideoIndex + 1) % videos.length);
    setPrevVideoIndex(
      currentVideoIndex === 0 ? videos.length - 1 : currentVideoIndex - 1
    );
  }, [currentVideoIndex, videos.length]);

  // Update progress bar
  const updateProgress = () => {
    if (currentVideoRef.current) {
      const current = currentVideoRef.current.currentTime;
      const total = currentVideoRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  // Handle video loaded metadata
  const handleLoadedMetadata = () => {
    if (currentVideoRef.current) {
      setDuration(currentVideoRef.current.duration);
      setProgress(0);
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

  // Handle video play/pause
  const togglePlayPause = () => {
    if (currentVideoRef.current) {
      if (isPlaying) {
        currentVideoRef.current.pause();
        stopProgressTracking();
      } else {
        currentVideoRef.current.play();
        startProgressTracking();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle mute/unmute
  const toggleMute = () => {
    if (currentVideoRef.current) {
      currentVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle speed control - start 2x speed
  const startSpeedControl = () => {
    if (currentVideoRef.current) {
      currentVideoRef.current.playbackRate = 2;
      setPlaybackRate(2);
    }
  };

  // Handle speed control - stop 2x speed
  const stopSpeedControl = () => {
    if (currentVideoRef.current) {
      currentVideoRef.current.playbackRate = 1;
      setPlaybackRate(1);
    }
  };

  // Handle video change
  const changeVideo = (direction) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    stopProgressTracking();

    // Animate to next position
    const targetOffset = direction === "next" ? -100 : 100;
    setSlideOffset(targetOffset);

    setTimeout(() => {
      // First, update video indices while maintaining current position
      if (direction === "next") {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
      } else {
        setCurrentVideoIndex((prev) =>
          prev === 0 ? videos.length - 1 : prev - 1
        );
      }

      // Wait a frame for React to update the DOM
      requestAnimationFrame(() => {
        // Then reset position instantly
        setSlideOffset(0);
        setProgress(0);
        setIsPlaying(true);
        setPlaybackRate(1);

        // Give a tiny delay for positioning to settle
        setTimeout(() => {
          setIsTransitioning(false);
          if (currentVideoRef.current) {
            currentVideoRef.current.play();
            startProgressTracking();
          }
        }, 20);
      });
    }, 400);
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    if (isTransitioning) return;
    setIsDragging(true);
    setDragStartY(e.clientY);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isTransitioning) return;

    const deltaY = e.clientY - dragStartY;
    const maxDrag = window.innerHeight * 0.5; // 50% of viewport height
    const clampedDelta = Math.max(-maxDrag, Math.min(maxDrag, deltaY));

    // Calculate slide offset as percentage
    const offsetPercent = (clampedDelta / maxDrag) * 100;
    setSlideOffset(offsetPercent);
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;

    setIsDragging(false);
    const deltaY = e.clientY - dragStartY;
    const threshold = window.innerHeight * 0.15; // 15% of viewport height

    if (Math.abs(deltaY) > threshold) {
      if (deltaY > 0) {
        changeVideo("prev");
      } else {
        changeVideo("next");
      }
    } else {
      // Snap back to original position
      setSlideOffset(0);
    }
  };

  // Handle wheel scroll
  useEffect(() => {
    let scrollTimeout;

    const handleWheel = (e) => {
      e.preventDefault();

      if (isTransitioning || isDragging) return;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0) {
          changeVideo("next");
        } else {
          changeVideo("prev");
        }
      }, 100);
    };

    const container = videoContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      container.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      }
      clearTimeout(scrollTimeout);
    };
  }, [isTransitioning, isDragging, dragStartY]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopProgressTracking();
    };
  }, []);

  // Auto-play when video changes
  useEffect(() => {
    if (currentVideoRef.current && !isTransitioning) {
      currentVideoRef.current.currentTime = 0;
      currentVideoRef.current.play();
      startProgressTracking();
    }
  }, [currentVideoIndex]);

  const currentVideo = videos[currentVideoIndex];
  const nextVideo = videos[nextVideoIndex];
  const prevVideo = videos[prevVideoIndex];

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
          <button className="sidebar-btn active">
            <span>Cortos</span>
          </button>
          <button className="sidebar-btn" onClick={() => setShowFilters(true)}>
            <Filter size={18} />
            <span>
              Filtros
              {getActiveFiltersCount() > 0 && ` (${getActiveFiltersCount()})`}
            </span>
          </button>
        </div>
      </div>

      {/* Center - Video Stack */}
      <div className="video-section" ref={videoContainerRef}>
        <div className="video-stack">
          {/* Previous Video */}
          <div
            className="video-container prev-video"
            style={{
              transform: `translateY(${slideOffset - 100}%)`,
              transition:
                isDragging || !isTransitioning
                  ? "none"
                  : "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div className="video-wrapper">
              <video
                ref={prevVideoRef}
                src={prevVideo.src}
                muted
                loop
                preload="metadata"
                className="main-video"
              />
            </div>

            <div className="video-overlay">
              <div className="video-info">
                <h3 className="video-title">{prevVideo.title}</h3>
                <p className="video-description">{prevVideo.description}</p>
                <div className="property-info">
                  <span className="price">{prevVideo.price}</span>
                  <div className="location">
                    <MapPin size={14} />
                    {prevVideo.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Video */}
          <div
            className="video-container current-video"
            style={{
              transform: `translateY(${slideOffset}%)`,
              transition:
                isDragging || !isTransitioning
                  ? "none"
                  : "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div className="video-wrapper">
              <video
                ref={currentVideoRef}
                src={currentVideo.src}
                autoPlay
                loop
                muted={isMuted}
                preload="auto"
                className="main-video"
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => changeVideo("next")}
              />

              {/* Mute Button */}
              <button className="mute-btn" onClick={toggleMute}>
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>

              {/* Speed Control Areas */}
              <div
                className="speed-control left-speed"
                onMouseDown={startSpeedControl}
                onMouseUp={stopSpeedControl}
                onMouseLeave={stopSpeedControl}
              />
              <div
                className="speed-control right-speed"
                onMouseDown={startSpeedControl}
                onMouseUp={stopSpeedControl}
                onMouseLeave={stopSpeedControl}
              />

              {/* Play/Pause Overlay */}
              <div className="play-pause-overlay" onClick={togglePlayPause} />

              {/* Progress Bar */}
              <div className="progress-container">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Play/Pause Indicator */}
              {!isPlaying && (
                <div onClick={togglePlayPause} className="play-indicator">
                  ▶
                </div>
              )}
            </div>

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

          {/* Next Video */}
          <div
            className="video-container next-video"
            style={{
              transform: `translateY(${slideOffset + 100}%)`,
              transition:
                isDragging || !isTransitioning
                  ? "none"
                  : "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div className="video-wrapper">
              <video
                ref={nextVideoRef}
                src={nextVideo.src}
                muted
                loop
                preload="metadata"
                className="main-video"
              />
            </div>

            <div className="video-overlay">
              <div className="video-info">
                <h3 className="video-title">{nextVideo.title}</h3>
                <p className="video-description">{nextVideo.description}</p>
                <div className="property-info">
                  <span className="price">{nextVideo.price}</span>
                  <div className="location">
                    <MapPin size={14} />
                    {nextVideo.location}
                  </div>
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
            <h3>Filtros de búsqueda</h3>
            <button className="close-btn" onClick={() => setShowFilters(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="filters-content">
            {/* Transaction Type Toggle */}
            <div className="filter-group">
              <label>Tipo de transacción</label>
              <div className="transaction-toggle">
                <button
                  className={`toggle-btn ${
                    filters.transactionType === "comprar" ? "active" : ""
                  }`}
                  onClick={() =>
                    handleFilterChange("transactionType", "comprar")
                  }
                >
                  Comprar
                </button>
                <button
                  className={`toggle-btn ${
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
            <div className="filter-group">
              <label>Rango de precio</label>
              <div className="price-slider-container">
                <div
                  className="price-range-inputs"
                  style={{
                    "--min-percent": (filters.priceRange[0] / 3000000) * 100,
                    "--max-percent": (filters.priceRange[1] / 3000000) * 100,
                  }}
                >
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
                    className="price-slider min-slider"
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
                    className="price-slider max-slider"
                  />
                </div>
                <div className="price-labels">
                  <span>{formatPrice(filters.priceRange[0])}</span>
                  <span>{formatPrice(filters.priceRange[1])}</span>
                </div>
              </div>
            </div>

            {/* City */}
            <div className="filter-group">
              <label>Ciudad</label>
              <select
                value={filters.ciudad}
                onChange={(e) => handleFilterChange("ciudad", e.target.value)}
                className="filter-select"
              >
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div className="filter-group">
              <label>Tipo de propiedad</label>
              <select
                value={filters.tipo}
                onChange={(e) => handleFilterChange("tipo", e.target.value)}
                className="filter-select"
              >
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Zone */}
            <div className="filter-group">
              <label>Zona</label>
              <select
                value={filters.zona}
                onChange={(e) => handleFilterChange("zona", e.target.value)}
                className="filter-select"
              >
                {zones.map((zone) => (
                  <option key={zone.value} value={zone.value}>
                    {zone.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-actions">
            <button className="clear-btn" onClick={clearFilters}>
              Limpiar
            </button>
            <button className="apply-btn" onClick={applyFilters}>
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cortos;
