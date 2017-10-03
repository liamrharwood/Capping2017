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
 	username           TEXT      NOT NULL,
 	email              TEXT      NOT NULL,
 	birth_date         DATE      NOT NULL,
 	location           TEXT,
 	profile_image_path TEXT,
 	bio                TEXT,
 	reputation_points  INTEGER   DEFAULT 0,
 	is_administrator   BOOLEAN   NOT NULL DEFAULT FALSE,
 	ban_status         BANSTATUS NOT NULL DEFAULT 'NOT_BANNED',
 	create_date        TIMESTAMP NOT NULL DEFAULT now(),
 	update_date        TIMESTAMP,
 PRIMARY KEY(user_id)
);

 
 --
 -- Communities Table
 --

DROP TABLE IF EXISTS Communities;

CREATE TABLE Communities (
	community_id SERIAL,
	name         TEXT      NOT NULL,
	description  TEXT      NOT NULL,
	is_verified  BOOLEAN   DEFAULT FALSE,
	create_date  TIMESTAMP NOT NULL DEFAULT now(),
	ban_status   BANSTATUS DEFAULT 'NOT_BANNED',
 PRIMARY KEY(community_id)
);

 --
 -- Members Table
 --

 --
 -- Moderators Table
 --


 --
 -- Posts Table
 --

DROP TABLE IF EXISTS Posts;

CREATE TABLE Posts (
	post_id         SERIAL,
	user_id         INTEGER   REFERENCES Users(user_id),
	upvotes         INTEGER   NOT NULL DEFAULT 0,
	downvotes       INTEGER   NOT NULL DEFAULT 0,
	body_text       TEXT,
	post_title      TEXT      NOT NULL,
	post_image_path TEXT,
	create_date     TIMESTAMP NOT NULL,
	is_complete     BOOLEAN   NOT NULL DEFAULT FALSE,
 PRIMARY KEY(post_id)
);

 --
 -- PostsToCommunities Table
 --
