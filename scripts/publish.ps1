param(
    [Parameter(Mandatory=$true)][string]$Repository,
    [ValidateSet('private','public')][string]$Visibility = 'private'
)
$ErrorActionPreference = 'Stop'
if ($Repository -notmatch '^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$') { throw 'Repository must be OWNER/NAME.' }
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) { throw 'GitHub CLI is required. Install gh and run gh auth login first.' }
Push-Location (Split-Path -Parent $PSScriptRoot)
try {
    & gh auth status
    if ($LASTEXITCODE -ne 0) { throw 'GitHub authentication is required.' }
    & git rev-parse --verify HEAD 2>$null
    if ($LASTEXITCODE -ne 0) { throw 'Review and commit the source before publishing.' }
    $dirty = & git status --porcelain
    if ($dirty) { throw 'Commit the reviewed changes before publishing.' }
    & gh repo create $Repository "--$Visibility" --source . --remote origin --push
    if ($LASTEXITCODE -ne 0) { throw 'GitHub publication failed. Inspect existing remote/repository before retrying.' }
} finally { Pop-Location }
