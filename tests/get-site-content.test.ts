import { test, expect, afterEach } from 'vitest'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { getSiteContent } from '../lib/get-site-content'
import { MOCK_CONTENT } from '../content/mock-content'

// Die Tests laufen bewusst gegen ein Repo ohne content/site.json. Genau das ist
// der Auslieferungszustand: Platzhalter ist der Default, Echtdaten sind die
// Ausnahme und liegen nur in der Deploy-Umgebung.
const SITE_JSON = join(process.cwd(), 'content', 'site.json')

afterEach(() => {
  delete process.env.SITE_CONTENT
})

test('ohne gesetzten Schalter liefert der Loader den Mock', () => {
  delete process.env.SITE_CONTENT
  expect(getSiteContent()).toEqual(MOCK_CONTENT)
})

test('SITE_CONTENT=real ohne site.json wirft mit klarer Meldung', () => {
  expect(existsSync(SITE_JSON)).toBe(false)
  process.env.SITE_CONTENT = 'real'
  expect(() => getSiteContent()).toThrow(/SITE_CONTENT=real, aber .*site\.json fehlt/)
})
