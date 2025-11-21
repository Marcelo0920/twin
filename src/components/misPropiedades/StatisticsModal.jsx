import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Heart,
  Share2,
  Calendar,
  Users,
  Video,
  Image,
  Phone,
  MessageCircle,
  GitCompare,
  Clock,
  TrendingUp,
  TrendingDown,
  MousePointerClick,
  MapPinned,
  Smartphone,
  Monitor,
  Target,
  BarChart3,
  X,
  CheckCircle,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { FaDollarSign } from "react-icons/fa";
import "./styles/statisticsModal.css";

// Tooltip Component with Portal
const StatTooltip = ({ text, children }) => {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const iconRef = useRef(null);

  useEffect(() => {
    if (show && iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 8, // 8px above the icon
        left: rect.left + rect.width / 2, // Center horizontally
      });
    }
  }, [show]);

  return (
    <div className="stat-tooltip-wrapper">
      {children}
      <button
        ref={iconRef}
        className="stat-help-icon"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <HelpCircle size={14} />
      </button>
      {show &&
        createPortal(
          <div
            className="stat-tooltip-bubble"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {text}
            <div className="stat-tooltip-arrow"></div>
          </div>,
          document.body
        )}
    </div>
  );
};

const StatisticsModal = ({ property, onClose }) => {
  const stats = property.statistics;

  // Calculate engagement rate
  const engagementRate = ((stats.likes + stats.shares) / stats.views * 100).toFixed(1);

  // Calculate visit conversion rate
  const visitConversionRate = ((stats.scheduledVisits / stats.uniqueVisitors) * 100).toFixed(1);

  // Determine performance status
  const getPerformanceStatus = (rate) => {
    if (rate >= 75) return { label: "Excelente", color: "success", icon: TrendingUp };
    if (rate >= 50) return { label: "Bueno", color: "good", icon: TrendingUp };
    if (rate >= 25) return { label: "Regular", color: "warning", icon: AlertCircle };
    return { label: "Necesita Atención", color: "danger", icon: TrendingDown };
  };

  const performanceStatus = getPerformanceStatus(stats.conversionRate);
  const PerformanceIcon = performanceStatus.icon;

  // Tooltip descriptions
  const tooltips = {
    views: "Número total de veces que los usuarios han visto tu propiedad en la plataforma.",
    uniqueVisitors: "Cantidad de usuarios únicos que visitaron tu propiedad (sin contar visitas repetidas).",
    likes: "Cantidad de usuarios que marcaron tu propiedad como favorita o le dieron 'me gusta'.",
    scheduledVisits: "Número de visitas agendadas por potenciales compradores para ver tu propiedad.",
    conversionRate: "Porcentaje de visitantes que realizaron una acción deseada (contacto, visita agendada, etc.).",
    shares: "Número de veces que los usuarios compartieron tu propiedad con otros.",
    clickThroughRate: "Porcentaje de usuarios que hicieron clic en tu propiedad después de verla en los resultados.",
    virtualTours: "Cantidad de veces que los usuarios realizaron un tour virtual de tu propiedad.",
    photoGalleryViews: "Número de veces que los usuarios vieron las fotos de tu propiedad en la galería.",
    videoViews: "Cantidad de reproducciones de los videos de tu propiedad.",
    completedVisits: "Número de visitas programadas que se llevaron a cabo efectivamente.",
    whatsappClicks: "Cantidad de veces que los usuarios hicieron clic para contactarte por WhatsApp.",
    phoneCalls: "Número de llamadas telefónicas recibidas desde el anuncio de tu propiedad.",
    daysOnMarket: "Cantidad de días que tu propiedad ha estado publicada en el mercado.",
    responseRate: "Porcentaje de consultas a las que respondiste dentro del tiempo recomendado.",
    responseTime: "Tiempo promedio que tardas en responder a las consultas de los interesados.",
    mobileViews: "Cantidad de usuarios que vieron tu propiedad desde dispositivos móviles (smartphones, tablets).",
    desktopViews: "Cantidad de usuarios que vieron tu propiedad desde computadoras de escritorio.",
    topLocations: "Ciudades o regiones desde donde más usuarios están viendo tu propiedad.",
    averageTimeOnPage: "Tiempo promedio que los usuarios pasan viendo los detalles de tu propiedad.",
    bounceRate: "Porcentaje de usuarios que salieron inmediatamente sin interactuar con tu propiedad.",
    addedToComparisons: "Veces que los usuarios agregaron tu propiedad para compararla con otras opciones.",
    rankingInSearch: "Posición de tu propiedad en los resultados de búsqueda (1 = primera posición).",
    similarPropertiesCompared: "Número de propiedades similares con las que tu anuncio ha sido comparado.",
    pricePosition: "Clasificación del precio de tu propiedad comparado con propiedades similares (Competitivo, Por encima del promedio, etc.).",
  };

  return (
    <AnimatePresence>
      <motion.div
        className="stats-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="stats-modal-container"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="stats-modal-header">
            <div className="stats-header-content">
              <div className="stats-header-badge">
                <BarChart3 size={20} />
              </div>
              <div>
                <h2 className="stats-modal-title">Panel de Estadísticas</h2>
                <p className="stats-modal-subtitle">{property.name}</p>
              </div>
            </div>
            <button className="stats-modal-close" onClick={onClose}>
              <X size={22} />
            </button>
          </div>

          {/* Body */}
          <div className="stats-modal-body">
            {/* Key Performance Indicators */}
            <div className="stats-kpi-grid">
              <div className="stats-kpi-card primary">
                <div className="stats-kpi-header">
                  <Eye className="stats-kpi-icon" />
                  <span className="stats-kpi-trend positive">
                    <TrendingUp size={16} />
                    +12%
                  </span>
                </div>
                <div className="stats-kpi-value">{stats.views.toLocaleString()}</div>
                <StatTooltip text={tooltips.views}>
                  <div className="stats-kpi-label">Vistas Totales</div>
                </StatTooltip>
                <div className="stats-kpi-footer">
                  <span className="stats-kpi-subtext">{stats.uniqueVisitors.toLocaleString()} únicos</span>
                </div>
              </div>

              <div className="stats-kpi-card success">
                <div className="stats-kpi-header">
                  <Heart className="stats-kpi-icon" />
                  <span className="stats-kpi-trend positive">
                    <TrendingUp size={16} />
                    +8%
                  </span>
                </div>
                <div className="stats-kpi-value">{stats.likes}</div>
                <StatTooltip text={tooltips.likes}>
                  <div className="stats-kpi-label">Me Gusta</div>
                </StatTooltip>
                <div className="stats-kpi-footer">
                  <span className="stats-kpi-subtext">{engagementRate}% engagement</span>
                </div>
              </div>

              <div className="stats-kpi-card warning">
                <div className="stats-kpi-header">
                  <Calendar className="stats-kpi-icon" />
                  <span className="stats-kpi-trend positive">
                    <TrendingUp size={16} />
                    +5%
                  </span>
                </div>
                <div className="stats-kpi-value">{stats.scheduledVisits}</div>
                <StatTooltip text={tooltips.scheduledVisits}>
                  <div className="stats-kpi-label">Visitas Agendadas</div>
                </StatTooltip>
                <div className="stats-kpi-footer">
                  <span className="stats-kpi-subtext">{stats.completedVisits} completadas</span>
                </div>
              </div>

              <div className="stats-kpi-card info">
                <div className="stats-kpi-header">
                  <Target className="stats-kpi-icon" />
                  <PerformanceIcon size={16} className={`stats-performance-icon ${performanceStatus.color}`} />
                </div>
                <div className="stats-kpi-value">{stats.conversionRate}%</div>
                <StatTooltip text={tooltips.conversionRate}>
                  <div className="stats-kpi-label">Tasa de Conversión</div>
                </StatTooltip>
                <div className="stats-kpi-footer">
                  <span className={`stats-performance-badge ${performanceStatus.color}`}>
                    {performanceStatus.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="stats-content-grid">
              {/* Left Column */}
              <div className="stats-column">
                {/* Engagement Section */}
                <div className="stats-card">
                  <div className="stats-card-header">
                    <h3 className="stats-card-title">
                      <Users size={18} />
                      Alcance y Engagement
                    </h3>
                  </div>
                  <div className="stats-card-body">
                    <div className="stats-metric-row">
                      <div className="stats-metric-icon purple">
                        <Eye size={20} />
                      </div>
                      <div className="stats-metric-content">
                        <div className="stats-metric-main">
                          <span className="stats-metric-value">{stats.views.toLocaleString()}</span>
                          <StatTooltip text={tooltips.views}>
                            <span className="stats-metric-label">Vistas Totales</span>
                          </StatTooltip>
                        </div>
                        <div className="stats-progress-bar">
                          <div className="stats-progress-fill purple" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="stats-metric-row">
                      <div className="stats-metric-icon orange">
                        <Users size={20} />
                      </div>
                      <div className="stats-metric-content">
                        <div className="stats-metric-main">
                          <span className="stats-metric-value">{stats.uniqueVisitors.toLocaleString()}</span>
                          <StatTooltip text={tooltips.uniqueVisitors}>
                            <span className="stats-metric-label">Visitantes Únicos</span>
                          </StatTooltip>
                        </div>
                        <div className="stats-progress-bar">
                          <div className="stats-progress-fill orange" style={{ width: `${(stats.uniqueVisitors / stats.views * 100)}%` }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="stats-metric-row">
                      <div className="stats-metric-icon purple">
                        <Heart size={20} />
                      </div>
                      <div className="stats-metric-content">
                        <div className="stats-metric-main">
                          <span className="stats-metric-value">{stats.likes}</span>
                          <StatTooltip text={tooltips.likes}>
                            <span className="stats-metric-label">Me Gusta</span>
                          </StatTooltip>
                        </div>
                        <div className="stats-progress-bar">
                          <div className="stats-progress-fill purple" style={{ width: `${(stats.likes / stats.views * 100 * 10)}%` }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="stats-metric-row">
                      <div className="stats-metric-icon orange">
                        <Share2 size={20} />
                      </div>
                      <div className="stats-metric-content">
                        <div className="stats-metric-main">
                          <span className="stats-metric-value">{stats.shares}</span>
                          <StatTooltip text={tooltips.shares}>
                            <span className="stats-metric-label">Compartidos</span>
                          </StatTooltip>
                        </div>
                        <div className="stats-progress-bar">
                          <div className="stats-progress-fill orange" style={{ width: `${(stats.shares / stats.views * 100 * 10)}%` }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="stats-metric-row">
                      <div className="stats-metric-icon purple">
                        <MousePointerClick size={20} />
                      </div>
                      <div className="stats-metric-content">
                        <div className="stats-metric-main">
                          <span className="stats-metric-value">{stats.clickThroughRate}%</span>
                          <StatTooltip text={tooltips.clickThroughRate}>
                            <span className="stats-metric-label">Click-Through Rate</span>
                          </StatTooltip>
                        </div>
                        <div className="stats-progress-bar">
                          <div className="stats-progress-fill purple" style={{ width: `${stats.clickThroughRate}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interaction Section */}
                <div className="stats-card">
                  <div className="stats-card-header">
                    <h3 className="stats-card-title">
                      <Video size={18} />
                      Interacciones de Contenido
                    </h3>
                  </div>
                  <div className="stats-card-body stats-grid-2">
                    <div className="stats-mini-card orange">
                      <Video className="stats-mini-icon" size={24} />
                      <div className="stats-mini-value">{stats.virtualTours}</div>
                      <StatTooltip text={tooltips.virtualTours}>
                        <div className="stats-mini-label">Tours Virtuales</div>
                      </StatTooltip>
                    </div>

                    <div className="stats-mini-card purple">
                      <Image className="stats-mini-icon" size={24} />
                      <div className="stats-mini-value">{stats.photoGalleryViews}</div>
                      <StatTooltip text={tooltips.photoGalleryViews}>
                        <div className="stats-mini-label">Vistas de Galería</div>
                      </StatTooltip>
                    </div>

                    <div className="stats-mini-card orange">
                      <Video className="stats-mini-icon" size={24} />
                      <div className="stats-mini-value">{stats.videoViews}</div>
                      <StatTooltip text={tooltips.videoViews}>
                        <div className="stats-mini-label">Vistas de Video</div>
                      </StatTooltip>
                    </div>

                    <div className="stats-mini-card purple">
                      <Calendar className="stats-mini-icon" size={24} />
                      <div className="stats-mini-value">{stats.completedVisits}</div>
                      <StatTooltip text={tooltips.completedVisits}>
                        <div className="stats-mini-label">Visitas Realizadas</div>
                      </StatTooltip>
                    </div>
                  </div>
                </div>

                {/* Contact Metrics */}
                <div className="stats-card">
                  <div className="stats-card-header">
                    <h3 className="stats-card-title">
                      <MessageCircle size={18} />
                      Contactos y Comunicación
                    </h3>
                  </div>
                  <div className="stats-card-body stats-grid-2">
                    <div className="stats-mini-card purple">
                      <MessageCircle className="stats-mini-icon" size={24} />
                      <div className="stats-mini-value">{stats.whatsappClicks}</div>
                      <StatTooltip text={tooltips.whatsappClicks}>
                        <div className="stats-mini-label">Clicks WhatsApp</div>
                      </StatTooltip>
                    </div>

                    <div className="stats-mini-card orange">
                      <Phone className="stats-mini-icon" size={24} />
                      <div className="stats-mini-value">{stats.phoneCalls}</div>
                      <StatTooltip text={tooltips.phoneCalls}>
                        <div className="stats-mini-label">Llamadas</div>
                      </StatTooltip>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="stats-column">
                {/* Performance Metrics */}
                <div className="stats-card">
                  <div className="stats-card-header">
                    <h3 className="stats-card-title">
                      <Target size={18} />
                      Rendimiento de Marketing
                    </h3>
                  </div>
                  <div className="stats-card-body">
                    <div className="stats-metric-row">
                      <div className="stats-metric-icon orange">
                        <Calendar size={20} />
                      </div>
                      <div className="stats-metric-content">
                        <div className="stats-metric-main">
                          <span className="stats-metric-value">{stats.daysOnMarket}</span>
                          <StatTooltip text={tooltips.daysOnMarket}>
                            <span className="stats-metric-label">Días en Mercado</span>
                          </StatTooltip>
                        </div>
                      </div>
                    </div>

                    <div className="stats-metric-row">
                      <div className="stats-metric-icon purple">
                        <BarChart3 size={20} />
                      </div>
                      <div className="stats-metric-content">
                        <div className="stats-metric-main">
                          <span className="stats-metric-value">{stats.responseRate}%</span>
                          <StatTooltip text={tooltips.responseRate}>
                            <span className="stats-metric-label">Tasa de Respuesta</span>
                          </StatTooltip>
                        </div>
                        <div className="stats-progress-bar">
                          <div className="stats-progress-fill purple" style={{ width: `${stats.responseRate}%` }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="stats-metric-row">
                      <div className="stats-metric-icon orange">
                        <Clock size={20} />
                      </div>
                      <div className="stats-metric-content">
                        <div className="stats-metric-main">
                          <span className="stats-metric-value">{stats.responseTime}h</span>
                          <StatTooltip text={tooltips.responseTime}>
                            <span className="stats-metric-label">Tiempo de Respuesta</span>
                          </StatTooltip>
                        </div>
                      </div>
                    </div>

                    <div className="stats-metric-row">
                      <div className="stats-metric-icon purple">
                        <Target size={20} />
                      </div>
                      <div className="stats-metric-content">
                        <div className="stats-metric-main">
                          <span className="stats-metric-value">{stats.conversionRate}%</span>
                          <StatTooltip text={tooltips.conversionRate}>
                            <span className="stats-metric-label">Tasa de Conversión</span>
                          </StatTooltip>
                        </div>
                        <div className="stats-progress-bar">
                          <div className="stats-progress-fill purple" style={{ width: `${stats.conversionRate}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audience Analytics */}
                <div className="stats-card">
                  <div className="stats-card-header">
                    <h3 className="stats-card-title">
                      <Smartphone size={18} />
                      Análisis de Audiencia
                    </h3>
                  </div>
                  <div className="stats-card-body">
                    <div className="stats-device-breakdown">
                      <div className="stats-device-item">
                        <div className="stats-device-header">
                          <Smartphone size={18} className="stats-device-icon mobile" />
                          <StatTooltip text={tooltips.mobileViews}>
                            <span>Móvil</span>
                          </StatTooltip>
                        </div>
                        <div className="stats-device-bar">
                          <div
                            className="stats-device-fill mobile"
                            style={{ width: `${(stats.mobileViews / (stats.mobileViews + stats.desktopViews) * 100)}%` }}
                          >
                            <span className="stats-device-percentage">
                              {((stats.mobileViews / (stats.mobileViews + stats.desktopViews) * 100)).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                        <div className="stats-device-count">{stats.mobileViews.toLocaleString()} vistas</div>
                      </div>

                      <div className="stats-device-item">
                        <div className="stats-device-header">
                          <Monitor size={18} className="stats-device-icon desktop" />
                          <StatTooltip text={tooltips.desktopViews}>
                            <span>Desktop</span>
                          </StatTooltip>
                        </div>
                        <div className="stats-device-bar">
                          <div
                            className="stats-device-fill desktop"
                            style={{ width: `${(stats.desktopViews / (stats.mobileViews + stats.desktopViews) * 100)}%` }}
                          >
                            <span className="stats-device-percentage">
                              {((stats.desktopViews / (stats.mobileViews + stats.desktopViews) * 100)).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                        <div className="stats-device-count">{stats.desktopViews.toLocaleString()} vistas</div>
                      </div>
                    </div>

                    <div className="stats-divider"></div>

                    <div className="stats-location-section">
                      <div className="stats-location-header">
                        <MapPinned size={16} />
                        <StatTooltip text={tooltips.topLocations}>
                          <span>Principales Ubicaciones</span>
                        </StatTooltip>
                      </div>
                      <div className="stats-location-tags">
                        {stats.topLocations.map((location, index) => (
                          <span key={index} className="stats-location-tag">
                            {location}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Behavioral Metrics */}
                <div className="stats-card">
                  <div className="stats-card-header">
                    <h3 className="stats-card-title">
                      <Clock size={18} />
                      Métricas de Comportamiento
                    </h3>
                  </div>
                  <div className="stats-card-body stats-grid-2">
                    <div className="stats-mini-card purple">
                      <Clock className="stats-mini-icon" size={24} />
                      <div className="stats-mini-value">
                        {Math.floor(stats.averageTimeOnPage / 60)}:{(stats.averageTimeOnPage % 60).toString().padStart(2, '0')}
                      </div>
                      <StatTooltip text={tooltips.averageTimeOnPage}>
                        <div className="stats-mini-label">Tiempo Promedio</div>
                      </StatTooltip>
                    </div>

                    <div className="stats-mini-card orange">
                      <TrendingDown className="stats-mini-icon" size={24} />
                      <div className="stats-mini-value">{stats.bounceRate}%</div>
                      <StatTooltip text={tooltips.bounceRate}>
                        <div className="stats-mini-label">Tasa de Rebote</div>
                      </StatTooltip>
                    </div>

                    <div className="stats-mini-card purple">
                      <GitCompare className="stats-mini-icon" size={24} />
                      <div className="stats-mini-value">{stats.addedToComparisons}</div>
                      <StatTooltip text={tooltips.addedToComparisons}>
                        <div className="stats-mini-label">Comparaciones</div>
                      </StatTooltip>
                    </div>

                    <div className="stats-mini-card orange">
                      <BarChart3 className="stats-mini-icon" size={24} />
                      <div className="stats-mini-value">#{stats.rankingInSearch}</div>
                      <StatTooltip text={tooltips.rankingInSearch}>
                        <div className="stats-mini-label">Ranking</div>
                      </StatTooltip>
                    </div>
                  </div>
                </div>

                {/* Competitive Position */}
                <div className="stats-card">
                  <div className="stats-card-header">
                    <h3 className="stats-card-title">
                      <GitCompare size={18} />
                      Posición Competitiva
                    </h3>
                  </div>
                  <div className="stats-card-body stats-grid-3">
                    <div className="stats-competitive-item">
                      <div className="stats-competitive-icon orange">
                        <BarChart3 size={20} />
                      </div>
                      <div className="stats-competitive-value">#{stats.rankingInSearch}</div>
                      <StatTooltip text={tooltips.rankingInSearch}>
                        <div className="stats-competitive-label">Ranking</div>
                      </StatTooltip>
                    </div>

                    <div className="stats-competitive-item">
                      <div className="stats-competitive-icon purple">
                        <GitCompare size={20} />
                      </div>
                      <div className="stats-competitive-value">{stats.similarPropertiesCompared}</div>
                      <StatTooltip text={tooltips.similarPropertiesCompared}>
                        <div className="stats-competitive-label">Comparaciones</div>
                      </StatTooltip>
                    </div>

                    <div className="stats-competitive-item">
                      <div className="stats-competitive-icon orange">
                        <FaDollarSign size={20} />
                      </div>
                      <div className="stats-competitive-value">{stats.pricePosition}</div>
                      <StatTooltip text={tooltips.pricePosition}>
                        <div className="stats-competitive-label">Posición</div>
                      </StatTooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StatisticsModal;
