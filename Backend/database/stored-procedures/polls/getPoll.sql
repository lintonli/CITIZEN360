USE CONNECT360;
GO
CREATE OR ALTER PROCEDURE GetPolls
AS
BEGIN
SELECT * FROM Polls
END

--CREATE OR ALTER PROCEDURE GetPollsWithOptions
--AS
--BEGIN
  --  SET NOCOUNT ON;

    --SELECT 
      --  p.ID AS PollID,
        --p.TITLE AS PollTitle,
        --p.USERID AS PollUserID,
        --(
          --  SELECT 
            --    po.ID,
              --  po.PNAME,
                --po.VOTES
            --FROM PollOptions po
            --WHERE po.POLLID = p.ID
            --FOR JSON PATH
        --) AS Options
    --FROM Polls p
   -- FOR JSON PATH, ROOT('Polls')
--END;
--GO
--EXEC GetPollsWithOptions;
