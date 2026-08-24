# Plan demonstracije za odbranu — mikroservisna Docker verzija

## Pre ulaska komisije

Pokrenuti:

```bash
git checkout odbrana-microservices-docker
docker compose up -d --build
docker compose ps
```

Otvoriti unapred:

1. `http://localhost:5173`
2. `http://localhost:8080/api/health`
3. root `README.md`
4. `docs/ARCHITECTURE.md`
5. `docs/MEASUREMENTS.md`

Demo nalog: `nastavnik@demo.local` / `Odbrana2026!`.

## 1. Uvod — oko 30 sekundi

Reći:

> „Ovo je praktični deo master rada. Za odbranu je sistem pokrenut potpuno lokalno u Dockeru. Klijent komunicira sa API gateway-em, a autentifikacija, korisnici, predmeti, prisustvo, poeni, projekti i termini odbrane izvršavaju se kao zasebni kontejneri. Excel obrada je dodatni izdvojeni servis.“

## 2. Dokaži da su mikroservisi stvarno odvojeni — oko 60 sekundi

Pokazati `docker compose ps`.

Naglasiti:

- svaki domen je zaseban Node.js proces/kontejner;
- svaki ima sopstveni health endpoint;
- gateway usmerava zahtev na odgovarajući servis;
- klijent ne zna interne adrese servisa.

Ako pitaju kako isti repo može da bude mikroservisni:

> „Mikroservis ne mora da bude poseban Git repozitorijum. Bitna je runtime i deployment granica. Ovde isti TypeScript codebase koristim kao osnovu, ali svaka instanca dobija `SERVICE_NAME`, registruje samo svoj domen i radi kao zaseban proces. Time mogu nezavisno da restartujem ili skaliram pojedinačni servis.“

## 3. Dijagram — oko 60 sekundi

Otvoriti `docs/ARCHITECTURE.md`.

Tok zahteva:

`React -> Nginx gateway -> odgovarajući mikroservis -> MySQL`.

Za Excel:

`React -> gateway -> xlsx-service -> gateway -> potrebni domen-servisi`.

## 4. Demo aplikacije — 3 do 4 minuta

### Prijava

1. izabrati `Demo predmet - AD Spisak`;
2. prijaviti se kao `nastavnik@demo.local`;
3. objasniti da zahtev kroz gateway ide u `auth-service`.

### Studenti

1. otvoriti listu studenata;
2. objasniti da `/api/studenti` gateway šalje u `users-service`;
3. otvoriti jednog studenta.

### Prisustvo

1. prikazati evidenciju;
2. po potrebi promeniti jednu vrednost;
3. naglasiti da taj domen obrađuje `attendance-service`.

### Poeni

1. prikazati/izmeniti poene;
2. osvežiti stranicu;
3. naglasiti `points-service`.

### Projekat i termin odbrane

Pokazati postojeće demo podatke bez ručnog kreiranja velikog broja zapisa.

### Excel

Ako vreme dozvoli, pokazati izvoz i objasniti da ga obrađuje poseban `xlsx-service`.

## 5. Kod koji pokazati — najviše 2 minuta

### `api/api/index.ts`

Poenta:

> „Ista aplikativna osnova može da se pokrene kao jedan servis zbog kompatibilnosti ili kao odvojeni domen-servisi. `SERVICE_NAME` određuje koje rute konkretan proces poseduje.“

### `docker-compose.yml`

Pokazati da se API image podiže sedam puta sa vrednostima `auth`, `users`, `subjects`, `attendance`, `points`, `projects` i `defenses`.

### `docker/gateway/nginx.conf`

Pokazati npr. da `/api/poeni/*` ide na `points-service`, a `/api/evidencija/*` na `attendance-service`.

To je jači dokaz mikroservisne verzije od pokazivanja velikog broja nasumičnih klasa.

## 6. Rezultati — oko 60 sekundi

Otvoriti `docs/MEASUREMENTS.md` i navesti:

- 318 testova, 0 neuspešnih;
- 36–80 ms za izdvojene test slučajeve;
- prosečna vremena odziva 43–76 ms;
- propusnost oko 590–610 zahteva/s nakon stabilizacije;
- izmerena upotreba resursa 12–55% naspram približno 70% kod početnog monolitnog scenarija.

Rečenica:

> „Cilj nije bio samo da kod izgleda modularnije, već da arhitektonske izmene budu proverene funkcionalnim testovima i konkretnim merenjima.“

## 7. Očekivana pitanja

### Da li je ovo stvarno mikroservisna arhitektura ako servisi dele source code?

Da. Repo granica i mikroservis granica nisu isto. U ovoj grani domeni su zasebne deployment/runtime jedinice, imaju sopstvene procese i mrežne adrese i gateway ih poziva nezavisno.

### Zašto dele jednu MySQL bazu?

Za lokalnu verziju pred odbranu zadržana je postojeća perzistencija kako se ne bi istovremeno menjala i servisna i data arhitektura. Shared database je kompromis, ne zabrana mikroservisne arhitekture. Sledeći korak bi bio jasnije vlasništvo nad podacima kroz posebne šeme/baze ili data servis.

### Zar database-per-service nije standardna praksa?

Česta je praksa jer povećava autonomiju servisa, ali nije formalni uslov. Ona uvodi i problem distribuirane konzistentnosti, pa se bira prema konkretnom sistemu, a ne automatski.

### Zašto gateway?

Da klijent ima jednu ulaznu tačku, da se routing i fizičke adrese mikroservisa ne razlivaju kroz frontend i da se kasnije centralizuju cross-cutting mehanizmi.

### Zašto isti API image za više servisa?

Smanjuje dupliranje build konfiguracije i zajedničkog koda. Svaki kontejner i dalje učitava samo rute svog domena. Kasnije je moguće izdvojiti source pakete bez promene spoljnog API ugovora.

### Kako dokazati nezavisnost?

`docker compose stop points-service` obara samo funkcionalnost poena; ostali servisni kontejneri nastavljaju da rade. Posle toga `docker compose start points-service` vraća domen.

### Zašto MySQL?

Domen je prirodno relacioni: studenti, predmeti, poeni, prisustvo, projekti i termini imaju jasne veze, a integritet podataka je važan.

### Šta bi sledeće unapredio?

- automatizovane integracione/contract testove između gateway-a i servisa;
- OpenAPI ugovore;
- database ownership po domenu;
- observability: centralizovane logove, metrike i tracing;
- orkestraciju i horizontalno skaliranje u cloud okruženju kada opterećenje to opravda.

## 8. Fallback

Ova grana je napravljena upravo da odbrana ne zavisi od cloud-a. Ako nema interneta, lokalni Docker demo i dalje radi nakon što su slike/zavisnosti prethodno izgrađene.

Dan ranije obavezno jednom pokrenuti `docker compose up --build`, kako bi sve potrebne Docker slike i npm paketi već bili u lokalnom cache-u.
