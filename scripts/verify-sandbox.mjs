// Prueft, ob eine Sandbox auf Betriebssystemebene die Deny-Regeln dieses
// Repositorys tatsaechlich durchsetzt (Schicht 1 aus dem README).
//
// Bewusst blankes Node ohne tsx und ohne jede Abhaengigkeit: Ein Werkzeug,
// das die Sandbox pruefen soll, darf nicht an ihr scheitern. tsx startet
// einen IPC-Socket unter /tmp, und den sperrt die Sandbox (EPERM bei listen),
// womit das Skript nie zur eigentlichen Messung kaeme.
//
// Zieldatei ist sandbox-canary.txt, eine Datei ohne schuetzenswerten Inhalt,
// die in .claude/settings.json unter deny steht. Echtdaten werden nie angefasst.
//
// - Zugriff scheitert (EACCES/EPERM) → Sandbox setzt die Regel durch, Exit 0.
// - Datei liest sich als leer          → Sandbox maskiert sie, Exit 0.
// - Datei ist normal lesbar            → keine Sandbox aktiv, Exit 1.
//
// Bewusst NICHT fuer die CI gedacht: dort laeuft keine Sandbox, das Skript
// meldet dann korrekt einen ungeschuetzten Zustand und faerbt den Lauf rot.

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const CANARY = join(process.cwd(), 'sandbox-canary.txt')

if (!existsSync(CANARY)) {
  console.error(
    'sandbox-canary.txt fehlt. Ohne die Datei gibt es nichts zu sperren und ' +
      'nichts zu messen. Aus dem Repository wiederherstellen: git checkout sandbox-canary.txt',
  )
  process.exit(1)
}

let bytes
try {
  bytes = readFileSync(CANARY).length
} catch (err) {
  if (err.code === 'EACCES' || err.code === 'EPERM') {
    console.log(`Sandbox aktiv: Lesezugriff auf sandbox-canary.txt scheitert mit ${err.code}.`)
    console.log('Die Deny-Regeln werden auf Dateisystemebene durchgesetzt, nicht nur im Werkzeug.')
    process.exit(0)
  }
  console.error(`Unerwarteter Fehler beim Lesen: ${err.message}`)
  process.exit(1)
}

if (bytes === 0) {
  console.log('Sandbox aktiv: sandbox-canary.txt liest sich als leer (0 Bytes).')
  console.log('Der Pfad ist im Namensraum dieses Prozesses ueberdeckt.')
  process.exit(0)
}

console.error(`Keine Sandbox aktiv: sandbox-canary.txt ist mit ${bytes} Bytes normal lesbar.`)
console.error('')
console.error('Die Deny-Regeln in .claude/settings.json wirken dann nur im KI-Werkzeug selbst.')
console.error('Ein Unterprozess (node -e, python -c, ein Build-Schritt) liest an ihnen vorbei.')
console.error('Siehe README Abschnitt 4 und 5. Zum Einschalten in ~/.claude/settings.json:')
console.error('')
console.error('  "sandbox": {')
console.error('    "enabled": true,')
console.error('    "allowUnsandboxedCommands": false,')
console.error('    "failIfUnavailable": true')
console.error('  }')
console.error('')
console.error('Unter Linux und WSL zusaetzlich noetig: bubblewrap (bwrap) und socat.')
process.exit(1)
