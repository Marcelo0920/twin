import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Route as RouteIcon,
  Save,
  Undo,
  X,
  Play,
  Square,
  Home,
  Eye,
  Bed,
  Bath,
  Maximize,
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
  Marker,
  Polyline,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import MyPropertiesHeader from "../components/headers/MyPropertiesHeader";
import CitySearchModal from "../components/cuaderno/CitySearchModal";
import RoutesModal from "../components/cuaderno/RoutesModal";
import RouteNameModal from "../components/cuaderno/RouteNameModal";
import ConfirmModal from "../components/cuaderno/ConfirmModal";
import LocationPermissionModal from "../components/cuaderno/LocationPermissionModal";
import RouteMarkers from "../components/cuaderno/RouteMarkers";
import CreatePropertyModal from "../components/cuaderno/CreatePropertyModal";
import PropertyDetailModal from "../components/cuaderno/PropertyDetailModal";
import "leaflet/dist/leaflet.css";
import "./styles/cuaderno.css";

// Component to handle map center changes
const MapController = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, {
        duration: 1.5,
      });
    }
  }, [center, zoom, map]);

  return null;
};

// Component to handle map clicks for route creation
const MapClickHandler = ({ isCreatingRoute, onMapClick }) => {
  useMapEvents({
    click: (e) => {
      if (isCreatingRoute) {
        onMapClick(e.latlng);
      }
    },
  });
  return null;
};

