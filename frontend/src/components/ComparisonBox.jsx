import React, { useEffect, useState } from "react";
import "../styles/ComparisonBox.css";

const ComparisonBox = ({ selectedWeapons, onRemove }) => {
  const [comparisonResults, setComparisonResults] = useState([]);
  const [bestAttributes, setBestAttributes] = useState({
    weapon1: [],
    weapon2: [],
  });

  // Función para calcular la diferencia porcentual entre dos valores
  const calculateDifference = (
    value1,
    value2,
    higherIsBetter,
    isPercentage
  ) => {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    if (isNaN(num1) || isNaN(num2)) return "Valor inválido";

    if (num1 === 0 && num2 === 0) return "Sin diferencia";

    const difference = (
      (Math.abs(num2 - num1) / ((num1 + num2) / 2)) *
      100
    ).toFixed(2);

    const isBetter = higherIsBetter ? num2 > num1 : num2 < num1;
    const sign = isBetter ? "Mayor " : "Menor";

    // Si se necesita mostrar como porcentaje
    return isPercentage ? `${sign} ${difference} %` : `${sign} ${difference}`;
  };

  const compareCaliber = (caliber1, caliber2, weapon1Name, weapon2Name) => {
    const caliberToValue = (caliber) => {
      switch (caliber) {
        case "9mm":
          return 90;
        case ".45 ACP":
          return 150;
        case "7.62mm":
          return 300;
        case "12 Gauge":
          return 250;
        case "0.408 CheyTac":
          return 500;
        default:
          return 0; // Default value for undefined caliber
      }
    };

    const value1 = caliberToValue(caliber1);
    const value2 = caliberToValue(caliber2);

    // Devuelve el nombre del arma con el calibre más fuerte
    if (value1 > value2) return `${weapon1Name} tiene mayor calibre`;
    if (value2 > value1) return `${weapon2Name} tiene mayor calibre`;
    return "Ambos tienen el mismo calibre";
  };

  useEffect(() => {
    if (selectedWeapons.length === 2) {
      // Variables para almacenar los mejores atributos
      let weapon1BestAttributes = [];
      let weapon2BestAttributes = [];

      // Define atributos donde menor es mejor
      const lowerIsBetter = [
        "Recoil",
        "Peso",
        "Longitud",
        "Calibre",
        "Movilidad",
      ];

      // Función para determinar el mejor atributo
      const determineBestWeapon = (attribute, value1, value2) => {
        if (lowerIsBetter.includes(attribute)) {
          // Menor es mejor para este atributo
          if (value1 < value2) {
            weapon1BestAttributes.push(attribute);
          } else if (value2 < value1) {
            weapon2BestAttributes.push(attribute);
          }
        } else {
          // Mayor es mejor para este atributo
          if (value1 > value2) {
            weapon1BestAttributes.push(attribute);
          } else if (value2 > value1) {
            weapon2BestAttributes.push(attribute);
          }
        }
      };

      // Comparar atributos
      const results = [
        {
          attr: "Recoil",
          percentage: calculateDifference(
            selectedWeapons[1].recoil,
            selectedWeapons[0].recoil,
            true // Default to show percentage
          ),
        },
        {
          attr: "Durabilidad",
          percentage: calculateDifference(
            selectedWeapons[1].durabilidad,
            selectedWeapons[0].durabilidad,
            true // Default to show percentage
          ),
        },
        {
          attr: "Capacidad",
          percentage: calculateDifference(
            selectedWeapons[1].capacidad,
            selectedWeapons[0].capacidad,
            true // Default to show percentage
          ),
        },
        {
          attr: "Calibre",
          percentage: compareCaliber(
            selectedWeapons[1].calibre,
            selectedWeapons[0].calibre,
            selectedWeapons[1].name,
            selectedWeapons[0].name
          ),
        },
        {
          attr: "Cadencia",
          percentage: calculateDifference(
            selectedWeapons[1].cadencia,
            selectedWeapons[0].cadencia,
            true // Default to show percentage
          ),
        },
        {
          attr: "Movilidad",
          percentage: calculateDifference(
            selectedWeapons[1].movilidad,
            selectedWeapons[0].movilidad,
            false // Default to show percentage
          ),
        },
        {
          attr: "Peso",
          percentage: calculateDifference(
            selectedWeapons[1].peso,
            selectedWeapons[0].peso,
            true // Default to show percentage
          ),
        },
        {
          attr: "Longitud",
          percentage: calculateDifference(
            selectedWeapons[1].longitud,
            selectedWeapons[0].longitud,
            true // Default to show percentage
          ),
        },
      ];

      // Determinar el mejor arma por atributo
      results.forEach((result) =>
        determineBestWeapon(
          result.attr,
          selectedWeapons[0][result.attr.toLowerCase()],
          selectedWeapons[1][result.attr.toLowerCase()]
        )
      );

      setComparisonResults(results);
      setBestAttributes({
        weapon1: weapon1BestAttributes,
        weapon2: weapon2BestAttributes,
      });
    } else {
      // Reiniciar si no hay dos armas seleccionadas
      setComparisonResults([]);
      setBestAttributes({ weapon1: [], weapon2: [] });
    }
  }, [selectedWeapons]);

  return (
    <div className="comparison-box">
      <h3>Comparación de Armas</h3>
      {selectedWeapons.length > 0 ? (
        <div className="comparison-container">
          <div className="comparison-grid">
            {selectedWeapons.map((weapon, index) => (
              <div key={index} className="comparison-item">
                <img src={weapon.img} alt={weapon.name} />
                <h4>{weapon.name}</h4>
                <button
                  className="remove-button"
                  onClick={() => onRemove(weapon)}
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No hay armas seleccionadas para comparar.</p>
      )}

      {comparisonResults.length > 0 && (
        <>
          <h4>Lo Mejor de Cada Arma</h4>
          <div className="best-attributes">
            <div className="best-weapon">
              <h5>{selectedWeapons[0].name}</h5>
              <ul>
                {bestAttributes.weapon1.map((attr) => (
                  <li key={attr}>{attr}</li>
                ))}
              </ul>
            </div>
            {selectedWeapons[1] && (
              <div className="best-weapon">
                <h5>{selectedWeapons[1].name}</h5>
                <ul>
                  {bestAttributes.weapon2.map((attr) => (
                    <li key={attr}>{attr}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <h4>Resultados de Comparación </h4>
          <table>
            <thead>
              <tr>
                <th>Atributo</th>
                <th>
                  Diferencia Con{" "}
                  {selectedWeapons[1] ? selectedWeapons[1].name : "N/A"}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonResults.map((result) => (
                <tr key={result.attr}>
                  <td>{result.attr}</td>
                  <td>{result.percentage} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ComparisonBox;
