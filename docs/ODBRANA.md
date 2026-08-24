# Plan demonstracije za odbranu

Ovaj dokument je praktičan podsetnik za demonstraciju repozitorijuma i aplikacije. Cilj je da se za nekoliko minuta pokažu problem, arhitektonska odluka, ključne funkcionalnosti i merljivi rezultati.

## 1. Uvod — 30 sekundi

Otvoriti root `README.md` i reći:

> „Ovo je monorepo praktičnog dela master rada. Rešenje ima React klijent, glavni TypeScript/Express API sa domenima odvojenim po odgovornosti i poseban servis za Excel operacije. Sistem je namenjen evidenciji prisustva, poena, projekata i termina odbrane.“

Ne ulaziti odmah u detalje implementacije.

## 2. Arhitektura — 60 sekundi

Otvoriti `docs/ARCHITECTURE.md` i pokazati dijagram.

Naglasiti tri stvari:

1. klijent ne pristupa bazi direktno;
2. HTTP sloj, poslovna logika i pristup podacima su razdvojeni;
3. funkcionalne celine imaju jasne granice odgovornosti.

Ako komisija pita da li je svaki domen poseban proces, odgovoriti precizno:

> „U ovom javnom snapshot-u glavni API je konsolidovan u jedan Express deployment radi jednostavnije demonstracije, ali su domeni logički odvojeni na kontrolere, servise i data-access sloj. Excel servis je fizički izdvojen. Fizičko izdvajanje ostalih domena je mogući sledeći korak kada profil opterećenja to opravda.“

To je bolji odgovor nego nazvati svaki folder mikroservisom ako se trenutno ne izvršava kao zaseban proces.

## 3. Brza provera servisa — 20 sekundi

Pre nego što počne demonstracija proveriti health endpoint-e:

```bash
API_URL=https://<api-host> \
XLSX_API_URL=https://<xlsx-host> \
npm run smoke
```

Očekivani rezultat su dve `✓` poruke. Ako jedan servis ne odgovara, odmah preći na fallback demonstraciju umesto da se vreme troši na dijagnostiku pred komisijom.

## 4. Demo aplikacije — 3 do 4 minuta

Pre odbrane pripremiti jedan predmet sa nekoliko testnih studenata i podacima.

### Tok A — prijava

1. otvoriti početnu stranicu;
2. prijaviti se kao nastavno osoblje;
3. objasniti da token identifikuje korisnika i predmet.

### Tok B — studenti i evidencija

1. otvoriti listu studenata;
2. izabrati jednog studenta;
3. prikazati ili promeniti evidenciju prisustva;
4. pokazati da se promena vraća kroz API i čuva u bazi.

### Tok C — poeni

1. otvoriti profil studenta;
2. uneti/izmeniti poene;
3. osvežiti prikaz;
4. pokazati da je vrednost trajno sačuvana.

### Tok D — projekat i odbrana

Ako je demo stanje pripremljeno, pokazati projektni zadatak i termin odbrane. Ne trošiti vreme na unos velikog broja podataka tokom same odbrane.

### Tok E — Excel

Na kraju pokazati izvoz. Ovo je dobar trenutak da se objasni zašto je Excel obrada izdvojena u zaseban servis.

## 5. Kod koji treba pokazati — 2 minuta

Ne otvarati nasumične fajlove. Pokazati najviše četiri mesta.

### `api/api/index.ts`

Pokazuje domenske rute i ulaznu tačku serverskog dela.

Poenta:

> „Ulazna tačka ne sadrži poslovnu logiku; ona samo registruje odvojene domenske kontrolere.“

### Jedan kontroler, npr. `api/controllers/poeni_controller.ts`

Poenta:

> „Kontroler obrađuje HTTP zahtev, ali konkretan rad delegira servisu.“

### Odgovarajući servis

Poenta:

> „Poslovna logika nije vezana za React niti za HTTP rutu, što je važno za održavanje i testiranje.“

### `web/src/api/`

Poenta:

