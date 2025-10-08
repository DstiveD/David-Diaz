const express = require("express");
const router = express.Router();
const { getConnection, sql } = require("../db/sqlConfig");

// Obtener todos los servicios activos
router.get("/", async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().execute("sp_Servicio_ObtenerTodos");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener servicios:", error);
    res.status(500).json({ message: "Error en servidor" });
  }
});

// Obtener detalle de un servicio
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input("Id", sql.Int, id)
      .execute("sp_Servicio_ObtenerPorId");
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ message: "Servicio no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener detalle:", error);
    res.status(500).json({ message: "Error en servidor" });
  }
});

// Crear servicio (admin)
router.post("/", async (req, res) => {
  const { Nombre, ImagenUrl, Precio, Cantidad, Descripcion, EnPromocion } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input("Nombre", sql.NVarChar(100), Nombre)
      .input("ImagenUrl", sql.NVarChar(255), ImagenUrl)
      .input("Precio", sql.Decimal(10,2), Precio)
      .input("Cantidad", sql.Int, Cantidad)
      .input("Descripcion", sql.NVarChar(sql.MAX), Descripcion)
      .input("EnPromocion", sql.Bit, EnPromocion)
      .execute("sp_Servicio_Insertar");
    const nuevoId = result.recordset[0].NuevoServicioId;
    res.json({ success: true, nuevoId });
  } catch (error) {
    console.error("Error al crear servicio:", error);
    res.status(500).json({ message: "Error en servidor" });
  }
});

// Actualizar servicio
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { Nombre, ImagenUrl, Precio, Cantidad, Descripcion, EnPromocion } = req.body;
  try {
    const pool = await getConnection();
    await pool.request()
      .input("ServicioId", sql.Int, id)
      .input("Nombre", sql.NVarChar(100), Nombre)
      .input("ImagenUrl", sql.NVarChar(255), ImagenUrl)
      .input("Precio", sql.Decimal(10,2), Precio)
      .input("Cantidad", sql.Int, Cantidad)
      .input("Descripcion", sql.NVarChar(sql.MAX), Descripcion)
      .input("EnPromocion", sql.Bit, EnPromocion)
      .execute("sp_Servicio_Actualizar");
    res.json({ success: true });
  } catch (error) {
    console.error("Error al actualizar servicio:", error);
    res.status(500).json({ message: "Error en servidor" });
  }
});

// Eliminar servicio
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const pool = await getConnection();
    await pool.request()
      .input("ServicioId", sql.Int, id)
      .execute("sp_Servicio_Eliminar");
    res.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar servicio:", error);
    res.status(500).json({ message: "Error en servidor" });
  }
});

module.exports = router;
