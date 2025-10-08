const API_URL = "http://localhost:3000/api";

// ====================== SERVICIOS ======================

async function fetchServicios() {
  const resp = await fetch(`${API_URL}/servicios`);
  const servicios = await resp.json();
  return servicios;
}

// Mostrar listado de servicios en servicios.html
async function mostrarServicios() {
  const cont = document.getElementById("servicios-container");
  const servicios = await fetchServicios();
  servicios.forEach(s => {
    const card = document.createElement("div");
    card.className = "servicio-card";
    card.innerHTML = `
      <img src="${s.ImagenUrl}" alt="${s.Nombre}" width="150" />
      <h3>${s.Nombre}</h3>
      <p>Precio: $${s.Precio.toFixed(2)}</p>
      <button onclick="verDetalle(${s.ServicioId})">Ver detalle</button>
    `;
    cont.appendChild(card);
  });
}

// Redirigir a detalle con parámetro ?id=
function verDetalle(id) {
  window.location.href = `detalle.html?id=${id}`;
}

// Mostrar detalle en detalle.html
async function mostrarDetalle() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) {
    document.getElementById("detalle-servicio").innerText = "Id no válido";
    return;
  }
  const resp = await fetch(`${API_URL}/servicios/${id}`);
  if (resp.ok) {
    const s = await resp.json();
    const cont = document.getElementById("detalle-servicio");
    cont.innerHTML = `
      <img src="${s.ImagenUrl}" alt="${s.Nombre}" width="200" />
      <h2>${s.Nombre}</h2>
      <p>Precio: $${s.Precio.toFixed(2)}</p>
      <p>Cantidad disponible: ${s.Cantidad}</p>
      <p>Descripción: ${s.Descripcion}</p>
      <p>${s.EnPromocion ? '<strong>¡En promoción!</strong>' : ''}</p>
      <button onclick="window.location.href='servicios.html'">Volver</button>
    `;
  } else {
    document.getElementById("detalle-servicio").innerText = "Servicio no encontrado";
  }
}

// ====================== LOGIN / AUTH ======================

async function loginAdmin(event) {
  event.preventDefault();
  const usuario = document.getElementById("usuario").value;
  const clave = document.getElementById("clave").value;

  // En un caso real, nunca envíes la contraseña en texto plano,
  // lo ideal es aplicar hash antes o usar TLS/HTTPS.
  // Aquí como ejemplo simple, enviaremos un “claveHash” ficticio
  const claveHash = clave; // para pruebas simples

  const resp = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombreUsuario: usuario, claveHash })
  });
  const res = await resp.json();
  const msg = document.getElementById("login-mensaje");
  if (res.success) {
    // Podemos guardar token / sesión en localStorage
    localStorage.setItem("usuarioAdmin", JSON.stringify(res.usuario));
    window.location.href = "admin.html";
  } else {
    msg.innerText = "Credenciales incorrectas";
  }
}

// ====================== PANEL ADMIN / CRUD ======================

async function cargarServiciosAdmin() {
  const servicios = await fetchServicios();
  const tbody = document.getElementById("tbody-servicios");
  tbody.innerHTML = "";
  servicios.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.ServicioId}</td>
      <td>${s.Nombre}</td>
      <td>${s.Precio.toFixed(2)}</td>
      <td>${s.Cantidad}</td>
      <td>${s.EnPromocion ? "Sí" : "No"}</td>
      <td>
        <button onclick="editarServicio(${s.ServicioId})">Editar</button>
        <button onclick="eliminarServicio(${s.ServicioId})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Mostrar formulario para crear nuevo servicio
function mostrarFormularioNuevo() {
  document.getElementById("form-servicio").style.display = "block";
  document.getElementById("titulo-form").innerText = "Crear servicio";
  document.getElementById("servicioId").value = "";
}

// Cancelar el formulario
function cancelarFormulario() {
  document.getElementById("form-servicio").style.display = "none";
  document.getElementById("servicio-form").reset();
}

// Guardar servicio (crear o actualizar)
async function guardarServicio(event) {
  event.preventDefault();
  const id = document.getElementById("servicioId").value;
  const Nombre = document.getElementById("nombre").value;
  const ImagenUrl = document.getElementById("imagenUrl").value;
  const Precio = parseFloat(document.getElementById("precio").value);
  const Cantidad = parseInt(document.getElementById("cantidad").value);
  const Descripcion = document.getElementById("descripcion").value;
  const EnPromocion = document.getElementById("enPromocion").checked ? 1 : 0;

  const payload = { Nombre, ImagenUrl, Precio, Cantidad, Descripcion, EnPromocion };

  let resp;
  if (id) {
    resp = await fetch(`${API_URL}/servicios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } else {
    resp = await fetch(`${API_URL}/servicios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  }

  const res = await resp.json();
  if (res.success) {
    cancelarFormulario();
    cargarServiciosAdmin();
  } else {
    alert("Error al guardar servicio");
  }
}

// Editar servicio: cargar datos en el formulario
async function editarServicio(id) {
  const resp = await fetch(`${API_URL}/servicios/${id}`);
  if (resp.ok) {
    const s = await resp.json();
    document.getElementById("form-servicio").style.display = "block";
    document.getElementById("titulo-form").innerText = "Editar servicio";
    document.getElementById("servicioId").value = s.ServicioId;
    document.getElementById("nombre").value = s.Nombre;
    document.getElementById("imagenUrl").value = s.ImagenUrl;
    document.getElementById("precio").value = s.Precio;
    document.getElementById("cantidad").value = s.Cantidad;
    document.getElementById("descripcion").value = s.Descripcion;
    document.getElementById("enPromocion").checked = s.EnPromocion;
  } else {
    alert("Servicio no encontrado");
  }
}

// Eliminar servicio
async function eliminarServicio(id) {
  if (!confirm("¿Estás seguro de eliminar este servicio?")) return;
  const resp = await fetch(`${API_URL}/servicios/${id}`, {
    method: "DELETE"
  });
  const res = await resp.json();
  if (res.success) {
    cargarServiciosAdmin();
  } else {
    alert("Error al eliminar servicio");
  }
}

// ====================== Inicialización según la página actual ======================

window.onload = () => {
  const path = window.location.pathname;
  if (path.endsWith("servicios.html")) {
    mostrarServicios();
  } else if (path.endsWith("detalle.html")) {
    mostrarDetalle();
  } else if (path.endsWith("login.html")) {
    const form = document.getElementById("login-form");
    form?.addEventListener("submit", loginAdmin);
  } else if (path.endsWith("admin.html")) {
    cargarServiciosAdmin();
    document.getElementById("btn-nuevo")?.addEventListener("click", mostrarFormularioNuevo);
    document.getElementById("btn-cancelar")?.addEventListener("click", cancelarFormulario);
    document.getElementById("servicio-form")?.addEventListener("submit", guardarServicio);
  }
};
