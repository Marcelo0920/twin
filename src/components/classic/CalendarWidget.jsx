import React, { useState, useEffect } from "react";
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

const CalendarWidget = ({ availableDates }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [slideDirection, setSlideDirection] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const peopleScheduled = Math.floor(Math.random() * 6) + 3;

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
      .slide-in-right {
        animation: slideInFromRight 0.3s ease-out;
      }
      .slide-in-left {
        animation: slideInFromLeft 0.3s ease-out;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

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
      alert(
        `Visita ${
          selectedDate.isVirtual ? "virtual" : "presencial"
        } confirmada para ${selectedDate.date.toLocaleDateString("es-ES")}`
      );
      setSelectedDate(null);
    }
  };

  const days = getWeekDays();
  const weekStart = getWeekStart(currentWeekStart);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  if (!showCalendar) {
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
          <button
            style={styles.scheduleButton}
            onClick={() => setShowCalendar(true)}
          >
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
              <FaVideo
                style={{ ...styles.visitOptionIcon, color: "#8b5cf6" }}
              />
              <span style={styles.visitOptionText}>Visitas virtuales</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => {
            setShowCalendar(false);
            setSelectedDate(null);
          }}
        >
          <FaArrowLeft style={styles.backIcon} />
        </button>
        <h3 style={styles.title}>
          <FaCalendarAlt style={styles.titleIcon} />
          Agendar Visita
        </h3>
      </div>

      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <FaMapMarkerAlt style={{ ...styles.legendIcon, color: "#3b82f6" }} />
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
            selectedDate?.date?.toDateString() === dayInfo.date.toDateString();
          const isDisabled = dayInfo.isPast || dayInfo.availableSlots === 0;

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

      {selectedDate && (
        <div style={styles.detailsSection}>
          <div style={styles.detailsHeader}>
            <span style={styles.detailsTitle}>Detalles de Visita</span>
          </div>

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
      )}
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
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
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
  header: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1rem",
    paddingBottom: "0.75rem",
    borderBottom: "1px solid #f3f4f6",
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
  title: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "1.125rem",
    fontWeight: "700",
    color: "#111827",
    margin: 0,
    flex: 1,
  },
  titleIcon: {
    color: "#667eea",
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
    borderColor: "#667eea",
    background: "#eef2ff",
    boxShadow: "0 0 0 2px rgba(102, 126, 234, 0.2)",
  },
  detailsSection: {
    marginTop: "0.75rem",
    paddingTop: "0.75rem",
    borderTop: "1px solid #e5e7eb",
  },
  detailsHeader: {
    marginBottom: "0.5rem",
  },
  detailsTitle: {
    fontSize: "0.875rem",
    fontWeight: "700",
    color: "#111827",
  },
  detailsContent: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "0.5rem",
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
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
  },
  confirmIcon: {
    fontSize: "1rem",
  },
};

export default CalendarWidget;
