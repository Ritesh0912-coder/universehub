# Restart MongoDB and Initialize Replica Set
# Right-click this file -> Run with PowerShell (as Administrator)

Write-Host "=== MongoDB Replica Set Setup ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 1: Stopping MongoDB service..." -ForegroundColor Yellow
try {
    Stop-Service -Name MongoDB -Force -ErrorAction Stop
    Write-Host "✓ MongoDB stopped" -ForegroundColor Green
}
catch {
    Write-Host "✗ Failed to stop MongoDB: $_" -ForegroundColor Red
    Write-Host "Try running this script as Administrator" -ForegroundColor Yellow
    pause
    exit
}

Write-Host ""
Write-Host "Step 2: Starting MongoDB service..." -ForegroundColor Yellow
try {
    Start-Service -Name MongoDB -ErrorAction Stop
    Write-Host "✓ MongoDB started" -ForegroundColor Green
}
catch {
    Write-Host "✗ Failed to start MongoDB: $_" -ForegroundColor Red
    pause
    exit
}

Write-Host ""
Write-Host "Step 3: Waiting for MongoDB to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 5
Write-Host "✓ Ready" -ForegroundColor Green

Write-Host ""
Write-Host "Step 4: Initializing replica set..." -ForegroundColor Yellow
try {
    $result = mongosh --quiet --eval "rs.initiate()" 2>&1
    Write-Host $result
    if ($result -match "ok.*1" -or $result -match "already initialized") {
        Write-Host "✓ Replica set initialized successfully!" -ForegroundColor Green
    }
    else {
        Write-Host "⚠ Unexpected result. Check output above." -ForegroundColor Yellow
    }
}
catch {
    Write-Host "✗ Failed to initialize: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Setup Complete ===" -ForegroundColor Cyan
Write-Host "Press any key to close..." -ForegroundColor Gray
pause
