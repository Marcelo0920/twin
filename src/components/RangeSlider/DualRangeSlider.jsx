import React, { useState, useRef, useEffect } from "react";
import { FaDollarSign } from "react-icons/fa";

const DualRangeSlider = ({ min = 0, max = 1000000, value, onChange }) => {
  const [minValue, setMinValue] = useState(value?.[0] || min);
  const [maxValue, setMaxValue] = useState(value?.[1] || max);
  const [isDragging, setIsDragging] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (value) {
      setMinValue(value[0]);
      setMaxValue(value[1]);
    }
  }, [value]);

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price}`;
  };

  const handleMouseDown = (type) => (e) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    );
    const newValue = Math.round(min + percent * (max - min));

    if (isDragging === "min") {
      const clampedValue = Math.min(newValue, maxValue - 10000);
      setMinValue(clampedValue);
      onChange?.([clampedValue, maxValue]);
    } else if (isDragging === "max") {
      const clampedValue = Math.max(newValue, minValue + 10000);
      setMaxValue(clampedValue);
      onChange?.([minValue, clampedValue]);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, minValue, maxValue]);

  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  return (
    <div style={styles.container}>
      <div style={styles.labelRow}>
        <FaDollarSign style={styles.icon} />
        <span style={styles.label}>Rango de Precio</span>
      </div>

      <div style={styles.sliderContainer}>
        <div ref={sliderRef} style={styles.track}>
          <div
            style={{
              ...styles.activeTrack,
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />

          <div
            style={{
              ...styles.thumb,
              left: `${minPercent}%`,
              zIndex: isDragging === "min" ? 3 : 2,
            }}
            onMouseDown={handleMouseDown("min")}
          >
            <div style={styles.tooltip}>{formatPrice(minValue)}</div>
          </div>

          <div
            style={{
              ...styles.thumb,
              left: `${maxPercent}%`,
              zIndex: isDragging === "max" ? 3 : 2,
            }}
            onMouseDown={handleMouseDown("max")}
          >
            <div style={styles.tooltip}>{formatPrice(maxValue)}</div>
          </div>
        </div>
      </div>

      <div style={styles.valueDisplay}>
        <span style={styles.valueText}>{formatPrice(minValue)}</span>
        <span style={styles.separator}>—</span>
        <span style={styles.valueText}>{formatPrice(maxValue)}</span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "100%",
  },
  labelRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: "14px",
  },
  label: {
    color: "rgba(255, 255, 255, 0.95)",
    fontSize: "0.85rem",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  sliderContainer: {
    padding: "10px 0",
  },
  track: {
    position: "relative",
    height: "6px",
    background: "rgba(255, 255, 255, 0.15)",
    borderRadius: "10px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  activeTrack: {
    position: "absolute",
    height: "100%",
    background: "linear-gradient(90deg, #8b5cf6, #a855f7)",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(139, 92, 246, 0.4)",
  },
  thumb: {
    position: "absolute",
    top: "50%",
    width: "20px",
    height: "20px",
    background: "white",
    border: "3px solid #8b5cf6",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
    cursor: "grab",
    transition: "box-shadow 0.2s, transform 0.2s",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
  tooltip: {
    position: "absolute",
    bottom: "28px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(0, 0, 0, 0.85)",
    color: "white",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "0.75rem",
    fontWeight: "600",
    whiteSpace: "nowrap",
    pointerEvents: "none",
    opacity: 0,
    transition: "opacity 0.2s",
  },
  valueDisplay: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "8px",
    padding: "6px 12px",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  valueText: {
    color: "white",
    fontSize: "0.85rem",
    fontWeight: "600",
  },
  separator: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "0.75rem",
  },
};

// Add hover effect for thumbs
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  div[style*="cursor: grab"]:hover {
    transform: translate(-50%, -50%) scale(1.15) !important;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4) !important;
  }
  div[style*="cursor: grab"]:hover > div {
    opacity: 1 !important;
  }
  div[style*="cursor: grab"]:active {
    cursor: grabbing !important;
  }
`;
document.head.appendChild(styleSheet);

export default DualRangeSlider;
