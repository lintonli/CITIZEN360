USE CONNECT360;
GO
CREATE OR ALTER PROCEDURE addRole(@ID VARCHAR(255),@NAME VARCHAR(255))
AS 
BEGIN 
INSERT INTO Roles(ID, RNAME)
VALUES(@ID,@NAME)
END;