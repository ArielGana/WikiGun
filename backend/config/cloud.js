// routes/cloud.js
require("dotenv").config();
const express = require("express");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const app = express();
const router = express.Router();
app.use(cors());
// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Ruta para obtener imágenes desde Cloudinary
router.get("/images", (req, res) => {
  const folder = "banner"; // Nombre de la carpeta en Cloudinary

  cloudinary.api
    .resources({
      type: "upload",
      prefix: folder,
      max_results: 3,
    })
    .then((result) => {
      const imageUrls = result.resources.map((resource) => resource.url);
      res.json(imageUrls);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error al obtener imágenes desde Cloudinary");
    });
});
router.get("/gun/:folder", (req, res) => {
  const folder = req.params.folder; // Nombre de la carpeta desde los parámetros de la ruta

  cloudinary.api
    .resources({
      type: "upload",
      prefix: "guns/" + folder,
      max_results: 5,
    })
    .then((result) => {
      const imageUrls = result.resources.map((resource) => resource.url);
      res.json(imageUrls);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error al obtener imágenes desde Cloudinary");
    });
});
router.get("/carpet/:folder", (req, res) => {
  const folder = req.params.folder; // Nombre de la carpeta desde los parámetros de la ruta

  cloudinary.api
    .resources({
      type: "upload",
      prefix: "guns/" + folder + "/Desmantelamiento",
      max_results: 3,
    })
    .then((result) => {
      const imageUrls = result.resources.map((resource) => resource.url);
      res.json(imageUrls);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error al obtener imágenes desde Cloudinary");
    });
});
module.exports = router;
