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

DROP TABLE IF EXISTS Hashtags;
DROP TABLE IF EXISTS PostUpdates;
DROP TABLE IF EXISTS Reports;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS PostsToCommunities;
DROP TABLE IF EXISTS Posts;
DROP TABLE IF EXISTS Members;
DROP TABLE IF EXISTS Communities;
DROP TABLE IF EXISTS Follows;
DROP TABLE IF EXISTS Users;

 --
 -- Users Table
 --

CREATE TYPE BANSTATUS AS ENUM ('NOT_BANNED', 'PENDING', 'BANNED');

CREATE TABLE Users (
	user_id            SERIAL,
	first_name         TEXT      NOT NULL,
 	last_name          TEXT      NOT NULL,
 	username           TEXT      NOT NULL,
 	password_hash      TEXT      NOT NULL,
 	email              TEXT      NOT NULL,
 	birth_date         DATE      NOT NULL,
 	location           TEXT,
 	profile_image_path TEXT,
 	bio                TEXT,
 	reputation_points  INTEGER   NOT NULL DEFAULT 0,
 	is_administrator   BOOLEAN   NOT NULL DEFAULT FALSE,
 	ban_status         BANSTATUS NOT NULL DEFAULT 'NOT_BANNED',
 	create_date        TIMESTAMP NOT NULL DEFAULT now(),
 	update_date        TIMESTAMP NOT NULL DEFAULT now(),
 PRIMARY KEY(user_id)
);

INSERT INTO Users (first_name, last_name, username, password_hash, email, birth_date, location, profile_image_path, bio, reputation_points)
	VALUES
	('Thor',   'Odinsson', 'mjoln1r',    'bkjlkasfklasklf', 'thor@gmail.com',   to_date('1985-11-10', 'YYYY-MM-DD'), 'Valhalla',     'images/thor.png',   'I am the god of thunder.', 50),
	('Moses',  'Smith',    'redsea1',    'jaslkdjlajglkaj', 'moses@gmail.com',  to_date('1963-10-04', 'YYYY-MM-DD'), 'The Desert',   'images/moses.png',  'I was found in a river.',  100),
	('Buddha', 'Jones',    'the_buddha', 'asdjklasjdkljal', 'buddha@gmail.com', to_date('1950-07-13', 'YYYY-MM-DD'), 'Under a Tree', 'images/buddha.png', 'I am enlightened.',        100);

 --
 -- Follows Table
 --

CREATE TABLE Follows (
	follower_id INTEGER NOT NULL REFERENCES Users(user_id),
	followee_id INTEGER NOT NULL REFERENCES Users(user_id),
 PRIMARY KEY(follower_id, followee_id)
);

INSERT INTO Follows (follower_id, followee_id)
	VALUES
	((SELECT user_id FROM Users WHERE username = 'redsea1'),    (SELECT user_id FROM Users WHERE username = 'the_buddha')),
	((SELECT user_id FROM Users WHERE username = 'the_buddha'), (SELECT user_id FROM Users WHERE username = 'redsea1')),
	((SELECT user_id FROM Users WHERE username = 'mjoln1r'),    (SELECT user_id FROM Users WHERE username = 'the_buddha')),
	((SELECT user_id FROM Users WHERE username = 'mjoln1r'),    (SELECT user_id FROM Users WHERE username = 'redsea1'));

 --
 -- Communities Table
 --

CREATE TABLE Communities (
	community_id SERIAL,
	name         TEXT      NOT NULL,
	description  TEXT      NOT NULL,
	is_verified  BOOLEAN   DEFAULT FALSE,
	create_date  TIMESTAMP NOT NULL DEFAULT now(),
	ban_status   BANSTATUS NOT NULL DEFAULT 'NOT_BANNED',
 PRIMARY KEY(community_id)
);

INSERT INTO Communities (name, description, is_verified)
	VALUES
	('Buddhism',   'Come get enlightened!', TRUE),
	('Norse Gods', 'To Valhalla!',          FALSE);

 --
 -- Members Table
 --

CREATE TABLE Members (
	user_id      INTEGER NOT NULL REFERENCES Users(user_id),
	community_id INTEGER NOT NULL REFERENCES Communities(community_id),
	is_moderator BOOLEAN NOT NULL DEFAULT FALSE
 PRIMARY KEY (user_id, community_id)
);

