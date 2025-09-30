// src/pages/Classic/utils/mapHelpers.js
import { DivIcon } from "leaflet";
import {
  FaHospital,
  FaDumbbell,
  FaShoppingCart,
  FaTree,
  FaSchool,
  FaBus,
  FaUtensils,
  FaCoffee,
  FaMapMarkerAlt,
} from "react-icons/fa";

export const formatPrice = (price) => {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`;
  } else if (price >= 1000) {
    return `$${(price / 1000).toFixed(0)}K`;
  } else {
    return `$${price}`;
  }
};

export const getNearbyPlaceIcon = (type) => {
  const icons = {
    hospital: FaHospital,
    gym: FaDumbbell,
    supermarket: FaShoppingCart,
    park: FaTree,
    school: FaSchool,
    bus: FaBus,
    restaurant: FaUtensils,
    cafe: FaCoffee,
  };
  return icons[type] || FaMapMarkerAlt;
};

export const getNearbyPlaceColor = (type) => {
  const colors = {
    hospital: "#ef4444",
    gym: "#f59e0b",
    supermarket: "#10b981",
    park: "#22c55e",
    school: "#3b82f6",
    bus: "#8b5cf6",
    restaurant: "#ec4899",
    cafe: "#f97316",
  };
  return colors[type] || "#6b7280";
};

export const createCustomMarker = (
  property,
  isSelected,
  isHovered,
  activeTab
) => {
  const price =
    activeTab === "comprar"
      ? formatPrice(property.price)
      : `${property.price}/mes`;

  // Marker is highlighted if it's selected OR hovered
  const isHighlighted = isSelected || isHovered;

  return new DivIcon({
    html: `
      <div class="price-marker ${isHighlighted ? "selected" : ""}">
        ${price}
      </div>
    `,
    className: "custom-price-marker",
    iconSize: [60, 30],
    iconAnchor: [30, 15],
    popupAnchor: [0, -15],
  });
};

export const createNearbyPlaceMarker = (place, isHovered = false) => {
  const color = getNearbyPlaceColor(place.type);

  return new DivIcon({
    html: `
      <div class="nearby-place-marker ${
        isHovered ? "hovered" : ""
      }" style="background-color: ${color};">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18" height="18">
          ${getIconSvgPath(place.type)}
        </svg>
      </div>
    `,
    className: "custom-nearby-marker",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const getIconSvgPath = (type) => {
  const paths = {
    hospital:
      '<path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm-1 16h-2v-3H6v-2h3V10h2v3h3v2h-3v3z"/>',
    gym: '<path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>',
    supermarket:
      '<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>',
    park: '<path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/>',
    school:
      '<path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>',
    bus: '<path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>',
    restaurant:
      '<path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>',
    cafe: '<path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM2 21h18v-2H2v2z"/>',
  };
  return paths[type] || paths.park;
};
