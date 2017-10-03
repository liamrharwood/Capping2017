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
 -- Follows Table
 --

DROP TABLE IF EXISTS Follows;

CREATE TABLE Follows (
	follower_id INTEGER NOT NULL REFERENCES Users(user_id),
	followee_id INTEGER NOT NULL REFERENCES Users(user_id),
 PRIMARY KEY(follower_id, followee_id)
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

DROP TABLE IF EXISTS Members;

CREATE TABLE Members (
	user_id      INTEGER NOT NULL REFERENCES Users(user_id),
	community_id INTEGER NOT NULL REFERENCES Communities(community_id),
 PRIMARY KEY (user_id, community_id)
);

 --
 -- Moderators Table
 --

DROP TABLE IF EXISTS Moderators;

CREATE TABLE Moderators (
	user_id      INTEGER NOT NULL REFERENCES Users(user_id),
	community_id INTEGER NOT NULL REFERENCES Communities(community_id),
 PRIMARY KEY (user_id, community_id)
);

 --
 -- Posts Table
 --

DROP TABLE IF EXISTS Posts;

CREATE TABLE Posts (
	post_id         SERIAL,
	user_id         INTEGER   NOT NULL REFERENCES Users(user_id),
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

DROP TABLE IF EXISTS PostsToCommunities;

CREATE TABLE PostsToCommunities (
	post_id      INTEGER NOT NULL REFERENCES Posts(post_id),
	community_id INTEGER NOT NULL REFERENCES Communities(community_id),
 PRIMARY KEY(post_id, community_id)
);

 --
 -- Comments Table
 --

DROP TABLE IF EXISTS Comments;

CREATE TABLE Comments (
	comment_id SERIAL,
	user_id    INTEGER NOT NULL REFERENCES Users(user_id),
	post_id    INTEGER NOT NULL REFERENCES Posts(post_id),
 PRIMARY KEY(comment_id)
);

 --
 -- Reports Table
 --

DROP TABLE IF EXISTS Reports;

CREATE TABLE Reports (
	report_id     SERIAL,
	post_id       INTEGER NOT NULL REFERENCES Posts(post_id),
	report_reason TEXT    NOT NULL,
 PRIMARY KEY(report_id)
);

 --
 -- PostUpdates Table
 --

DROP TABLE IF EXISTS PostUpdates;

CREATE TABLE PostUpdates (
	post_update_id SERIAL,
	post_id        INTEGER NOT NULL REFERENCES Posts(post_id),
	body_text      TEXT    NOT NULL,
 PRIMARY KEY (post_update_id)
);

 --
 -- Hashtags Table
 --

DROP TABLE IF EXISTS Hashtags;

CREATE TABLE Hashtags (
	hashtag_name TEXT NOT NULL,
 PRIMARY KEY(hashtag_name)
);

 --
 -- TaggedPosts Table
 --

DROP TABLE IF EXISTS TaggedPosts;

CREATE TABLE TaggedPosts (
	hashtag_name TEXT    NOT NULL REFERENCES Hashtags(hashtag_name),
	post_id      INTEGER NOT NULL REFERENCES Posts(post_id),
 PRIMARY KEY(hashtag_name, post_id)
);
