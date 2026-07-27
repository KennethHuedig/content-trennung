// Validiert content/site.json gegen den Content-Vertrag (content/schema.ts).
// Laeuft via tsx (npm run validate:content) lokal und in der CI.
//
// - site.json fehlt  → freundliche Meldung, Exit 0 (Template bleibt gruen).
// - site.json ok     → OK-Meldung, Exit 0.
// - site.json kaputt → lesbarer Zod-Fehler mit Pfad auf stderr, Exit 1.
//
// Das Skript liest nur die Datei und meldet Struktur-Fehler; es gibt bewusst
// keine Feldwerte (Echtdaten) aus.

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ZodError } from 'zod'
import { parseSiteContent } from '../content/schema'

const SITE_JSON = join(process.cwd(), 'content', 'site.json')

if (!existsSync(SITE_JSON)) {
  console.log('content/site.json nicht vorhanden — kein site.json, nichts zu validieren.')
  process.exit(0)
}

let rohdaten: string
try {
  rohdaten = readFileSync(SITE_JSON, 'utf8')
} catch (err) {
  console.error(`content/site.json konnte nicht gelesen werden: ${(err as Error).message}`)
  process.exit(1)
}

let daten: unknown
try {
  daten = JSON.parse(rohdaten)
} catch (err) {
  console.error(`content/site.json ist kein gueltiges JSON: ${(err as Error).message}`)
  process.exit(1)
}

try {
  parseSiteContent(daten)
  console.log('content/site.json ist gueltig — Vertrag mit content/schema.ts erfuellt.')
  process.exit(0)
} catch (err) {
  if (err instanceof ZodError) {
    console.error('content/site.json verletzt den Content-Vertrag:')
    for (const problem of err.issues) {
      const pfad = problem.path.length > 0 ? problem.path.join('.') : '(Wurzel)'
      console.error(`  - ${pfad}: ${problem.message}`)
    }
    process.exit(1)
  }
  console.error(`Unerwarteter Fehler bei der Validierung: ${(err as Error).message}`)
  process.exit(1)
}
