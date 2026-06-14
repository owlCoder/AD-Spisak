# ad-spisak

Monorepo za aplikaciju **ad-spisak** — jednostavno upravljanje i ocenjivanje učinka.
Spojeno iz tri ranije odvojena repoa (juni 2026).

## Struktura

| Folder | Šta je | Stack |
|---|---|---|
| [`web/`](web/) | Frontend (klijent) | React + Vite + TypeScript |
| [`api/`](api/) | Glavni REST API (MySQL) | Express + TypeScript |
| [`xlsx-api/`](xlsx-api/) | Servis za Excel izvoz | Express + TypeScript |

## Pokretanje

Svaki paket je samostalan. U svakom folderu:

```bash
cp .env.example .env   # popuni vrednosti
npm install
npm run dev
```

Pogledaj `.env.example` u svakom folderu za potrebne varijable (DB, JWT, API URL-ovi).

> Napomena: tajne (`.env`) nisu u repou. Ranije commitovani secrets su uklonjeni pri spajanju.
