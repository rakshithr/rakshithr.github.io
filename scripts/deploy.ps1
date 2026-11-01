# Build react-portfolio and copy output to GitHub Pages root.
# Usage: .\scripts\deploy.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent

Set-Location "$root\react-portfolio"

if (-not (Test-Path node_modules)) {
    npm install --legacy-peer-deps
}

$env:NODE_OPTIONS = "--openssl-legacy-provider"
npm run build

$build = "$root\react-portfolio\build"
if (-not (Test-Path "$build\index.html")) {
    throw "Build failed: missing $build\index.html"
}

Remove-Item "$root\static" -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item "$build\static" "$root\static" -Recurse -Force
Copy-Item "$build\index.html" "$root\index.html" -Force
Copy-Item "$build\asset-manifest.json" "$root\asset-manifest.json" -Force
Copy-Item "$build\favicon.ico" "$root\favicon.ico" -Force
Copy-Item "$build\logo192.png" "$root\logo192.png" -Force
Copy-Item "$build\logo512.png" "$root\logo512.png" -Force
Copy-Item "$build\manifest.json" "$root\manifest.json" -Force
if (Test-Path "$build\robots.txt") {
    Copy-Item "$build\robots.txt" "$root\robots.txt" -Force
}

Write-Host ""
Write-Host "Build copied to repo root. Preview:"
Write-Host "  npx serve -s `"$build`""
Write-Host ""
Write-Host "Publish:"
Write-Host "  cd `"$root`""
Write-Host "  git add react-portfolio static index.html asset-manifest.json favicon.ico logo192.png logo512.png manifest.json robots.txt README.md scripts"
Write-Host "  git commit -m `"Deploy portfolio`""
Write-Host "  git push origin main"
Write-Host ""
Write-Host "Live: https://rakshithr.github.io/"
