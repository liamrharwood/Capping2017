--liquibase formatted sql

--changeset liamrharwood:1
ALTER TABLE Users ADD UNIQUE (username);