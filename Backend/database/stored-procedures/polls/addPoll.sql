USE CONNECT360;
GO
CREATE PROCEDURE AddPoll
    @ID VARCHAR(255),
    @TITLE VARCHAR(255),
    @USERID VARCHAR(255),
    @OPTIONS NVARCHAR(MAX) -- JSON string of options
AS
BEGIN
    SET NOCOUNT ON;

    -- Insert into Polls table
    INSERT INTO Polls (ID, TITLE, USERID) VALUES (@ID, @TITLE, @USERID);

    -- Variables for iterating JSON array
    DECLARE @i INT = 0;
    DECLARE @n INT = JSON_VALUE(@OPTIONS, '$.length');
    DECLARE @optionName VARCHAR(255);

    -- Insert each option into PollOptions table
    WHILE @i < @n
    BEGIN
        SET @optionName = JSON_VALUE(@OPTIONS, CONCAT('$[', @i, '].name'));
        INSERT INTO PollOptions (ID, PNAME, VOTES) VALUES (@ID, @optionName, 0);
        SET @i = @i + 1;
    END
END;
GO
