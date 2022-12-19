\c postgres

select pg_terminate_backend(pid) from pg_stat_activity WHERE datname='teller_story';

DROP DATABASE if exists teller_story;
CREATE DATABASE teller_story
WITH ENCODING = "UTF8"
CONNECTION LIMIT = -1;

\c teller_story

\encoding UTF8

CREATE SCHEMA system;

CREATE DOMAIN dec_nonnegative   DECIMAL(18,4) CHECK(VALUE >= 0.0000);

CREATE TABLE system.users (
    id                  BIGSERIAL       NOT NULL,

    username            VARCHAR(100)     NOT NULL,
    first_name          VARCHAR(50)     NOT NULL,
    last_name           VARCHAR(50)     NOT NULL,
    password            VARCHAR(100)    NULL,
    email               VARCHAR(100)    NOT NULL,
    "image"             BIGINT          NULL,
    status              VARCHAR(50)     NOT NULL,

    creation_date       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    modifier            BIGINT          NULL,
    modification_date   TIMESTAMP       NULL,

    last_login          TIMESTAMP       NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (modifier)  REFERENCES system.users(id),
    FOREIGN KEY ("image")  REFERENCES system.files(id)
);

CREATE UNIQUE INDEX users_email_uq ON system.users USING btree(lower(email)) WHERE status <> 'Deleted';

CREATE TABLE system.files (
    id          BIGSERIAL               NOT NULL,
        
    filename    VARCHAR(500)            NOT NULL,
    url         VARCHAR(500)            NOT NULL,
    extension   VARCHAR(100)            NOT NULL,

    creator             BIGINT          NOT NULL,
    creation_date       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY(id),
    UNIQUE(filename),
    UNIQUE(url),
    FOREIGN KEY (creator)           REFERENCES system.users(id)
);

CREATE TABLE stories (
    id                  BIGSERIAL       NOT NULL,

    title               VARCHAR(150)    NOT NULL,
    "text"              TEXT            NOT NULL,
    "like"              BIGINT          NOT NULL DEFAULT 0,
    "image"             BIGINT          NOT NULL,
    status              VARCHAR(50)     NOT NULL,

    creator             BIGINT          NULL,
    creation_date       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    modifier            BIGINT          NULL,
    modification_date   TIMESTAMP       NULL,

    PRIMARY KEY(id),
    FOREIGN KEY (creator)           REFERENCES system.users(id),
    FOREIGN KEY ("image")           REFERENCES system.files(id),
    FOREIGN KEY (modifier)         REFERENCES system.users(id)
);

CREATE TABLE comments (
    id                  BIGSERIAL       NOT NULL,

    story               BIGINT          NOT NULL,
    "text"              TEXT            NOT NULL,
    "like"              BIGINT          NOT NULL DEFAULT 0,
    status              VARCHAR(50)     NOT NULL,

    creator             BIGINT          NULL,
    creation_date       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    modifier            BIGINT          NULL,
    modification_date   TIMESTAMP       NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (story)             REFERENCES public.stories(id),
    FOREIGN KEY (creator)           REFERENCES system.users(id),
    FOREIGN KEY (modifier)          REFERENCES system.users(id)
);

INSERT INTO system.users ( id, username, first_name, last_name, password, email, status ) 
values(0, 'admin', 'admin', 'admin', '123456789', 'admin@delivery.com', 'Active');
SELECT pg_catalog.setval('system.users_id_seq', 1, FALSE);