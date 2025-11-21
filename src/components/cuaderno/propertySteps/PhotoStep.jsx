import React, { useRef } from "react";
import { Upload, X, Camera, Image as ImageIcon } from "lucide-react";
import "./photoStep.css";

const PhotoStep = ({ photos, onPhotosChange }) => {
  const fileInputRef = useRef(null);
  const maxPhotos = 15;

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = maxPhotos - photos.length;

    if (files.length > remainingSlots) {
      alert(`Solo puedes agregar ${remainingSlots} fotos más`);
      return;
    }

    const newPhotos = files.map((file) => ({
      id: Date.now() + Math.random(),
      file: file,
      preview: URL.createObjectURL(file),
    }));

    onPhotosChange([...photos, ...newPhotos]);
  };

  const handleRemovePhoto = (photoId) => {
    const updatedPhotos = photos.filter((photo) => photo.id !== photoId);
    onPhotosChange(updatedPhotos);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="photo-step">
      <p className="step-description">
        Agrega fotos de la propiedad (máximo 15)
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        capture="environment"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />

      <div className="upload-buttons">
        <button className="upload-btn" onClick={triggerFileInput}>
          <ImageIcon size={20} />
          <span>Subir desde Galería</span>
        </button>
        <button className="upload-btn camera-btn" onClick={triggerFileInput}>
          <Camera size={20} />
          <span>Tomar Foto</span>
        </button>
      </div>

      <div className="photos-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-item">
            <img src={photo.preview} alt="Preview" className="photo-preview" />
            <button
              className="remove-photo-btn"
              onClick={() => handleRemovePhoto(photo.id)}
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {photos.length < maxPhotos && (
          <button className="add-photo-placeholder" onClick={triggerFileInput}>
            <Upload size={32} />
            <span>Agregar foto</span>
          </button>
        )}
      </div>

      <div className="photo-counter">
        {photos.length} de {maxPhotos} fotos
      </div>
    </div>
  );
};

export default PhotoStep;
