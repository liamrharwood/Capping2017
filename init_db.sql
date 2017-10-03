----------------------------------------------------------------------------------------
-- Helping Hands DB
--
-- By Helping Hands 
--
-- SQL Statements For Postgres 9.5.8
----------------------------------------------------------------------------------------

/*
 *
 *  TABLES
 *
 */

 --
 -- Users Table
 --

DROP TABLE IF EXISTS Users;

CREATE TYPE BANSTATUS AS ENUM ('NOT_BANNED', 'PENDING', 'BANNED');

CREATE TABLE Users (
	user_id            SERIAL,
	first_name         TEXT      NOT NULL,
 	last_name          TEXT      NOT NULL,
 	username           TEXT      NOT NULL
 	email              TEXT      NOT NULL,
 	birth_date         DATE      NOT NULL,
 	location           TEXT,
 	profile_image_path TEXT,
 	bio                TEXT,
 	reputation_points  INTEGER   DEFAULT 0,
 	is_administrator   BOOLEAN   NOT NULL,
 	ban_status         BANSTATUS DEFAULT 'NOT_BANNED',
 	create_date        TIMESTAMP NOT NULL,
 	update_date        TIMESTAMP,
 PRIMARY KEY(user_id)
 	);

 
 --
 -- Communities Table
 --

 --
 -- Posts Table
 --

 --
 -- PostsToCommunities Table
 --