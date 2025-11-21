import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Upload,
  Plus,
  Trash2,
  Check,
  Home,
  MapPin,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";
import "./styles/createPropertyModal.css";

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Map component to handle marker dragging
const DraggableMarker = ({ position, setPosition }) => {
  const markerRef = useRef(null);

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        setPosition(marker.getLatLng());
      }
    },
  };

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
};

// Map click handler component
const MapClickHandler = ({ setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return null;
};

const CreatePropertyModal = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [slideDirection, setSlideDirection] = useState("right");
  const [showSuccess, setShowSuccess] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    title: "",
    propertyType: "Casa",
    description: "",
    mainPhoto: null,

    // Step 2: Property Details
    price: "",
    totalArea: "",
    constructionArea: "",
    bedrooms: "",
    bathrooms: "",
    garages: "",
    kitchens: 1,
    hasYard: false,

    // Step 3: Features & Amenities
    features: {
      pool: false,
      garden: false,
      security24: false,
      heating: false,
      airConditioning: false,
      bbqArea: false,
      terrace: false,
      elevator: false,
      closets: false,
      equippedKitchen: false,
      laundry: false,
      alarmSystem: false,
      securityCameras: false,
    },
    tags: [],

    // Step 4: Property Photos
    propertyPhotos: [],

    // Step 5: Neighborhood Photos
    neighborhoodPhotos: [],

    // Step 6: Location
    location: { lat: -17.8146, lng: -63.1561 }, // Santa Cruz default
    neighborhood: "",
    address: "",
    nearbyPlaces: [],

    // Step 7: Visit Schedule
    availableDays: [],
    visitTypes: {
      inPerson: false,
      virtual: false,
    },
    timeSlots: {
      morning: false,
      afternoon: false,
      evening: false,
    },
    specialInstructions: "",
  });

  const totalSteps = 8;

  const propertyTypes = [
    "Casa",
    "Departamento",
    "Penthouse",
    "Terreno",
    "Local Comercial",
    "Oficina",
  ];
  const availableTags = [
    "Nuevo",
    "Amoblado",
    "Remodelado",
    "Mascotas Permitidas",
    "Con Vigilancia",
  ];
  const daysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];
  const nearbyPlaceTypes = [
    "Hospital",
    "Escuela",
    "Supermercado",
    "Parque",
    "Gimnasio",
    "Restaurante",
  ];

  // Step icons
  const stepIcons = [
    Home,
    Home,
    Check,
    ImageIcon,
    ImageIcon,
    MapPin,
    MapPin,
    Calendar,
  ];

  // Validation functions for each step
  const validateStep = (step) => {
    switch (step) {
      case 1:
        return (
          formData.title.trim() !== "" &&
          formData.propertyType.trim() !== "" &&
          formData.description.trim() !== "" &&
          formData.mainPhoto !== null
        );
      case 2:
        return (
          formData.price !== "" &&
          formData.totalArea !== "" &&
          formData.constructionArea !== "" &&
          formData.bedrooms !== "" &&
          formData.bathrooms !== ""
        );
      case 3:
        return true; // Features are optional
      case 4:
        return formData.propertyPhotos.length > 0;
      case 5:
        return true; // Neighborhood photos are optional
      case 6:
        return (
          formData.neighborhood.trim() !== "" && formData.address.trim() !== ""
        );
      case 7:
        return true; // Nearby places are optional
      case 8:
        return (
          formData.availableDays.length > 0 &&
          (formData.visitTypes.inPerson || formData.visitTypes.virtual) &&
          (formData.timeSlots.morning ||
            formData.timeSlots.afternoon ||
            formData.timeSlots.evening)
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps && validateStep(currentStep)) {
      setSlideDirection("right");
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setSlideDirection("left");
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFeatureToggle = (feature) => {
    setFormData({
      ...formData,
      features: {
        ...formData.features,
        [feature]: !formData.features[feature],
      },
    });
  };

  const handleTagToggle = (tag) => {
    const newTags = formData.tags.includes(tag)
      ? formData.tags.filter((t) => t !== tag)
      : [...formData.tags, tag];
    setFormData({ ...formData, tags: newTags });
  };

  const handleDayToggle = (day) => {
    const newDays = formData.availableDays.includes(day)
      ? formData.availableDays.filter((d) => d !== day)
      : [...formData.availableDays, day];
    setFormData({ ...formData, availableDays: newDays });
  };

  const handleFileUpload = (field, files) => {
    const fileArray = Array.from(files);
    const currentPhotos = formData[field];
    const maxPhotos = 6;

    if (currentPhotos.length + fileArray.length <= maxPhotos) {
      const newPhotos = fileArray.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setFormData({ ...formData, [field]: [...currentPhotos, ...newPhotos] });
    }
  };

  const handleRemovePhoto = (field, index) => {
    const newPhotos = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newPhotos });
  };

  const handleAddNearbyPlace = () => {
    const newPlace = {
      id: Date.now(),
      name: "",
      type: "Hospital",
      location: null,
    };
    setFormData({
      ...formData,
      nearbyPlaces: [...formData.nearbyPlaces, newPlace],
    });
  };

  const handleUpdateNearbyPlace = (id, field, value) => {
    const updatedPlaces = formData.nearbyPlaces.map((place) =>
      place.id === id ? { ...place, [field]: value } : place
    );
    setFormData({ ...formData, nearbyPlaces: updatedPlaces });
  };

  const handleRemoveNearbyPlace = (id) => {
    const updatedPlaces = formData.nearbyPlaces.filter(
      (place) => place.id !== id
    );
    setFormData({ ...formData, nearbyPlaces: updatedPlaces });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setCurrentStep(1);
    onClose();
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction === "right" ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction === "right" ? -1000 : 1000,
      opacity: 0,
    }),
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <h2 className="step-title">Información Básica</h2>

            <div className="form-group">
              <label>Título de la Propiedad *</label>
              <input
                type="text"
                placeholder="Ej: Casa Moderna Equipetrol"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Tipo de Propiedad *</label>
              <select
                value={formData.propertyType}
                onChange={(e) =>
                  handleInputChange("propertyType", e.target.value)
                }
                className="form-select"
              >
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Descripción *</label>
              <textarea
                placeholder="Describe tu propiedad en detalle..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="form-textarea"
                rows={5}
              />
            </div>

            <div className="form-group">
              <label>Foto Principal *</label>
              <div className="main-photo-upload">
                {formData.mainPhoto ? (
                  <div className="main-photo-preview">
                    <img src={formData.mainPhoto.preview} alt="Preview" />
                    <button
                      className="remove-photo-btn"
                      onClick={() => handleInputChange("mainPhoto", null)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="upload-label">
                    <Upload size={32} />
                    <span>Subir foto principal</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          handleInputChange("mainPhoto", {
                            file,
                            preview: URL.createObjectURL(file),
                          });
                        }
                      }}
                      hidden
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-step">
            <h2 className="step-title">Detalles de la Propiedad</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Precio (USD) *</label>
                <input
                  type="number"
                  placeholder="450000"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Área Total (m²) *</label>
                <input
                  type="number"
                  placeholder="280"
                  value={formData.totalArea}
                  onChange={(e) =>
                    handleInputChange("totalArea", e.target.value)
                  }
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Área de Construcción (m²) *</label>
                <input
                  type="number"
                  placeholder="250"
                  value={formData.constructionArea}
                  onChange={(e) =>
                    handleInputChange("constructionArea", e.target.value)
                  }
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Dormitorios *</label>
                <input
                  type="number"
                  placeholder="4"
                  value={formData.bedrooms}
                  onChange={(e) =>
                    handleInputChange("bedrooms", e.target.value)
                  }
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Baños *</label>
                <input
                  type="number"
                  placeholder="3"
                  value={formData.bathrooms}
                  onChange={(e) =>
                    handleInputChange("bathrooms", e.target.value)
                  }
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Garajes</label>
                <input
                  type="number"
                  placeholder="2"
                  value={formData.garages}
                  onChange={(e) => handleInputChange("garages", e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Cocinas</label>
                <input
                  type="number"
                  placeholder="1"
                  value={formData.kitchens}
                  onChange={(e) =>
                    handleInputChange("kitchens", e.target.value)
                  }
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>¿Tiene Patio?</label>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    id="hasYard"
                    checked={formData.hasYard}
                    onChange={(e) =>
                      handleInputChange("hasYard", e.target.checked)
                    }
                  />
                  <label htmlFor="hasYard" className="toggle-label">
                    {formData.hasYard ? "Sí" : "No"}
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step">
            <h2 className="step-title">Características y Amenidades</h2>

            <div className="features-grid">
              <div className="feature-item">
                <input
                  type="checkbox"
                  id="pool"
                  checked={formData.features.pool}
                  onChange={() => handleFeatureToggle("pool")}
                />
                <label htmlFor="pool">Piscina</label>
              </div>

              <div className="feature-item">
                <input
                  type="checkbox"
                  id="garden"
                  checked={formData.features.garden}
                  onChange={() => handleFeatureToggle("garden")}
                />
                <label htmlFor="garden">Jardín</label>
              </div>

              <div className="feature-item">
                <input
                  type="checkbox"
                  id="security24"
                  checked={formData.features.security24}
                  onChange={() => handleFeatureToggle("security24")}
                />
                <label htmlFor="security24">Seguridad 24/7</label>
              </div>

              <div className="feature-item">
                <input
                  type="checkbox"
                  id="heating"
                  checked={formData.features.heating}
                  onChange={() => handleFeatureToggle("heating")}
                />
                <label htmlFor="heating">Calefacción</label>
              </div>

              <div className="feature-item">
                <input
                  type="checkbox"
                  id="airConditioning"
                  checked={formData.features.airConditioning}
                  onChange={() => handleFeatureToggle("airConditioning")}
                />
                <label htmlFor="airConditioning">Aire Acondicionado</label>
              </div>

              <div className="feature-item">
                <input
                  type="checkbox"
                  id="bbqArea"
                  checked={formData.features.bbqArea}
                  onChange={() => handleFeatureToggle("bbqArea")}
                />
                <label htmlFor="bbqArea">Área BBQ</label>
              </div>

              <div className="feature-item">
                <input
                  type="checkbox"
                  id="terrace"
                  checked={formData.features.terrace}
                  onChange={() => handleFeatureToggle("terrace")}
                />
                <label htmlFor="terrace">Terraza</label>
              </div>

              <div className="feature-item">
                <input
                  type="checkbox"
                  id="elevator"
                  checked={formData.features.elevator}
                  onChange={() => handleFeatureToggle("elevator")}
                />
                <label htmlFor="elevator">Ascensor</label>
              </div>

              <div className="feature-item">
                <input
                  type="checkbox"
                  id="closets"
                  checked={formData.features.closets}
                  onChange={() => handleFeatureToggle("closets")}
                />
                <label htmlFor="closets">Closets</label>
              </div>

              <div className="feature-item">
                <input
                  type="checkbox"
                  id="equippedKitchen"
                  checked={formData.features.equippedKitchen}
                  onChange={() => handleFeatureToggle("equippedKitchen")}
                />
                <label htmlFor="equippedKitchen">Cocina Equipada</label>
              </div>

              <div className="feature-item">
                <input
                  type="checkbox"
                  id="laundry"
                  checked={formData.features.laundry}
                  onChange={() => handleFeatureToggle("laundry")}
                />
                <label htmlFor="laundry">Lavandería</label>
              </div>

              <div className="feature-item">
                <input
                  type="checkbox"
                  id="alarmSystem"
                  checked={formData.features.alarmSystem}
                  onChange={() => handleFeatureToggle("alarmSystem")}
                />
                <label htmlFor="alarmSystem">Sistema de Alarma</label>
              </div>

              <div className="feature-item">
                <input
                  type="checkbox"
                  id="securityCameras"
                  checked={formData.features.securityCameras}
                  onChange={() => handleFeatureToggle("securityCameras")}
                />
                <label htmlFor="securityCameras">Cámaras de Seguridad</label>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: "2rem" }}>
              <label>Etiquetas Adicionales</label>
              <div className="tags-container">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    className={`tag-btn ${
                      formData.tags.includes(tag) ? "active" : ""
                    }`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="form-step">
            <h2 className="step-title">Fotos de la Propiedad</h2>
            <p className="step-subtitle">Conoce la Casa - Máximo 6 fotos</p>

            <div className="photos-grid">
              {formData.propertyPhotos.map((photo, index) => (
                <div key={index} className="photo-item">
                  <img src={photo.preview} alt={`Property ${index + 1}`} />
                  <button
                    className="remove-photo-btn"
                    onClick={() => handleRemovePhoto("propertyPhotos", index)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              {formData.propertyPhotos.length < 6 && (
                <label className="photo-upload-box">
                  <Upload size={32} />
                  <span>Subir foto</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      handleFileUpload("propertyPhotos", e.target.files)
                    }
                    hidden
                  />
                </label>
              )}
            </div>

            <p className="photo-count">
              {formData.propertyPhotos.length} / 6 fotos
            </p>
          </div>
        );

      case 5:
        return (
          <div className="form-step">
            <h2 className="step-title">Fotos de la Zona</h2>
            <p className="step-subtitle">
              Conoce la Zona - Máximo 6 fotos (Opcional)
            </p>

            <div className="photos-grid">
              {formData.neighborhoodPhotos.map((photo, index) => (
                <div key={index} className="photo-item">
                  <img src={photo.preview} alt={`Neighborhood ${index + 1}`} />
                  <button
                    className="remove-photo-btn"
                    onClick={() =>
                      handleRemovePhoto("neighborhoodPhotos", index)
                    }
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              {formData.neighborhoodPhotos.length < 6 && (
                <label className="photo-upload-box">
                  <Upload size={32} />
                  <span>Subir foto</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      handleFileUpload("neighborhoodPhotos", e.target.files)
                    }
                    hidden
                  />
                </label>
              )}
            </div>

            <p className="photo-count">
              {formData.neighborhoodPhotos.length} / 6 fotos
            </p>
          </div>
        );

      case 6:
        return (
          <div className="form-step">
            <h2 className="step-title">Ubicación de la Propiedad</h2>

            <div className="form-group">
              <label>Barrio / Zona *</label>
              <input
                type="text"
                placeholder="Ej: Equipetrol Norte"
                value={formData.neighborhood}
                onChange={(e) =>
                  handleInputChange("neighborhood", e.target.value)
                }
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Dirección Completa *</label>
              <input
                type="text"
                placeholder="Ej: Av. San Martin #123"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Selecciona la Ubicación en el Mapa *</label>
              <p className="helper-text">
                Haz clic en el mapa o arrastra el marcador
              </p>
              <div className="map-container">
                <MapContainer
                  center={[formData.location.lat, formData.location.lng]}
                  zoom={13}
                  style={{
                    height: "300px",
                    width: "100%",
                    borderRadius: "8px",
                  }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker
                    position={[formData.location.lat, formData.location.lng]}
                    draggable={true}
                    icon={L.divIcon({
                      className: 'custom-property-marker',
                      html: `
                        <div class="property-marker-pin">
                          <div class="property-marker-inner">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                            </svg>
                          </div>
                        </div>
                      `,
                      iconSize: [40, 48],
                      iconAnchor: [20, 48],
                      popupAnchor: [0, -48],
                    })}
                    eventHandlers={{
                      dragend: (e) => {
                        const marker = e.target;
                        const position = marker.getLatLng();
                        handleInputChange("location", {
                          lat: position.lat,
                          lng: position.lng,
                        });
                      },
                    }}
                  />
                  <MapClickHandler
                    setPosition={(latlng) =>
                      handleInputChange("location", {
                        lat: latlng.lat,
                        lng: latlng.lng,
                      })
                    }
                  />
                </MapContainer>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="form-step">
            <h2 className="step-title">Lugares Cercanos</h2>
            <p className="step-subtitle">
              Haz clic en el mapa para agregar lugares de interés cercanos a tu
              propiedad
            </p>

            {/* Main Interactive Map */}
            <div className="main-nearby-map-section">
              <div className="map-instructions">
                <MapPin size={20} />
                <span>Haz clic en el mapa para agregar un lugar cercano</span>
              </div>
              <div className="main-nearby-map-container">
                <MapContainer
                  center={[formData.location.lat, formData.location.lng]}
                  zoom={14}
                  style={{
                    height: "400px",
                    width: "100%",
                    borderRadius: "12px",
                  }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                  {/* Property Location Marker */}
                  <Marker
                    position={[formData.location.lat, formData.location.lng]}
                    icon={L.divIcon({
                      className: 'custom-property-marker',
                      html: `
                        <div class="property-marker-pin">
                          <div class="property-marker-inner">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                            </svg>
                          </div>
                        </div>
                      `,
                      iconSize: [40, 48],
                      iconAnchor: [20, 48],
                      popupAnchor: [0, -48],
                    })}
                  />

                  {/* Nearby Places Markers with Numbers */}
                  {formData.nearbyPlaces.map(
                    (place, index) =>
                      place.location && (
                        <Marker
                          key={place.id}
                          position={[place.location.lat, place.location.lng]}
                          icon={L.divIcon({
                            className: 'custom-nearby-marker',
                            html: `
                              <div class="nearby-marker-pin">
                                <div class="nearby-marker-inner">
                                  <span class="nearby-marker-number">${index + 1}</span>
                                </div>
                              </div>
                            `,
                            iconSize: [36, 44],
                            iconAnchor: [18, 44],
                            popupAnchor: [0, -44],
                          })}
                        />
                      )
                  )}

                  {/* Map Click Handler to Add Nearby Place */}
                  <MapClickHandler
                    setPosition={(latlng) => {
                      const newPlace = {
                        id: Date.now(),
                        name: "",
                        type: "Hospital",
                        location: { lat: latlng.lat, lng: latlng.lng },
                      };
                      setFormData({
                        ...formData,
                        nearbyPlaces: [...formData.nearbyPlaces, newPlace],
                      });
                    }}
                  />
                </MapContainer>

                {/* Map Legend Overlay */}
                <div className="map-legend-overlay">
                  <div className="legend-badge">
                    <div className="legend-marker property"></div>
                    <span>Tu Propiedad</span>
                  </div>
                  <div className="legend-badge">
                    <div className="legend-marker nearby"></div>
                    <span>Lugares Cercanos</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Nearby Places List */}
            {formData.nearbyPlaces.length > 0 ? (
              <div className="nearby-places-list-section">
                <div className="list-header">
                  <h3 className="list-title">
                    Lugares Agregados ({formData.nearbyPlaces.length})
                  </h3>
                  <p className="list-description">
                    Completa la información de cada lugar
                  </p>
                </div>
                <div className="nearby-places-list">
                  {formData.nearbyPlaces.map((place, index) => (
                    <div key={place.id} className="nearby-place-list-item">
                      <div className="place-item-header">
                        <div className="place-number">{index + 1}</div>
                        <div className="place-item-content">
                          <input
                            type="text"
                            placeholder="Nombre del lugar (ej: Hospital San Juan de Dios)"
                            value={place.name}
                            onChange={(e) =>
                              handleUpdateNearbyPlace(
                                place.id,
                                "name",
                                e.target.value
                              )
                            }
                            className="place-item-name-input"
                          />
                          <select
                            value={place.type}
                            onChange={(e) =>
                              handleUpdateNearbyPlace(
                                place.id,
                                "type",
                                e.target.value
                              )
                            }
                            className="place-item-type-select"
                          >
                            {nearbyPlaceTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          className="remove-place-item-btn"
                          onClick={() => handleRemoveNearbyPlace(place.id)}
                          title="Eliminar lugar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      {place.location && (
                        <div className="place-location-info">
                          <MapPin size={14} />
                          <span>
                            Lat: {place.location.lat.toFixed(6)}, Lng:{" "}
                            {place.location.lng.toFixed(6)}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="empty-nearby-places">
                <MapPin size={48} />
                <p>No has agregado lugares cercanos aún</p>
                <span>Haz clic en el mapa para comenzar</span>
              </div>
            )}
          </div>
        );

      case 8:
        return (
          <div className="form-step">
            <h2 className="step-title">Disponibilidad de Visitas</h2>

            <div className="form-group">
              <label>Días Disponibles *</label>
              <div className="days-grid">
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    className={`day-btn ${
                      formData.availableDays.includes(day) ? "active" : ""
                    }`}
                    onClick={() => handleDayToggle(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Tipo de Visitas *</label>
              <div className="visit-types">
                <div className="visit-type-item">
                  <input
                    type="checkbox"
                    id="inPerson"
                    checked={formData.visitTypes.inPerson}
                    onChange={(e) =>
                      handleInputChange("visitTypes", {
                        ...formData.visitTypes,
                        inPerson: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="inPerson">Visitas Presenciales</label>
                </div>

                <div className="visit-type-item">
                  <input
                    type="checkbox"
                    id="virtual"
                    checked={formData.visitTypes.virtual}
                    onChange={(e) =>
                      handleInputChange("visitTypes", {
                        ...formData.visitTypes,
                        virtual: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="virtual">Visitas Virtuales</label>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Horarios Disponibles *</label>
              <div className="time-slots">
                <div className="time-slot-item">
                  <input
                    type="checkbox"
                    id="morning"
                    checked={formData.timeSlots.morning}
                    onChange={(e) =>
                      handleInputChange("timeSlots", {
                        ...formData.timeSlots,
                        morning: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="morning">
                    <div className="time-label">Mañana</div>
                    <div className="time-range">9:00 AM - 12:00 PM</div>
                  </label>
                </div>

                <div className="time-slot-item">
                  <input
                    type="checkbox"
                    id="afternoon"
                    checked={formData.timeSlots.afternoon}
                    onChange={(e) =>
                      handleInputChange("timeSlots", {
                        ...formData.timeSlots,
                        afternoon: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="afternoon">
                    <div className="time-label">Tarde</div>
                    <div className="time-range">2:00 PM - 6:00 PM</div>
                  </label>
                </div>

                <div className="time-slot-item">
                  <input
                    type="checkbox"
                    id="evening"
                    checked={formData.timeSlots.evening}
                    onChange={(e) =>
                      handleInputChange("timeSlots", {
                        ...formData.timeSlots,
                        evening: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="evening">
                    <div className="time-label">Noche</div>
                    <div className="time-range">6:00 PM - 8:00 PM</div>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Instrucciones Especiales (Opcional)</label>
              <textarea
                placeholder="Ej: Llamar 30 minutos antes de la visita..."
                value={formData.specialInstructions}
                onChange={(e) =>
                  handleInputChange("specialInstructions", e.target.value)
                }
                className="form-textarea"
                rows={3}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  const StepIcon = stepIcons[currentStep - 1];

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="create-property-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="create-property-modal-container"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="create-property-modal-header">
            <div className="create-property-modal-header-content">
              <div className="create-property-modal-step-icon-badge">
                <StepIcon size={20} />
              </div>
              <div>
                <h2 className="create-property-modal-title">
                  Vender Nueva Propiedad
                </h2>
                <p className="create-property-modal-subtitle">
                  Paso {currentStep} de {totalSteps}
                </p>
              </div>
            </div>
            <button
              className="create-property-modal-close-btn"
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="create-property-modal-progress-container">
            <div className="create-property-modal-progress-steps">
              {Array.from({ length: totalSteps }).map((_, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < currentStep;
                const isActive = stepNumber === currentStep;

                return (
                  <React.Fragment key={stepNumber}>
                    <div
                      className={`create-property-modal-progress-step ${
                        isActive ? "active" : ""
                      } ${isCompleted ? "completed" : ""}`}
                    >
                      <div className="create-property-modal-step-number">
                        {stepNumber}
                      </div>
                    </div>
                    {stepNumber < totalSteps && (
                      <div
                        className={`create-property-modal-progress-line ${
                          stepNumber < currentStep ? "completed" : ""
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          <div className="create-property-modal-body">
            {showSuccess ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="success-screen"
              >
                <div className="success-icon">
                  <Check size={64} />
                </div>
                <h2 className="success-title">¡Propiedad Publicada!</h2>
                <p className="success-message">
                  Tu propiedad ha sido publicada exitosamente y ya está visible para potenciales compradores.
                </p>
                <div className="success-details">
                  <div className="success-detail-item">
                    <Home size={20} />
                    <span>{formData.title}</span>
                  </div>
                  <div className="success-detail-item">
                    <MapPin size={20} />
                    <span>{formData.neighborhood}, {formData.address}</span>
                  </div>
                </div>
                <button className="success-close-btn" onClick={handleCloseSuccess}>
                  Cerrar
                </button>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait" custom={slideDirection}>
                <motion.div
                  key={currentStep}
                  custom={slideDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "tween", duration: 0.3 }}
                  className="step-content"
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Footer */}
          {!showSuccess && (
            <div className="modal-footer">
              <button
                className="footer-btn secondary"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                <ChevronLeft size={20} />
                Atrás
              </button>

              {currentStep < totalSteps ? (
                <button
                  className="footer-btn primary"
                  onClick={handleNext}
                  disabled={!validateStep(currentStep)}
                >
                  Siguiente
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  className="footer-btn success"
                  onClick={handleSubmit}
                  disabled={!validateStep(currentStep)}
                >
                  <Check size={20} />
                  Publicar Propiedad
                </button>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default CreatePropertyModal;