const Cuaderno = () => {
  const [showCityModal, setShowCityModal] = useState(false);
  const [showRoutesModal, setShowRoutesModal] = useState(false);
  const [showRouteNameModal, setShowRouteNameModal] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showLocationPermission, setShowLocationPermission] = useState(false);
  const [showCreatePropertyModal, setShowCreatePropertyModal] = useState(false);
  const [showProperties, setShowProperties] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [currentCity, setCurrentCity] = useState("Santa Cruz, Bolivia");
  const [mapCenter, setMapCenter] = useState([-17.8146, -63.1561]);
  const [mapZoom, setMapZoom] = useState(13);

  // Mock properties data
  const [properties, setProperties] = useState([
    {
      id: 1,
      direccion: "Av. San Martin #123",
      zona: "Equipetrol",
      ciudad: "Santa Cruz",
      location: [-17.785, -63.182],
      precio: "450000",
      dormitorios: "4",
      banos: "3",
      terreno: "280",
      photos: [],
      operacion: "venta",
      origen: "propietario",
      tipoVivienda: "casa",
      condicion: "usado",
      tipoVia: "pavimento",
      construccion: "250",
      habitaciones: "5",
      garaje: "2",
      anoConstuccion: "2018",
      niveles: "2",
      moneda: "bs",
      franquicia: "",
      agente: "",
      telefonoRef: "",
      frenteTerreno: "12",
      codigoInterno: "CP-201125-01",
      ranking: "",
      tipoCambio: "",
      miOferta: "",
      valorMin: "",
      valorMax: "",
      descripcion:
        "Hermosa propiedad en zona residencial con excelentes acabados.",
    },
    {
      id: 2,
      direccion: "Calle Los Lirios #456",
      zona: "Urubó",
      ciudad: "Santa Cruz",
      location: [-17.759, -63.095],
      precio: "380000",
      dormitorios: "3",
      banos: "2",
      terreno: "250",
      photos: [],
      operacion: "venta",
      origen: "propietario",
      tipoVivienda: "casa",
      condicion: "nuevo",
      construccion: "200",
      habitaciones: "4",
      garaje: "2",
      anoConstuccion: "2023",
      niveles: "1",
      moneda: "bs",
      tipoVia: "pavimento",
      frenteTerreno: "10",
      franquicia: "",
      agente: "",
      telefonoRef: "",
      codigoInterno: "CP-201125-02",
      ranking: "",
      tipoCambio: "",
      miOferta: "",
      valorMin: "",
      valorMax: "",
      descripcion: "Casa nueva en condominio cerrado con áreas verdes.",
    },
    {
      id: 3,
      direccion: "Av. Beni #789",
      zona: "Norte",
      ciudad: "Santa Cruz",
      location: [-17.765, -63.175],
      precio: "320000",
      dormitorios: "3",
      banos: "2",
      terreno: "200",
      photos: [],
      operacion: "venta",
      tipoVivienda: "departamento",
      condicion: "usado",
      construccion: "180",
      habitaciones: "4",
      garaje: "1",
      moneda: "bs",
      origen: "inmobiliaria",
      tipoVia: "pavimento",
      frenteTerreno: "",
      franquicia: "RE/MAX",
      agente: "Juan Pérez",
      telefonoRef: "77123456",
      codigoInterno: "CP-201125-03",
      ranking: "",
      niveles: "",
      anoConstuccion: "",
      tipoCambio: "",
      miOferta: "",
      valorMin: "",
      valorMax: "",
      descripcion: "Departamento amplio con buena ubicación.",
    },
    {
      id: 4,
      direccion: "Calle Libertad #321",
      zona: "Centro",
      ciudad: "Santa Cruz",
      location: [-17.784, -63.182],
      precio: "280000",
      dormitorios: "2",
      banos: "2",
      terreno: "150",
      photos: [],
      operacion: "alquiler",
      tipoVivienda: "departamento",
      condicion: "usado",
      construccion: "120",
      habitaciones: "3",
      garaje: "1",
      moneda: "bs",
      origen: "inmobiliaria",
      tipoVia: "pavimento",
      frenteTerreno: "",
      franquicia: "",
      agente: "",
      telefonoRef: "",
      codigoInterno: "CP-201125-04",
      ranking: "",
      niveles: "",
      anoConstuccion: "",
      tipoCambio: "",
      miOferta: "",
      valorMin: "",
      valorMax: "",
      descripcion: "Departamento céntrico ideal para oficinas o vivienda.",
    },
    {
      id: 5,
      direccion: "Av. Cristo Redentor #654",
      zona: "Cristo Redentor",
      ciudad: "Santa Cruz",
      location: [-17.795, -63.162],
      precio: "520000",
      dormitorios: "5",
      banos: "4",
      terreno: "350",
      photos: [],
      operacion: "venta",
      tipoVivienda: "casa",
      condicion: "usado",
      construccion: "320",
      habitaciones: "7",
      garaje: "3",
      anoConstuccion: "2020",
      niveles: "2",
      moneda: "bs",
      origen: "propietario",
      tipoVia: "pavimento",
      frenteTerreno: "15",
      franquicia: "",
      agente: "",
      telefonoRef: "",
      codigoInterno: "CP-201125-05",
      ranking: "5",
      tipoCambio: "",
      miOferta: "500000",
      valorMin: "480000",
      valorMax: "550000",
      descripcion: "Casa de lujo con amplios espacios y acabados de primera.",
    },
    {
      id: 6,
      direccion: "Calle Monseñor Rivero #987",
      zona: "Las Palmas",
      ciudad: "Santa Cruz",
      location: [-17.77, -63.19],
      precio: "420000",
      dormitorios: "4",
      banos: "3",
      terreno: "300",
      photos: [],
      operacion: "venta",
      tipoVivienda: "casa",
      condicion: "usado",
      construccion: "270",
      habitaciones: "6",
      garaje: "2",
      anoConstuccion: "2019",
      niveles: "2",
      moneda: "bs",
      origen: "propietario",
      tipoVia: "pavimento",
      frenteTerreno: "14",
      franquicia: "",
      agente: "",
      telefonoRef: "",
      codigoInterno: "CP-201125-06",
      ranking: "",
      tipoCambio: "",
      miOferta: "",
      valorMin: "",
      valorMax: "",
      descripcion: "Propiedad familiar con jardín amplio y piscina.",
    },
  ]);

  // Route management
  const [routes, setRoutes] = useState([]);
  const [isCreatingRoute, setIsCreatingRoute] = useState(false);
  const [currentRouteMarkers, setCurrentRouteMarkers] = useState([]);

  // Navigation mode
  const [isNavigating, setIsNavigating] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [passedSegments, setPassedSegments] = useState([]);
  const [watchId, setWatchId] = useState(null);
  const [showPlayButton, setShowPlayButton] = useState(false);

  const handleCitySelect = (city) => {
    setCurrentCity(city.name);
    setShowCityModal(false);
    setMapCenter([city.lat, city.lng]);
    setMapZoom(13);
  };

  const handleStartCreatingRoute = () => {
    setShowRoutesModal(false);
    setIsCreatingRoute(true);
    setCurrentRouteMarkers([]);
    setShowPlayButton(false);
    setIsNavigating(false);
    setPassedSegments([]);
  };

  const handleMapClick = (latlng) => {
    if (isCreatingRoute) {
      setCurrentRouteMarkers((prev) => [
        ...prev,
        {
          id: Date.now(),
          position: [latlng.lat, latlng.lng],
          order: prev.length + 1,
        },
      ]);
    }
  };

  const handleMarkerDrag = (id, newPosition) => {
    setCurrentRouteMarkers((prev) =>
      prev.map((marker) =>
        marker.id === id ? { ...marker, position: newPosition } : marker
      )
    );
  };

  const handleSaveRoute = () => {
    if (currentRouteMarkers.length < 2) {
      alert("Necesitas al menos 2 puntos para crear una ruta");
      return;
    }

    setShowRouteNameModal(true);
  };

  const handleSaveRouteWithName = (routeName) => {
    const newRoute = {
      id: Date.now(),
      name: routeName,
      markers: currentRouteMarkers,
      createdAt: new Date().toISOString(),
    };

    setRoutes((prev) => [...prev, newRoute]);
    setIsCreatingRoute(false);
    setCurrentRouteMarkers([]);
    setShowRouteNameModal(false);
    setShowPlayButton(false);
  };

  const handleCancelRoute = () => {
    if (currentRouteMarkers.length > 0) {
      setShowCancelConfirm(true);
    } else {
      setIsCreatingRoute(false);
      setCurrentRouteMarkers([]);
    }
  };

  const handleConfirmCancel = () => {
    setIsCreatingRoute(false);
    setCurrentRouteMarkers([]);
    setShowCancelConfirm(false);
    setShowPlayButton(false);
  };

  const handleUndoLastMarker = () => {
    setCurrentRouteMarkers((prev) => prev.slice(0, -1));
  };

  const handleDeleteRoute = (routeId) => {
    setRoutes((prev) => prev.filter((route) => route.id !== routeId));
  };

  const handleLoadRoute = (route) => {
    setShowRoutesModal(false);
    setCurrentRouteMarkers(route.markers);
    setShowPlayButton(true);
    setIsNavigating(false);
    setPassedSegments([]);
    // Center map on first marker of the route
    if (route.markers.length > 0) {
      setMapCenter(route.markers[0].position);
      setMapZoom(13);
    }
  };

  const handleStartNavigation = () => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización");
      return;
    }

    // Check if we already have permission
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          startTracking();
        } else {
          setShowLocationPermission(true);
        }
      });
    } else {
      // Fallback for browsers that don't support permissions API
      setShowLocationPermission(true);
    }
  };

  const startTracking = () => {
    setIsNavigating(true);
    setShowLocationPermission(false);

    const id = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        setUserLocation(newLocation);
        updatePassedSegments(newLocation);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert(
          "No se pudo obtener tu ubicación. Por favor verifica los permisos."
        );
        handleStopNavigation();
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    setWatchId(id);
  };

  const handleStopNavigation = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setIsNavigating(false);
    setUserLocation(null);
    setPassedSegments([]);
  };

  const updatePassedSegments = (currentLocation) => {
    if (!currentRouteMarkers || currentRouteMarkers.length < 2) return;

    const segments = [];

    for (let i = 0; i < currentRouteMarkers.length - 1; i++) {
      const start = currentRouteMarkers[i].position;
      const end = currentRouteMarkers[i + 1].position;

      // Find closest point on segment to user location
      const closestPoint = getClosestPointOnSegment(
        currentLocation,
        start,
        end
      );
      const distanceToSegment = getDistance(currentLocation, closestPoint);

      // If user is close enough to this segment (within ~100 meters)
      if (distanceToSegment < 0.001) {
        // Calculate progress along this segment (0 to 1)
        const progress = getProgressAlongSegment(closestPoint, start, end);

        segments.push({
          index: i,
          progress: progress,
          closestPoint: closestPoint,
          isActive: true,
        });
      } else {
        // Check if this segment is before the active segment (fully passed)
        const distToEnd = getDistance(currentLocation, end);
        const segmentLength = getDistance(start, end);

        // If user is past this segment
        if (
          distToEnd < distanceToSegment &&
          i < currentRouteMarkers.length - 2
        ) {
          segments.push({
            index: i,
            progress: 1,
            closestPoint: end,
            isActive: false,
          });
        } else {
          segments.push({
            index: i,
            progress: 0,
            closestPoint: start,
            isActive: false,
          });
        }
      }
    }

    setPassedSegments(segments);
  };

  const getClosestPointOnSegment = (point, start, end) => {
    const [px, py] = point;
    const [sx, sy] = start;
    const [ex, ey] = end;

    const dx = ex - sx;
    const dy = ey - sy;

    if (dx === 0 && dy === 0) return start;

    const t = Math.max(
      0,
      Math.min(1, ((px - sx) * dx + (py - sy) * dy) / (dx * dx + dy * dy))
    );

    return [sx + t * dx, sy + t * dy];
  };

  const getProgressAlongSegment = (point, start, end) => {
    const totalDist = getDistance(start, end);
    if (totalDist === 0) return 0;

    const progressDist = getDistance(start, point);
    return Math.min(1, Math.max(0, progressDist / totalDist));
  };

  const getDistance = (point1, point2) => {
    return Math.sqrt(
      Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2)
    );
  };

  const handleCreateProperty = (propertyData) => {
    console.log("Nueva propiedad creada:", propertyData);
    // TODO: Implement property saving logic
    // This could involve sending data to a backend API or storing locally
  };

  const handleSaveProperty = (updatedProperty) => {
    setProperties((prev) =>
      prev.map((prop) =>
        prop.id === updatedProperty.id ? updatedProperty : prop
      )
    );
    console.log("Propiedad actualizada:", updatedProperty);
    // TODO: Implement property update logic for backend
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-BO", {
      style: "currency",
      currency: "BOB",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Create custom user location marker
  const createUserLocationIcon = () => {
    return L.divIcon({
      className: "user-location-marker",
      html: `<div class="user-location-dot"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  // Create custom property marker
  const createPropertyMarkerIcon = () => {
    return L.divIcon({
      className: "custom-property-marker-cuaderno",
      html: `
        <div class="cuaderno-property-marker">
          <div class="cuaderno-property-marker-circle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </div>
          <div class="cuaderno-property-marker-arrow"></div>
        </div>
      `,
      iconSize: [44, 52],
      iconAnchor: [22, 52],
      popupAnchor: [0, -52],
    });
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  return (
    <div className="cuaderno-page">
      <MyPropertiesHeader />

      <div
        className={`cuaderno-container ${
          isCreatingRoute ? "creating-route" : ""
        }`}
      >
        {/* City Badge Button */}
        <button
          className="city-badge-button"
          onClick={() => setShowCityModal(true)}
        >
          <MapPin size={16} />
          <span>{currentCity}</span>
        </button>

        {/* Top Left Badges */}
        {!isCreatingRoute ? (
          <div className="top-left-badges">
            <button
              className="routes-badge-button"
              onClick={() => setShowRoutesModal(true)}
            >
              <RouteIcon size={16} />
              <span>Rutas</span>
            </button>
            <button
              className="property-badge-button"
              onClick={() => setShowCreatePropertyModal(true)}
            >
              <Home size={16} />
              <span>Nueva propiedad</span>
            </button>
            <button
              className={`show-properties-badge-button ${
                showProperties ? "active" : ""
              }`}
              onClick={() => setShowProperties(!showProperties)}
              title={
                showProperties ? "Ocultar propiedades" : "Mostrar propiedades"
              }
            >
              <Eye size={16} />
              <span>Propiedades</span>
            </button>
          </div>
        ) : (
          <button className="save-route-button-top" onClick={handleSaveRoute}>
            <Save size={16} />
            <span>Guardar ruta</span>
          </button>
        )}

        {/* Cancel and Undo Buttons (Left Center) */}
        {isCreatingRoute && (
          <div className="route-control-buttons">
            <button
              className="undo-marker-button"
              onClick={handleUndoLastMarker}
              disabled={currentRouteMarkers.length === 0}
              title="Deshacer último punto"
            >
              <Undo size={20} />
            </button>
            <button
              className="cancel-route-button-side"
              onClick={handleCancelRoute}
              title="Cancelar ruta"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Play/Stop Navigation Button (Left Center) */}
        {showPlayButton && !isCreatingRoute && (
          <button
            className={`navigation-button ${isNavigating ? "active" : ""}`}
            onClick={
              isNavigating ? handleStopNavigation : handleStartNavigation
            }
            title={isNavigating ? "Detener navegación" : "Iniciar navegación"}
          >
            {isNavigating ? <Square size={20} /> : <Play size={20} />}
          </button>
        )}

        {/* Map Container */}
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: "100%", width: "100%" }}
          className="cuaderno-map"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapController center={mapCenter} zoom={mapZoom} />
          <MapClickHandler
            isCreatingRoute={isCreatingRoute}
            onMapClick={handleMapClick}
          />

          {/* Route Markers - Hide during navigation */}
          {currentRouteMarkers.length > 0 && !isNavigating && (
            <RouteMarkers
              markers={currentRouteMarkers}
              onMarkerDrag={handleMarkerDrag}
              isEditable={isCreatingRoute}
            />
          )}

          {/* Route Polylines during navigation */}
          {isNavigating && currentRouteMarkers.length > 1 && (
            <>
              {currentRouteMarkers.map((marker, index) => {
                if (index === currentRouteMarkers.length - 1) return null;

                const start = marker.position;
                const end = currentRouteMarkers[index + 1].position;

                // Find segment info
                const segmentInfo = passedSegments.find(
                  (s) => s.index === index
                );
                const progress = segmentInfo?.progress || 0;

                if (progress > 0 && progress < 1 && segmentInfo?.isActive) {
                  // Split segment: passed portion (light orange) and remaining portion (orange)
                  const splitPoint = segmentInfo.closestPoint;

                  return (
                    <React.Fragment key={`segment-${index}`}>
                      {/* Passed portion */}
                      <Polyline
                        positions={[start, splitPoint]}
                        color="#ffa64d"
                        weight={4}
                        opacity={0.7}
                      />
                      {/* Remaining portion */}
                      <Polyline
                        positions={[splitPoint, end]}
                        color="#ff9017"
                        weight={4}
                        opacity={0.9}
                      />
                    </React.Fragment>
                  );
                } else if (progress >= 1) {
                  // Fully passed
                  return (
                    <Polyline
                      key={`segment-${index}`}
                      positions={[start, end]}
                      color="#ffa64d"
                      weight={4}
                      opacity={0.7}
                    />
                  );
                } else {
                  // Not yet reached
                  return (
                    <Polyline
                      key={`segment-${index}`}
                      positions={[start, end]}
                      color="#ff9017"
                      weight={4}
                      opacity={0.9}
                    />
                  );
                }
              })}
            </>
          )}

          {/* User Location Marker */}
          {isNavigating && userLocation && (
            <Marker position={userLocation} icon={createUserLocationIcon()} />
          )}

          {/* Property Markers */}
          {showProperties &&
            !isNavigating &&
            properties.map((property) => (
              <Marker
                key={property.id}
                position={property.location}
                icon={createPropertyMarkerIcon()}
                eventHandlers={{
                  click: () => setSelectedProperty(property),
                }}
              >
                <Tooltip
                  direction="top"
                  offset={[0, -55]}
                  opacity={1}
                  className="property-marker-tooltip"
                >
                  <div className="tooltip-content">
                    <div className="tooltip-price">
                      {formatPrice(property.precio)}
                    </div>
                    <div className="tooltip-address">{property.direccion}</div>
                    <div className="tooltip-location">
                      {property.zona}, {property.ciudad}
                    </div>
                    <div className="tooltip-features">
                      <div className="tooltip-feature">
                        <Bed size={14} />
                        <span>{property.dormitorios}</span>
                      </div>
                      <div className="tooltip-feature">
                        <Bath size={14} />
                        <span>{property.banos}</span>
                      </div>
                      <div className="tooltip-feature">
                        <Maximize size={14} />
                        <span>{property.terreno} m²</span>
                      </div>
                    </div>
                  </div>
                </Tooltip>
              </Marker>
            ))}
        </MapContainer>
      </div>

      {/* City Search Modal */}
      {showCityModal && (
        <CitySearchModal
          onClose={() => setShowCityModal(false)}
          onSelectCity={handleCitySelect}
          currentCity={currentCity}
        />
      )}

      {/* Routes Modal */}
      {showRoutesModal && (
        <RoutesModal
          routes={routes}
          onClose={() => setShowRoutesModal(false)}
          onCreateRoute={handleStartCreatingRoute}
          onDeleteRoute={handleDeleteRoute}
          onLoadRoute={handleLoadRoute}
        />
      )}

      {/* Route Name Modal */}
      {showRouteNameModal && (
        <RouteNameModal
          onSave={handleSaveRouteWithName}
          onCancel={() => setShowRouteNameModal(false)}
          defaultName={`Ruta ${routes.length + 1}`}
        />
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <ConfirmModal
          title="¿Cancelar ruta?"
          message="Se perderán todos los puntos marcados. Esta acción no se puede deshacer."
          onConfirm={handleConfirmCancel}
          onCancel={() => setShowCancelConfirm(false)}
        />
      )}

      {/* Location Permission Modal */}
      {showLocationPermission && (
        <LocationPermissionModal
          onAllow={startTracking}
          onDeny={() => setShowLocationPermission(false)}
        />
      )}

      {/* Create Property Modal */}
      {showCreatePropertyModal && (
        <CreatePropertyModal
          onClose={() => setShowCreatePropertyModal(false)}
          onSubmit={handleCreateProperty}
        />
      )}

      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onSave={handleSaveProperty}
        />
      )}
    </div>
  );
};

export default Cuaderno;
