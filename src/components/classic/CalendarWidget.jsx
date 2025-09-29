import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaVideo,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";

const CalendarWidget = ({ availableDates }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showSlots, setShowSlots] = useState(false);

  // Random number of people who scheduled (between 3-8)
  const peopleScheduled = Math.floor(Math.random() * 6) + 3;

  // Add keyframe animation for pulse effect
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
  const dayNames = ["D", "L", "M", "X", "J", "V", "S"];

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Generate time slots based on visit type
  const generateTimeSlots = (isVirtual) => {
    const slots = [];
    const totalSlots = isVirtual ? 10 : 5;
    const startHour = 9;
    const interval = isVirtual ? 60 : 120; // 1 hour for virtual, 2 hours for presencial

    for (let i = 0; i < totalSlots; i++) {
      const totalMinutes = startHour * 60 + i * interval;
      const hour = Math.floor(totalMinutes / 60);
      const minute = totalMinutes % 60;

      if (hour >= 18) break; // No slots after 6 PM

      slots.push({
        time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(
          2,
          "0"
        )}`,
        available: Math.random() > 0.3, // Random availability for demo
      });
    }
    return slots;
  };

  // Check if date is Saturday (virtual) or other day (presencial)
  const isVirtualDay = (date) => {
    return date.getDay() === 6; // Saturday
  };

  // Get days in current month
  const getDaysInMonth = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isPast =
        date <
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        );
      const isVirtual = isVirtualDay(date);

      days.push({
        date,
        day,
        isPast,
        isVirtual,
        availableSlots: isPast
          ? 0
          : isVirtual
          ? Math.floor(Math.random() * 6) + 5
          : Math.floor(Math.random() * 3) + 2,
      });
    }

    return days;
  };

  const handleDateClick = (dayInfo) => {
    if (!dayInfo || dayInfo.isPast || dayInfo.availableSlots === 0) return;

    // If clicking on already selected date, unselect it
    if (selectedDate?.date?.toDateString() === dayInfo.date.toDateString()) {
      setSelectedDate(null);
      setSelectedSlot(null);
      setShowSlots(false);
      return;
    }

    setSelectedDate(dayInfo);
    setSelectedSlot(null);
    setShowSlots(true);
  };

  const handleSlotClick = (slot) => {
    if (!slot.available) return;
    setSelectedSlot(slot);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedSlot) {
      alert(
        `Visita ${
          selectedDate.isVirtual ? "virtual" : "presencial"
        } confirmada para ${selectedDate.date.toLocaleDateString(
          "es-ES"
        )} a las ${selectedSlot.time}`
      );
      setSelectedDate(null);
      setSelectedSlot(null);
      setShowSlots(false);
    }
  };

  const days = getDaysInMonth();
  const timeSlots = selectedDate
    ? generateTimeSlots(selectedDate.isVirtual)
    : [];

  // Initial promotional view
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
              {peopleScheduled} personas agendaron para ver esta casa esta
              semana
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
        <div style={styles.headerTop}>
          <button
            style={styles.backButton}
            onClick={() => {
              setShowCalendar(false);
              setSelectedDate(null);
              setSelectedSlot(null);
              setShowSlots(false);
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
      </div>

      <div style={styles.monthHeader}>
        {monthNames[currentMonth]} {currentYear}
      </div>

      <div style={styles.weekDays}>
        {dayNames.map((day, i) => (
          <div key={i} style={styles.weekDay}>
            {day}
          </div>
        ))}
      </div>

      <div style={styles.calendarGrid}>
        {days.map((dayInfo, index) => {
          if (!dayInfo) {
            return <div key={`empty-${index}`} style={styles.emptyDay} />;
          }

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

      {showSlots && selectedDate && (
        <div style={styles.slotsSection}>
          <div style={styles.slotsHeader}>
            <span style={styles.slotsTitle}>
              {selectedDate.isVirtual ? (
                <>
                  <FaVideo style={styles.slotsTitleIcon} /> Visita Virtual
                </>
              ) : (
                <>
                  <FaMapMarkerAlt style={styles.slotsTitleIcon} /> Visita
                  Presencial
                </>
              )}
            </span>
            <span style={styles.selectedDateText}>
              {selectedDate.date.toLocaleDateString("es-ES", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>

          <div style={styles.slotsGrid}>
            {timeSlots.map((slot, index) => (
              <div
                key={index}
                style={{
                  ...styles.slotButton,
                  ...(slot.available
                    ? styles.slotAvailable
                    : styles.slotUnavailable),
                  ...(selectedSlot?.time === slot.time && styles.slotSelected),
                }}
                onClick={() => handleSlotClick(slot)}
              >
                <FaClock style={styles.slotIcon} />
                {slot.time}
              </div>
            ))}
          </div>

          {selectedSlot && (
            <button style={styles.confirmButton} onClick={handleConfirm}>
              <FaCheckCircle style={styles.confirmIcon} />
              Confirmar Visita
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "1.25rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
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
    flexDirection: "column",
    gap: "0.75rem",
    marginBottom: "1rem",
    paddingBottom: "0.75rem",
    borderBottom: "1px solid #f3f4f6",
  },
  headerTop: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
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
  monthHeader: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "0.75rem",
    textAlign: "center",
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
  emptyDay: {
    aspectRatio: "1",
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
    ":hover": {
      borderColor: "#667eea",
      transform: "scale(1.05)",
    },
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
  slotsSection: {
    marginTop: "1rem",
    paddingTop: "1rem",
    borderTop: "1px solid #e5e7eb",
  },
  slotsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.75rem",
  },
  slotsTitle: {
    display: "flex",
    alignItems: "center",
    gap: "0.375rem",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#111827",
  },
  slotsTitleIcon: {
    fontSize: "0.875rem",
  },
  selectedDateText: {
    fontSize: "0.75rem",
    color: "#6b7280",
    fontWeight: "500",
  },
  slotsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "0.5rem",
    marginBottom: "0.75rem",
  },
  slotButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.25rem",
    padding: "0.625rem 0.5rem",
    borderRadius: "8px",
    fontSize: "0.75rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    border: "1px solid",
  },
  slotIcon: {
    fontSize: "0.75rem",
  },
  slotAvailable: {
    background: "#f0fdf4",
    borderColor: "#86efac",
    color: "#166534",
  },
  slotUnavailable: {
    background: "#f9fafb",
    borderColor: "#e5e7eb",
    color: "#9ca3af",
    cursor: "not-allowed",
    opacity: 0.5,
  },
  slotSelected: {
    background: "#667eea",
    borderColor: "#667eea",
    color: "white",
    transform: "scale(1.05)",
  },
  confirmButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.75rem",
    background: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  confirmIcon: {
    fontSize: "1rem",
  },
};

export default CalendarWidget;
