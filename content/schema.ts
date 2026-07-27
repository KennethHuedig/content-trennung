// Vertrag zwischen Code und Inhalt. Der Code kennt nur dieses Schema, nie eine
// konkrete Kunden-Datei. Default-Inhalt ist content/mock-content.ts; Echtdaten
// kommen pro Kundenrepo aus content/site.json und werden gegen dieses Schema
// validiert.
//
// Bilder sind ueberall OPTIONAL: ohne Bild rendert die Seite den reinen
// Text-Look, mit Bild den Foto-Look.

import { z } from 'zod'

export const bildSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
})

export const leistungSchema = z.object({
  titel: z.string().min(1),
  // Teaser auf der Startseite.
  kurz: z.string().min(1),
  beschreibung: z.string().min(1),
  bild: bildSchema.optional(),
})

export const teamPersonSchema = z.object({
  name: z.string().min(1),
  rolle: z.string().min(1),
  text: z.string().min(1),
  // Ohne Bild rendert die Seite das neutrale Avatar-Symbol.
  bild: bildSchema.optional(),
})

export const faqEintragSchema = z.object({
  frage: z.string().min(1),
  antwort: z.string().min(1),
})

export const companySchema = z.object({
  name: z.string().min(1),
  rechtsform: z.string().optional(),
  kurzbeschreibung: z.string().min(1),
  gruendungsjahr: z.number().int().optional(),
})

export const heroSchema = z.object({
  tagline: z.string().min(1),
  ueberschrift: z.string().min(1),
  unterzeile: z.string().min(1),
  ctaUeberschrift: z.string().min(1),
  ctaUnterzeile: z.string().min(1),
  // null = textbasierter Hero ueber volle Breite.
  bild: bildSchema.nullable(),
})

export const ueberUnsSchema = z.object({
  ueberschrift: z.string().min(1),
  absaetze: z.array(z.string().min(1)).min(1),
})

export const kontaktSchema = z.object({
  email: z.email(),
  telefon: z.string().min(1),
  strasse: z.string().min(1),
  plz_ort: z.string().min(1),
  oeffnungszeiten: z.string().min(1),
})

// Pflichtangaben fuer Impressum (§5 TMG, §18 Abs. 2 MStV) und Datenschutz.
export const legalSchema = z.object({
  betreiber: z.object({
    name: z.string().min(1),
    firma: z.string().min(1),
    strasse: z.string().min(1),
    plz_ort: z.string().min(1),
  }),
  email: z.email(),
  umsatzsteuerHinweis: z.string().min(1),
  inhaltlichVerantwortlich: z.object({
    name: z.string().min(1),
    strasse: z.string().min(1),
    plz_ort: z.string().min(1),
  }),
})

export const seoSchema = z.object({
  titel: z.string().min(1),
  beschreibung: z.string().min(1),
  baseUrl: z.url(),
  locale: z.string().min(1),
  areaServed: z.string().min(1),
})

export const siteContentSchema = z.object({
  company: companySchema,
  hero: heroSchema,
  leistungen: z.array(leistungSchema),
  ueberUns: ueberUnsSchema,
  team: z.array(teamPersonSchema),
  faq: z.array(faqEintragSchema),
  galerie: z.array(bildSchema),
  kontakt: kontaktSchema,
  legal: legalSchema,
  seo: seoSchema,
})

export type Bild = z.infer<typeof bildSchema>
export type Leistung = z.infer<typeof leistungSchema>
export type TeamPerson = z.infer<typeof teamPersonSchema>
export type FaqEintrag = z.infer<typeof faqEintragSchema>
export type Company = z.infer<typeof companySchema>
export type Hero = z.infer<typeof heroSchema>
export type UeberUns = z.infer<typeof ueberUnsSchema>
export type Kontakt = z.infer<typeof kontaktSchema>
export type Legal = z.infer<typeof legalSchema>
export type Seo = z.infer<typeof seoSchema>
export type SiteContent = z.infer<typeof siteContentSchema>

// Wirft mit lesbarem Pfad, wenn eine Kunden-site.json den Vertrag verletzt.
export function parseSiteContent(data: unknown): SiteContent {
  return siteContentSchema.parse(data)
}
