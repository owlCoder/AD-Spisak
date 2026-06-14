import db from "../database/connection";

class NewPredmetInitTablesRepository {
  private getTableName(predmet_id: number, tableType: string): string {
    return `${tableType}_${predmet_id}`;
  }

  async initializePredmet(predmet_id: number, userData: { email: string; password: string; ime_prezime: string; uloga: string }): Promise<void> {
    const korisniciTable = this.getTableName(predmet_id, 'korisnici');
    const evidencijaTable = this.getTableName(predmet_id, 'evidencija');
    const poeniTable = this.getTableName(predmet_id, 'poeni');

    const createKorisniciTable = `
      CREATE TABLE IF NOT EXISTS ${korisniciTable} (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        ime_prezime VARCHAR(255) NOT NULL,
        uloga ENUM('STUDENT', 'TA') NOT NULL,
        broj_indeksa VARCHAR(30) UNIQUE,
        grupa INT DEFAULT 1,
        ocena INT DEFAULT 5
      );
    `;

    const createEvidencijaTable = `
      CREATE TABLE IF NOT EXISTS ${evidencijaTable} (
        id INT PRIMARY KEY AUTO_INCREMENT,
        redni_broj_casa INT NOT NULL,
        prisutan BOOLEAN DEFAULT FALSE,
        napomena TEXT,
        korisnik_fk INT,
        FOREIGN KEY (korisnik_fk) REFERENCES ${korisniciTable}(id),
        UNIQUE (redni_broj_casa, korisnik_fk)
      );
    `;

    const createPoeniTable = `
      CREATE TABLE IF NOT EXISTS ${poeniTable} (
        id INT PRIMARY KEY AUTO_INCREMENT,
        naziv VARCHAR(255) NOT NULL,
        broj_poena FLOAT NOT NULL,
        napomena TEXT,
        korisnik_fk INT,
        FOREIGN KEY (korisnik_fk) REFERENCES ${korisniciTable}(id),
        UNIQUE (naziv, korisnik_fk)
      );
    `;

    const createProjektiTable = `
      CREATE TABLE IF NOT EXISTS projekti_${predmet_id} (
        id INT PRIMARY KEY AUTO_INCREMENT,
        tim INT NOT NULL,
        zadatak VARCHAR(50) NOT NULL,
        korisnik_fk INT,
        FOREIGN KEY (korisnik_fk) REFERENCES ${korisniciTable}(id),
        termin_odbrane_id INT,
        polozeno BOOL DEFAULT FALSE,
        UNIQUE (tim, zadatak, korisnik_fk)
      );
    `;

    const createTerminiOdbraneTable = `
      CREATE TABLE termini_odbrane_projekata_${predmet_id} (
          id INT PRIMARY KEY AUTO_INCREMENT,
          naziv_termina_odbrane VARCHAR(100) NOT NULL,
          datum DATE NOT NULL,
          vreme_odbrane TIME NOT NULL,
          ucionica VARCHAR(100) NOT NULL,
          aktivan BOOLEAN NOT NULL DEFAULT FALSE,
          prijava_otvorena BOOLEAN NOT NULL DEFAULT FALSE,
          napomena TEXT
        );
      `;

    const insertUser = `
      INSERT INTO ${korisniciTable} (email, password, ime_prezime, uloga) 
      VALUES (?, ?, ?, ?);
    `;

    const createPoeniIndex = `CREATE INDEX idx_korisnik_fk ON poeni_${predmet_id}(korisnik_fk);`;

    try {
      await db.execute(createKorisniciTable);
      await db.execute(createEvidencijaTable);
      await db.execute(createPoeniTable);
      await db.execute(createTerminiOdbraneTable);
      await db.execute(createProjektiTable);
      await db.execute(createPoeniIndex);
      await db.execute(insertUser, [
        userData.email,
        userData.password,
        userData.ime_prezime,
        userData.uloga
      ]);
    } catch (error) {
      throw error;
    }
  }
}

export default NewPredmetInitTablesRepository;
