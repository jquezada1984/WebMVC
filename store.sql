CREATE PROCEDURE [dbo].[sp_ListaProducto]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT id,codigo,marca,modelo FROM [dbo].[Producto] WHERE estado=1;

END


CREATE PROCEDURE [dbo].[sp_InsertarProducto]
    @codigo VARCHAR(20),
    @marca VARCHAR(20),
    @modelo VARCHAR(20)
AS
BEGIN

    INSERT INTO [dbo].[Producto] 
        ([codigo], [marca], [modelo],[estado], [fecha_registro])
    VALUES 
        (@codigo, @marca, @modelo, 1,GETDATE());

END


create PROCEDURE [dbo].[sp_UpdateProducto]
    @id	INT,
	@codigo VARCHAR(20),
    @marca VARCHAR(20),
    @modelo VARCHAR(20)
AS
BEGIN

    UPDATE [dbo].[Producto]
	SET [codigo] = @codigo
      ,[marca] = @marca
      ,[modelo] = @modelo
	WHERE id=@id;

END



CREATE PROCEDURE [dbo].[sp_DeleteProducto]
    @id	INT
AS
BEGIN


    UPDATE [dbo].[Producto]
	SET estado=0
	WHERE id=@id;

END