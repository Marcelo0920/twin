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

  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const progressIntervalRef = useRef(null);

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

  // Update progress bar
  const updateProgress = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  // Handle video loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
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
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        stopProgressTracking();
      } else {
        videoRef.current.play();
        startProgressTracking();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle speed control - start 2x speed
  const startSpeedControl = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2;
      setPlaybackRate(2);
    }
  };

  // Handle speed control - stop 2x speed
  const stopSpeedControl = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
      setPlaybackRate(1);
    }
  };

  // Handle video change
  const changeVideo = (direction) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    stopProgressTracking();

    setTimeout(() => {
      if (direction === "next") {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
      } else {
        setCurrentVideoIndex((prev) =>
          prev === 0 ? videos.length - 1 : prev - 1
        );
      }
      setProgress(0);
      setIsPlaying(true);
      setPlaybackRate(1);

      setTimeout(() => {
        setIsTransitioning(false);
        if (videoRef.current) {
          videoRef.current.play();
          startProgressTracking();
        }
      }, 100);
    }, 300);
  };

  // Handle wheel scroll
  useEffect(() => {
    let scrollTimeout;

    const handleWheel = (e) => {
      e.preventDefault();

      if (isTransitioning) return;

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
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
      clearTimeout(scrollTimeout);
    };
  }, [isTransitioning]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopProgressTracking();
    };
  }, []);

  // Auto-play when video changes
  useEffect(() => {
    if (videoRef.current && !isTransitioning) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      startProgressTracking();
    }
  }, [currentVideoIndex]);

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
          <div className="video-wrapper">
            <video
              ref={videoRef}
              key={currentVideo.id}
              src={currentVideo.src}
              autoPlay
              loop
              muted={isMuted}
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
