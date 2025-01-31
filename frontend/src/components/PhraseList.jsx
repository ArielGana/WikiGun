import React from "react";

const PhraseList = ({ results, phrases }) => {
  const getPhraseForAttribute = (attribute, percentage) => {
    const matchedPhrase = phrases.find(
      (phrase) => phrase.attribute === attribute
    );

    // Si se encuentra una frase para el atributo, inserta el porcentaje
    return matchedPhrase
      ? matchedPhrase.phrase.replace("{percentage}", percentage)
      : `No hay una frase configurada para ${attribute}`;
  };

  return (
    <div className="phrase-list">
      <h4>Frases de Comparación</h4>
      <ul>
        {results.map((result) => (
          <li key={result.attr}>
            {getPhraseForAttribute(result.attr, result.percentage)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhraseList;
