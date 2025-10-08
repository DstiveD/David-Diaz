-- Crear la base de datos
CREATE DATABASE TechSolutionsDB;
GO

-- Usar la base de datos reci�n creada
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
('Desarrollo Web B�sico', 'img/web_basico.jpg', 300.00, 10, 'Creaci�n de sitio web est�tico informativo.', 0),
('Soporte T�cnico a Domicilio', 'img/soporte_domicilio.jpg', 50.00, 50, 'Atenci�n de fallas en sitio.', 1),
('Mantenimiento Preventivo', 'img/mantenimiento.jpg', 100.00, 20, 'Revisi�n peri�dica de hardware y software.', 0),
('Instalaci�n de Red LAN', 'img/instalacion_red.jpg', 200.00, 15, 'Dise�o e instalaci�n de red local.', 0),
('SEO B�sico', 'img/seo.jpg', 150.00, 30, 'Optimizaci�n b�sica de motores de b�squeda.', 1),
('Hosting Web', 'img/hosting.jpg', 80.00, 100, 'Alojamiento web mensual.', 0),
('Dise�o de Marca', 'img/branding.jpg', 250.00, 10, 'Creaci�n de identidad visual corporativa.', 0),
('Desarrollo App M�vil', 'img/app_movil.jpg', 500.00, 5, 'Desarrollo de aplicaci�n nativa b�sica.', 1),
('Soporte Remoto', 'img/soporte_remoto.jpg', 40.00, 100, 'Atenci�n remota de incidencias.', 0),
('Consultor�a TI', 'img/consultoria.jpg', 120.00, 25, 'An�lisis y recomendaciones tecnol�gicas.', 0);
GO


INSERT INTO Usuarios (NombreUsuario, ClaveHash, Rol)
VALUES ('admin', 'David123', 'admin');
GO
