# Local dev — stops stuck :3000/:3001, clears webpack cache, starts CRACO.
# Usage: .\scripts\dev.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$app = Join-Path $root "react-portfolio"
Set-Location $app

foreach ($port in 3000, 3001) {
  $conn = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($conn) {
    Write-Host "Stopping PID $($conn.OwningProcess) on port $port..."
    Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue
  }
}
Start-Sleep -Seconds 2

if (-not (Test-Path node_modules)) {
  Write-Host "Installing dependencies..."
  npm install --legacy-peer-deps
} else {
  npm install --legacy-peer-deps 2>$null
}

Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue

$env:NODE_OPTIONS = "--openssl-legacy-provider"
$env:PORT = "3000"
$env:BROWSER = "default"
$env:HOST = "127.0.0.1"

Write-Host ""
Write-Host "=== Portfolio UI (React dev) ==="
Write-Host "Open exactly:  http://127.0.0.1:3000"
Write-Host "Not GitHub Pages, not index.html on disk."
Write-Host "Wait for: Compiled successfully!"
Write-Host ""
Write-Host "If dev fails, use:  .\scripts\preview-build.ps1  (serves production build)"
Write-Host ""

npm start
