const express = require("express");
const router = express.Router();
const { getConnection, sql } = require("../db/sqlConfig");

// Ruta para login administrador
router.post("/login", async (req, res) => {
  const { nombreUsuario, claveHash } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input("NombreUsuario", sql.NVarChar(50), nombreUsuario)
      .input("ClaveHash", sql.NVarChar(255), claveHash)
      .execute("sp_Usuario_ObtenerPorLogin");
    
    if (result.recordset.length > 0) {
      const usuario = result.recordset[0];
      // Aquí puedes manejar sesión, token, etc.
      res.json({ success: true, usuario });
    } else {
      res.status(401).json({ success: false, message: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error("Error login:", error);
    res.status(500).json({ success: false, message: "Error en servidor" });
  }
});

module.exports = router;
