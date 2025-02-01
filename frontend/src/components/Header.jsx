import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css"; // Asegúrate de tener el archivo de estilos

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      {/* Imagen a la izquierda */}
      <div className="header-image">
        <img
          src="/images/wikiarm.png" // Coloca la URL de tu imagen aquí
          alt="Logo o Imagen"
        />
      </div>

      {/* Icono de menú hamburguesa */}
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Navegación */}
      <nav className={`header-nav ${isMenuOpen ? "open" : ""}`}>
        <Link to="/" className="nav-button">
          Inicio
        </Link>
        <Link to="/comparador" className="nav-button">
          Comparador
        </Link>
        <Link to="/armas" className="nav-button">
          Armas
        </Link>
      </nav>
    </header>
  );
};

export default Header;
