# Rezultati testiranja i merenja

Ovaj dokument sažima kvantitativne rezultate prikazane u master radu i radu za Zbornik. Namenjen je brzom pregledu tokom odbrane.

## Metodologija

Merenja su izvođena u kontrolisanim uslovima, uz isto funkcionalno opterećenje posmatranih verzija sistema. Praćeni su:

- uspešnost test slučajeva;
- vreme izvršavanja pojedinačnih testova;
- prosečno vreme odziva po funkcionalnoj celini;
- propusnost sistema pod povećanim opterećenjem;
- upotreba sistemskih resursa u poređenju početne i unapređene organizacije.

Prikazane vrednosti predstavljaju rezultate evaluacije dokumentovane u radu. Ovaj javni snapshot repozitorijuma ne sadrži kompletan merni/testni harness kojim su generisani svi rezultati, pa ove vrednosti ne treba predstavljati kao rezultat trenutnog pokretanja komande iz repozitorijuma.

## Funkcionalni testovi

U završnom pokretanju:

| Metrika | Rezultat |
|---|---:|
| Test skupovi | 7 |
| Ukupno testova | 318 |
| Uspešni testovi | 318 |
| Neuspešni testovi | 0 |
| Uspešnost | 100% |
| Ukupno vreme izvršavanja | 4,91 s |
| Izdvojeni test slučajevi | 36–80 ms |

## Prosečno vreme odziva

| Funkcionalna celina | Prosečno vreme |
|---|---:|
| Autentifikacija | 43 ms |
| Korisnici | 68 ms |
| Predmeti | 58 ms |
| Projektni zadaci | 63 ms |
| Termini odbrane | 69 ms |
| Prisustvo | 50 ms |
| Poeni | 76 ms |

Sve posmatrane funkcionalne celine ostale su ispod 80 ms prosečnog vremena odziva u opisanom merenju.

## Propusnost

Tokom testa sa povećavanjem opterećenja broj obrađenih zahteva rastao je približno ovako:

| Vreme | Zahtevi/s |
|---:|---:|
| 0 s | ~120 |
| 10 s | ~280 |
| 20 s | ~450 |
| 30 s | ~620 |
| 40 s | ~600 |
| 50 s | ~590 |
| 60 s | ~610 |

Nakon približno 30 sekundi sistem se stabilizovao oko **590–610 zahteva/s**, uz manje oscilacije.

## Upotreba resursa

U poređenju početnog monolitnog scenarija i unapređene organizacije, monolitni scenario je u posmatranom testu koristio približno 70% raspoloživih resursa po funkcionalnoj celini, dok su izmerene vrednosti za modularizovanu varijantu bile približno:

| Funkcionalna celina | Modularizovano rešenje | Monolitni scenario |
|---|---:|---:|
| Autentifikacija | 18% | 70% |
| Korisnici | 35% | 70% |
| Evidencija | 55% | 70% |
| Poeni | 28% | 70% |
| Obaveštenja | 12% | 70% |

## Kako predstaviti rezultate na odbrani

Najkraća formulacija:

> „Nisam ostao na kvalitativnoj tvrdnji da je nova organizacija bolja. Evaluacija je obuhvatila 318 testova bez neuspešnih slučajeva, prosečna vremena odziva su bila ispod 80 ms, a pod opterećenjem se propusnost stabilizovala oko 600 zahteva u sekundi. Poređenje potrošnje resursa je dodatno pokazalo da razdvajanje odgovornosti omogućava racionalnije korišćenje infrastrukture.“

## Važna napomena

Rezultati predstavljaju merenja konkretnog sistema u konkretnim uslovima. Ne treba ih predstavljati kao univerzalno pravilo da je svaka mikroservisna ili modularna arhitektura brža od monolitne. Prednost zavisi od dizajna, opterećenja, infrastrukture i načina implementacije.
