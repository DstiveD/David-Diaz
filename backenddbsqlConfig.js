const sql = require("mssql");

const sqlConfig = {
  user: "TU_USUARIO_SQL",
  password: "TU_PASSWORD_SQL",
  database: "TechSolutionsDB",
  server: "TU_SERVIDOR_SQL",  // puede ser "localhost" o dirección IP
  options: {
    encrypt: false, // cambiar a `true` si usas Azure
    trustServerCertificate: true
  },
  port: 1433
};

async function getConnection() {
  try {
    const pool = await sql.connect(sqlConfig);
    return pool;
  } catch (err) {
    console.error("Error de conexión a SQL:", err);
    throw err;
  }
}

module.exports = {
  sql,
  getConnection
};
