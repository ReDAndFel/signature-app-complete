
-- Configuraciones iniciales
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET row_security = off;

DROP TABLE IF EXISTS public.llave;
DROP TABLE IF EXISTS public.users;

CREATE TABLE public.llave (
    id SERIAL PRIMARY KEY,
    alias VARCHAR(50) NOT NULL,
    public_key TEXT NOT NULL
);

ALTER TABLE public.llave OWNER TO admin;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  oauthprovider VARCHAR(255) NOT NULL,
  oauthid VARCHAR(255) NOT NULL,
  avatarurl VARCHAR(255)
);

ALTER TABLE public.users OWNER TO admin;
