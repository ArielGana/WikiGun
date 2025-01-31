import React, { useState, useEffect } from "react";

import "../styles/navgun.css";

const Navbar = ({ setCategory }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const categoryMap = {
    Pistolas: "pistolas",
    Escopetas: "escopetas",
    Rifles: "rifles",
    Subfusiles: "subfusiles",
    Lanzagranadas: "lanzagranadas",
    "Fusiles de Precision": "fusilesfrancotirador",
    "Lanza Cohetes": "lanzadorescohetes",
  };
  useEffect(() => {
    // Desplaza automáticamente al inicio cuando se renderiza la página
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Suave desplazamiento, opcional
    });
  }, []);
  const handleButtonClick = (categoryKey) => {
    setActiveCategory(categoryKey);
    setCategory(categoryMap[categoryKey]);
  };

  return (
    <nav className="navbar">
      {Object.keys(categoryMap).map((displayCategory) => (
        <button
          key={displayCategory}
          className={`navbar-button ${
            activeCategory === displayCategory ? "active" : ""
          }`}
          onClick={() => handleButtonClick(displayCategory)}
        >
          {displayCategory}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
