import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBed,
  FaShower,
  FaRuler,
  FaParking,
  FaHeart,
  FaShare,
  FaWhatsapp,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaHospital,
  FaDumbbell,
  FaShoppingCart,
  FaTree,
  FaSchool,
  FaUtensils,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

// Helper functions for nearby places
const getNearbyPlaceIcon = (type) => {
  const icons = {
    hospital: FaHospital,
    gym: FaDumbbell,
    supermarket: FaShoppingCart,
    park: FaTree,
    school: FaSchool,
    restaurant: FaUtensils,
  };
  return icons[type] || FaMapMarkerAlt;
};

const getNearbyPlaceColor = (type) => {
  const colors = {
    hospital: "#ef4444",
    gym: "#FF9017",
    supermarket: "#10b981",
    park: "#22c55e",
    school: "#5A2D95",
    restaurant: "#ec4899",
  };
  return colors[type] || "#6b7280";
};

// Mock data
const mockProperty = {
  id: 1,
  name: "Casa Moderna Equipetrol",
  price: 450000,
  type: "Casa",
  bedrooms: 4,
  bathrooms: 3,
  area: 280,
  garages: 2,
  location: "Equipetrol Norte, Santa Cruz",
  mainImage:
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=700&fit=crop",
  galleryImages: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
  ],
  nearbyPlaces: [
    {
      id: 1,
      type: "hospital",
      name: "Hospital Equipetrol",
      distance: "1.2 km",
      image:
        "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&h=600&fit=crop",
    },
    {
      id: 2,
      type: "gym",
      name: "Fitness Center",
      distance: "0.5 km",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
    },
    {
      id: 3,
      type: "supermarket",
      name: "Supermercado",
      distance: "0.8 km",
      image:
        "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=600&fit=crop",
    },
    {
      id: 4,
      type: "park",
      name: "Parque Urbano",
      distance: "0.3 km",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    },
    {
      id: 5,
      type: "school",
      name: "Colegio Internacional",
      distance: "0.7 km",
      image:
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop",
    },
    {
      id: 6,
      type: "restaurant",
      name: "Restaurant Gourmet",
      distance: "0.4 km",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    },
  ],
  street360Images: [
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&h=600&fit=crop",
  ],
  description:
    "Esta hermosa propiedad ofrece un estilo de vida excepcional en una de las zonas más exclusivas de la ciudad. Con espacios amplios y luminosos, acabados de primera calidad y una ubicación privilegiada que garantiza comodidad y tranquilidad para toda la familia. La casa cuenta con un diseño moderno y funcional.",
  features: [
    "Piscina",
    "Jardín",
    "Garage Doble",
    "Seguridad 24/7",
    "Ascensor",
    "Aire Acondicionado",
  ],
  additionalFeatures: [
    "Calefacción",
    "Cocina Equipada",
    "Walk-in Closet",
    "Lavandería",
    "Terraza",
    "BBQ Area",
    "Sistema de Alarma",
    "Cámaras de Seguridad",
  ],
  yearBuilt: 2022,
  condition: "Nuevo",
  amenities: {
    interior: ["Cocina equipada", "Walk-in closet", "Lavandería", "Oficina"],
    exterior: [
      "Terraza",
      "BBQ Area",
      "Jardín privado",
      "Estacionamiento cubierto",
    ],
    building: ["Gimnasio", "Piscina", "Área de juegos", "Salón de eventos"],
  },
};

// Hero Image Component (for Matterport)
const HeroImage = ({ image, propertyName }) => {
  return (
    <div style={styles.heroContainer}>
      <div style={styles.heroImageWrapper}>
        <img src={image} alt={propertyName} style={styles.heroImage} />
        <div style={styles.matterportBadge}>📐 Vista 360° Matterport</div>
      </div>
    </div>
  );
};

