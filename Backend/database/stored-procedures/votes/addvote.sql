USE CONNECT360
GO
CREATE OR ALTER PROCEDURE addVotes(@ID VARCHAR (255),
@POLLID VARCHAR(255),
@OPTIONID VARCHAR(255),
@USERID VARCHAR(255))
AS
BEGIN
INSERT INTO Votes(ID,POLLID,OPTIONID,USERID)
VALUES(@ID, @POLLID, @OPTIONID, @USERID)
END