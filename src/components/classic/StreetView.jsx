const StreetView = ({ images, onImageClick }) => {
  return (
    <div className="street-view-section">
      <h3>Conoce la Zona</h3>
      <p className="section-description">
        Explora la zona en 360° para conocer mejor el entorno
      </p>
      <div className="street-view-grid">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="street-view-card"
            onClick={() => onImageClick(img)}
          >
            <img src={img} alt={`Vista ${idx + 1}`} />
            <div className="street-view-overlay">
              <span>Vista 360° #{idx + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreetView;
