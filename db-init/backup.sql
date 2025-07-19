-- Configuraciones iniciales
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET row_security = off;

-- Elimina las tablas si existen
DROP TABLE IF EXISTS public.keys;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.files;

-- Tabla de usuarios
CREATE TABLE public.users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  oauthprovider VARCHAR(255) NOT NULL,
  oauthid VARCHAR(255) NOT NULL,
  avatarurl VARCHAR(255)
);

ALTER TABLE public.users OWNER TO admin;

-- Tabla de claves
CREATE TABLE public.keys (
  id SERIAL PRIMARY KEY,
  alias VARCHAR(50) NOT NULL,
  public_key TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

ALTER TABLE public.keys OWNER TO admin;

CREATE TABLE files (
    id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    hash TEXT,
    path TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    CONSTRAINT fk_archivo_user FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE
);

ALTER TABLE public.files OWNER TO admin;
