-- 1. Insertar un servicio
CREATE PROCEDURE sp_Servicio_Insertar
    @Nombre NVARCHAR(100),
    @ImagenUrl NVARCHAR(255),
    @Precio DECIMAL(10,2),
    @Cantidad INT,
    @Descripcion NVARCHAR(MAX),
    @EnPromocion BIT
AS
BEGIN
    INSERT INTO Servicios (Nombre, ImagenUrl, Precio, Cantidad, Descripcion, EnPromocion)
    VALUES (@Nombre, @ImagenUrl, @Precio, @Cantidad, @Descripcion, @EnPromocion);

    -- Retornar el id insertado recientemente
    SELECT SCOPE_IDENTITY() AS NuevoServicioId;
END
GO

-- 2. Obtener todos los servicios activos
CREATE PROCEDURE sp_Servicio_ObtenerTodos
AS
BEGIN
    SELECT ServicioId, Nombre, ImagenUrl, Precio, Cantidad, Descripcion, EnPromocion
    FROM Servicios
    WHERE Activo = 1;
END
GO

-- 3. Obtener un servicio por ID
CREATE PROCEDURE sp_Servicio_ObtenerPorId
    @Id INT
AS
BEGIN
    SELECT ServicioId, Nombre, ImagenUrl, Precio, Cantidad, Descripcion, EnPromocion
    FROM Servicios
    WHERE ServicioId = @Id AND Activo = 1;
END
GO

-- 4. Actualizar un servicio
CREATE PROCEDURE sp_Servicio_Actualizar
    @ServicioId INT,
    @Nombre NVARCHAR(100),
    @ImagenUrl NVARCHAR(255),
    @Precio DECIMAL(10,2),
    @Cantidad INT,
    @Descripcion NVARCHAR(MAX),
    @EnPromocion BIT
AS
BEGIN
    UPDATE Servicios
    SET Nombre = @Nombre,
        ImagenUrl = @ImagenUrl,
        Precio = @Precio,
        Cantidad = @Cantidad,
        Descripcion = @Descripcion,
        EnPromocion = @EnPromocion
    WHERE ServicioId = @ServicioId AND Activo = 1;
END
GO

-- 5. Eliminar un servicio (lógica: marcar Activo = 0)
CREATE PROCEDURE sp_Servicio_Eliminar
    @ServicioId INT
AS
BEGIN
    UPDATE Servicios
    SET Activo = 0
    WHERE ServicioId = @ServicioId;
END
GO
