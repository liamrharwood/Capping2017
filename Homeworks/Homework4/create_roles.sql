----------------------------------------------------------------------------------------
-- Helping Hands DB - Roles
--
-- By Helping Hands 
--
-- SQL Statements For Postgres 9.5.8
----------------------------------------------------------------------------------------


--
-- Administrator Role
--

CREATE ROLE admin;
GRANT ALL ON ALL TABLES IN SCHEMA public TO admin;

--
-- Application Role
--

CREATE ROLE app;
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM app;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app;
GRANT INSERT ON ALL TABLES IN SCHEMA public TO app;
GRANT UPDATE ON ALL TABLES IN SCHEMA public TO app;
GRANT DELETE ON ALL TABLES IN SCHEMA public TO app;
REVOKE DELETE ON Users, Communities IN SCHEMA public FROM app;

--
-- Reporting Role
--

CREATE ROLE reporting;
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM reporting;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO reporting;