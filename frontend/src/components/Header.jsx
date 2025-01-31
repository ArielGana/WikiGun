import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css"; // Asegúrate de tener el archivo de estilos

const Header = () => {
  return (
    <header className="header">
      {/* Imagen a la izquierda */}
      <div className="header-image">
        <img
          src="/images/wikiarm.png" // Coloca la URL de tu imagen aquí
          alt="Logo o Imagen"
        />
      </div>

      {/* Navegación a la derecha */}
      <nav className="header-nav">
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
