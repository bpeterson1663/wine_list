DROP DATABASE IF EXISTS winedb;

-- Create the db
CREATE DATABASE winedb;

-- Move into the db
\c winedb

-- Create our table if it doesn't already exist
CREATE TABLE IF NOT EXISTS Wines (
    id SERIAL,
    name varchar,
    winery varchar,
    vintage varchar,
    price varchar,
    varietal varchar,
    description text,
    image varchar,
    notes text
);

-- Changes the owner of the table to postgres which is the default when installing postgres
ALTER TABLE Wines
    OWNER to postgres;