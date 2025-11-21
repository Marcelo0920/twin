import React from "react";
import {
  Building2,
  Users,
  Phone,
  Home,
  Ruler,
  Hash,
  Star,
  Layers,
  Calendar,
  DollarSign,
  FileText,
} from "lucide-react";
import "./detailsStep.css";

const DetailsStep = ({ formData, onChange }) => {
  return (
    <div className="details-step">
      <p className="step-description">
        Completa los detalles de la propiedad
      </p>

      <div className="details-form">
        {/* Operation & Origin Section */}
        <div className="form-section">
          <h3 className="section-title">Información General</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="operacion">
                <Building2 size={18} />
                <span>Operación</span>
              </label>
              <select
                id="operacion"
                value={formData.operacion}
                onChange={(e) => onChange("operacion", e.target.value)}
                className="details-select"
              >
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="origen">
                <Users size={18} />
                <span>Origen</span>
              </label>
              <select
                id="origen"
                value={formData.origen}
                onChange={(e) => onChange("origen", e.target.value)}
                className="details-select"
              >
                <option value="propietario">Propietario</option>
                <option value="inmobiliaria">Inmobiliaria</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="franquicia">
                <Building2 size={18} />
                <span>Franquicia</span>
              </label>
              <input
                id="franquicia"
                type="text"
                placeholder="Nombre de la franquicia"
                value={formData.franquicia}
                onChange={(e) => onChange("franquicia", e.target.value)}
                className="details-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="agente">
                <Users size={18} />
                <span>Agente</span>
              </label>
              <input
                id="agente"
                type="text"
                placeholder="Nombre del agente"
                value={formData.agente}
                onChange={(e) => onChange("agente", e.target.value)}
                className="details-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="telefonoRef">
              <Phone size={18} />
              <span>Teléfono de Referencia</span>
            </label>
            <input
              id="telefonoRef"
              type="tel"
              placeholder="Ej: 77123456"
              value={formData.telefonoRef}
              onChange={(e) => onChange("telefonoRef", e.target.value)}
              className="details-input"
            />
          </div>
        </div>

        {/* Property Characteristics Section */}
        <div className="form-section">
          <h3 className="section-title">Características</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tipoVivienda">
                <Home size={18} />
                <span>Tipo de Vivienda</span>
              </label>
              <select
                id="tipoVivienda"
                value={formData.tipoVivienda}
                onChange={(e) => onChange("tipoVivienda", e.target.value)}
                className="details-select"
              >
                <option value="casa">Casa</option>
                <option value="departamento">Departamento</option>
                <option value="terreno">Terreno</option>
                <option value="oficina">Oficina</option>
                <option value="local">Local Comercial</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="condicion">
                <Star size={18} />
                <span>Condición</span>
              </label>
              <select
                id="condicion"
                value={formData.condicion}
                onChange={(e) => onChange("condicion", e.target.value)}
                className="details-select"
              >
                <option value="nuevo">Nuevo</option>
                <option value="usado">Usado</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tipoVia">
                <Building2 size={18} />
                <span>Tipo de Vía</span>
              </label>
              <select
                id="tipoVia"
                value={formData.tipoVia}
                onChange={(e) => onChange("tipoVia", e.target.value)}
                className="details-select"
              >
                <option value="pavimento">Pavimento</option>
                <option value="tierra">Tierra</option>
                <option value="ripio">Ripio</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="frenteTerreno">
                <Ruler size={18} />
                <span>Frente Terreno (m)</span>
              </label>
              <input
                id="frenteTerreno"
                type="number"
                placeholder="Ej: 10"
                value={formData.frenteTerreno}
                onChange={(e) => onChange("frenteTerreno", e.target.value)}
                className="details-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="codigoInterno">
                <Hash size={18} />
                <span>Código Interno</span>
              </label>
              <input
                id="codigoInterno"
                type="text"
                placeholder="Ej: PROP-001"
                value={formData.codigoInterno}
                onChange={(e) => onChange("codigoInterno", e.target.value)}
                className="details-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ranking">
                <Star size={18} />
                <span>Ranking</span>
              </label>
              <input
                id="ranking"
                type="number"
                placeholder="1-5"
                min="1"
                max="5"
                value={formData.ranking}
                onChange={(e) => onChange("ranking", e.target.value)}
                className="details-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="niveles">
                <Layers size={18} />
                <span>Niveles/Plantas</span>
              </label>
              <input
                id="niveles"
                type="number"
                placeholder="Ej: 2"
                value={formData.niveles}
                onChange={(e) => onChange("niveles", e.target.value)}
                className="details-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="anoConstuccion">
                <Calendar size={18} />
                <span>Año de Construcción</span>
              </label>
              <input
                id="anoConstuccion"
                type="number"
                placeholder="Ej: 2020"
                value={formData.anoConstuccion}
                onChange={(e) => onChange("anoConstuccion", e.target.value)}
                className="details-input"
              />
            </div>
          </div>
        </div>

        {/* Measurements Section */}
        <div className="form-section">
          <h3 className="section-title">Medidas y Espacios</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="terreno">
                <Ruler size={18} />
                <span>Terreno (m²)</span>
              </label>
              <input
                id="terreno"
                type="number"
                placeholder="Ej: 250"
                value={formData.terreno}
                onChange={(e) => onChange("terreno", e.target.value)}
                className="details-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="construccion">
                <Ruler size={18} />
                <span>Construcción (m²)</span>
              </label>
              <input
                id="construccion"
                type="number"
                placeholder="Ej: 180"
                value={formData.construccion}
                onChange={(e) => onChange("construccion", e.target.value)}
                className="details-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="habitaciones">
                <Home size={18} />
                <span>Habitaciones</span>
              </label>
              <input
                id="habitaciones"
                type="number"
                placeholder="Ej: 4"
                value={formData.habitaciones}
                onChange={(e) => onChange("habitaciones", e.target.value)}
                className="details-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dormitorios">
                <Home size={18} />
                <span>Dormitorios</span>
              </label>
              <input
                id="dormitorios"
                type="number"
                placeholder="Ej: 3"
                value={formData.dormitorios}
                onChange={(e) => onChange("dormitorios", e.target.value)}
                className="details-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="banos">
                <Home size={18} />
                <span>Baños</span>
              </label>
              <input
                id="banos"
                type="number"
                placeholder="Ej: 2"
                value={formData.banos}
                onChange={(e) => onChange("banos", e.target.value)}
                className="details-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="garaje">
                <Building2 size={18} />
                <span>Garaje</span>
              </label>
              <input
                id="garaje"
                type="number"
                placeholder="Ej: 2"
                value={formData.garaje}
                onChange={(e) => onChange("garaje", e.target.value)}
                className="details-input"
              />
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="form-section">
          <h3 className="section-title">Información de Precio</h3>
          <div className="form-row">
            <div className="form-group form-group-large">
              <label htmlFor="precio">
                <DollarSign size={18} />
                <span>Precio</span>
              </label>
              <input
                id="precio"
                type="number"
                placeholder="Ej: 150000"
                value={formData.precio}
                onChange={(e) => onChange("precio", e.target.value)}
                className="details-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="moneda">
                <DollarSign size={18} />
                <span>Moneda</span>
              </label>
              <select
                id="moneda"
                value={formData.moneda}
                onChange={(e) => onChange("moneda", e.target.value)}
                className="details-select"
              >
                <option value="bs">Bs</option>
                <option value="usd">USD</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tipoCambio">
                <DollarSign size={18} />
                <span>Tipo de Cambio</span>
              </label>
              <input
                id="tipoCambio"
                type="number"
                step="0.01"
                placeholder="Ej: 6.96"
                value={formData.tipoCambio}
                onChange={(e) => onChange("tipoCambio", e.target.value)}
                className="details-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="miOferta">
                <DollarSign size={18} />
                <span>Mi Oferta</span>
              </label>
              <input
                id="miOferta"
                type="number"
                placeholder="Ej: 140000"
                value={formData.miOferta}
                onChange={(e) => onChange("miOferta", e.target.value)}
                className="details-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="valorMin">
                <DollarSign size={18} />
                <span>Valor Mínimo</span>
              </label>
              <input
                id="valorMin"
                type="number"
                placeholder="Ej: 130000"
                value={formData.valorMin}
                onChange={(e) => onChange("valorMin", e.target.value)}
                className="details-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="valorMax">
                <DollarSign size={18} />
                <span>Valor Máximo</span>
              </label>
              <input
                id="valorMax"
                type="number"
                placeholder="Ej: 160000"
                value={formData.valorMax}
                onChange={(e) => onChange("valorMax", e.target.value)}
                className="details-input"
              />
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="form-section">
          <h3 className="section-title">Descripción</h3>
          <div className="form-group">
            <label htmlFor="descripcion">
              <FileText size={18} />
              <span>Descripción de la Propiedad</span>
            </label>
            <textarea
              id="descripcion"
              rows="5"
              placeholder="Describe las características principales de la propiedad..."
              value={formData.descripcion}
              onChange={(e) => onChange("descripcion", e.target.value)}
              className="details-textarea"
              required
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsStep;
