# SkillPath – Urapolkujen ja osaamisen kehittämisen sovellus

SkillPath on Reactilla toteutettu verkkosovellus, jonka avulla käyttäjä voi kartoittaa omaa osaamistaan, tutustua erilaisiin IT- ja data-alan uravaihtoehtoihin sekä suunnitella osaamisensa kehittämistä.

Sovellus vertailee käyttäjän ilmoittamia taitoja ja kiinnostuksen kohteita eri ammattien osaamisvaatimuksiin. Tulosten perusteella käyttäjä saa urasuosituksia ja voi muodostaa henkilökohtaisen oppimissuunnitelman.

**Julkaistu sovellus:** https://aminos24.github.io/skillpath/

## Ominaisuudet

### 1. Skills & Interests – Osaamisen kartoitus

Käyttäjä voi valita osaamisalueitaan, arvioida taitotasoaan asteikolla 1–5 ja ilmoittaa kiinnostuksen kohteensa.

Tiedot tallennetaan selaimen `localStorage`-muistiin, joten ne säilyvät sivun päivittämisen jälkeen.

### 2. Career Matches – Urasuositukset

Sovellus vertailee käyttäjän osaamista kuuden eri uravaihtoehdon vaatimuksiin:

- Data Analyst
- Data Scientist
- Frontend Developer
- Machine Learning Engineer
- Cybersecurity Analyst
- Cloud Engineer

Urasuositukset järjestetään laskennallisen vastaavuuspisteytyksen perusteella. Pisteytyksessä osaamisen vastaavuuden painoarvo on 75 % ja kiinnostuksen kohteiden 25 %.

Käyttäjä näkee kunkin uravaihtoehdon vastaavuusprosentin ja kehittämistä vaativat taidot.

### 3. Learning Roadmap – Oppimissuunnitelma

Käyttäjä voi valita kiinnostavan urapolun ja tarkastella sen edellyttämiä taitoja.

Sovellus näyttää nykyisen ja vaaditun taitotason sekä muodostaa luettelon kehittämistä vaativista osaamisalueista.

Oppimistavoitteita voi merkitä suoritetuiksi. Edistymistä seurataan prosentteina ja edistymispalkilla. Suoritustiedot tallennetaan selaimen paikalliseen muistiin.

## Ulkoinen REST API

Sovellus käyttää Euroopan komission **ESCO API:a** (European Skills, Competences, Qualifications and Occupations).

API:n avulla haetaan virallisia ammattinimikkeitä ja ammattikoodeja valitun urapolun perusteella.

Tietojen hakeminen toteutetaan JavaScriptin `fetch`-rajapinnalla sekä `async/await`-rakenteella. Sovellus käsittelee myös lataustilanteet, verkkovirheet ja tilanteet, joissa täsmällistä ammattinimikevastaavuutta ei löydy.

Urasuositusten osaamisvaatimukset ja pisteytys on määritelty sovelluksessa erikseen. ESCO API:a käytetään ammattitietojen täydentämiseen, ei suosituspisteiden laskemiseen.

API:n dokumentaatio: https://ec.europa.eu/esco/api

## Käytetyt teknologiat

| Teknologia | Käyttötarkoitus |
|---|---|
| React | Käyttöliittymän toteutus |
| JavaScript | Sovelluslogiikka |
| Vite | Kehitysympäristö ja tuotantoversion rakentaminen |
| React Router | Kolmen sivun välinen navigointi |
| React Bootstrap | Käyttöliittymäkomponentit |
| Bootstrap | Ulkoasu ja responsiivinen asettelu |
| Lucide React | Käyttöliittymän kuvakkeet |
| ESCO REST API | Ulkoiset ammattitiedot |
| localStorage | Käyttäjän valintojen ja edistymisen tallennus |
| GitHub Pages | Sovelluksen julkaisu |

## Asennus ja käynnistäminen

Sovelluksen paikallinen käynnistäminen edellyttää Node.js:n ja npm:n asentamista.

**1. Kloonaa GitHub-repositorio:**

```bash
git clone https://github.com/Aminos24/skillpath.git
```

**2. Siirry projektikansioon:**

```bash
cd skillpath
```

**3. Asenna riippuvuudet:**

```bash
npm install
```

**4. Käynnistä kehityspalvelin:**

```bash
npm run dev
```

Avaa terminaalissa näkyvä paikallinen osoite selaimessa.

Tuotantoversion voi rakentaa komennolla:

```bash
npm run build
```

## Projektin rakenne

```text
skillpath/
├── public/
├── src/
│   ├── data/
│   │   └── careers.js
│   ├── pages/
│   │   ├── Skills.jsx
│   │   ├── Careers.jsx
│   │   └── Roadmap.jsx
│   ├── services/
│   │   └── escoApi.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Sovelluksen toimintaperiaate

1. Käyttäjä arvioi osaamisensa ja valitsee kiinnostuksen kohteensa.
2. Sovellus laskee uravaihtoehtojen vastaavuuspisteet.
3. Käyttäjä tarkastelee suositeltuja ammatteja ja puuttuvia taitoja.
4. Käyttäjä valitsee urapolun ja avaa oppimissuunnitelman.
5. Sovellus hakee mahdolliset vastaavat ammattitiedot ESCO API:sta.
6. Käyttäjä seuraa oppimistavoitteidensa edistymistä.

## Rajoitukset

SkillPath on kurssiprojektina toteutettu prototyyppi.

Ammattien osaamisvaatimukset ovat sovellukseen ennalta määriteltyjä, eivätkä vastaavuuspisteet ole virallinen arvio käyttäjän soveltuvuudesta ammattiin.

ESCO API:n ammattinimikkeet eivät aina vastaa täsmälleen sovelluksen käyttämiä nimikkeitä. Tällöin sovellus ilmoittaa, ettei täsmällistä vastaavuutta löytynyt.

Käyttäjätiedot tallennetaan paikallisesti selaimeen, eikä sovelluksessa ole käyttäjätilejä tai erillistä tietokantaa.

## Tekijä ja lähdekoodi

Projekti on toteutettu osana React-verkkosovelluskurssin lopputyötä.

**GitHub:** https://github.com/Aminos24/skillpath/

**Verkkosovellus:** https://aminos24.github.io/skillpath/
