
-- Configuraciones iniciales
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET row_security = off;

-- Limpieza y creación de tabla
DROP TABLE IF EXISTS public.llave;

CREATE TABLE public.llave (
    id SERIAL PRIMARY KEY,
    alias VARCHAR(50) NOT NULL,
    public_key TEXT NOT NULL
);

ALTER TABLE public.llave OWNER TO admin;
