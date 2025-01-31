const express = require("express");
const router = express.Router();

// Ruta para obtener las armas por categoría
router.get("/armas", async (req, res) => {
  const { category } = req.query; // Obtenemos la categoría desde los parámetros de consulta
  const validCategories = [
    "Pistolas",
    "Escopetas",
    "Rifles",
    "Subfusiles",
    "Lanzagranadas",
    "Lanzadorescohetes",
    "Fusilesfrancotirador",
  ]; // Lista de categorías válidas

  // Normalizamos la categoría (primera letra en mayúscula, el resto en minúscula)
  const normalizedCategory =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  // Validamos la categoría para prevenir SQL Injection y errores
  if (!validCategories.includes(normalizedCategory)) {
    return res.status(400).json({ message: "Categoría no válida" });
  }

  try {
    // Construimos la consulta dinámica basada en la categoría
    const query = `SELECT * FROM ${normalizedCategory}`;

    // Ejecutamos la consulta en la base de datos
    const { rows } = await pool.query(query);
    return res.status(200).json(rows); // Devolvemos los resultados como JSON
  } catch (err) {
    console.error("Error al obtener las armas", err);
    return res.status(500).json({ message: "Error al obtener las armas" });
  }
});

// Ruta para obtener nombres, imágenes y categorías de todas las armas
router.get("/armas/nombres-categorias", async (req, res) => {
  const validCategories = [
    "Pistolas",
    "Escopetas",
    "Rifles",
    "Subfusiles",
    "Lanzagranadas",
    "Lanzadorescohetes",
    "Fusilesfrancotirador",
  ]; // Lista de categorías válidas

  try {
    // Creamos un array para manejar las promesas de consulta
    const queries = validCategories.map((category) => {
      const query = `SELECT *, '${category}' AS category FROM ${category}`;
      return pool.query(query);
    });

    // Ejecutamos todas las promesas
    const results = await Promise.all(queries);

    // Combinamos los resultados en un único array
    const allWeapons = results.flatMap((result) => result.rows);
    res.status(200).json(allWeapons);
  } catch (err) {
    console.error(
      "Error al obtener los nombres, imágenes y categorías de las armas",
      err
    );
    res.status(500).json({
      message:
        "Error al obtener los nombres, imágenes y categorías de las armas",
    });
  }
});

// Ruta para obtener datos de una tabla por ID
router.get("/guncompare", async (req, res) => {
  const { table, id } = req.query; // Obtenemos el nombre de la tabla y el ID desde los parámetros de consulta

  const validTables = [
    "Pistolas",
    "Escopetas",
    "Rifles",
    "Subfusiles",
    "Lanzagranadas",
    "Lanzadorescohetes",
    "Fusilesfrancotirador",
  ]; // Lista de tablas válidas

  // Validamos que la tabla sea válida para prevenir SQL Injection
  if (!validTables.includes(table)) {
    return res.status(400).json({ message: "Nombre de tabla no válido" });
  }

  // Validamos que el ID sea un número válido
  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "ID no válido" });
  }

  try {
    // Construimos la consulta dinámica con los parámetros validados
    const query = `SELECT * FROM ${table} WHERE id_arma = $1`;

    // Ejecutamos la consulta en la base de datos
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "No se encontró ningún registro con el ID especificado",
      });
    }

    return res.status(200).json(rows); // Devolvemos los resultados como JSON
  } catch (err) {
    console.error("Error al realizar la consulta", err);
    return res.status(500).json({ message: "Error al realizar la consulta" });
  }
});

module.exports = router;
