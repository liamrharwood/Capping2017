--liquibase formatted sql

--changeset liamrharwood:1
ALTER TABLE Users ADD UNIQUE (username);

--changeset liamrharwood:2
CREATE TABLE Votes (
    user_id   INTEGER NOT NULL REFERENCES Users(user_id),
    post_id   INTEGER NOT NULL REFERENCES Posts(post_id),
    direction INTEGER NOT NULL DEFAULT 0,
    CHECK (direction = 0 OR direction = 1 OR direction = -1),
  PRIMARY KEY(user_id, post_id)
);

--changeset liamrharwood:3
GRANT ALL ON Votes TO admin;
GRANT ALL ON Votes TO app;
REVOKE ALL ON Votes FROM reporting;
GRANT SELECT ON Votes TO reporting;

--changeset liamrharwood:4
REVOKE ALL ON Votes FROM app;
GRANT SELECT ON Votes TO app;
GRANT INSERT ON Votes TO app;
GRANT UPDATE ON Votes TO app;
GRANT DELETE ON Votes TO app;

--changeset liamrharwood:5
ALTER TABLE Comments ADD COLUMN create_date TIMESTAMP NOT NULL DEFAULT now();

--changeset liamrharwood:6
ALTER TABLE Users ADD COLUMN access_token TEXT;

--changeset liamrharwood:7
ALTER TABLE Users ADD COLUMN access_token_timestamp TIMESTAMP;

--changeset liamrharwood:8
ALTER TABLE Posts DROP COLUMN upvotes;
ALTER TABLE Posts DROP COLUMN downvotes;

--changeset liamrharwood:9
ALTER TABLE Users ADD COLUMN pray_points INTEGER NOT NULL DEFAULT 0;
ALTER TABLE Users ADD COLUMN answered_points INTEGER NOT NULL DEFAULT 0;
ALTER TABLE Users ADD COLUMN report_points INTEGER NOT NULL DEFAULT 0;
ALTER TABLE Users ADD COLUMN upvote_points INTEGER NOT NULL DEFAULT 0;