import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  FaCalendarAlt,
  FaVideo,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaMapPin,
} from "react-icons/fa";

const CalendarModal = ({ isOpen, onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [slideDirection, setSlideDirection] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle external control
  useEffect(() => {
    if (isOpen) {
      setIsModalVisible(true);
    } else {
      handleCloseModal();
    }
  }, [isOpen]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.1); }
      }
      @keyframes slideInFromRight {
        from {
          opacity: 0;
          transform: translateX(20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @keyframes slideInFromLeft {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes slideDown {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(20px);
        }
      }
      .slide-in-right {
        animation: slideInFromRight 0.3s ease-out;
      }
      .slide-in-left {
        animation: slideInFromLeft 0.3s ease-out;
      }
      .modal-overlay-enter {
        animation: fadeIn 0.3s ease-out forwards;
      }
      .modal-overlay-exit {
        animation: fadeOut 0.3s ease-out forwards;
      }
      .modal-content-enter {
        animation: slideUp 0.3s ease-out forwards;
      }
      .modal-content-exit {
        animation: slideDown 0.3s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const isVirtualDay = (date) => date.getDay() === 6;

  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  const getWeekDays = () => {
    const days = [];
    const weekStart = getWeekStart(currentWeekStart);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);

      const isPast = date < today;
      const isVirtual = isVirtualDay(date);
      const availableSlots = isPast
        ? 0
        : isVirtual
        ? Math.floor(Math.random() * 6) + 5
        : Math.floor(Math.random() * 3) + 2;

      days.push({
        date,
        day: date.getDate(),
        isPast,
        isVirtual,
        availableSlots,
      });
    }

    return days;
  };

  const handlePrevWeek = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection("slide-in-left");
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newStart);
    setSelectedDate(null);
    setTimeout(() => {
      setIsAnimating(false);
      setSlideDirection("");
    }, 300);
  };

  const handleNextWeek = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection("slide-in-right");
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newStart);
    setSelectedDate(null);
    setTimeout(() => {
      setIsAnimating(false);
      setSlideDirection("");
    }, 300);
  };

  const handleDateClick = (dayInfo) => {
    if (!dayInfo || dayInfo.isPast || dayInfo.availableSlots === 0) return;

    if (selectedDate?.date?.toDateString() === dayInfo.date.toDateString()) {
      setSelectedDate(null);
    } else {
      setSelectedDate(dayInfo);
    }
  };

  const handleConfirm = () => {
    if (selectedDate) {
      setShowSuccess(true);
      setTimeout(() => {
        handleCloseModal();
      }, 3000);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setSelectedDate(null);
      setShowSuccess(false);
      if (onClose) onClose();
    }, 300);
  };

  const days = getWeekDays();
  const weekStart = getWeekStart(currentWeekStart);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  if (!isOpen) return null;

  const modalContent = (
    <div
      style={styles.modalOverlay}
      className={isModalVisible ? "modal-overlay-enter" : "modal-overlay-exit"}
      onClick={handleCloseModal}
    >
      <div
        style={styles.modalContent}
        className={
          isModalVisible ? "modal-content-enter" : "modal-content-exit"
        }
        onClick={(e) => e.stopPropagation()}
      >
        {showSuccess ? (
          <>
            <div style={styles.successContainer}>
              <div style={styles.successIconContainer}>
                <FaCheckCircle style={styles.successIcon} />
              </div>
              <h3 style={styles.successTitle}>¡Visita Confirmada!</h3>
              <p style={styles.successMessage}>
                Has agendado correctamente tu visita{" "}
                {selectedDate.isVirtual ? "virtual" : "presencial"} para el{" "}
                {selectedDate.date.toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <div style={styles.successDetails}>
                <div style={styles.successDetailItem}>
                  <FaClock style={styles.successDetailIcon} />
                  <span>10:00 AM</span>
                </div>
                <div style={styles.successDetailItem}>
                  {selectedDate.isVirtual ? (
                    <FaVideo style={styles.successDetailIcon} />
                  ) : (
                    <FaMapMarkerAlt style={styles.successDetailIcon} />
                  )}
                  <span>
                    {selectedDate.isVirtual ? "Virtual" : "Presencial"}
                  </span>
                </div>
              </div>
              <p style={styles.successFooter}>
                Te enviaremos un recordatorio por email
              </p>
            </div>
          </>
        ) : !selectedDate ? (
          <>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                <FaCalendarAlt style={styles.titleIcon} />
                Agendar Visita
              </h3>
              <button style={styles.closeButton} onClick={handleCloseModal}>
                ✕
              </button>
            </div>

            <div style={styles.legend}>
              <div style={styles.legendItem}>
                <FaMapMarkerAlt
                  style={{ ...styles.legendIcon, color: "#3b82f6" }}
                />
                <span style={styles.legendText}>Presencial</span>
              </div>
              <div style={styles.legendItem}>
                <FaVideo style={{ ...styles.legendIcon, color: "#8b5cf6" }} />
                <span style={styles.legendText}>Virtual</span>
              </div>
            </div>

            <div style={styles.weekNavigation}>
              <button
                style={styles.navButton}
                onClick={handlePrevWeek}
                disabled={isAnimating}
              >
                <FaChevronLeft />
              </button>
              <div style={styles.weekRange}>
                <span style={styles.weekRangeText}>
                  {weekStart.getDate()} - {weekEnd.getDate()}{" "}
                  {monthNames[weekEnd.getMonth()]} {weekEnd.getFullYear()}
                </span>
              </div>
              <button
                style={styles.navButton}
                onClick={handleNextWeek}
                disabled={isAnimating}
              >
                <FaChevronRight />
              </button>
            </div>

            <div style={styles.weekDays}>
              {dayNames.map((day, i) => (
                <div key={i} style={styles.weekDay}>
                  {day}
                </div>
              ))}
            </div>

            <div className={slideDirection} style={styles.calendarGrid}>
              {days.map((dayInfo, index) => {
                const isSelected =
                  selectedDate?.date?.toDateString() ===
                  dayInfo.date.toDateString();
                const isDisabled =
                  dayInfo.isPast || dayInfo.availableSlots === 0;

                return (
                  <div
                    key={index}
                    style={{
                      ...styles.day,
                      ...(isDisabled && styles.dayDisabled),
                      ...(isSelected && styles.daySelected),
                      ...(!isDisabled && styles.dayAvailable),
                    }}
                    onClick={() => handleDateClick(dayInfo)}
                  >
                    <div style={styles.dayNumber}>{dayInfo.day}</div>
                    {!isDisabled && (
                      <>
                        {dayInfo.isVirtual ? (
                          <FaVideo
                            style={{ ...styles.dayTypeIcon, color: "#8b5cf6" }}
                          />
                        ) : (
                          <FaMapMarkerAlt
                            style={{ ...styles.dayTypeIcon, color: "#3b82f6" }}
                          />
                        )}
                        <div style={styles.slotsCount}>
                          {dayInfo.availableSlots} slots
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div style={styles.modalHeader}>
              <button
                style={styles.backButton}
                onClick={() => setSelectedDate(null)}
              >
                <FaArrowLeft style={styles.backIcon} />
              </button>
              <h3 style={styles.modalTitle}>
                <FaCalendarAlt style={styles.titleIcon} />
                Detalles de Visita
              </h3>
              <button style={styles.closeButton} onClick={handleCloseModal}>
                ✕
              </button>
            </div>

            <div style={styles.detailsSection}>
              <div style={styles.detailsContent}>
                <div style={styles.detailRow}>
                  <div style={styles.detailIcon}>
                    <FaCalendarAlt />
                  </div>
                  <div style={styles.detailInfo}>
                    <span style={styles.detailLabel}>Fecha</span>
                    <span style={styles.detailValue}>
                      {selectedDate.date.toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                </div>

                <div style={styles.detailRow}>
                  <div style={styles.detailIcon}>
                    <FaClock />
                  </div>
                  <div style={styles.detailInfo}>
                    <span style={styles.detailLabel}>Hora</span>
                    <span style={styles.detailValue}>10:00 AM</span>
                  </div>
                </div>

                <div style={styles.detailRow}>
                  <div style={styles.detailIcon}>
                    {selectedDate.isVirtual ? <FaVideo /> : <FaMapPin />}
                  </div>
                  <div style={styles.detailInfo}>
                    <span style={styles.detailLabel}>Tipo</span>
                    <span style={styles.detailValue}>
                      {selectedDate.isVirtual ? "Virtual" : "Presencial"}
                    </span>
                  </div>
                </div>
              </div>

              <button style={styles.confirmButton} onClick={handleConfirm}>
                <FaCheckCircle style={styles.confirmIcon} />
                Confirmar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "1rem",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "1.5rem",
    maxWidth: "600px",
    width: "100%",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid #e5e7eb",
  },
  modalTitle: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#111827",
    margin: 0,
  },
  closeButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    background: "#f3f4f6",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1.25rem",
    color: "#6b7280",
    transition: "all 0.2s ease",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    flexShrink: 0,
  },
  backIcon: {
    fontSize: "0.875rem",
    color: "#6b7280",
  },
  titleIcon: {
    color: "#FF9017",
  },
  legend: {
    display: "flex",
    gap: "0.75rem",
    marginBottom: "1rem",
    justifyContent: "center",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  },
  legendIcon: {
    fontSize: "0.75rem",
  },
  legendText: {
    fontSize: "0.75rem",
    color: "#6b7280",
    fontWeight: "500",
  },
  weekNavigation: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem",
    padding: "0.5rem",
    background: "#f9fafb",
    borderRadius: "10px",
  },
  navButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    color: "#6b7280",
  },
  weekRange: {
    flex: 1,
    textAlign: "center",
  },
  weekRangeText: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#374151",
  },
  weekDays: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "0.25rem",
    marginBottom: "0.5rem",
  },
  weekDay: {
    textAlign: "center",
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "#9ca3af",
    padding: "0.25rem",
  },
  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "0.25rem",
    marginBottom: "1rem",
  },
  day: {
    aspectRatio: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5rem",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "0.875rem",
    transition: "all 0.2s ease",
    cursor: "pointer",
    position: "relative",
  },
  dayNumber: {
    fontWeight: "600",
    color: "#111827",
  },
  dayTypeIcon: {
    fontSize: "0.625rem",
    marginTop: "0.125rem",
  },
  slotsCount: {
    fontSize: "0.625rem",
    color: "#6b7280",
    fontWeight: "500",
  },
  dayAvailable: {
    background: "#f9fafb",
  },
  dayDisabled: {
    background: "#f9fafb",
    opacity: 0.4,
    cursor: "not-allowed",
  },
  daySelected: {
    borderColor: "#FF9017",
    background: "#FFF5EB",
    boxShadow: "0 0 0 2px rgba(255, 144, 23, 0.2)",
  },
  detailsSection: {
    marginTop: "0",
  },
  detailsContent: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "0.75rem",
    marginBottom: "1.5rem",
  },
  detailRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.375rem",
    padding: "0.5rem",
    background: "#f9fafb",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  },
  detailIcon: {
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #FF9017 0%, #FF7A00 100%)",
    borderRadius: "8px",
    color: "white",
    fontSize: "0.75rem",
  },
  detailInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.125rem",
  },
  detailLabel: {
    fontSize: "0.625rem",
    color: "#6b7280",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: "0.75rem",
    color: "#111827",
    fontWeight: "600",
    textAlign: "center",
  },
  confirmButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.75rem",
    background: "linear-gradient(135deg, #FF9017 0%, #FF7A00 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(255, 144, 23, 0.3)",
  },
  confirmIcon: {
    fontSize: "1rem",
  },
  successContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "2rem 1rem",
    minHeight: "300px",
  },
  successIconContainer: {
    width: "80px",
    height: "80px",
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1.5rem",
    animation: "pulse 2s ease-in-out infinite",
  },
  successIcon: {
    fontSize: "2.5rem",
    color: "white",
  },
  successTitle: {
    fontSize: "1.75rem",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 1rem 0",
  },
  successMessage: {
    fontSize: "1rem",
    color: "#6b7280",
    margin: "0 0 1.5rem 0",
    lineHeight: "1.6",
    maxWidth: "400px",
  },
  successDetails: {
    display: "flex",
    gap: "1.5rem",
    marginBottom: "1.5rem",
    padding: "1rem",
    background: "#f9fafb",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },
  successDetailItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#374151",
  },
  successDetailIcon: {
    fontSize: "1rem",
    color: "#FF9017",
  },
  successFooter: {
    fontSize: "0.875rem",
    color: "#9ca3af",
    margin: "0",
    fontStyle: "italic",
  },
};

export default CalendarModal;
