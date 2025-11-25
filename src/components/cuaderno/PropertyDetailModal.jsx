import React, { useState, useRef } from "react";
import { X, Edit2, Save, HelpCircle, Calculator } from "lucide-react";
import ImageCarousel from "../classic/ImageCarousel";
import "./styles/propertyDetailModal.css";

const PropertyDetailModal = ({ property, onClose, onSave }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPreAvaluoMode, setIsPreAvaluoMode] = useState(false);
  const [editedData, setEditedData] = useState({ ...property });
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [currentFieldInfo, setCurrentFieldInfo] = useState({
    title: "",
    content: "",
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [calculatedValues, setCalculatedValues] = useState({
    minPrice: null,
    maxPrice: null,
    currentPrice: null,
  });
  const priceRangeRef = useRef(null);

  const images =
    property.photos && property.photos.length > 0
      ? property.photos
      : [
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
        ];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleIndicatorClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleEditToggle = () => {
    if (isEditMode && onSave) {
      onSave(editedData);
    }
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePreAvaluoToggle = () => {
    setIsPreAvaluoMode(!isPreAvaluoMode);
    setIsEditMode(false);
  };

  const handleShowInfo = (title, content) => {
    setCurrentFieldInfo({ title, content });
    setShowInfoModal(true);
  };

  const handleCalculate = () => {
    setIsCalculating(true);

    // Simulate calculation - replace with actual calculation logic
    setTimeout(() => {
      const currentPrice = parseFloat(editedData.precio) || 235000;

      // Use example values for demonstration
      const minPrice = 450000;
      const maxPrice = 580000;

      setCalculatedValues({
        minPrice,
        maxPrice,
        currentPrice,
      });

      setHasCalculated(true);
      setIsCalculating(false);

      // Scroll to price range component
      setTimeout(() => {
        if (priceRangeRef.current) {
          priceRangeRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
    }, 1500);
  };

  const handleSavePreAvaluo = () => {
    if (onSave) {
      const dataToSave = {
        ...editedData,
        calculatedValues: hasCalculated ? calculatedValues : null,
        preAvaluoCompleted: true,
      };
      onSave(dataToSave);
    }
    setIsPreAvaluoMode(false);
  };

  const fieldInfo = {
    mediaOptima: {
      title: 'Media Óptima "UV"',
      content:
        'Media óptima "UV" es el valor de referencia que se obtiene según la ubicación del inmueble en el mapa, dentro de su Unidad Vecinal.\n\nEste valor representa un precio estimado por m² de terreno para esa zona específica.',
    },
    estadoConstruccion: {
      title: "Estado de construcción",
      content:
        "Estado de construcción se refiere a la conservación de la construcción o de las mejoras hechas al terreno.\n\nExcelente: Nueva sin usar.\nMuy buena: Nueva en uso.\nBuena: En uso con buen mantenimiento.\nNormal: Señales de desgaste, pero buen funcionamiento.\nRegular: Señales de desgaste, funcionamiento regular.\nMalo: Con problemas estructurales.\nMuy malo: No habitable.\nDemolición: Se puede recuperar algunos materiales.\nIrrecuperable: No se puede recuperar ningún material.",
    },
    tipoConstruccion: {
      title: "Tipo de construcción",
      content:
        "Tipo de construcción se refiere a la tipología de las mejoras en función del costo estimado por m².\n\nConstr. Muy Lujosa: 975 $us./m²\nConstr. Lujosa: 780 $us./m²\nConstr. Muy buena: 585 $us./m²\nConstr. Buena: 364 $us./m²\nConstr. Estándar: 312 $us./m²\nConstr. Económica: 260 $us./m²\nConstr. Int. Social: 156 $us./m²\nConstr. Marginal: 65 $us./m²",
    },
    areaTerreno: {
      title: "Área de terreno",
      content:
        "Área de terreno es la superficie total del lote expresada en metros cuadrados (m²).",
    },
    frenteTerreno: {
      title: "Frente del terreno",
      content:
        "Frente del terreno es la longitud del frente del lote que da a la vía pública, expresada en metros (m).",
    },
    areaConstruida: {
      title: "Área de construcción",
      content:
        "Área de construcción es la superficie total construida del inmueble, expresada en metros cuadrados (m²).",
    },
    anoEdificacion: {
      title: "Años de la construcción",
      content:
        "Años de la construcción es la antigüedad aproximada de la edificación.\n\nSi existen varias construcciones, se puede usar un promedio de edades.",
    },
    comerciabilidad: {
      title: "Comerciabilidad",
      content:
        "Comerciabilidad refleja el nivel de interés comercial o de mercado por el inmueble y su entorno.\n\nMuy baja: Zona despoblada, sin servicios básicos ni transporte público, poco interés de compra.\nBaja: Zona poco agradable para vivir, casi sin interés comercial, servicios y transporte alejados.\nMedia baja: Afectada por contaminación (aire, ruido, residuos), poca seguridad, tráfico saturado, baja afluencia de clientes.\nMedia: Nivel promedio, corresponde a la mayoría de los sectores de la ciudad.\nMedia alta: Vecindario agradable, negocios con buen movimiento, sin problemas fuertes de contaminación.\nAlta: Gran interés comercial, es sobre todo en avenidas principales y zonas con potencial de negocios o alquileres.\nMuy alta: Alto interés comercial, zonas de mercados o calles muy activas para comercio y alquiler.\nMáxima: Máximo interés comercial y/o turístico, en lugares icónicos o muy especiales de la ciudad.",
    },
    tipoUsoSuelo: {
      title: "Tipo de uso de suelo",
      content:
        "Tipo de uso de suelo sigue la normativa urbana y define el uso principal permitido para el área.\n\nNo definido: Zonas urbanas sin información clara de uso.\nResidencial: Zona principalmente de viviendas.\nComercial: Mercados, ferias, comercios, etc.\nMixto: Combinación de vivienda y comercio.\nIndustrial: Parques o áreas industriales.\nÁrea verde: Parques, plazas y espacios de esparcimiento público.\nEquipamiento: Salud, educación, iglesias, y otros servicios públicos o institucionales.\nUrb. Cerrada: Urbanizaciones cerradas privadas.\nRústico: Áreas sin urbanizar.",
    },
    tipoVecindario: {
      title: "Tipo de vecindario",
      content:
        "Tipo de vecindario describe el nivel de consolidación y ocupación del área donde se encuentra el inmueble.\n\nSin urbanizar: Área rústica, sin calles ni avenidas, acceso por camino vecinal o carretera.\nUrbano sin consolidar: Urbanización con pocas o ninguna casa alrededor.\nUrbano en consolidación: Entre 20% y 40% de los lotes aún baldíos sin construcción.\nUrbano consolidado: Manzano completamente lleno de construcciones vecinas.",
    },
    anchoVias: {
      title: "Ancho de vías",
      content:
        "Áncho de vías es la distancia entre bardas (frentes de lote) de un pasillo, calle o avenida, incluyendo aceras.\n\nAyuda a identificar si la vía es angosta, intermedia o amplia.",
    },
    tipoVias: {
      title: "Tipo de vía",
      content:
        "Tipo de vía describe el material o recubrimiento de la calzada.\n\nPor ejemplo: tierra, ripio, piedra, loseta, pavic o pavimento.",
    },
    riesgosNaturales: {
      title: "Riesgos naturales",
      content:
        "Riesgos naturales indica si el inmueble está en una zona propensa a inundaciones, derrumbes u otros riesgos físicos del entorno.\n\nSe marca si existe riesgo o si la zona es considerada sin riesgo.",
    },
    formaTerreno: {
      title: "Forma del terreno",
      content:
        "Forma del terreno se refiere al grado de regularidad de la geometría del lote.\n\nRegular 4 puntos: Aproximadamente rectangular o con 4 ángulos bien definidos.\nIrregular 5 a 6 puntos: Terreno con más lados y variaciones en su forma.\nMuy irregular más de 7 puntos: Terreno con muchos quiebres y una forma poco regular.\nEjemplo gráfico de formas de terreno:",
    },
    ubicacionManzano: {
      title: "Ubicación en el manzano",
      content:
        "Ubicación en el manzano indica si el lote está en una esquina o en la parte central del manzano.\n\nLos lotes en esquina suelen tener más exposición y, a veces, más frente.",
    },
    frentesVia: {
      title: "Frentes a la vía",
      content:
        "Frentes a la vía indica cuántos lados del terreno colindan con vías públicas.\n\nUn frente: Lote estándar con un solo lado hacia la calle.\nDos frentes: Terreno con doble salida o en esquina con dos vías.\nTres o más frentes: Lotes especiales con mayor exposición a la vía pública.",
    },
    tieneBarda: {
      title: "Barda propia",
      content:
        'Barda indica si el terreno cuenta con barda propia de ladrillo u otro material perimetral.\n\nSe marca como "con barda" o "sin barda".',
    },
    tieneChurrasquera: {
      title: "Churrasquera",
      content:
        "Churrasquera indica si la propiedad tiene una churrasquera construida.\n\nPara que compute como mejora, debe existir área construida asociada.",
    },
    tienePiscina: {
      title: "Piscina",
      content:
        "Piscina indica si la propiedad cuenta con piscina.\n\nAl igual que la churrasquera, para que compute debe existir área construida asociada.",
    },
  };

  const displayData = isEditMode ? editedData : property;

  const formatOperacion = (op) => {
    const map = {
      venta: "En Venta",
      alquiler: "Alquiler",
      anticretico: "Anticretico",
    };
    return map[op] || op;
  };

  const formatMoneda = (mon) => {
    const map = { bs: "Bs", usd: "$us" };
    return map[mon] || mon;
  };

  const renderField = (label, field, type = "text", options = null) => {
    const value = displayData[field];
    const displayValue = value || "—";

    return (
      <div className="pdm-field-row">
        <label className="pdm-field-label">{label}</label>
        {isEditMode ? (
          options ? (
            <select
              value={editedData[field] || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="pdm-field-input pdm-select"
            >
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              value={editedData[field] || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="pdm-field-input"
              placeholder={label}
            />
          )
        ) : (
          <span className="pdm-field-value">{displayValue}</span>
        )}
      </div>
    );
  };

  const renderPreAvaluoField = (
    label,
    field,
    type = "text",
    options = null,
    infoKey = null
  ) => {
    const value = editedData[field] || "";

    return (
      <div className="pdm-field-row pdm-preavaluo-field">
        <div className="pdm-field-label-with-icon">
          <label className="pdm-field-label">{label}</label>
          {infoKey && (
            <button
              className="pdm-info-icon"
              onClick={() =>
                handleShowInfo(
                  fieldInfo[infoKey].title,
                  fieldInfo[infoKey].content
                )
              }
              type="button"
            >
              <HelpCircle size={16} />
            </button>
          )}
        </div>
        {options ? (
          <select
            value={value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="pdm-field-input pdm-select"
          >
            <option value="">Seleccionar...</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="pdm-field-input"
            placeholder={type === "number" ? "0" : label}
          />
        )}
      </div>
    );
  };

  return (
    <div className="pdm-overlay" onClick={onClose}>
      <div className="pdm-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="pdm-header">
          <h2 className="pdm-title">
            {displayData.direccion || "Detalles de la Propiedad"}
          </h2>
          <div className="pdm-header-actions">
            <button
              className={`pdm-preavaluo-btn ${isPreAvaluoMode ? "active" : ""}`}
              onClick={handlePreAvaluoToggle}
            >
              <span>Pre-Avaluo</span>
            </button>
            <button
              className={`pdm-edit-btn ${isEditMode ? "active" : ""} ${
                isPreAvaluoMode ? "disabled" : ""
              }`}
              onClick={handleEditToggle}
              disabled={isPreAvaluoMode}
            >
              {isEditMode ? (
                <>
                  <Save size={18} />
                  <span>Guardar</span>
                </>
              ) : (
                <>
                  <Edit2 size={18} />
                  <span>Editar</span>
                </>
              )}
            </button>
            <button className="pdm-close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="pdm-content">
          {/* Image Carousel */}
          <ImageCarousel
            images={images}
            currentIndex={currentImageIndex}
            onNext={handleNextImage}
            onPrev={handlePrevImage}
            onIndicatorClick={handleIndicatorClick}
            propertyName={displayData.direccion}
          />

          {/* Property Details */}
          <div className="pdm-details">
            {isPreAvaluoMode ? (
              /* Pre-Avaluo Form */
              <>
                {/* Basic Info - Pre-Avaluo */}
                <div className="pdm-section">
                  <h3 className="pdm-section-title">Información Básica</h3>
                  <div className="pdm-fields">
                    {renderPreAvaluoField(
                      'Media óptima "UV" $us.',
                      "mediaOptima",
                      "number",
                      null,
                      "mediaOptima"
                    )}
                    {renderPreAvaluoField(
                      "Estado construcción",
                      "estadoConstruccion",
                      "text",
                      [
                        { value: "excelente", label: "Excelente" },
                        { value: "muy_buena", label: "Muy buena" },
                        { value: "buena", label: "Buena" },
                        { value: "normal", label: "Normal" },
                        { value: "regular", label: "Regular" },
                        { value: "malo", label: "Malo" },
                        { value: "muy_malo", label: "Muy malo" },
                        { value: "demolicion", label: "Demolición" },
                        { value: "irrecuperable", label: "Irrecuperable" },
                      ],
                      "estadoConstruccion"
                    )}
                    {renderPreAvaluoField(
                      "Tipo de construcción",
                      "tipoConstruccionAvaluo",
                      "text",
                      [
                        { value: "muy_lujosa", label: "Constr. Muy Lujosa" },
                        { value: "lujosa", label: "Constr. Lujosa" },
                        { value: "muy_buena", label: "Constr. Muy buena" },
                        { value: "buena", label: "Constr. Buena" },
                        { value: "estandar", label: "Constr. Estándar" },
                        { value: "economica", label: "Constr. Económica" },
                        { value: "int_social", label: "Constr. Int. Social" },
                        { value: "marginal", label: "Constr. Marginal" },
                      ],
                      "tipoConstruccion"
                    )}
                    {renderPreAvaluoField(
                      "Área de terreno (m²)",
                      "areaTerreno",
                      "number",
                      null,
                      "areaTerreno"
                    )}
                    {renderPreAvaluoField(
                      "Frente del terreno (m)",
                      "frenteTerreno",
                      "number",
                      null,
                      "frenteTerreno"
                    )}
                    {renderPreAvaluoField(
                      "Área construida (m²)",
                      "areaConstruida",
                      "number",
                      null,
                      "areaConstruida"
                    )}
                    {renderPreAvaluoField(
                      "Año edificación (años)",
                      "anoEdificacion",
                      "text",
                      null,
                      "anoEdificacion"
                    )}
                    {renderPreAvaluoField(
                      "Comerciabilidad",
                      "comerciabilidad",
                      "text",
                      [
                        { value: "muy_baja", label: "Muy baja" },
                        { value: "baja", label: "Baja" },
                        { value: "media_baja", label: "Media baja" },
                        { value: "media", label: "Media" },
                        { value: "media_alta", label: "Media alta" },
                        { value: "alta", label: "Alta" },
                        { value: "muy_alta", label: "Muy alta" },
                        { value: "maxima", label: "Máxima" },
                      ],
                      "comerciabilidad"
                    )}
                  </div>
                </div>

                {/* Additional Pre-Avaluo Fields */}
                <div className="pdm-section">
                  <h3 className="pdm-section-title">Detalles del Terreno</h3>
                  <div className="pdm-fields">
                    {renderPreAvaluoField(
                      "Tipo de uso de suelo",
                      "tipoUsoSuelo",
                      "text",
                      [
                        { value: "no_definido", label: "No definido" },
                        { value: "residencial", label: "Residencial" },
                        { value: "comercial", label: "Comercial" },
                        { value: "mixto", label: "Mixto" },
                        { value: "industrial", label: "Industrial" },
                        { value: "area_verde", label: "Área verde" },
                        { value: "equipamiento", label: "Equipamiento" },
                        { value: "urb_cerrada", label: "Urb. Cerrada" },
                        { value: "rustico", label: "Rústico" },
                      ],
                      "tipoUsoSuelo"
                    )}
                    {renderPreAvaluoField(
                      "Tipo de vecindario",
                      "tipoVecindario",
                      "text",
                      [
                        { value: "sin_urbanizar", label: "Sin urbanizar" },
                        {
                          value: "urbano_sin_consolidar",
                          label: "Urbano sin consolidar",
                        },
                        {
                          value: "urbano_consolidacion",
                          label: "Urbano en consolidación",
                        },
                        {
                          value: "urbano_consolidado",
                          label: "Urbano consolidado",
                        },
                      ],
                      "tipoVecindario"
                    )}
                    {renderPreAvaluoField(
                      "Ancho de vías",
                      "anchoVias",
                      "text",
                      null,
                      "anchoVias"
                    )}
                    {renderPreAvaluoField(
                      "Tipo de vías",
                      "tipoVias",
                      "text",
                      [
                        { value: "tierra", label: "Tierra" },
                        { value: "ripio", label: "Ripio" },
                        { value: "piedra", label: "Piedra" },
                        { value: "loseta", label: "Loseta" },
                        { value: "pavic", label: "Pavic" },
                        { value: "pavimento", label: "Pavimento" },
                      ],
                      "tipoVias"
                    )}
                    {renderPreAvaluoField(
                      "Riesgos naturales",
                      "riesgosNaturales",
                      "text",
                      [
                        { value: "sin_riesgo", label: "Sin riesgo" },
                        { value: "con_riesgo", label: "Con riesgo" },
                      ],
                      "riesgosNaturales"
                    )}
                    {renderPreAvaluoField(
                      "Forma del terreno",
                      "formaTerreno",
                      "text",
                      [
                        { value: "regular_4", label: "Regular 4 puntos" },
                        {
                          value: "irregular_5_6",
                          label: "Irregular 5 a 6 puntos",
                        },
                        {
                          value: "muy_irregular_7",
                          label: "Muy irregular más de 7 puntos",
                        },
                      ],
                      "formaTerreno"
                    )}
                  </div>
                </div>

                {/* Location and Features */}
                <div className="pdm-section">
                  <h3 className="pdm-section-title">
                    Ubicación y Características
                  </h3>
                  <div className="pdm-fields">
                    {renderPreAvaluoField(
                      "Ubicación en manzano",
                      "ubicacionManzano",
                      "text",
                      [
                        { value: "esquina", label: "Esquina" },
                        { value: "central", label: "Central" },
                      ],
                      "ubicacionManzano"
                    )}
                    {renderPreAvaluoField(
                      "Frentes a la vía",
                      "frentesVia",
                      "text",
                      [
                        { value: "un_frente", label: "Un frente" },
                        { value: "dos_frentes", label: "Dos frentes" },
                        { value: "tres_o_mas", label: "Tres o más frentes" },
                      ],
                      "frentesVia"
                    )}
                    {renderPreAvaluoField(
                      "Tiene barda propia",
                      "tieneBarda",
                      "text",
                      [
                        { value: "si", label: "Sí" },
                        { value: "no", label: "No" },
                      ],
                      "tieneBarda"
                    )}
                    {renderPreAvaluoField(
                      "Tiene churrasquera",
                      "tieneChurrasquera",
                      "text",
                      [
                        { value: "si", label: "Sí" },
                        { value: "no", label: "No" },
                      ],
                      "tieneChurrasquera"
                    )}
                    {renderPreAvaluoField(
                      "Tiene piscina",
                      "tienePiscina",
                      "text",
                      [
                        { value: "si", label: "Sí" },
                        { value: "no", label: "No" },
                      ],
                      "tienePiscina"
                    )}
                    {renderPreAvaluoField(
                      "Valor Terreno $us./m²",
                      "valorTerrenoM2",
                      "number",
                      null,
                      null
                    )}
                  </div>
                </div>

                {/* Price Range Component */}
                <div
                  className="pdm-section pdm-price-range-section"
                  ref={priceRangeRef}
                >
                  <h3 className="pdm-section-title">Precio Comercial</h3>
                  <div
                    className={`pdm-price-range-container ${
                      !hasCalculated ? "disabled" : ""
                    }`}
                  >
                    {!hasCalculated ? (
                      <div className="pdm-price-range-placeholder">
                        <p>
                          Haz clic en "Calcular" para generar el rango de
                          precios
                        </p>
                      </div>
                    ) : (
                      (() => {
                        const { minPrice, maxPrice, currentPrice } = calculatedValues;

                        // Calculate the actual range for the bar to include all prices
                        const lowestPrice = Math.min(minPrice, maxPrice, currentPrice);
                        const highestPrice = Math.max(minPrice, maxPrice, currentPrice);
                        const range = highestPrice - lowestPrice;
                        const padding = range * 0.1; // 10% padding on each side

                        const barMin = lowestPrice - padding;
                        const barMax = highestPrice + padding;
                        const barRange = barMax - barMin;

                        // Calculate positions (0-100%)
                        const minPosition = ((minPrice - barMin) / barRange) * 100;
                        const maxPosition = ((maxPrice - barMin) / barRange) * 100;
                        const currentPosition = ((currentPrice - barMin) / barRange) * 100;

                        // Determine status
                        let statusText = "";
                        let statusClass = "";
                        if (currentPrice < minPrice) {
                          statusText = "por debajo del rango";
                          statusClass = "below";
                        } else if (currentPrice > maxPrice) {
                          statusText = "por encima del rango";
                          statusClass = "above";
                        } else {
                          statusText = "dentro del rango";
                          statusClass = "within";
                        }

                        return (
                          <div className="pdm-price-range-content">
                            <div className={`pdm-price-range-status ${statusClass}`}>
                              "Precio Comercial" {statusText}
                            </div>
                            <div className="pdm-price-range-value">
                              $us. {currentPrice?.toLocaleString()}
                            </div>
                            <div className="pdm-price-range-bar">
                              <div className="pdm-range-track-container">
                                {/* Gradient bar */}
                                <div className="pdm-range-gradient-bar"></div>

                                {/* Min price line */}
                                <div
                                  className="pdm-range-line pdm-line-min"
                                  style={{ left: `${minPosition}%` }}
                                >
                                  <div className="pdm-line-label pdm-line-label-min">
                                    Mín.
                                  </div>
                                </div>

                                {/* Max price line */}
                                <div
                                  className="pdm-range-line pdm-line-max"
                                  style={{ left: `${maxPosition}%` }}
                                >
                                  <div className="pdm-line-label pdm-line-label-max">
                                    Máx.
                                  </div>
                                </div>

                                {/* Current price marker */}
                                <div
                                  className="pdm-range-marker pdm-marker-current"
                                  style={{ left: `${currentPosition}%` }}
                                >
                                  <div className="pdm-marker-tooltip">
                                    Precio Actual
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="pdm-price-range-labels">
                              <span className="pdm-range-label-min">
                                Mín. $us. {minPrice?.toLocaleString()}
                              </span>
                              <span className="pdm-range-label-max">
                                Máx. $us. {maxPrice?.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        );
                      })()
                    )}
                  </div>
                </div>

                {/* Save Button */}
                <div className="pdm-preavaluo-actions">
                  <button
                    className="pdm-save-preavaluo-btn"
                    onClick={handleSavePreAvaluo}
                  >
                    <Save size={18} />
                    <span>Guardar</span>
                  </button>
                </div>
              </>
            ) : (
              /* Normal View */
              <>
                {/* Basic Info */}
                <div className="pdm-section">
                  <h3 className="pdm-section-title">Información Básica</h3>
                  <div className="pdm-fields">
                    {renderField("Tipo de Vivienda", "tipoVivienda", "text", [
                      { value: "casa", label: "Casa" },
                      { value: "departamento", label: "Departamento" },
                      { value: "terreno", label: "Terreno" },
                    ])}
                    {renderField("Condición", "condicion", "text", [
                      { value: "nuevo", label: "Nuevo" },
                      { value: "usado", label: "Usado" },
                    ])}
                    {renderField("Moneda", "moneda", "text", [
                      { value: "bs", label: "Bs" },
                      { value: "usd", label: "$us" },
                    ])}
                  </div>
                </div>

                {/* Operation */}
                <div className="pdm-section">
                  <h3 className="pdm-section-title">Operación</h3>
                  <div className="pdm-fields">
                    {renderField("Operación", "operacion", "text", [
                      { value: "venta", label: "En Venta" },
                      { value: "alquiler", label: "Alquiler" },
                      { value: "anticretico", label: "Anticretico" },
                    ])}
                    {renderField("Precio", "precio", "number")}
                  </div>
                </div>

                {/* Surfaces */}
                <div className="pdm-section">
                  <h3 className="pdm-section-title">Superficies</h3>
                  <div className="pdm-fields">
                    {renderField("Superficie const.", "construccion", "number")}
                    {renderField("Superficie terreno", "terreno", "number")}
                  </div>
                </div>

                {/* Rooms */}
                <div className="pdm-section">
                  <h3 className="pdm-section-title">Ambientes</h3>
                  <div className="pdm-fields">
                    {renderField("Habitaciones", "habitaciones", "number")}
                    {renderField("Dormitorios", "dormitorios", "number")}
                    {renderField("Baños", "banos", "number")}
                    {renderField("Garaje", "garaje", "number")}
                  </div>
                </div>

                {/* Construction Details */}
                <div className="pdm-section">
                  <h3 className="pdm-section-title">
                    Detalles de Construcción
                  </h3>
                  <div className="pdm-fields">
                    {renderField("Niveles", "niveles", "number")}
                    {renderField("Año", "anoConstuccion", "number")}
                    {renderField("Tipo de vía", "tipoVia", "text", [
                      { value: "pavimento", label: "Pavimento" },
                      { value: "tierra", label: "Tierra" },
                      { value: "adoquin", label: "Adoquín" },
                    ])}
                    {renderField("Frente terreno", "frenteTerreno", "number")}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="pdm-section">
                  <h3 className="pdm-section-title">Información de Contacto</h3>
                  <div className="pdm-fields">
                    {renderField("Origen", "origen", "text", [
                      { value: "propietario", label: "Propietario" },
                      { value: "inmobiliaria", label: "Inmobiliaria" },
                    ])}
                    {renderField("Agente", "agente", "text")}
                    {renderField("Franquicia", "franquicia", "text")}
                    {renderField("Teléfono ref.", "telefonoRef", "text")}
                  </div>
                </div>

                {/* Financial */}
                <div className="pdm-section">
                  <h3 className="pdm-section-title">Información Financiera</h3>
                  <div className="pdm-fields">
                    {renderField("Tipo de cambio", "tipoCambio", "number")}
                    {renderField("Mi oferta", "miOferta", "number")}
                    {renderField("Valor mínimo", "valorMin", "number")}
                    {renderField("Valor máximo", "valorMax", "number")}
                  </div>
                </div>

                {/* Additional */}
                <div className="pdm-section">
                  <h3 className="pdm-section-title">Información Adicional</h3>
                  <div className="pdm-fields">
                    {renderField("Código", "codigoInterno", "text")}
                    {renderField("Ranking", "ranking", "number")}
                  </div>
                </div>

                {/* Description */}
                <div className="pdm-section">
                  <h3 className="pdm-section-title">Descripción</h3>
                  {isEditMode ? (
                    <textarea
                      value={editedData.descripcion || ""}
                      onChange={(e) =>
                        handleInputChange("descripcion", e.target.value)
                      }
                      className="pdm-field-input pdm-textarea"
                      rows="4"
                      placeholder="Descripción de la propiedad..."
                    />
                  ) : (
                    <p className="pdm-description-text">
                      {displayData.descripcion || "—"}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Sticky Calculate Button */}
        {isPreAvaluoMode && (
          <div className="pdm-sticky-calculate">
            <button
              className={`pdm-calculate-btn ${
                isCalculating ? "calculating" : ""
              }`}
              onClick={handleCalculate}
              disabled={isCalculating}
            >
              {isCalculating ? (
                <>
                  <div className="pdm-spinner"></div>
                  <span>Calculando...</span>
                </>
              ) : (
                <>
                  <Calculator size={20} />
                  <span>Calcular</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Info Modal */}
        {showInfoModal && (
          <div
            className="pdm-info-modal-overlay"
            onClick={() => setShowInfoModal(false)}
          >
            <div
              className="pdm-info-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pdm-info-modal-header">
                <h3 className="pdm-info-modal-title">
                  {currentFieldInfo.title}
                </h3>
                <button
                  className="pdm-info-modal-close"
                  onClick={() => setShowInfoModal(false)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="pdm-info-modal-content">
                {currentFieldInfo.content.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetailModal;
