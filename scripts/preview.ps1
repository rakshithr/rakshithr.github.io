# Preview the production build (same as GitHub Pages) on http://localhost:5000
# Run deploy first if you changed source: .\scripts\deploy.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent

if (-not (Test-Path "$root\index.html")) {
    Write-Host "Missing root index.html — run .\scripts\deploy.ps1 first"
    exit 1
}

Write-Host "Serving $root at http://localhost:5000 (Ctrl+C to stop)"
Write-Host "Do not double-click index.html — paths like /static/ need a server."
Write-Host ""

Set-Location $root
npx --yes serve -s . -l 5000
