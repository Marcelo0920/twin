import React from "react";
import { MapPin, Building, Map } from "lucide-react";
import "./addressStep.css";

const AddressStep = ({ direccion, ciudad, zona, onChange }) => {
  return (
    <div className="address-step">
      <p className="step-description">
        Completa la información de dirección de la propiedad
      </p>

      <div className="address-form">
        <div className="form-group">
          <label htmlFor="direccion">
            <MapPin size={18} />
            <span>Dirección</span>
          </label>
          <input
            id="direccion"
            type="text"
            placeholder="Ej: Av. San Martin #123"
            value={direccion}
            onChange={(e) => onChange("direccion", e.target.value)}
            className="address-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="ciudad">
            <Building size={18} />
            <span>Ciudad</span>
          </label>
          <input
            id="ciudad"
            type="text"
            placeholder="Ej: Santa Cruz"
            value={ciudad}
            onChange={(e) => onChange("ciudad", e.target.value)}
            className="address-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="zona">
            <Map size={18} />
            <span>Zona</span>
          </label>
          <input
            id="zona"
            type="text"
            placeholder="Ej: Equipetrol"
            value={zona}
            onChange={(e) => onChange("zona", e.target.value)}
            className="address-input"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressStep;
