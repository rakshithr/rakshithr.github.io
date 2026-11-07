# Serve last production build — works when dev server is broken.
# Usage: .\scripts\preview-build.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$app = Join-Path $root "react-portfolio"
Set-Location $app

if (-not (Test-Path build\index.html)) {
  Write-Host "No build/ folder — running npm run build..."
  npm install --legacy-peer-deps
  $env:NODE_OPTIONS = "--openssl-legacy-provider"
  npm run build
}

foreach ($port in 5050) {
  $conn = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($conn) {
    Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue
  }
}

Write-Host ""
Write-Host "Preview: http://127.0.0.1:5050"
Write-Host "Ctrl+C to stop"
Write-Host ""

npx --yes serve -s build -l 5050
