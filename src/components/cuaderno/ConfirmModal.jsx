import React from "react";
import { AlertTriangle, X } from "lucide-react";
import "./styles/confirmModal.css";

const ConfirmModal = ({ title, message, onConfirm, onCancel }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onCancel();
    } else if (e.key === "Enter") {
      onConfirm();
    }
  };

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal" onKeyDown={handleKeyDown}>
        <div className="confirm-modal-header">
          <div className="confirm-modal-icon">
            <AlertTriangle size={24} />
          </div>
          <button className="confirm-modal-close" onClick={onCancel}>
            <X size={20} />
          </button>
        </div>

        <div className="confirm-modal-content">
          <h2 className="confirm-modal-title">{title}</h2>
          <p className="confirm-modal-message">{message}</p>
        </div>

        <div className="confirm-modal-footer">
          <button className="confirm-modal-cancel-btn" onClick={onCancel}>
            Cancelar
          </button>
          <button className="confirm-modal-confirm-btn" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