> „Frontend komponente ne sadrže razbacane URL-ove i HTTP detalje; komunikacija je izdvojena u API sloj klijenta.“

## 6. Rezultati — 60 sekundi

Otvoriti `docs/MEASUREMENTS.md`.

Reći samo ključne brojke:

- 318 testova, 0 neuspešnih;
- 36–80 ms za izdvojene test slučajeve;
- prosečna vremena odziva 43–76 ms;
- stabilizacija oko 590–610 zahteva/s pod opterećenjem;
- upotreba resursa u merenju 12–55% naspram približno 70% kod početnog scenarija.

Završna rečenica:

> „Bitno mi je bilo da poboljšanje ne ostane samo arhitektonska tvrdnja, već da ga proverim funkcionalnim testovima i konkretnim merenjima.“

## 7. Očekivana pitanja

### Zašto MySQL, a ne NoSQL?

Podaci imaju jasne relacije i integritet je važniji od fleksibilne šeme. Student, predmet, poeni, prisustvo, projekat i termin odbrane prirodno formiraju relacioni model.

### Zašto TypeScript?

Statička tipizacija smanjuje deo grešaka pri razvoju, olakšava refaktorisanje i čini ugovore između slojeva jasnijim.

### Zašto React?

Komponentni model dobro odgovara interfejsu koji ima više ponovljivih prikaza i formi, dok API sloj ostaje odvojen od UI komponenti.

### Zašto nije korišćen Moodle?

Cilj nije razvoj opšte LMS platforme. Rešenje je specijalizovano za evidenciju predispitnih obaveza, prisustva, poena, projekata i odbrana, pa izbegava funkcionalnosti koje nisu potrebne konkretnom nastavnom toku.

### Zašto mikroservisi/modularizacija?

Ne zato što su „moderniji“, već zato što funkcionalne celine imaju različite odgovornosti i potencijalno različite profile opterećenja. Važno je naglasiti da mikroservisi nisu automatski bolji izbor za svaki sistem.

### Zašto javni repo ima jedan glavni API?

Monorepo je konsolidovan radi preglednosti i lakše demonstracije. Logičke granice domena su sačuvane, a fizičko razdvajanje treba uvoditi tamo gde donosi opravdanu korist. Excel servis je primer stvarno izdvojene deployment jedinice.

### Kako su dobijene performanse?

U kontrolisanim uslovima sa istim funkcionalnim opterećenjem, kroz više merenja vremena odziva, propusnosti i upotrebe resursa. Brojke predstavljaju konkretno testirano rešenje, ne univerzalno pravilo.

### Šta bi sledeće unapredio?

- automatizovao arhiviranje starijih podataka;
- dodao naprednije analitičke izveštaje;
- proširio automatizovane testove u javnom repozitorijumu;
- fizički izdvojio domene samo ako monitoring pokaže da im je potrebno nezavisno skaliranje;
- dodao formalni API ugovor/OpenAPI specifikaciju.

## 8. Fallback ako demo ne radi

Pre odbrane napraviti screenshot ili kratak video sledećih ekrana:

1. prijava;
2. lista studenata;
3. profil studenta sa poenima;
4. evidencija prisustva;
5. projektni zadaci/termini odbrane;
6. Excel izvoz.

Ako cloud ili baza nisu dostupni, ne pokušavati nekoliko minuta da se servis „oživi“. Odmah preći na screenshot/video, zatim pokazati kod i rezultate merenja.

## 9. Checklista neposredno pre odbrane

- [ ] `npm run smoke` prolazi za oba serverska paketa;
- [ ] testni korisnik radi;
- [ ] testni predmet ima podatke;
- [ ] API URL u frontend okruženju je ispravan;
- [ ] Excel servis odgovara;
- [ ] otvoreni su README, `ARCHITECTURE.md` i `MEASUREMENTS.md`;
- [ ] browser nema otvorene privatne/admin tabove;
- [ ] u terminalu nema prikazanih tajni iz `.env` fajla;
- [ ] pripremljen je fallback screenshot/video;
- [ ] GitHub je otvoren na grani/commit-u koji se demonstrira.
