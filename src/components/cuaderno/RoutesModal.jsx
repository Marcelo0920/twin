import React from "react";
import { X, Plus, Trash2, Map } from "lucide-react";
import "./styles/routesModal.css";

const RoutesModal = ({
  routes,
  onClose,
  onCreateRoute,
  onDeleteRoute,
  onLoadRoute,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="routes-modal-overlay">
      <div className="routes-modal" onKeyDown={handleKeyDown}>
        <div className="routes-modal-header">
          <h2 className="routes-modal-title">Mis Rutas</h2>
          <button className="routes-modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="routes-modal-content">
          {routes.length === 0 ? (
            <div className="no-routes">
              <Map size={48} className="no-routes-icon" />
              <p className="no-routes-text">No tienes rutas guardadas</p>
              <p className="no-routes-subtext">
                Crea tu primera ruta para comenzar
              </p>
            </div>
          ) : (
            <div className="routes-list">
              {routes.map((route) => (
                <div key={route.id} className="route-item">
                  <div className="route-item-content">
                    <div className="route-item-icon">
                      <Map size={20} />
                    </div>
                    <div className="route-item-info">
                      <h3 className="route-item-name">{route.name}</h3>
                      <p className="route-item-details">
                        {route.markers.length} puntos
                      </p>
                    </div>
                  </div>
                  <div className="route-item-actions">
                    <button
                      className="route-item-load-btn"
                      onClick={() => onLoadRoute(route)}
                      title="Ver ruta"
                    >
                      Ver
                    </button>
                    <button
                      className="route-item-delete-btn"
                      onClick={() => onDeleteRoute(route.id)}
                      title="Eliminar ruta"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="routes-modal-footer">
          <button className="create-route-btn" onClick={onCreateRoute}>
            <Plus size={20} />
            <span>Crear Nueva Ruta</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoutesModal;
