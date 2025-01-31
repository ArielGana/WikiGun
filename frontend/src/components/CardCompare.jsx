import React from "react";
import "../styles/cardcompare.css";

const CardCompare = ({ weapons, onWeaponClick }) => {
  return (
    <div className="weapon-cards-container">
      {weapons.length > 0 ? (
        weapons.map((weapon, index) => (
          <div
            key={index}
            className="weapon-card"
            onClick={() => onWeaponClick(weapon)}
          >
            <img
              src={weapon.img}
              alt={weapon.name}
              className="weapon-card-image"
            />
            <h3 className="weapon-card-title">{weapon.name}</h3>
          </div>
        ))
      ) : (
        <p className="no-weapons-message">No se encontraron armas.</p>
      )}
    </div>
  );
};

export default CardCompare;
