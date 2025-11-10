// src/components/guardados/ComparisonModal.jsx
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Map as MapIcon, BarChart3 } from "lucide-react";
import { IoMdClose } from "react-icons/io";
import MapTab from "./MapTab";
import ComparisonTab from "./ComparisonTab";
import "./styles/comparisonModal.css";

const ComparisonModal = ({ isOpen, onClose, properties }) => {
  const [activeTab, setActiveTab] = useState("mapa");

  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="comparison-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="comparison-modal-content"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Close Button */}

            {/* Tabs */}
            <div className="comparison-tabs-with-exit">
              <div className="comparison-tabs">
                <button
                  className={`comparison-tab ${
                    activeTab === "mapa" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("mapa")}
                >
                  <MapIcon size={20} />
                  Mapa
                </button>
                <button
                  className={`comparison-tab ${
                    activeTab === "comparacion" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("comparacion")}
                >
                  <BarChart3 size={20} />
                  Comparación
                </button>
              </div>
              <button
                className="comparison-close-button center"
                onClick={onClose}
              >
                <IoMdClose size={24} />
              </button>
            </div>

            {/* Tab Content */}
            <div className="comparison-tab-content">
              {activeTab === "mapa" && <MapTab properties={properties} />}
              {activeTab === "comparacion" && (
                <ComparisonTab properties={properties} />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default ComparisonModal;
