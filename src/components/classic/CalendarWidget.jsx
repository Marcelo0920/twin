// src/pages/Classic/components/CalendarWidget.jsx
import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const CalendarWidget = ({ availableDates }) => {
  const [selectedDate, setSelectedDate] = useState(null);

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

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const getDayStatus = (date) => {
    const dateObj = availableDates.find(
      (d) => d.date.toDateString() === date.toDateString()
    );
    return dateObj?.status || "unavailable";
  };

  const renderCalendarDays = () => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const status = getDayStatus(date);

      days.push(
        <div
          key={i}
          className={`calendar-day ${status} ${
            selectedDate?.toDateString() === date.toDateString()
              ? "selected"
              : ""
          }`}
          onClick={() => status === "available" && setSelectedDate(date)}
        >
          <div className="day-number">{date.getDate()}</div>
          <div className="day-name">{dayNames[date.getDay()]}</div>
          {status === "available" && <FaCheckCircle className="day-icon" />}
          {status === "taken" && <FaExclamationCircle className="day-icon" />}
          {status === "unavailable" && <FaTimesCircle className="day-icon" />}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-widget">
      <div className="calendar-header">
        <h3>
          <FaCalendarAlt /> Agendar Visita
        </h3>
        <div className="calendar-legend">
          <div className="legend-item">
            <FaCheckCircle style={{ color: "#10b981" }} />
            <span>Disponible</span>
          </div>
          <div className="legend-item">
            <FaExclamationCircle style={{ color: "#f59e0b" }} />
            <span>Reservado</span>
          </div>
          <div className="legend-item">
            <FaTimesCircle style={{ color: "#ef4444" }} />
            <span>No disponible</span>
          </div>
        </div>
      </div>
      <div className="calendar-month">
        {monthNames[currentMonth]} {currentYear}
      </div>
      <div className="calendar-grid">{renderCalendarDays()}</div>
      {selectedDate && (
        <div className="selected-date-info">
          <FaClock />
          <span>
            Visita agendada para:{" "}
            {selectedDate.toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <button className="confirm-visit-btn">Confirmar Visita</button>
        </div>
      )}
    </div>
  );
};

export default CalendarWidget;
