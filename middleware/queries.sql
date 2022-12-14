CREATE DATABASE spy_agency;

USE spy_agency;

CREATE TABLE hitmen (
  name CHARACTER(255),
  email CHARACTER(255),
  description CHARACTER(255),
  password CHARACTER(255),
  status BOOLEAN,
  PRIMARY KEY (email)
);

CREATE TABLE managers (
  name CHARACTER(255),
  email CHARACTER(255),
  hitman_id CHARACTER(255),
  description CHARACTER(255),
  password CHARACTER(255),
  PRIMARY KEY (email),
  FOREIGN KEY (hitman_id) REFERENCES hitmen(email)
);

CREATE TABLE hits (
  id INTEGER,
  manager_id CHARACTER(255),
  hitman_id CHARACTER(255),
  description CHARACTER(255),
  target CHARACTER(255),
  status BOOLEAN,
  PRIMARY KEY (id),
  FOREIGN KEY (manager_id) REFERENCES managers(email),
  FOREIGN KEY (hitman_id) REFERENCES hitmen(email)
);

INSERT INTO
  hitmen (name, email, description, password, status)
VALUES
  ('H1', 'h1@test.com', 'TEST HITMAN 1', 'h1', TRUE),
  ('H2', 'h2@test.com', 'TEST HITMAN 2', 'h2', TRUE),
  ('H3', 'h3@test.com', 'TEST HITMAN 3', 'h3', TRUE),
  ('H4', 'h4@test.com', 'TEST HITMAN 4', 'h3', TRUE),
  ('H5', 'h5@test.com', 'TEST HITMAN 5', 'h3', TRUE),
  ('H6', 'h6@test.com', 'TEST HITMAN 6', 'h3', TRUE),
  ('H7', 'h7@test.com', 'TEST HITMAN 7', 'h3', TRUE),
  ('H8', 'h8@test.com', 'TEST HITMAN 8', 'h3', TRUE),
  ('H9', 'h9@test.com', 'TEST HITMAN 9', 'h3', TRUE);

INSERT INTO
  managers (name, email, hitman_id, description, password)
VALUES
  (
    'M1',
    'm1@test.com',
    'h2@test.com',
    'TEST MANAGER 1',
    'm1'
  ),
  (
    'M2',
    'm2@test.com',
    'h4@test.com',
    'TEST MANAGER 2',
    'm2'
  ),
  (
    'M3',
    'm3@test.com',
    'h6@test.com',
    'TEST MANAGER 3',
    'm3'
  );

INSERT INTO
  hits (id, manager_id, description, target, status)
VALUES
  ('1', 'm1@test.com', 'TEST DESCRIPTION 1', 'TARGET 1', TRUE);

INSERT INTO
  hits (id, hitman_id, description, target, status)
VALUES
  ('2', 'h1@test.com', 'TEST DESCRIPTION 2', 'TARGET 2', TRUE),
  ('3', 'h2@test.com', 'TEST DESCRIPTION 3', 'TARGET 3', TRUE),
  ('4', 'h3@test.com', 'TEST DESCRIPTION 4', 'TARGET 4', TRUE);