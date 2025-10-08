-- Crear la base de datos
CREATE DATABASE TechSolutionsDB;
GO

-- Usar la base de datos recién creada
USE TechSolutionsDB;
GO

-- Crear tabla Usuarios
CREATE TABLE Usuarios (
    UsuarioId INT IDENTITY(1,1) PRIMARY KEY,
    NombreUsuario NVARCHAR(50) NOT NULL UNIQUE,
    ClaveHash NVARCHAR(255) NOT NULL,
    Rol NVARCHAR(20) NOT NULL DEFAULT 'admin',
    FechaCreacion DATETIME NOT NULL DEFAULT GETDATE(),
    Activo BIT NOT NULL DEFAULT 1
);
GO

-- Crear tabla Servicios
CREATE TABLE Servicios (
    ServicioId INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL,
    ImagenUrl NVARCHAR(255) NULL,
    Precio DECIMAL(10,2) NOT NULL,
    Cantidad INT NOT NULL,
    Descripcion NVARCHAR(MAX) NULL,
    EnPromocion BIT NOT NULL DEFAULT 0,
    FechaCreacion DATETIME NOT NULL DEFAULT GETDATE(),
    Activo BIT NOT NULL DEFAULT 1
);
GO


INSERT INTO Servicios (Nombre, ImagenUrl, Precio, Cantidad, Descripcion, EnPromocion)
VALUES
('Desarrollo Web Básico', 'img/web_basico.jpg', 300.00, 10, 'Creación de sitio web estático informativo.', 0),
('Soporte Técnico a Domicilio', 'img/soporte_domicilio.jpg', 50.00, 50, 'Atención de fallas en sitio.', 1),
('Mantenimiento Preventivo', 'img/mantenimiento.jpg', 100.00, 20, 'Revisión periódica de hardware y software.', 0),
('Instalación de Red LAN', 'img/instalacion_red.jpg', 200.00, 15, 'Diseño e instalación de red local.', 0),
('SEO Básico', 'img/seo.jpg', 150.00, 30, 'Optimización básica de motores de búsqueda.', 1),
('Hosting Web', 'img/hosting.jpg', 80.00, 100, 'Alojamiento web mensual.', 0),
('Diseño de Marca', 'img/branding.jpg', 250.00, 10, 'Creación de identidad visual corporativa.', 0),
('Desarrollo App Móvil', 'img/app_movil.jpg', 500.00, 5, 'Desarrollo de aplicación nativa básica.', 1),
('Soporte Remoto', 'img/soporte_remoto.jpg', 40.00, 100, 'Atención remota de incidencias.', 0),
('Consultoría TI', 'img/consultoria.jpg', 120.00, 25, 'Análisis y recomendaciones tecnológicas.', 0);
GO


INSERT INTO Usuarios (NombreUsuario, ClaveHash, Rol)
VALUES ('admin', 'David123', 'admin');
GO
