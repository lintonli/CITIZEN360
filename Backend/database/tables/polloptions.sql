USE CONNECT360
CREATE TABLE PollOptions(
    ID VARCHAR(255) NOT NULL PRIMARY KEY,
    PNAME VARCHAR(255) NOT NULL,
    VOTES INT DEFAULT 0,
    POLLID VARCHAR(255) NOT NULL,
    FOREIGN KEY(POLLID) REFERENCES Polls(ID)
)