# MedSpaSync Pro - Fast Development Startup Script
# This script starts both frontend and backend development servers in parallel

Write-Host "Starting MedSpaSync Pro Development Environment..." -ForegroundColor Green
Write-Host "Performance Optimized Mode: ENABLED" -ForegroundColor Cyan
Write-Host "Memory Allocation: 8GB Heap" -ForegroundColor Cyan
Write-Host "Turbo Mode: ENABLED" -ForegroundColor Cyan
Write-Host "Incremental Builds: ENABLED" -ForegroundColor Cyan

# Set environment variables for optimization
$env:NODE_OPTIONS = "--max-old-space-size=8192"
$env:NEXT_TELEMETRY_DISABLED = "1"

# Function to start a development server
function Start-DevServer {
    param(
        [string]$Name,
        [string]$Path,
        [string]$Command
    )
    Write-Host "Starting $Name development server..." -ForegroundColor Yellow
    Write-Host "Path: $Path" -ForegroundColor Gray
    Write-Host "Command: $Command" -ForegroundColor Gray
    try {
        # Start the process in a new PowerShell window
        Start-Process powershell -ArgumentList '-NoExit', '-Command', "Set-Location '$Path'; $Command" -WindowStyle Normal
        Write-Host "$Name server started successfully!" -ForegroundColor Green
    } catch {
        Write-Host "Failed to start $Name server: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Start Frontend Development Server
Start-DevServer -Name "Frontend" -Path "Z:\medspasync-frontend" -Command "npm run dev:fast"

# Start Backend Development Server
Start-DevServer -Name "Backend" -Path "Z:\medspasync-backend" -Command "npm run dev:fast"

Write-Host "Development environment startup complete!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:3001" -ForegroundColor Cyan
Write-Host "Monitoring: npm run monitor" -ForegroundColor Cyan
Write-Host "Testing: npm run test:parallel" -ForegroundColor Cyan 