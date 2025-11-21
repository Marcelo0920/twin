import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cortos from "./pages/Cortos";
import Classic from "./pages/Classic";
import "./App.css";
import PropertyDetails from "./pages/PropertyDetails";
import Guardados from "./pages/Guardados";
import Shorts from "./pages/Shorts";
import MisPropiedades from "./pages/MisPropiedades";
import Cuaderno from "./pages/Cuaderno";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cortos" element={<Cortos />} />
          <Route path="/classic" element={<Classic />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/guardados" element={<Guardados />} />
          <Route path="/shorts" element={<Shorts />} />
          <Route path="/mis-propiedades" element={<MisPropiedades />} />
          <Route path="/cuaderno" element={<Cuaderno />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
