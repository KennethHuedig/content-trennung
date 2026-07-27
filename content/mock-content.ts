// Default-Inhalt des Templates. Platzhalter, damit das Template ohne Anpassung
// statisch und optisch unveraendert baut. Pro Kunde wird das hier durch eine
// validierte content/site.json ersetzt.
//
// `satisfies SiteContent` prueft die Struktur zur Compile-Zeit, ohne die
// Literaltypen zu verlieren.

import type { SiteContent } from './schema'

// Bild-Konvention
// ---------------
// - Mock-Bilder liegen unter public/mock/, echte Kundenbilder unter public/kunde/.
// - Dateinamen sind neutral und sprechend (hero, galerie-1, team-1), nie Kunden-
//   oder Personennamen.
// - `src` und `alt` gehoeren immer zusammen: `alt` beschreibt den Bildinhalt fuer
//   Screenreader/SEO, nicht den Dateinamen oder den Platzhalter-Status.
// - Bilder sind ueberall optional: fehlt das Bild, rendert die Sektion (Hero,
//   Team-Avatar, Galerie, Leistungs-Karte) automatisch den reinen Text-Look.

export const MOCK_CONTENT = {
  company: {
    name: 'Musterbetrieb GmbH',
    kurzbeschreibung: 'Kurze Beschreibung des Unternehmens.',
  },

  hero: {
    tagline: 'Ihr verlässlicher Partner',
    ueberschrift: 'Ihre Überschrift kommt hier hin',
    unterzeile: 'Kurze, knackige Beschreibung was Sie tun und für wen.',
    ctaUeberschrift: 'Bereit für den nächsten Schritt?',
    ctaUnterzeile: 'Kontaktieren Sie uns, wir melden uns innerhalb eines Werktages.',
    bild: { src: '/mock/hero.webp', alt: 'Platzhalter-Bild für den Hero-Bereich der Startseite' },
  },

  leistungen: [
    {
      titel: 'Leistung 1',
      kurz: 'Kurze Beschreibung dieser Leistung.',
      beschreibung:
        'Ausführlichere Beschreibung dieser Leistung. Was ist enthalten, für wen ist sie geeignet, was ist das Ergebnis?',
    },
    {
      titel: 'Leistung 2',
      kurz: 'Kurze Beschreibung dieser Leistung.',
      beschreibung:
        'Ausführlichere Beschreibung dieser Leistung. Was ist enthalten, für wen ist sie geeignet, was ist das Ergebnis?',
    },
    {
      titel: 'Leistung 3',
      kurz: 'Kurze Beschreibung dieser Leistung.',
      beschreibung:
        'Ausführlichere Beschreibung dieser Leistung. Was ist enthalten, für wen ist sie geeignet, was ist das Ergebnis?',
    },
  ],

  ueberUns: {
    ueberschrift: 'Wer wir sind',
    absaetze: [
      'Einleitungstext über das Unternehmen: wie es entstanden ist, was es antreibt, wofür es steht.',
      'Zweiter Absatz mit mehr Details: Werte, Philosophie, Arbeitsweise.',
    ],
  },

  team: [
    {
      name: 'Max Mustermann',
      rolle: 'Geschäftsführer',
      text: 'Kurze Beschreibung der Person.',
      bild: { src: '/mock/team-1.webp', alt: 'Platzhalter-Porträt eines Teammitglieds' },
    },
  ],

  faq: [
    { frage: 'Welche Zahlungsarten akzeptieren Sie?', antwort: 'Antwort hier eintragen.' },
    { frage: 'Wie lange dauert ein Auftrag?', antwort: 'Antwort hier eintragen.' },
    { frage: 'Bieten Sie auch Support nach Projektabschluss an?', antwort: 'Antwort hier eintragen.' },
  ],

  // Impressionen-Band. Leeres Array = Sektion wird nicht gerendert.
  galerie: [
    { src: '/mock/galerie-1.webp', alt: 'Platzhalter-Impression eins der Bildergalerie' },
    { src: '/mock/galerie-2.webp', alt: 'Platzhalter-Impression zwei der Bildergalerie' },
    { src: '/mock/galerie-3.webp', alt: 'Platzhalter-Impression drei der Bildergalerie' },
  ],

  kontakt: {
    email: 'info@beispiel.de',
    telefon: '+49 0000 000000',
    strasse: 'Straße Hausnummer',
    plz_ort: 'PLZ Stadt',
    oeffnungszeiten: 'Mo–Fr: 9:00–17:00 Uhr',
  },

  legal: {
    betreiber: {
      name: 'Max Mustermann',
      firma: 'Musterbetrieb GmbH',
      strasse: 'Straße Hausnummer',
      plz_ort: 'PLZ Stadt',
    },
    email: 'info@beispiel.de',
    umsatzsteuerHinweis: 'Gemäß §19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung).',
    inhaltlichVerantwortlich: {
      name: 'Max Mustermann',
      strasse: 'Straße Hausnummer',
      plz_ort: 'PLZ Stadt',
    },
  },

  seo: {
    titel: 'Musterbetrieb GmbH',
    beschreibung: 'Kurze Beschreibung des Unternehmens.',
    baseUrl: 'https://example.com',
    locale: 'de_DE',
    areaServed: 'DE',
  },
} satisfies SiteContent
