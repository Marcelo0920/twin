import React, { useState, useRef, useEffect } from "react";
import { X, Save } from "lucide-react";
import "./styles/routeNameModal.css";

const RouteNameModal = ({ onSave, onCancel, defaultName }) => {
  const [routeName, setRouteName] = useState(defaultName || "");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (routeName.trim()) {
      onSave(routeName.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <div className="route-name-modal-overlay">
      <div className="route-name-modal" onKeyDown={handleKeyDown}>
        <div className="route-name-modal-header">
          <h2 className="route-name-modal-title">Guardar Ruta</h2>
          <button className="route-name-modal-close" onClick={onCancel}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="route-name-modal-content">
            <label htmlFor="route-name" className="route-name-label">
              Nombre de la ruta
            </label>
            <input
              ref={inputRef}
              id="route-name"
              type="text"
              className="route-name-input"
              placeholder="Ej: Ruta al centro"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              maxLength={50}
            />
          </div>

          <div className="route-name-modal-footer">
            <button
              type="button"
              className="route-name-cancel-btn"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="route-name-save-btn"
              disabled={!routeName.trim()}
            >
              <Save size={18} />
              <span>Guardar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RouteNameModal;
