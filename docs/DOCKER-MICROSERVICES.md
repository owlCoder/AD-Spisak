# Lokalno pokretanje mikroservisne verzije u Dockeru

## 1. Preduslovi

- Docker Desktop ili Docker Engine
- Docker Compose v2
- slobodni portovi 5173, 8080, 3101–3108 i 3307

Node.js nije potreban na računaru ako se koristi isključivo Docker.

## 2. Pokretanje

```bash
git checkout odbrana-microservices-docker
docker compose up --build
```

Prvi build traje duže jer Docker preuzima Node/MySQL/Nginx slike i npm zavisnosti.

Za pokretanje u pozadini:

```bash
docker compose up -d --build
```

## 3. Provera

```bash
docker compose ps
```

Očekivanje je da MySQL, sedam domen-servisa, Excel servis i gateway postanu `healthy`, a web bude `Up`.

Gateway:

```bash
curl http://localhost:8080/api/health
```

Pojedinačni servisi:

```bash
curl http://localhost:3101/api/health # auth
curl http://localhost:3102/api/health # users
curl http://localhost:3103/api/health # subjects
curl http://localhost:3104/api/health # attendance
curl http://localhost:3105/api/health # points
curl http://localhost:3106/api/health # projects
curl http://localhost:3107/api/health # defenses
curl http://localhost:3108/api/health # xlsx
```

## 4. Demo podaci

MySQL se pri prvom startu automatski inicijalizuje fajlom `docker/mysql/init.sql`.

Nastavnik:

- `nastavnik@demo.local`
- `Odbrana2026!`

Studenti:

- `student1@demo.local`
- `student2@demo.local`
- `student3@demo.local`
- lozinka za sva tri: `Odbrana2026!`

Baza sadrži jedan demo predmet, prisustvo, poene, projektne zadatke i termin odbrane kako na odbrani ne bi morao ručno da pripremaš stanje sistema.

## 5. Reset demo baze

Ako tokom probe izmeniš ili obrišeš podatke:

```bash
docker compose down -v
docker compose up -d --build
```

Brisanje volume-a je bitno: MySQL init skripta se izvršava samo kada se kreira nova baza.

## 6. Logovi

Svi servisi:

```bash
docker compose logs -f --tail=100
```

Samo jedan servis:

```bash
docker compose logs -f points-service
```

Ovo je korisno i tokom odbrane ako komisija pita da li su servisi zaista odvojeni: u logovima se vide zasebni procesi i zasebni health check-ovi.

## 7. Demonstracija nezavisnosti servisa

Možeš kratko pokazati:

```bash
docker compose stop points-service
```

Tada će rute za poene privremeno biti nedostupne, dok npr. lista predmeta i prijava ostaju zasebni servisi. Zatim:

```bash
docker compose start points-service
```

Nemoj ovo raditi ako nema vremena; `docker compose ps` je dovoljno da pokaže fizičku dekompoziciju.

## 8. Ako build ne uspe

Najčešći uzroci:

1. Docker Desktop nije pokrenut;
2. neki od portova je zauzet;
3. nema mreže za prvi `npm install` u toku build-a;
4. ostao je stari MySQL volume sa nekompatibilnim podacima.

Za četvrtu situaciju:

```bash
docker compose down -v
```

pa ponovo `docker compose up --build`.

## 9. Šta otvoriti pred odbranu

Pre početka odbrane preporuka je:

```bash
docker compose up -d --build
docker compose ps
```

Zatim u browseru pripremiti:

- `http://localhost:5173`
- `http://localhost:8080/api/health`
- GitHub `docs/ARCHITECTURE.md`

Na taj način demonstracija ne zavisi od Vercel-a niti od spoljne baze.
