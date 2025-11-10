// src/components/guardados/PropertyDetailModal.jsx
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { IoMdClose } from "react-icons/io";
import {
  FaHeart,
  FaShare,
  FaBed,
  FaShower,
  FaRuler,
  FaBuilding,
  FaWhatsapp,
} from "react-icons/fa";
import { formatPrice } from "../../utils/classic/mapHelpers";
import ImageCarousel from "../classic/ImageCarousel";
import CalendarWidget from "../classic/CalendarWidget";
import NearbyPlaces from "../classic/NearbyPlaces";
import StreetView from "../classic/StreetView";
import Modal360 from "../classic/Modal360";
import "./styles/propertyDetailModal.css";

const PropertyDetailModal = ({ isOpen, onClose, property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [show360Modal, setShow360Modal] = useState(false);
  const [current360Images, setCurrent360Images] = useState([]);
  const [current360ImageIndex, setCurrent360ImageIndex] = useState(0);
  const [selectedNearbyPlace, setSelectedNearbyPlace] = useState(null);

  if (!isOpen || !property) return null;

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

  const handleStreet360Click = (image) => {
    setCurrent360Images([image]);
    setSelectedNearbyPlace(null);
    setCurrent360ImageIndex(0);
    setShow360Modal(true);
  };

  const handleClose360Modal = () => {
    setShow360Modal(false);
    setCurrent360ImageIndex(0);
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="property-detail-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="property-detail-modal-content"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Close Button */}
            <div className="property-detail-modal-header">
              <button className="modal-close-button" onClick={onClose}>
                <IoMdClose size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="property-detail-modal-body">
              <ImageCarousel
                images={property.images}
                currentIndex={currentImageIndex}
                onNext={nextImage}
                onPrev={prevImage}
                onIndicatorClick={setCurrentImageIndex}
                propertyName={property.name}
              />

              <div className="property-modal-info">
                <h1 className="property-modal-title">{property.name}</h1>

                <div className="property-modal-price">
                  <span className="price-amount">
                    ${formatPrice(property.price)}
                  </span>
                  <span className="price-type">Venta</span>
                </div>

                <div className="property-modal-location">
                  <MapPin size={16} />
                  {property.location}
                </div>

                <div className="property-modal-details-grid">
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
                    </div>
                  </div>
                </div>

                <div className="property-modal-description">
                  <h3>Descripción</h3>
                  <p>
                    Esta hermosa propiedad ofrece un estilo de vida excepcional
                    en una de las zonas más exclusivas de la ciudad. Con
                    espacios amplios y luminosos, acabados de primera calidad y
                    una ubicación privilegiada que garantiza comodidad y
                    tranquilidad para toda la familia.
                  </p>
                </div>

                <NearbyPlaces
                  places={property.nearbyPlaces}
                  onPlaceClick={handleNearbyPlaceClick}
                  onPlaceHover={() => {}}
                />

                <div className="property-modal-features">
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

                <div className="property-modal-photos-section">
                  <h3>Conoce la propiedad</h3>
                  <p className="section-description">
                    Explora cada espacio de esta propiedad en detalle
                  </p>
                  <div className="street-view-grid">
                    {property.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="street-view-card"
                        onClick={() => handleStreet360Click(img)}
                      >
                        <img src={img} alt={`Foto ${idx + 1}`} />
                        <div className="street-view-overlay">
                          <span>Foto #{idx + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <StreetView
                  images={property.street360Images}
                  onImageClick={handleStreet360Click}
                />

                <CalendarWidget availableDates={property.availableDates} />
              </div>
            </div>

            {/* Sticky Actions at Bottom */}
            <div className="property-modal-actions">
              <button className="modal-action-btn">
                <FaHeart size={16} />
              </button>
              <button className="modal-action-btn">
                <FaShare size={16} />
              </button>
              <button className="modal-action-btn whatsapp-btn">
                <FaWhatsapp size={18} />
              </button>
            </div>
          </motion.div>

          <Modal360
            isOpen={show360Modal}
            onClose={handleClose360Modal}
            images={current360Images}
            currentIndex={current360ImageIndex}
            onIndexChange={setCurrent360ImageIndex}
            selectedPlace={selectedNearbyPlace}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default PropertyDetailModal;
