// src/pages/Classic/components/DetailedPropertyView.jsx
import React, { useState } from "react";
import { MapPin } from "lucide-react";
import {
  FaArrowLeft,
  FaHeart,
  FaShare,
  FaBed,
  FaShower,
  FaRuler,
  FaBuilding,
  FaWhatsapp,
} from "react-icons/fa";
import { formatPrice } from "../../utils/classic/mapHelpers";
import ImageCarousel from "./ImageCarousel";
import CalendarWidget from "./CalendarWidget";
import NearbyPlaces from "./NearbyPlaces";
import StreetView from "./StreetView";

const DetailedPropertyView = ({
  property,
  activeTab,
  onBack,
  onNearbyPlaceClick,
  onNearbyPlaceHover,
  onStreet360Click,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!property) return null;

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

  return (
    <div className="detailed-property-view">
      <div className="detail-header">
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft size={18} />
        </button>
      </div>

      <div className="detail-content">
        <ImageCarousel
          images={property.images}
          currentIndex={currentImageIndex}
          onNext={nextImage}
          onPrev={prevImage}
          onIndicatorClick={setCurrentImageIndex}
          propertyName={property.name}
        />

        <div className="property-info">
          <h1 className="property-title">{property.name}</h1>

          <div className="property-price-detail">
            <span className="price-amount">
              {activeTab === "comprar"
                ? formatPrice(property.price)
                : `$${property.price}`}
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

          <div className="property-description">
            <h3>Descripción</h3>
            <p>
              Esta hermosa propiedad ofrece un estilo de vida excepcional en una
              de las zonas más exclusivas de la ciudad. Con espacios amplios y
              luminosos, acabados de primera calidad y una ubicación
              privilegiada que garantiza comodidad y tranquilidad para toda la
              familia.
            </p>
          </div>

          <NearbyPlaces
            places={property.nearbyPlaces}
            onPlaceClick={onNearbyPlaceClick}
            onPlaceHover={onNearbyPlaceHover}
          />

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

          <StreetView
            images={property.street360Images}
            onImageClick={onStreet360Click}
          />

          <CalendarWidget availableDates={property.availableDates} />

          {/* Add padding at bottom to prevent content from being hidden behind sticky actions */}
          <div className="sticky-actions-spacer"></div>
        </div>
      </div>

      {/* Sticky Actions at Bottom */}
      <div className="detail-actions-sticky">
        <button className="action-btn-classic">
          <FaHeart size={16} />
        </button>
        <button className="action-btn-classic">
          <FaShare size={16} />
        </button>
        <button className="action-btn-classic whatsapp-btn">
          <FaWhatsapp size={18} />
        </button>
      </div>
    </div>
  );
};

export default DetailedPropertyView;
