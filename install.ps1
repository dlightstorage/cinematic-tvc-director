param([string]$Prefix)
$ErrorActionPreference = 'Stop'
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Install Node.js 22 or newer first.' }
$nodeMajor = [int]((& node --version).TrimStart('v').Split('.')[0])
if ($nodeMajor -lt 22) { throw 'Node.js 22 or newer is required.' }
Push-Location $PSScriptRoot
try {
    if ($Prefix) { & npm.cmd install --global --prefix $Prefix . }
    else { & npm.cmd install --global . }
    if ($LASTEXITCODE -ne 0) { throw 'Package installation failed.' }
    & node (Join-Path $PSScriptRoot 'cinematic-tvc-director/scripts/tvc.mjs') onboard
    if ($LASTEXITCODE -ne 0) { throw 'Onboarding did not complete.' }
} finally { Pop-Location }
