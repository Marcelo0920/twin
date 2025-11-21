import React, { useState } from "react";
import { X, ChevronRight, ChevronLeft, Check, MapPin, Home } from "lucide-react";
import LocationStep from "./propertySteps/LocationStep";
import AddressStep from "./propertySteps/AddressStep";
import PhotoStep from "./propertySteps/PhotoStep";
import DetailsStep from "./propertySteps/DetailsStep";
import ProgressIndicator from "../common/ProgressIndicator";
import "./styles/createPropertyModal.css";

const CreatePropertyModal = ({ onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Location
    location: null,
    // Step 2: Address
    direccion: "",
    ciudad: "",
    zona: "",
    // Step 3: Photos
    photos: [],
    // Step 4: Details
    operacion: "venta",
    origen: "propietario",
    franquicia: "",
    agente: "",
    telefonoRef: "",
    tipoVivienda: "casa",
    condicion: "usado",
    tipoVia: "pavimento",
    frenteTerreno: "",
    codigoInterno: "",
    ranking: "",
    niveles: "",
    anoConstuccion: "",
    terreno: "",
    construccion: "",
    habitaciones: "",
    dormitorios: "",
    banos: "",
    garaje: "",
    precio: "",
    moneda: "bs",
    tipoCambio: "",
    miOferta: "",
    valorMin: "",
    valorMax: "",
    descripcion: "",
  });

  const totalSteps = 4;

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
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

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.location !== null;
      case 2:
        return formData.direccion && formData.ciudad && formData.zona;
      case 3:
        return formData.photos.length > 0;
      case 4:
        return true; // No validation required for step 4
      default:
        return true;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Ubicación de la Propiedad";
      case 2:
        return "Dirección";
      case 3:
        return "Fotografías";
      case 4:
        return "Detalles de la Propiedad";
      default:
        return "";
    }
  };

  return (
    <div className="new-property-map-modal create-property-modal-overlay">
      <div className="create-property-modal">
        {/* Header */}
        <div className="create-property-modal-header">
          <h2 className="modal-title">Nueva Propiedad</h2>
          <button className="modal-close-btn" onClick={showSuccess ? handleCloseSuccess : onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Progress Indicator */}
        {!showSuccess && (
          <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
        )}

        {/* Step Content */}
        <div className="step-content">
          {showSuccess ? (
            <div className="success-screen">
              <div className="success-icon">
                <Check size={64} />
              </div>
              <h2 className="success-title">¡Propiedad Creada!</h2>
              <p className="success-message">
                Tu propiedad ha sido agregada exitosamente al cuaderno.
              </p>
              <div className="success-details">
                <div className="success-detail-item">
                  <MapPin size={20} />
                  <span>{formData.zona}, {formData.ciudad}</span>
                </div>
                <div className="success-detail-item">
                  <Home size={20} />
                  <span>{formData.direccion}</span>
                </div>
              </div>
              <button className="success-close-btn" onClick={handleCloseSuccess}>
                Cerrar
              </button>
            </div>
          ) : (
            <>
              {currentStep === 1 && (
                <LocationStep
                  location={formData.location}
                  onLocationChange={(loc) => updateFormData("location", loc)}
                />
              )}
              {currentStep === 2 && (
                <AddressStep
                  direccion={formData.direccion}
                  ciudad={formData.ciudad}
                  zona={formData.zona}
                  onChange={updateFormData}
                />
              )}
              {currentStep === 3 && (
                <PhotoStep
                  photos={formData.photos}
                  onPhotosChange={(photos) => updateFormData("photos", photos)}
                />
              )}
              {currentStep === 4 && (
                <DetailsStep formData={formData} onChange={updateFormData} />
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!showSuccess && (
          <div className="create-property-modal-footer">
            {currentStep > 1 && (
              <button className="back-btn" onClick={handleBack}>
                <ChevronLeft size={20} />
                <span>Atrás</span>
              </button>
            )}

            {currentStep < totalSteps ? (
              <button
                className="next-btn"
                onClick={handleNext}
                disabled={!canProceed()}
              >
                <span>Siguiente</span>
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={!canProceed()}
              >
                <Check size={20} />
                <span>Crear Propiedad</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePropertyModal;
