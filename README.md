# SportSenter1 – nettside

Gjenskapt nettside for treningssenteret SportSenter1 (avdelinger **Kolbotn** og **Vinterbro**),
bygget som et eid alternativ til den opprinnelige Wix-siden. Bygget med **Astro** (statisk side).

## Kom i gang

```bash
npm install
npm run dev      # utvikling på http://localhost:4321
npm run build    # bygger statiske filer til dist/
npm run preview  # forhåndsvis produksjonsbygg
```

## Struktur

| Sti | Innhold |
|-----|---------|
| `src/pages/` | Én fil per side (`index.astro` = forsiden, osv.) |
| `src/components/` | Header, Footer, og gjenbrukbar `LocationPage` |
| `src/layouts/Base.astro` | Felles HTML-ramme (meta, header, footer) |
| `src/data/site.js` | **Rediger her:** telefon, e-post, adresser, åpningstider, meny |
| `src/content/blog/` | Blogginnlegg («Just Sayin'») som Markdown – legg til nye `.md`-filer |
| `public/img/` | Bilder (web-optimalisert) |
| `scrape/` | Råkopi av den originale siden (HTML, tekst, fulloppløste bilder) – sikkerhetskopi |

## Redigere innhold

- **Kontaktinfo / åpningstider / meny:** `src/data/site.js`
- **Tekst på en side:** rediger den aktuelle `.astro`-filen i `src/pages/`
- **Nytt blogginnlegg:** lag en ny `.md`-fil i `src/content/blog/` (kopier en eksisterende som mal)
- For ikke-tekniske redaktører kan et lettvekts-CMS (Decap/Tina) kobles på senere.

## Koble til bookingsystemet (timeplan)

Timeplanen kommer fra deres egenbygde system. Det er forberedt plassholdere (`.embed-slot`)
merket med `TODO` på:

- `src/pages/gruppetimer.astro` (full timeplan)
- `src/components/LocationPage.astro` (timeplan per avdeling)

Bytt ut plassholderen med enten en `<iframe>`/embed-kode, en widget, eller et API-kall mot systemet.

## Hosting

Statisk side – kan hostes gratis på f.eks. **Cloudflare Pages** eller **Netlify**
(byggekommando `npm run build`, output-mappe `dist/`). Egen domene (`sportsenter1.no`) kobles på der.

## Hva som mangler / bør fylles inn

- **Priser** på medlemskap (`bli-medlem.astro`) – var dynamiske på originalen.
- **Full klausultekst** i medlemsvilkår (`vilkar.astro`) – kun struktur er gjengitt.
- **Bloggtekster** – kun titler/ingresser er gjenskapt; lim inn full tekst.
- **Trenerbilder** – resolved (filer ligger nå i `public/img/trainers/` og er koblet inn i `trenere.astro`).
