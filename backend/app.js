const express = require("express");
const cors = require("cors"); // Importa cors
const armasRoutes = require("./routes/routes_gunsdb");
const cloudRoutes = require("./config/cloud"); // Importa las rutas de Cloudinary

const app = express();
const port = 5000;

// Middleware para manejar JSON
app.use(express.json());

// Configuración de CORS
app.use(cors());

// Usar las rutas de armas
app.use("/api", armasRoutes);

// Usar las rutas de Cloudinary
app.use("/api/cloudinary", cloudRoutes); // Cambié la ruta base a /api/cloudinary

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
