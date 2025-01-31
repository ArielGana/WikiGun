const express = require("express");
const cors = require("cors");
const armasRoutes = require("./routes/routes_gunsdb");
const cloudRoutes = require("./config/cloud");

const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Configuración de CORS
app.use(cors());

// Usar las rutas de armas
app.use("/api", armasRoutes);

// Usar las rutas de Cloudinary
app.use("/api/cloudinary", cloudRoutes);

// Exportar la aplicación para Vercel
module.exports = app;
