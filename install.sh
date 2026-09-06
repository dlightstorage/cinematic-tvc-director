#!/usr/bin/env sh
set -eu
cd "$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
node -e 'if (Number(process.versions.node.split(".")[0]) < 22) process.exit(1)' || { echo 'Node.js 22 or newer is required.' >&2; exit 1; }
npm install --global .
node cinematic-tvc-director/scripts/tvc.mjs install-skill --host "${TVC_SKILL_HOST:-codex}" --update
echo 'Installed Cinematic TVC Director CLI and skill. Run tvc studio.'
