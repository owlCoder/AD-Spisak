USE ad_spisak;

CREATE TABLE IF NOT EXISTS predmeti (
  id INT PRIMARY KEY AUTO_INCREMENT,
  naziv VARCHAR(255) NOT NULL,
  sifra_predmeta VARCHAR(100) NOT NULL UNIQUE,
  fond_casova INT NOT NULL,
  predispitne_obaveze TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS korisnici_1 (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  ime_prezime VARCHAR(255) NOT NULL,
  uloga ENUM('STUDENT', 'TA') NOT NULL,
  broj_indeksa VARCHAR(30) UNIQUE,
  grupa INT DEFAULT 1,
  ocena INT DEFAULT 5
);

CREATE TABLE IF NOT EXISTS evidencija_1 (
  id INT PRIMARY KEY AUTO_INCREMENT,
  redni_broj_casa INT NOT NULL,
  prisutan BOOLEAN DEFAULT FALSE,
  napomena TEXT,
  korisnik_fk INT,
  CONSTRAINT fk_evidencija_korisnik_1 FOREIGN KEY (korisnik_fk) REFERENCES korisnici_1(id) ON DELETE CASCADE,
  UNIQUE (redni_broj_casa, korisnik_fk)
);

CREATE TABLE IF NOT EXISTS poeni_1 (
  id INT PRIMARY KEY AUTO_INCREMENT,
  naziv VARCHAR(255) NOT NULL,
  broj_poena FLOAT NOT NULL,
  napomena TEXT,
  korisnik_fk INT,
  CONSTRAINT fk_poeni_korisnik_1 FOREIGN KEY (korisnik_fk) REFERENCES korisnici_1(id) ON DELETE CASCADE,
  UNIQUE (naziv, korisnik_fk),
  INDEX idx_korisnik_fk (korisnik_fk)
);

CREATE TABLE IF NOT EXISTS termini_odbrane_projekata_1 (
  id INT PRIMARY KEY AUTO_INCREMENT,
  naziv_termina_odbrane VARCHAR(100) NOT NULL,
  datum DATE NOT NULL,
  vreme_odbrane TIME NOT NULL,
  ucionica VARCHAR(100) NOT NULL,
  aktivan BOOLEAN NOT NULL DEFAULT FALSE,
  prijava_otvorena BOOLEAN NOT NULL DEFAULT FALSE,
  napomena TEXT
);

CREATE TABLE IF NOT EXISTS projekti_1 (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tim INT NOT NULL,
  zadatak VARCHAR(50) NOT NULL,
  korisnik_fk INT,
  termin_odbrane_id INT,
  polozeno BOOL DEFAULT FALSE,
  CONSTRAINT fk_projekti_korisnik_1 FOREIGN KEY (korisnik_fk) REFERENCES korisnici_1(id) ON DELETE CASCADE,
  UNIQUE (tim, zadatak, korisnik_fk)
);

INSERT IGNORE INTO predmeti (id, naziv, sifra_predmeta, fond_casova, predispitne_obaveze)
VALUES (1, 'Demo predmet - AD Spisak', 'AD-DEMO', 15, 'Kolokvijum,Projekat,Prisustvo');

-- Sve demo lozinke su: Odbrana2026!
-- Hash je namerno javan jer se koristi isključivo u lokalnom demo okruženju.
INSERT IGNORE INTO korisnici_1 (id, email, password, ime_prezime, uloga, broj_indeksa, grupa, ocena) VALUES
  (1, 'nastavnik@demo.local', '$2b$10$mESbYJoQMjarvDAMxsMOIe0Uwr5jEGiSJt/el3dRwdclx371.LCq6', 'Demo Nastavnik', 'TA', NULL, 1, 5),
  (2, 'student1@demo.local', '$2b$10$mESbYJoQMjarvDAMxsMOIe0Uwr5jEGiSJt/el3dRwdclx371.LCq6', 'Ana Anić', 'STUDENT', 'SI1/2024', 1, 9),
  (3, 'student2@demo.local', '$2b$10$mESbYJoQMjarvDAMxsMOIe0Uwr5jEGiSJt/el3dRwdclx371.LCq6', 'Marko Marković', 'STUDENT', 'SI2/2024', 1, 8),
  (4, 'student3@demo.local', '$2b$10$mESbYJoQMjarvDAMxsMOIe0Uwr5jEGiSJt/el3dRwdclx371.LCq6', 'Jelena Jelić', 'STUDENT', 'SI3/2024', 2, 10);

INSERT IGNORE INTO evidencija_1 (id, redni_broj_casa, prisutan, napomena, korisnik_fk) VALUES
  (1, 1, TRUE, NULL, 2), (2, 2, TRUE, NULL, 2), (3, 3, FALSE, 'Opravdano', 2), (4, 4, TRUE, NULL, 2),
  (5, 1, TRUE, NULL, 3), (6, 2, FALSE, NULL, 3), (7, 3, TRUE, NULL, 3), (8, 4, TRUE, NULL, 3),
  (9, 1, TRUE, NULL, 4), (10, 2, TRUE, NULL, 4), (11, 3, TRUE, NULL, 4), (12, 4, TRUE, NULL, 4);

INSERT IGNORE INTO poeni_1 (id, naziv, broj_poena, napomena, korisnik_fk) VALUES
  (1, 'Kolokvijum', 28, NULL, 2), (2, 'Projekat', 34, NULL, 2), (3, 'Prisustvo', 8, NULL, 2),
  (4, 'Kolokvijum', 24, NULL, 3), (5, 'Projekat', 31, NULL, 3), (6, 'Prisustvo', 7, NULL, 3),
  (7, 'Kolokvijum', 30, NULL, 4), (8, 'Projekat', 38, NULL, 4), (9, 'Prisustvo', 10, NULL, 4);

INSERT IGNORE INTO termini_odbrane_projekata_1
  (id, naziv_termina_odbrane, datum, vreme_odbrane, ucionica, aktivan, prijava_otvorena, napomena)
VALUES
  (1, 'Prvi termin odbrane', '2026-09-01', '10:00:00', 'NTP-301', TRUE, TRUE, 'Demo termin za odbranu master rada');

INSERT IGNORE INTO projekti_1 (id, tim, zadatak, korisnik_fk, termin_odbrane_id, polozeno) VALUES
  (1, 1, 'SaaS evidencija', 2, 1, TRUE),
  (2, 1, 'SaaS evidencija', 3, 1, TRUE),
  (3, 2, 'Analitika uspeha', 4, 1, FALSE);