INSERT INTO Members (user_id, community_id, is_moderator)
	VALUES
	((SELECT user_id FROM Users WHERE username = 'redsea1'),    (SELECT community_id FROM Communities WHERE name = 'Buddhism'),   FALSE),
	((SELECT user_id FROM Users WHERE username = 'mjoln1r'),    (SELECT community_id FROM Communities WHERE name = 'Norse Gods'), TRUE),
	((SELECT user_id FROM Users WHERE username = 'mjoln1r'),    (SELECT community_id FROM Communities WHERE name = 'Buddhism'),   FALSE),
	((SELECT user_id FROM Users WHERE username = 'the_buddha'), (SELECT community_id FROM Communities WHERE name = 'Buddhism'),   TRUE);

 --
 -- Posts Table
 --

CREATE TABLE Posts (
	post_id         SERIAL,
	user_id         INTEGER   NOT NULL REFERENCES Users(user_id),
	upvotes         INTEGER   NOT NULL DEFAULT 0,
	downvotes       INTEGER   NOT NULL DEFAULT 0,
	body_text       TEXT,
	post_title      TEXT      NOT NULL,
	post_image_path TEXT,
	create_date     TIMESTAMP NOT NULL DEFAULT now(),
	is_complete     BOOLEAN   NOT NULL DEFAULT FALSE,
 PRIMARY KEY(post_id)
);

INSERT INTO Posts (user_id, upvotes, downvotes, body_text, post_title, post_image_path)
	VALUES
	((SELECT user_id FROM Users WHERE username = 'redsea1'), 24, 1, 'I need some help. #please',                         'Please help me become enlightened!', 'images/help.png'),
	((SELECT user_id FROM Users WHERE username = 'mjoln1r'), 1,  0, 'My dang brother Loki is at it again. #godproblems', 'Pray for me to defeat Loki',         NULL);

 --
 -- PostsToCommunities Table
 --

CREATE TABLE PostsToCommunities (
	post_id      INTEGER NOT NULL REFERENCES Posts(post_id),
	community_id INTEGER NOT NULL REFERENCES Communities(community_id),
 PRIMARY KEY(post_id, community_id)
);

INSERT INTO PostsToCommunities (post_id, community_id)
	VALUES
	((SELECT post_id FROM Posts WHERE post_title = 'Please help me become enlightened!'), (SELECT community_id FROM Communities WHERE name = 'Buddhism')),
	((SELECT post_id FROM Posts WHERE post_title = 'Pray for me to defeat Loki'),         (SELECT community_id FROM Communities WHERE name = 'Buddhism')),
	((SELECT post_id FROM Posts WHERE post_title = 'Pray for me to defeat Loki'),         (SELECT community_id FROM Communities WHERE name = 'Norse Gods'));

 --
 -- Comments Table
 --

CREATE TABLE Comments (
	comment_id SERIAL,
	user_id    INTEGER NOT NULL REFERENCES Users(user_id),
	post_id    INTEGER NOT NULL REFERENCES Posts(post_id),
	body_text  TEXT    NOT NULL,
 PRIMARY KEY(comment_id)
);

INSERT INTO Comments (user_id, post_id, body_text)
	VALUES
	((SELECT user_id FROM Users WHERE username = 'the_buddha'), (SELECT post_id FROM Posts WHERE post_title = 'Please help me become enlightened!'), 'You must help yourself.'),
	((SELECT user_id FROM Users WHERE username = 'mjoln1r'),    (SELECT post_id FROM Posts WHERE post_title = 'Please help me become enlightened!'), 'I believe in you!');

 --
 -- Reports Table
 --

CREATE TABLE Reports (
	report_id     SERIAL,
	post_id       INTEGER NOT NULL REFERENCES Posts(post_id),
	report_reason TEXT    NOT NULL,
 PRIMARY KEY(report_id)
);

INSERT INTO Reports (post_id, report_reason)
	VALUES
	((SELECT post_id FROM Posts WHERE post_title = 'Please help me become enlightened!'), 'This offends me.');

 --
 -- PostUpdates Table
 --

CREATE TABLE PostUpdates (
	post_update_id SERIAL,
	post_id        INTEGER NOT NULL REFERENCES Posts(post_id),
	body_text      TEXT    NOT NULL,
 PRIMARY KEY (post_update_id)
);

INSERT INTO PostUpdates (post_id, body_text)
	VALUES
	((SELECT post_id FROM Posts WHERE post_title = 'Please help me become enlightened!'), 'I now realize I must help myself!');


 --
 -- Hashtags Table
 --

CREATE TABLE Hashtags (
	hashtag_name TEXT    NOT NULL,
	post_id      INTEGER NOT NULL REFERENCES Posts(post_id),
 PRIMARY KEY(hashtag_name, post_id)
);

INSERT INTO Hashtags (hashtag_name, post_id)
	VALUES
	('please',      (SELECT post_id FROM Posts WHERE post_title = 'Please help me become enlightened!')),
	('godproblems', (SELECT post_id FROM Posts WHERE post_title = 'Please help me become enlightened!'));
