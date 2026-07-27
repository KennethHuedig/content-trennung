// Einziger Zugang zu den strukturierten Seiten-Inhalten. Seiten importieren
// getSiteContent(), nie eine konkrete Content-Datei.
//
// SITE_CONTENT=mock (Default, auch ungesetzt) → content/mock-content.ts.
//   Der Template-Build, alle Tests und jede KI-Session laufen hiergegen.
// SITE_CONTENT=real → content/site.json (pro Kundenrepo, nicht eingecheckt).
//
// Gelesen wird synchron zur Render-Zeit; die Seiten bleiben dadurch statisch
// prerenderbar (SSG). site.json wird bewusst NICHT statisch importiert, denn die
// Datei existiert im Template nicht und ein `import` wuerde den Build brechen.
//
// Framework-frei: In der produktiven Next.js-App steht hier zusaetzlich
// `import 'server-only'` und der Export ist in Reacts `cache()` gewickelt, damit
// pro Request nur einmal geparst wird. Beides ist hier weggelassen, damit das
// Muster ohne Next.js lesbar und testbar bleibt.

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { MOCK_CONTENT } from '../content/mock-content'
import { siteContentSchema, type SiteContent } from '../content/schema'

const SITE_JSON = join(process.cwd(), 'content', 'site.json')

function ladeEchtdaten(): unknown {
  try {
    return JSON.parse(readFileSync(SITE_JSON, 'utf8'))
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code
    if (code === 'ENOENT') {
      throw new Error(
        `SITE_CONTENT=real, aber ${SITE_JSON} fehlt. ` +
          'Entweder die Kunden-Inhalte dort anlegen oder SITE_CONTENT=mock setzen.',
      )
    }
    throw new Error(`content/site.json konnte nicht gelesen werden: ${(err as Error).message}`)
  }
}

export function getSiteContent(): SiteContent {
  const daten = process.env.SITE_CONTENT === 'real' ? ladeEchtdaten() : MOCK_CONTENT
  return siteContentSchema.parse(daten)
}
