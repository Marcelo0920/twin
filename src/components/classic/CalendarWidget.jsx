import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaVideo, FaMapMarkerAlt } from "react-icons/fa";

const CalendarWidget = ({ onScheduleClick }) => {
  const peopleScheduled = Math.floor(Math.random() * 6) + 3;

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.1); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.promoSection}>
        <div style={styles.promoIconContainer}>
          <FaCalendarAlt style={styles.promoIcon} />
        </div>
        <h3 style={styles.promoTitle}>
          ¿Te gustaría visitar esta propiedad?
        </h3>
        <div style={styles.urgencyBadge}>
          <span style={styles.urgencyDot}></span>
          <span style={styles.urgencyText}>
            {peopleScheduled} personas agendaron esta semana
          </span>
        </div>
        <p style={styles.promoDescription}>
          Agenda tu visita ahora y conoce todos los detalles de esta increíble
          propiedad
        </p>
        <button style={styles.scheduleButton} onClick={onScheduleClick}>
          <FaCalendarAlt style={styles.scheduleButtonIcon} />
          Agendar Visita
        </button>
        <div style={styles.visitOptions}>
          <div style={styles.visitOption}>
            <FaMapMarkerAlt
              style={{ ...styles.visitOptionIcon, color: "#3b82f6" }}
            />
            <span style={styles.visitOptionText}>Visitas presenciales</span>
          </div>
          <div style={styles.visitOption}>
            <FaVideo style={{ ...styles.visitOptionIcon, color: "#8b5cf6" }} />
            <span style={styles.visitOptionText}>Visitas virtuales</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "1.25rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    marginTop: "2rem",
  },
  promoSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "1rem 0",
  },
  promoIconContainer: {
    width: "64px",
    height: "64px",
    background: "linear-gradient(135deg, #FF9017 0%, #FF7A00 100%)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  promoIcon: {
    fontSize: "1.75rem",
    color: "white",
  },
  promoTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 0.75rem 0",
    lineHeight: "1.3",
  },
  urgencyBadge: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "#fef3c7",
    border: "1px solid #fcd34d",
    borderRadius: "20px",
    padding: "0.5rem 1rem",
    marginBottom: "1rem",
  },
  urgencyDot: {
    width: "8px",
    height: "8px",
    background: "#f59e0b",
    borderRadius: "50%",
    animation: "pulse 2s ease-in-out infinite",
  },
  urgencyText: {
    fontSize: "0.8rem",
    fontWeight: "600",
    color: "#92400e",
  },
  promoDescription: {
    fontSize: "0.875rem",
    color: "#6b7280",
    margin: "0 0 1.25rem 0",
    lineHeight: "1.5",
  },
  scheduleButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.875rem 1.5rem",
    background: "linear-gradient(135deg, #FF9017 0%, #FF7A00 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(255, 144, 23, 0.3)",
    marginBottom: "1rem",
  },
  scheduleButtonIcon: {
    fontSize: "1.125rem",
  },
  visitOptions: {
    display: "flex",
    gap: "1rem",
    width: "100%",
    justifyContent: "center",
    paddingTop: "0.75rem",
    borderTop: "1px solid #f3f4f6",
  },
  visitOption: {
    display: "flex",
    alignItems: "center",
    gap: "0.375rem",
  },
  visitOptionIcon: {
    fontSize: "0.875rem",
  },
  visitOptionText: {
    fontSize: "0.75rem",
    color: "#6b7280",
    fontWeight: "500",
  },
};

export default CalendarWidget;
