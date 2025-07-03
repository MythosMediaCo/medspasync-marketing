# MedSpaSync Ecosystem Startup Script
# PowerShell version for Windows

Write-Host "🚀 Starting MedSpaSync Ecosystem..." -ForegroundColor Green

# Set working directory to the script location
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Function to check if port is in use
function Test-Port {
    param([int]$Port)
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $Port)
        $connection.Close()
        return $true
    }
    catch {
        return $false
    }
}

# Function to wait for service to be ready
function Wait-ForService {
    param([int]$Port, [string]$ServiceName, [int]$Timeout = 30)
    Write-Host "⏳ Waiting for $ServiceName on port $Port..." -ForegroundColor Yellow
    $startTime = Get-Date
    while ((Get-Date) -lt ($startTime.AddSeconds($Timeout))) {
        if (Test-Port -Port $Port) {
            Write-Host "✅ $ServiceName is ready on port $Port" -ForegroundColor Green
            return $true
        }
        Start-Sleep -Seconds 1
    }
    Write-Host "❌ $ServiceName failed to start within $Timeout seconds" -ForegroundColor Red
    return $false
}

# Start Backend Server
Write-Host "🔧 Starting Backend Server..." -ForegroundColor Cyan
$backendPath = Join-Path $scriptPath "medspasync-backend"
if (Test-Path $backendPath) {
    Set-Location $backendPath
    
    # Check if .env exists, create if not
    if (-not (Test-Path ".env")) {
        Write-Host "📝 Creating .env file for backend..." -ForegroundColor Yellow
        Copy-Item "env.example" ".env" -ErrorAction SilentlyContinue
        if (-not (Test-Path ".env")) {
            @"
# Backend Environment Variables
NODE_ENV=development
PORT=5000
DATABASE_URL=sqlite:./dev.db
JWT_SECRET=your-super-secret-jwt-key-change-in-production
STRIPE_SECRET_KEY=sk_test_your_stripe_test_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
AZURE_KEYVAULT_URL=https://your-keyvault.vault.azure.net/
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
"@ | Out-File -FilePath ".env" -Encoding UTF8
        }
    }
    
    # Start backend server in background
    Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory $backendPath -WindowStyle Hidden
    Write-Host "✅ Backend server started" -ForegroundColor Green
} else {
    Write-Host "❌ Backend directory not found" -ForegroundColor Red
}

# Wait for backend to be ready
Start-Sleep -Seconds 3
Wait-ForService -Port 5000 -ServiceName "Backend Server"

# Start AI API Server
Write-Host "🤖 Starting AI API Server..." -ForegroundColor Cyan
$aiApiPath = Join-Path $scriptPath "medspasync-ai-api"
if (Test-Path $aiApiPath) {
    Set-Location $aiApiPath
    
    # Check if .env exists, create if not
    if (-not (Test-Path ".env")) {
        Write-Host "📝 Creating .env file for AI API..." -ForegroundColor Yellow
        Copy-Item "env.example" ".env" -ErrorAction SilentlyContinue
        if (-not (Test-Path ".env")) {
            @"
# AI API Environment Variables
ENVIRONMENT=development
API_HOST=0.0.0.0
API_PORT=8000
DATABASE_URL=sqlite:./ai_api.db
JWT_SECRET=your-ai-api-jwt-secret
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
"@ | Out-File -FilePath ".env" -Encoding UTF8
        }
    }
    
    # Install Python dependencies if needed
    if (-not (Test-Path "venv")) {
        Write-Host "📦 Creating Python virtual environment..." -ForegroundColor Yellow
        python -m venv venv
    }
    
    # Activate virtual environment and install dependencies
    & "$aiApiPath\venv\Scripts\Activate.ps1"
    pip install -r requirements.txt
    
    # Start AI API server in background
    Start-Process -FilePath "python" -ArgumentList "-m", "uvicorn", "api_server:app", "--host", "0.0.0.0", "--port", "8000" -WorkingDirectory $aiApiPath -WindowStyle Hidden
    Write-Host "✅ AI API server started" -ForegroundColor Green
} else {
    Write-Host "❌ AI API directory not found" -ForegroundColor Red
}

# Wait for AI API to be ready
Start-Sleep -Seconds 3
Wait-ForService -Port 8000 -ServiceName "AI API Server"

# Start Frontend Server
Write-Host "🎨 Starting Frontend Server..." -ForegroundColor Cyan
$frontendPath = Join-Path $scriptPath "medspasync-frontend"
if (Test-Path $frontendPath) {
    Set-Location $frontendPath
    
    # Check if .env exists, create if not
    if (-not (Test-Path ".env.local")) {
        Write-Host "📝 Creating .env.local file for frontend..." -ForegroundColor Yellow
        Copy-Item "env.example" ".env.local" -ErrorAction SilentlyContinue
        if (-not (Test-Path ".env.local")) {
            @"
# Frontend Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_AI_API_URL=http://localhost:8000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
"@ | Out-File -FilePath ".env.local" -Encoding UTF8
        }
    }
    
    # Install dependencies if needed
    if (-not (Test-Path "node_modules")) {
        Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
        npm install
    }
    
    # Start frontend server in background
    Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WorkingDirectory $frontendPath -WindowStyle Hidden
    Write-Host "✅ Frontend server started" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend directory not found" -ForegroundColor Red
}

# Wait for frontend to be ready
Start-Sleep -Seconds 5
Wait-ForService -Port 3000 -ServiceName "Frontend Server"

# Display status
Write-Host "`n🎉 MedSpaSync Ecosystem Status:" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

$services = @(
    @{Name="Backend Server"; Port=5000; URL="http://localhost:5000"},
    @{Name="AI API Server"; Port=8000; URL="http://localhost:8000"},
    @{Name="Frontend Server"; Port=3000; URL="http://localhost:3000"}
)

foreach ($service in $services) {
    if (Test-Port -Port $service.Port) {
        Write-Host "✅ $($service.Name): $($service.URL)" -ForegroundColor Green
    } else {
        Write-Host "❌ $($service.Name): Not responding" -ForegroundColor Red
    }
}

Write-Host "`n🌐 Access your application at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📊 API Documentation at: http://localhost:5000/api/docs" -ForegroundColor Cyan
Write-Host "🤖 AI API at: http://localhost:8000/docs" -ForegroundColor Cyan

Write-Host "`n💡 To stop all services, close this terminal window or run: Get-Process | Where-Object {$_.ProcessName -in @('node', 'python')} | Stop-Process" -ForegroundColor Yellow 