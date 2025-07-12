--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

-- Paso para poder restaurar la base de datos en un contenedor Docker:
-- Primero, asegúrate de que el contenedor de PostgreSQL está corriendo.
-- En terminal o powershell de windows: Get-Content .\backup.sql | docker exec -i postgres_db psql -U admin -d taller1
-- linux o wsl: docker exec -i postgres_db psql -U admin -d my_database < backup.sql

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: llave; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.llave (
    id integer NOT NULL,
    alias character varying(50) NOT NULL,
    public_key character varying(100) NOT NULL
);


ALTER TABLE public.llave OWNER TO admin;

--
-- Data for Name: llave; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.llave (id, alias, public_key) FROM stdin;
\.


--
-- Name: llave llave_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.llave
    ADD CONSTRAINT llave_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

