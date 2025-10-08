const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const serviciosRoutes = require("./routes/servicios");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/servicios", serviciosRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor backend de TechSolutions funcionando");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
