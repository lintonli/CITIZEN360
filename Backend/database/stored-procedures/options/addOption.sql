USE CONNECT360;
GO
CREATE OR ALTER PROCEDURE addOption(@ID VARCHAR(255), @PNAME VARCHAR(255), @VOTES VARCHAR(255),@POLLID VARCHAR(255))
AS
BEGIN
INSERT INTO PollOptions(ID, PNAME, VOTES, POLLID)
VALUES(@ID,@PNAME,@VOTES,@POLLID)
END