SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET row_security = off;

DROP TABLE IF EXISTS public.keys;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.files;
DROP TABLE IF EXISTS public.file_signatures;
DROP TABLE IF EXISTS public.shared_files;

CREATE TABLE public.users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  oauthprovider VARCHAR(255) NOT NULL,
  oauthid VARCHAR(255) NOT NULL,
  avatarurl VARCHAR(255)
);

ALTER TABLE public.users OWNER TO admin;

CREATE TABLE public.keys (
  id SERIAL PRIMARY KEY,
  alias VARCHAR(50) NOT NULL,
  public_key TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

ALTER TABLE public.keys OWNER TO admin;

CREATE TABLE public.files (
    id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    hash TEXT,
    path TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    CONSTRAINT fk_archivo_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

ALTER TABLE public.files OWNER TO admin;

CREATE TABLE public.file_signatures (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    file_id INTEGER NOT NULL,
    key_id INTEGER NOT NULL,
    signature TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_signature_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE,
    CONSTRAINT fk_signature_file FOREIGN KEY (file_id) REFERENCES public.files(id) ON DELETE CASCADE,
    CONSTRAINT fk_signature_key FOREIGN KEY (key_id) REFERENCES public.keys(id) ON DELETE CASCADE
);

ALTER TABLE public.file_signatures OWNER TO admin;


CREATE TABLE public.shared_files (
  id SERIAL PRIMARY KEY,
  file_id INTEGER NOT NULL,
  owner_user_id INTEGER NOT NULL,
  shared_with_user_id INTEGER NOT NULL,
  CONSTRAINT fk_shared_file FOREIGN KEY (file_id) REFERENCES public.files(id) ON DELETE CASCADE,
  CONSTRAINT fk_owner_user FOREIGN KEY (owner_user_id) REFERENCES public.users(id) ON DELETE CASCADE,
  CONSTRAINT fk_shared_with_user FOREIGN KEY (shared_with_user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

ALTER TABLE public.shared_files OWNER TO admin;
