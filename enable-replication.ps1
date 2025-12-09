# Enable MongoDB Replication
# Run this script as Administrator

Write-Host "Stopping MongoDB service..." -ForegroundColor Yellow
Stop-Service -Name MongoDB -Force

Write-Host "Updating mongod.cfg..." -ForegroundColor Yellow
$configPath = "C:\Program Files\MongoDB\Server\8.2\bin\mongod.cfg"
$config = Get-Content $configPath -Raw

# Check if replication is already configured
if ($config -match "replication:") {
    Write-Host "Replication section already exists in config" -ForegroundColor Green
} else {
    # Add replication configuration
    $config += "`n`nreplication:`n  replSetName: rs0`n"
    Set-Content -Path $configPath -Value $config
    Write-Host "Added replication configuration" -ForegroundColor Green
}

Write-Host "Starting MongoDB service..." -ForegroundColor Yellow
Start-Service -Name MongoDB

Write-Host "Waiting for MongoDB to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "Initiating replica set..." -ForegroundColor Yellow
mongosh --eval "rs.initiate()"

Write-Host "`nDone! Check above for 'ok: 1' message" -ForegroundColor Green
