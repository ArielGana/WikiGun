//routes/routes_gunsdb.js
const express = require("express");
const { dbGuns } = require("../config/db_guns"); // Importamos la conexión ya establecida (dbGuns)

const router = express.Router();

// Ruta para obtener las armas por categoría
router.get("/armas", (req, res) => {
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

  // Construimos la consulta dinámica basada en la categoría
  const query = `SELECT * FROM ${normalizedCategory}`;

  // Ejecutamos la consulta en la base de datos
  dbGuns.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener las armas", err);
      return res.status(500).json({ message: "Error al obtener las armas" });
    }
    return res.status(200).json(results); // Devolvemos los resultados como JSON
  });
});
router.get("/armas/nombres-categorias", (req, res) => {
  const validCategories = [
    "Pistolas",
    "Escopetas",
    "Rifles",
    "Subfusiles",
    "Lanzagranadas",
    "Lanzadorescohetes",
    "Fusilesfrancotirador",
  ]; // Lista de categorías válidas

  // Creamos un array para manejar las promesas de consulta
  const queries = validCategories.map((category) => {
    const query = `SELECT *, '${category}' AS category FROM ${category}`;
    return new Promise((resolve, reject) => {
      dbGuns.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results); // Devuelve los resultados
      });
    });
  });

  // Ejecutamos todas las promesas
  Promise.all(queries)
    .then((results) => {
      // Combinamos los resultados en un único array
      const allWeapons = results.flat();
      res.status(200).json(allWeapons);
    })
    .catch((err) => {
      console.error(
        "Error al obtener los nombres, imágenes y categorías de las armas",
        err
      );
      res.status(500).json({
        message:
          "Error al obtener los nombres, imágenes y categorías de las armas",
      });
    });
});
// Ruta para obtener datos de una tabla por ID
router.get("/guncompare", (req, res) => {
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

  // Construimos la consulta dinámica con los parámetros validados
  const query = `SELECT * FROM ${table} WHERE id_arma = ?`;

  // Ejecutamos la consulta en la base de datos
  dbGuns.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error al realizar la consulta", err);
      return res.status(500).json({ message: "Error al realizar la consulta" });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "No se encontró ningún registro con el ID especificado",
      });
    }

    return res.status(200).json(results); // Devolvemos los resultados como JSON
  });
});

module.exports = router;
