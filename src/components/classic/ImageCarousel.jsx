// src/pages/Classic/components/ImageCarousel.jsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageCarousel = ({
  images,
  currentIndex,
  onNext,
  onPrev,
  onIndicatorClick,
  propertyName,
}) => {
  return (
    <div className="property-carousel">
      <div className="carousel-container">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${propertyName} - Image ${idx + 1}`}
              className="carousel-image"
            />
          ))}
        </div>
        {images.length > 1 && (
          <>
            <button className="carousel-btn prev" onClick={onPrev}>
              <ChevronLeft size={24} />
            </button>
            <button className="carousel-btn next" onClick={onNext}>
              <ChevronRight size={24} />
            </button>
            <div className="carousel-indicators">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`indicator ${
                    idx === currentIndex ? "active" : ""
                  }`}
                  onClick={() => onIndicatorClick(idx)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;
