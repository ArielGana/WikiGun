import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Gallery from "./Galleryview";
import Vid from "./Video";
import "../styles/Infoarma.css";

const InfoArmas = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const weaponId = queryParams.get("weapon");
  const category = queryParams.get("category");

  const [weapon, setWeapon] = useState(null);

  useEffect(() => {
    // Desplaza automáticamente al inicio cuando se renderiza la página
    window.scrollTo({
      top: 0,
    });

    const fetchWeaponDetails = async () => {
      if (weaponId && category) {
        try {
          // Convertir la primera letra de category a mayúscula
          const formattedCategory =
            category.charAt(0).toUpperCase() + category.slice(1);

          const response = await fetch(
            `http://localhost:5000/api/guncompare?table=${formattedCategory}&id=${weaponId}`
          );

          console.log(formattedCategory); // Loguea el nombre de category con la primera letra en mayúscula
          console.log(weaponId);

          const data = await response.json();
          setWeapon(data[0]);
        } catch (error) {
          console.error("Error fetching weapon details:", error);
        }
      }
    };

    fetchWeaponDetails();
  }, [weaponId, category]);

  if (!weapon) {
    return <div>Cargando detalles del arma...</div>;
  }
  const classifyMobility = (movilidad) => {
    if (movilidad < 0.7) return "Buena movilidad";
    if (movilidad <= 1.9) return "Movilidad Moderada";
    if (movilidad <= 2.6) return "Movilidad Dificultosa";
    return "Movilidad Altamente Dificultosa";
  };
  const classifyDiseño = (movilidad) => {
    if (movilidad < 25) return "Feo";
    if (movilidad <= 50) return "Medianamente Bonito";
    if (movilidad <= 75) return "Bonito";
    return "Hermoso";
  };
  const classifyResis = (movilidad) => {
    if (movilidad < 25) return "Endeble";
    if (movilidad <= 50) return "resistente";
    if (movilidad <= 75) return "Ultra Resistente";
    return "Inmortal";
  };
  return (
    <div className="info-armas">
      <div className="gallery-container">
        <Gallery weaponName={weapon.name} />
      </div>
      <div className="info-container">
        <h1>Descripcion</h1>
        <p>{weapon.description}</p>
        <div>
          <h2>Características:</h2>
          <ul>
            <li>Presicion: {weapon.accuracy} %</li>
            <li>Diseño : {classifyDiseño(weapon.diseño)} </li>
            <li>Durabilidad : {classifyResis(weapon.durabilidad)} </li>
            <li>Cadencia : {weapon.cadencia} Disparos/Min</li>
            <li>Movilidad : {classifyMobility(weapon.movilidad)}</li>
            <li>Peso : {weapon.peso} g</li>
            <li>Longitud : {weapon.longitud} cm</li>
            <li>Calibre : {weapon.calibre} </li>
            <li>Capacidad : {weapon.capacidad} Tiros</li>
            <li>Accion : {weapon.tipo_accion} </li>
          </ul>
        </div>
        <div>
          <h2>Historia</h2>
          <p>{weapon.historydata}</p>
        </div>
        <Vid video={weapon.Video} />
      </div>
    </div>
  );
};
export default InfoArmas;
