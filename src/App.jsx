import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cortos from "./pages/Cortos";
import Classic from "./pages/Classic";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cortos" element={<Cortos />} />
          <Route path="/classic" element={<Classic />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