// Image Carousel Component
const ImageCarousel = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [direction, setDirection] = useState(0);

  // Add hover effects via style tag
  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .carousel-btn:hover {
        background-color: #FF9017 !important;
        color: white !important;
        transform: translateY(-50%) scale(1.1) !important;
      }
      .carousel-container:active {
        cursor: grabbing !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>{title}</h2>
        <div className="carousel-container" style={styles.carouselContainer}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              style={styles.carouselImageWrapper}
              onClick={() => setSelectedImage(images[currentIndex])}
            >
              <img
                src={images[currentIndex]}
                alt={`${title} ${currentIndex + 1}`}
                style={styles.carouselImage}
              />
            </motion.div>
          </AnimatePresence>

          <button
            className="carousel-btn"
            style={{ ...styles.carouselBtn, left: "1rem" }}
            onClick={() => paginate(-1)}
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            className="carousel-btn"
            style={{ ...styles.carouselBtn, right: "1rem" }}
            onClick={() => paginate(1)}
          >
            <FaChevronRight size={20} />
          </button>

          <div style={styles.carouselIndicators}>
            {images.map((_, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.carouselDot,
                  ...(idx === currentIndex ? styles.carouselDotActive : {}),
                }}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
              />
            ))}
          </div>

          <div style={styles.carouselCounter}>
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      {selectedImage && (
        <AnimatePresence>
          <motion.div
            style={styles.fullscreenOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="Fullscreen"
              style={styles.fullscreenImage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <motion.button
              style={styles.closeFullscreen}
              onClick={() => setSelectedImage(null)}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
            >
              ×
            </motion.button>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

// Gallery Component (now using carousel)
const Gallery = ({ images }) => {
  return <ImageCarousel images={images} title="Conoce la casa" />;
};

// Street View Component
const StreetView = ({ images }) => {
  return <ImageCarousel images={images} title="Conoce la zona" />;
};

// Nearby Places Component
const NearbyPlaces = ({ places }) => {
  // Add hover effects via style tag
  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .nearby-place-card:hover {
        border-color: #FF9017;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 144, 23, 0.15);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>Lugares cercanos</h2>
      <div style={styles.nearbyPlacesGrid}>
        {places.map((place) => {
          const IconComponent = getNearbyPlaceIcon(place.type);
          const color = getNearbyPlaceColor(place.type);

          return (
            <div
              key={place.id}
              className="nearby-place-card"
              style={styles.nearbyPlaceCard}
            >
              <div
                style={{
                  ...styles.nearbyPlaceIcon,
                  backgroundColor: `${color}20`,
                }}
              >
                <IconComponent size={24} style={{ color: color }} />
              </div>
              <div style={styles.nearbyPlaceInfo}>
                <h4 style={styles.nearbyPlaceName}>{place.name}</h4>
                <span style={styles.nearbyPlaceDistance}>{place.distance}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Property Stats Component
const PropertyStats = ({ bedrooms, bathrooms, area, garages }) => (
  <div style={styles.statsGrid}>
    <StatCard
      icon={FaBed}
      value={bedrooms}
      label="Dormitorios"
      color="#FF9017"
    />
    <StatCard icon={FaShower} value={bathrooms} label="Baños" color="#5A2D95" />
    <StatCard
      icon={FaRuler}
      value={`${area} m²`}
      label="Área Total"
      color="#FF9017"
    />
    <StatCard
      icon={FaParking}
      value={garages}
      label="Garajes"
      color="#5A2D95"
    />
  </div>
);

const StatCard = ({ icon: Icon, value, label, color }) => (
  <div style={styles.statCard}>
    <div
      style={{
        ...styles.statIcon,
        backgroundColor: `${color}15`,
        color: color,
      }}
    >
      <Icon size={24} />
    </div>
    <div style={styles.statContent}>
      <div style={styles.statValue}>{value}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  </div>
);

// Property Features Component with Expandable Section
const PropertyFeatures = ({ features, additionalFeatures }) => {
  const [showMore, setShowMore] = useState(false);

  // Add hover effects via style tag
  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .show-more-btn:hover {
        background-color: #f8fafc;
        border-color: #FF9017;
        color: #FF9017;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>Características Principales</h2>
      <div style={styles.featuresGrid}>
        {features.map((feature, idx) => (
          <div key={idx} style={styles.featureChip}>
            <FaCheckCircle size={14} style={styles.featureIcon} />
            {feature}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden", marginTop: "1rem" }}
          >
            <div style={styles.featuresGrid}>
              {additionalFeatures.map((feature, idx) => (
                <div key={idx} style={styles.featureChip}>
                  <FaCheckCircle size={14} style={styles.featureIcon} />
                  {feature}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className="show-more-btn"
        style={styles.showMoreBtn}
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "▲ Ver menos características" : "▼ Ver más características"}
      </button>
    </div>
  );
};

// Amenities Component
const AmenitiesSection = ({ amenities }) => (
  <div style={styles.section}>
    <h2 style={styles.sectionTitle}>Amenidades</h2>
    <div style={styles.amenitiesContainer}>
      <AmenityCategory title="Interior" items={amenities.interior} />
      <AmenityCategory title="Exterior" items={amenities.exterior} />
      <AmenityCategory title="Edificio" items={amenities.building} />
    </div>
  </div>
);

const AmenityCategory = ({ title, items }) => (
  <div style={styles.amenityCategory}>
    <h3 style={styles.amenityTitle}>{title}</h3>
    <ul style={styles.amenityList}>
      {items.map((item, idx) => (
        <li key={idx} style={styles.amenityItem}>
          • {item}
        </li>
      ))}
    </ul>
  </div>
);

// Contact Actions Component
const ContactActions = () => (
  <div style={styles.contactActions}>
    <button style={styles.actionBtn} title="Guardar">
      <FaHeart size={20} />
    </button>
    <button style={styles.actionBtn} title="Compartir">
      <FaShare size={20} />
    </button>
    <button style={styles.whatsappBtn}>
      <FaWhatsapp size={20} />
      <span>WhatsApp</span>
    </button>
  </div>
);

// Main PropertyDetails Component
const PropertyDetails = () => {
  const [property] = useState(mockProperty);

  const handleBack = () => {
    // In your actual app: navigate(-1) or window.history.back()
    console.log("Navigate back");
  };

  return (
    <div style={styles.container}>
      {/* Header with Back Button */}
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={handleBack}>
          <FaArrowLeft size={18} />
          <span>Volver a resultados</span>
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Left Column */}
        <div style={styles.leftColumn}>
          <HeroImage image={property.mainImage} propertyName={property.name} />

          <div style={styles.propertyHeader}>
            <div style={styles.propertyTitleSection}>
              <h1 style={styles.title}>{property.name}</h1>
              <div style={styles.location}>
                <FaMapMarkerAlt size={16} />
                <span>{property.location}</span>
              </div>
              <div style={styles.propertyMeta}>
                <span style={styles.metaTag}>{property.type}</span>
                <span style={styles.metaTag}>{property.condition}</span>
                <span style={styles.metaTag}>{property.yearBuilt}</span>
              </div>
            </div>
            <div style={styles.priceContainer}>
              <div style={styles.price}>${property.price.toLocaleString()}</div>
              <div style={styles.priceLabel}>Precio de Venta</div>
              <div style={styles.pricePerSqm}>
                ${Math.round(property.price / property.area).toLocaleString()}
                /m²
              </div>
            </div>
          </div>

          <PropertyStats
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            area={property.area}
            garages={property.garages}
          />

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Descripción</h2>
            <p style={styles.description}>{property.description}</p>
          </div>

          <PropertyFeatures
            features={property.features}
            additionalFeatures={property.additionalFeatures}
          />

          <Gallery images={property.galleryImages} />

          <StreetView images={property.street360Images} />

          <NearbyPlaces places={property.nearbyPlaces} />
        </div>

        {/* Right Column - Sticky Contact */}
        <div style={styles.rightColumn}>
          <div style={styles.contactCard}>
            <div style={styles.contactHeader}>
              <h3 style={styles.contactTitle}>¿Interesado?</h3>
              <p style={styles.contactSubtitle}>
                Agenda una visita o solicita más información
              </p>
            </div>

            <ContactActions />

            <div style={styles.divider} />

            <div style={styles.agentSection}>
              <div style={styles.agentInfo}>
                <div style={styles.agentAvatar}>AG</div>
                <div style={styles.agentDetails}>
                  <div style={styles.agentName}>Agente Inmobiliario</div>
                  <div style={styles.agentRole}>Asesor Senior</div>
                  <div style={styles.agentPhone}>📞 +591 123 456 789</div>
                </div>
              </div>

              <button style={styles.scheduleBtn}>
                <FaCalendarAlt size={18} />
                <span>Agendar Visita</span>
              </button>
            </div>

            <div style={styles.trustSignals}>
              <div style={styles.trustItem}>
                <FaCheckCircle size={16} color="#10b981" />
                <span>Verificado</span>
              </div>
              <div style={styles.trustItem}>
                <FaCheckCircle size={16} color="#10b981" />
                <span>Respuesta en 24h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: "white",
    borderBottom: "1px solid #e2e8f0",
    padding: "1.25rem 2rem",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: "0.625rem",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    color: "#475569",
    fontSize: "0.9375rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  mainContent: {
    maxWidth: "1440px",
    margin: "0 auto",
    padding: "2.5rem 2rem",
    display: "grid",
    gridTemplateColumns: "1fr 420px",
    gap: "2.5rem",
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  // Hero Image Styles
  heroContainer: {
    backgroundColor: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  heroImageWrapper: {
    position: "relative",
    height: "500px",
    backgroundColor: "#000",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  matterportBadge: {
    position: "absolute",
    top: "1.5rem",
    left: "1.5rem",
    backgroundColor: "#FF9017",
    backdropFilter: "blur(10px)",
    color: "white",
    padding: "0.75rem 1.5rem",
    borderRadius: "24px",
    fontSize: "0.875rem",
    fontWeight: "700",
    boxShadow: "0 4px 12px rgba(255, 144, 23, 0.3)",
  },
  // Carousel Styles
  carouselContainer: {
    position: "relative",
    width: "100%",
    height: "450px",
    backgroundColor: "#000",
    borderRadius: "16px",
    overflow: "hidden",
    cursor: "grab",
  },
  carouselImageWrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    userSelect: "none",
    pointerEvents: "none",
  },
  carouselBtn: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "48px",
    height: "48px",
    backgroundColor: "rgba(255,255,255,0.95)",
    border: "none",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    zIndex: 10,
    color: "#1e293b",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  carouselIndicators: {
    position: "absolute",
    bottom: "1.5rem",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "8px",
    zIndex: 10,
  },
  carouselDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.5)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  carouselDotActive: {
    backgroundColor: "#FF9017",
    width: "32px",
    borderRadius: "5px",
  },
  carouselCounter: {
    position: "absolute",
    top: "1.5rem",
    right: "1.5rem",
    backgroundColor: "rgba(0,0,0,0.75)",
    backdropFilter: "blur(10px)",
    color: "white",
    padding: "0.625rem 1.25rem",
    borderRadius: "24px",
    fontSize: "0.875rem",
    fontWeight: "600",
    zIndex: 10,
  },
  // Nearby Places Styles
  nearbyPlacesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
  },
  nearbyPlaceCard: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "1.25rem",
    backgroundColor: "white",
    border: "2px solid #e2e8f0",
    borderRadius: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  nearbyPlaceIcon: {
    width: "52px",
    height: "52px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  nearbyPlaceInfo: {
    flex: 1,
  },
  nearbyPlaceName: {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#0f172a",
    margin: "0 0 0.25rem 0",
  },
  nearbyPlaceDistance: {
    fontSize: "0.875rem",
    color: "#64748b",
    fontWeight: "500",
  },
  // Place Modal Styles
  placeModalContent: {
    backgroundColor: "white",
    borderRadius: "20px",
    overflow: "hidden",
    maxWidth: "700px",
    width: "90%",
    position: "relative",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
  },
  placeModalImage: {
    width: "100%",
    height: "400px",
    objectFit: "cover",
  },
  placeModalInfo: {
    padding: "2rem",
  },
  placeModalHeader: {
    display: "flex",
    alignItems: "center",
    gap: "1.25rem",
  },
  placeModalTitle: {
    fontSize: "1.5rem",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 0.25rem 0",
  },
  placeModalDistance: {
    fontSize: "1rem",
    color: "#64748b",
    margin: 0,
  },
  propertyHeader: {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "2.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "2rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  propertyTitleSection: {
    flex: 1,
  },
  title: {
    fontSize: "2.25rem",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 1rem 0",
    lineHeight: "1.2",
  },
  location: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#64748b",
    fontSize: "1.0625rem",
    marginBottom: "1rem",
  },
  propertyMeta: {
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
  },
  metaTag: {
    padding: "0.5rem 1rem",
    backgroundColor: "#f1f5f9",
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#475569",
  },
  priceContainer: {
    textAlign: "right",
    padding: "1rem 1.5rem",
    borderRadius: "16px",
    backgroundColor: "#FFF5EB",
    border: "2px solid #FFD9B3",
  },
  price: {
    fontSize: "2.75rem",
    fontWeight: "900",
    color: "#FF9017",
    lineHeight: "1",
    marginBottom: "0.5rem",
  },
  priceLabel: {
    fontSize: "0.875rem",
    color: "#64748b",
    fontWeight: "600",
    marginBottom: "0.25rem",
  },
  pricePerSqm: {
    fontSize: "0.8125rem",
    color: "#94a3b8",
    fontWeight: "500",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1.25rem",
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "1.75rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "1rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transition: "all 0.2s ease",
  },
  statIcon: {
    width: "56px",
    height: "56px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statContent: {
    width: "100%",
  },
  statValue: {
    fontSize: "1.75rem",
    fontWeight: "800",
    color: "#0f172a",
    lineHeight: "1",
    marginBottom: "0.375rem",
  },
  statLabel: {
    fontSize: "0.875rem",
    color: "#64748b",
    fontWeight: "600",
  },
  section: {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "2.5rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  sectionTitle: {
    fontSize: "1.625rem",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 1.75rem 0",
  },
  description: {
    fontSize: "1.0625rem",
    lineHeight: "1.8",
    color: "#475569",
    margin: 0,
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "1rem",
  },
  featureChip: {
    display: "flex",
    alignItems: "center",
    gap: "0.625rem",
    padding: "1rem 1.25rem",
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    fontSize: "0.9375rem",
    fontWeight: "600",
    color: "#475569",
    border: "1px solid #e2e8f0",
  },
  featureIcon: {
    color: "#10b981",
    flexShrink: 0,
  },
  showMoreBtn: {
    marginTop: "1.5rem",
    padding: "0.875rem 1.5rem",
    backgroundColor: "transparent",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    color: "#475569",
    fontSize: "0.9375rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    width: "100%",
  },
  contactCard: {
    position: "sticky",
    top: "110px",
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "2rem",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
  },
  contactHeader: {
    marginBottom: "1.5rem",
  },
  contactTitle: {
    fontSize: "1.375rem",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 0.5rem 0",
  },
  contactSubtitle: {
    fontSize: "0.9375rem",
    color: "#64748b",
    margin: 0,
    lineHeight: "1.5",
  },
  contactActions: {
    display: "flex",
    gap: "0.75rem",
    marginBottom: "1.5rem",
  },
  actionBtn: {
    width: "56px",
    height: "56px",
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#64748b",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  whatsappBtn: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.625rem",
    padding: "1rem 1.5rem",
    backgroundColor: "#25d366",
    border: "none",
    borderRadius: "14px",
    color: "white",
    fontSize: "0.9375rem",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(37, 211, 102, 0.3)",
  },
  divider: {
    height: "1px",
    backgroundColor: "#e2e8f0",
    margin: "1.5rem 0",
  },
  agentSection: {
    marginBottom: "1.5rem",
  },
  agentInfo: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1.25rem",
  },
  agentAvatar: {
    width: "64px",
    height: "64px",
    backgroundColor: "#5A2D95",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "1.375rem",
    fontWeight: "700",
    flexShrink: 0,
  },
  agentDetails: {
    flex: 1,
  },
  agentName: {
    fontSize: "1.0625rem",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "0.25rem",
  },
  agentRole: {
    fontSize: "0.8125rem",
    color: "#FF9017",
    fontWeight: "600",
    marginBottom: "0.375rem",
  },
  agentPhone: {
    fontSize: "0.875rem",
    color: "#64748b",
    fontWeight: "500",
  },
  scheduleBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.625rem",
    padding: "1.125rem",
    backgroundColor: "#FF9017",
    border: "none",
    borderRadius: "14px",
    color: "white",
    fontSize: "1rem",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(255, 144, 23, 0.3)",
  },
  trustSignals: {
    display: "flex",
    gap: "1rem",
    padding: "1rem",
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
  },
  trustItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.8125rem",
    color: "#475569",
    fontWeight: "600",
  },
  fullscreenOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.96)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "zoom-out",
  },
  fullscreenImage: {
    maxWidth: "92%",
    maxHeight: "92%",
    objectFit: "contain",
  },
  closeFullscreen: {
    position: "absolute",
    top: "2rem",
    right: "2rem",
    width: "52px",
    height: "52px",
    backgroundColor: "white",
    border: "none",
    borderRadius: "50%",
    fontSize: "2rem",
    fontWeight: "300",
    color: "#1e293b",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  },
};

export default PropertyDetails;
