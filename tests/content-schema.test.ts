import { test, expect } from 'vitest'
import { siteContentSchema } from '../content/schema'
import { MOCK_CONTENT } from '../content/mock-content'

// Unit-Test: `satisfies SiteContent` prueft nur die Struktur zur Compile-Zeit.
// Die Runtime-Regeln des Schemas (z.email(), z.url(), min(1)) greifen erst beim
// parse, genau der Pfad, den getSiteContent() geht.
test('mock-content erfuellt das SiteContent-Schema', () => {
  expect(() => siteContentSchema.parse(MOCK_CONTENT)).not.toThrow()
})

test('Schema weist unvollstaendigen Inhalt zurueck', () => {
  expect(() => siteContentSchema.parse({ ...MOCK_CONTENT, kontakt: undefined })).toThrow()
})

test('Schema weist eine ungueltige E-Mail zurueck', () => {
  const kaputt = { ...MOCK_CONTENT, kontakt: { ...MOCK_CONTENT.kontakt, email: 'keine-email' } }
  expect(() => siteContentSchema.parse(kaputt)).toThrow()
})
