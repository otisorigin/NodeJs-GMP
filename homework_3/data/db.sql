CREATE TABLE public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    login character varying(20) COLLATE pg_catalog."default" NOT NULL,
    password character varying(20) COLLATE pg_catalog."default" NOT NULL,
    age integer NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;
sequelize init
ALTER TABLE public.users
    OWNER to tyyxlqklfoagud;

INSERT INTO users (login, password, age) 
VALUES ('admin', 'password5', 36);
INSERT INTO users (login, password, age) 
VALUES ('"user4', 'password4', 20);
INSERT INTO users (login, password, age) 
VALUES ('"login3', 'password1', 130);
INSERT INTO users (login, password, age) 
VALUES ('dark_user', 'password1', 14);
INSERT INTO users (login, password, age) 
VALUES ('ivan_petrov', 'password1', 6);