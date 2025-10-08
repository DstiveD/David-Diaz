-- Autenticar usuario (verificar nombre y clave hash)
CREATE PROCEDURE sp_Usuario_ObtenerPorLogin
    @NombreUsuario NVARCHAR(50),
    @ClaveHash NVARCHAR(255)
AS
BEGIN
    SELECT UsuarioId, NombreUsuario, Rol
    FROM Usuarios
    WHERE NombreUsuario = @NombreUsuario
      AND ClaveHash = @ClaveHash
      AND Activo = 1;
END
GO
