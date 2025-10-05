import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getNearbyPlaceIcon,
  getNearbyPlaceColor,
} from "../../utils/classic/mapHelpers";

const Modal360 = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
  selectedPlace,
}) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="modal-overlay-classic"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="modal-content-classic"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: -15 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
            exit={{
              scale: 0.85,
              opacity: 0,
              y: 30,
              rotateX: 10,
              transition: { duration: 0.25, ease: [0.43, 0.13, 0.23, 0.96] },
            }}
            transition={{
              duration: 0.4,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <motion.button
              className="modal-close-classic"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.button>

            <div className="modal-360-viewer">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt="360 view"
                  className="viewer-360-image"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {selectedPlace && (
                <motion.div
                  className="place-info-overlay"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <div className="place-overlay-content">
                    <motion.div
                      className="place-icon-container"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.3,
                        duration: 0.5,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                    >
                      {React.createElement(
                        getNearbyPlaceIcon(selectedPlace.type),
                        {
                          size: 24,
                          style: {
                            color: getNearbyPlaceColor(selectedPlace.type),
                          },
                        }
                      )}
                    </motion.div>
                    <div className="place-details">
                      <h3>{selectedPlace.name}</h3>
                      <p>Vista 360° • {selectedPlace.distance}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {images.length > 1 && (
                <motion.div
                  className="viewer-navigation"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  {images.map((_, idx) => (
                    <motion.button
                      key={idx}
                      className={`nav-dot ${
                        idx === currentIndex ? "active" : ""
                      }`}
                      onClick={() => onIndexChange(idx)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal360;
