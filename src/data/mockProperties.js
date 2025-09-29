// src/pages/Classic/data/mockProperties.js

export const generateAvailableDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const status =
      Math.random() > 0.7
        ? "taken"
        : Math.random() > 0.3
        ? "available"
        : "unavailable";
    dates.push({
      date: date,
      status: status,
    });
  }
  return dates;
};

export const mockProperties = [
  {
    id: 1,
    name: "Casa Moderna Equipetrol",
    price: 450000,
    type: "Casa",
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    location: "Equipetrol Norte",
    coordinates: [-17.7833, -63.1667],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
    ],
    forSale: true,
    nearbyPlaces: [
      {
        id: 1,
        type: "hospital",
        name: "Hospital Equipetrol",
        distance: "1.2 km",
        coordinates: [-17.7843, -63.1677],
      },
      {
        id: 2,
        type: "gym",
        name: "Fitness Center",
        distance: "0.5 km",
        coordinates: [-17.7823, -63.1657],
      },
      {
        id: 3,
        type: "supermarket",
        name: "Supermercado",
        distance: "0.8 km",
        coordinates: [-17.7853, -63.1687],
      },
      {
        id: 4,
        type: "park",
        name: "Parque Urbano",
        distance: "0.3 km",
        coordinates: [-17.7813, -63.1647],
      },
    ],
    availableDates: generateAvailableDates(),
    street360Images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
    ],
  },
  {
    id: 2,
    name: "Departamento Las Palmas",
    price: 280000,
    type: "Departamento",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    location: "Las Palmas",
    coordinates: [-17.79, -63.16],
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    ],
    forSale: true,
    nearbyPlaces: [
      {
        id: 5,
        type: "school",
        name: "Colegio Internacional",
        distance: "0.7 km",
        coordinates: [-17.791, -63.161],
      },
      {
        id: 6,
        type: "restaurant",
        name: "Restaurant Gourmet",
        distance: "0.4 km",
        coordinates: [-17.789, -63.159],
      },
    ],
    availableDates: generateAvailableDates(),
    street360Images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    ],
  },
  {
    id: 3,
    name: "Casa Familiar Urbari",
    price: 3500,
    type: "Casa",
    bedrooms: 3,
    bathrooms: 2,
    area: 200,
    location: "Urbari",
    coordinates: [-17.77, -63.18],
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    ],
    forSale: false,
    nearbyPlaces: [
      {
        id: 7,
        type: "bus",
        name: "Parada de Bus",
        distance: "0.2 km",
        coordinates: [-17.771, -63.181],
      },
      {
        id: 8,
        type: "cafe",
        name: "Café Urbano",
        distance: "0.6 km",
        coordinates: [-17.769, -63.179],
      },
    ],
    availableDates: generateAvailableDates(),
    street360Images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    ],
  },
  {
    id: 4,
    name: "Penthouse Centro",
    price: 650000,
    type: "Penthouse",
    bedrooms: 4,
    bathrooms: 4,
    area: 180,
    location: "Centro",
    coordinates: [-17.78, -63.182],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
    ],
    forSale: true,
    nearbyPlaces: [
      {
        id: 9,
        type: "hospital",
        name: "Clínica Central",
        distance: "1.0 km",
        coordinates: [-17.781, -63.183],
      },
      {
        id: 10,
        type: "gym",
        name: "PowerGym",
        distance: "0.3 km",
        coordinates: [-17.779, -63.181],
      },
    ],
    availableDates: generateAvailableDates(),
    street360Images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    ],
  },
  {
    id: 5,
    name: "Apartamento Barrio Norte",
    price: 2800,
    type: "Apartamento",
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    location: "Barrio Norte",
    coordinates: [-17.765, -63.175],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    ],
    forSale: false,
    nearbyPlaces: [
      {
        id: 11,
        type: "supermarket",
        name: "Super Norte",
        distance: "0.5 km",
        coordinates: [-17.766, -63.176],
      },
      {
        id: 12,
        type: "park",
        name: "Parque Norte",
        distance: "0.4 km",
        coordinates: [-17.764, -63.174],
      },
    ],
    availableDates: generateAvailableDates(),
    street360Images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    ],
  },
  {
    id: 6,
    name: "Casa Colonial Plan 3000",
    price: 320000,
    type: "Casa",
    bedrooms: 5,
    bathrooms: 3,
    area: 350,
    location: "Plan 3000",
    coordinates: [-17.795, -63.15],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    ],
    forSale: true,
    nearbyPlaces: [
      {
        id: 13,
        type: "school",
        name: "Escuela Plan 3000",
        distance: "0.9 km",
        coordinates: [-17.796, -63.151],
      },
      {
        id: 14,
        type: "bus",
        name: "Terminal",
        distance: "1.5 km",
        coordinates: [-17.794, -63.149],
      },
    ],
    availableDates: generateAvailableDates(),
    street360Images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    ],
  },
];
