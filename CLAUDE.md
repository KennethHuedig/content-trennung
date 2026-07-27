# CLAUDE.md

## Regeln für KI-Sessions

**Tabu, nie lesen, nie in Prompts oder Commits:** `content/site.json` und `public/kunde/**` sind für KI-Sessions gesperrt (siehe `.claude/settings.json`). Keine Echtdaten von Kunden (Namen, Adressen, Telefonnummern, E-Mails) in Prompts, Code oder Commits. Der Vertrag lebt allein im Schema (`content/schema.ts`) und im Mock (`content/mock-content.ts`).

**Review, nur gegen den Mock:** Screenshots, Build, Tests und jede visuelle Prüfung laufen ausschließlich gegen den Mock-Build (`SITE_CONTENT` ungesetzt bzw. `mock`). In KI-Sessions keine Builds mit `SITE_CONTENT=real` und keine Kunden-URLs aufrufen.

## Struktur

| Datei | Rolle |
|---|---|
| `content/schema.ts` | Vertrag zwischen Code und Inhalt |
| `content/mock-content.ts` | Platzhalter-Inhalt, Default für Build, Tests und KI-Sessions |
| `content/site.example.json` | Form der Echtdaten-Datei, ausschließlich erfundene Werte |
| `lib/get-site-content.ts` | Einziger Zugang zu den Inhalten, liest den `SITE_CONTENT`-Schalter |
| `scripts/validate-content.ts` | Validiert eine vorhandene `content/site.json` gegen das Schema |

## Commands

```bash
npm test                  # vitest: Schema und Loader
npm run typecheck         # tsc --noEmit
npm run validate:content  # prüft content/site.json, falls vorhanden
```
