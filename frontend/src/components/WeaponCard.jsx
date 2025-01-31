import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WeaponCard.css";

const WeaponCard = ({ category }) => {
  const [weapons, setWeapons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWeapons = async () => {
      if (category) {
        try {
          const response = await fetch(
            `http://localhost:5000/api/armas?category=${category}`
          );
          const data = await response.json();
          setWeapons(data);
        } catch (error) {
          console.error("Error fetching weapons:", error);
        }
      }
    };

    fetchWeapons();
  }, [category]);

  return (
    <div className="weapon-cards-container">
      {weapons.length > 0 ? (
        weapons.map((weapon) => (
          <WeaponCardItem
            key={weapon.id_arma}
            weapon={weapon}
            category={category}
            onViewMore={() => {
              navigate(`/Armas?weapon=${weapon.id_arma}&category=${category}`);

              window.scrollTo({
                top: 0,
                behavior: "smooth", // Da un efecto suave de desplazamiento
              });
            }}
          />
        ))
      ) : (
        <p>No se encontraron armas para esta categoría.</p>
      )}
    </div>
  );
};

// Componente para cada tarjeta individual
const WeaponCardItem = ({ weapon, onViewMore }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };
  const navigate = useNavigate();
  const onViewMorecom = () => {
    // Navega a la página deseada
    navigate("/Comparador");
  };

  return (
    <div
      className={`card ${flipped ? "flipped" : ""}`}
      onMouseEnter={handleFlip}
      onMouseLeave={handleFlip}
    >
      <div className="card-front">
        <h3>{weapon.name}</h3>
        <img src={weapon.img} alt={weapon.name} className="weapon-image" />
      </div>
      <div className="card-back">
        <h3>{weapon.name}</h3>
        <img
          src={weapon.img}
          alt={`${weapon.name} small`}
          className="weapon-image-small"
        />
        <ul className="weapon-stats">
          <li>Precisión: {renderStars(weapon.accuracy)}</li>
          <li>Diseño: {renderStars(weapon.diseño)}</li>
          <li>Durabilidad: {renderStars(weapon.durabilidad)}</li>
          <li>Recoil: {renderStars(weapon.recoil, 100, true)}</li>
          <li id="cap">Capacidad: {weapon.capacidad} Tiros</li>
        </ul>

        <div>
          <button className="btnfinal" onClick={onViewMorecom}>
            Comparar
          </button>{" "}
          <button className="btnfinal" onClick={onViewMore}>
            Ver Más
          </button>
        </div>
      </div>
    </div>
  );
};

const renderStars = (rating, max = 100, inverse = false) => {
  const effectiveRating = inverse ? max - rating : rating;
  const normalizedRating = Math.round((effectiveRating / max) * 5);

  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={`star ${i < normalizedRating ? "filled" : ""}`}>
        ★
      </span>
    );
  }
  return stars;
};

export default WeaponCard;
