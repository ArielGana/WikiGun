import React, { useState, useEffect } from "react";
import "../styles/WeaponFilter.css";
import WeaponCard from "./CardCompare";
import ComparisonBox from "./ComparisonBox";

const WeaponFilter = () => {
  const [categories, setCategories] = useState([
    "Pistolas",
    "Escopetas",
    "Rifles",
    "Subfusiles",
    "Lanzagranadas",
    "Lanzadorescohetes",
    "Fusilesfrancotirador",
  ]);
  const [weapons, setWeapons] = useState([]);
  const [filteredWeapons, setFilteredWeapons] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWeapons, setSelectedWeapons] = useState([]); // Nueva variable de estado
  useEffect(() => {
    // Desplaza automáticamente al inicio cuando se renderiza la página
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Suave desplazamiento, opcional
    });
  }, []);
  useEffect(() => {
    const fetchWeapons = async () => {
      try {
        const response = await fetch(
          "https://wiki-gun.vercel.app/api/armas/nombres-categorias"
        );
        const data = await response.json();
        setWeapons(data);
        setFilteredWeapons(data);
      } catch (error) {
        console.error("Error fetching weapons:", error);
      }
    };
    fetchWeapons();
  }, []);

  const handleCategoryChange = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory("");
      applyFilters("", searchTerm);
    } else {
      setSelectedCategory(category);
      applyFilters(category, searchTerm);
    }
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    applyFilters(selectedCategory, term);
  };

  const applyFilters = (category, term) => {
    let filtered = weapons;

    if (category) {
      filtered = filtered.filter((weapon) => weapon.category === category);
    }

    if (term) {
      filtered = filtered.filter((weapon) =>
        weapon.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredWeapons(filtered);
  };

  // Manejar la selección de armas
  const handleWeaponSelect = (weapon) => {
    if (selectedWeapons.includes(weapon)) {
      setSelectedWeapons(selectedWeapons.filter((w) => w !== weapon));
    } else if (selectedWeapons.length < 2) {
      setSelectedWeapons([...selectedWeapons, weapon]);
    }
  };

  // Manejar la eliminación de armas seleccionadas
  const handleWeaponRemove = (weapon) => {
    setSelectedWeapons(selectedWeapons.filter((w) => w !== weapon));
  };

  return (
    <div className="weapon-page">
      <div className="weapon-filter-container">
        <div className="search-section">
          <h3>Buscar</h3>
          <input
            type="text"
            value={searchTerm}
            placeholder="Escribe el nombre del arma"
            onChange={handleSearchChange}
          />
        </div>
        <div className="filter-section">
          <h3>Filtrar por Categoría</h3>
          <ul>
            {categories.map((category) => (
              <li
                key={category}
                className={category === selectedCategory ? "selected" : ""}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* El comparador estará por encima de las tarjetas */}
      <div className="weapon-cards-container">
        <ComparisonBox
          selectedWeapons={selectedWeapons}
          onRemove={handleWeaponRemove}
        />
        <div className="weapon-cards">
          <WeaponCard
            weapons={filteredWeapons}
            onWeaponClick={handleWeaponSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default WeaponFilter;
