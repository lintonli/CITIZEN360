USE CONNECT360
GO
CREATE OR ALTER PROCEDURE getOptions(@POLLID VARCHAR(255))
AS
BEGIN
SELECT *  FROM PollOptions WHERE POLLID=@POLLID
END