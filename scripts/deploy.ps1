# MedSpaSync Pro Deployment Script for Windows
# Supports multiple deployment platforms

param(
    [Parameter(Position=0)]
    [string]$Platform = "help"
)

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check if required tools are installed
function Test-Dependencies {
    Write-Status "Checking dependencies..."
    
    if (!(Get-Command node -ErrorAction SilentlyContinue)) {
        Write-Error "Node.js is not installed"
        exit 1
    }
    
    if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
        Write-Error "npm is not installed"
        exit 1
    }
    
    Write-Success "Dependencies check passed"
}

# Build the application
function Build-App {
    Write-Status "Building application..."
    
    # Clean previous build
    cd frontend-app
    npm run clean
    
    # Install dependencies
    npm ci
    
    # Build for production
    npm run build
    cd ..
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Build completed successfully"
    } else {
        Write-Error "Build failed"
        exit 1
    }
}

# Deploy to Vercel
function Deploy-Vercel {
    Write-Status "Deploying to Vercel..."
    
    if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
        Write-Warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    }
    cd frontend-app
    vercel --prod
    cd ..
    Write-Success "Deployed to Vercel"
}

# Deploy to Netlify
function Deploy-Netlify {
    Write-Status "Deploying to Netlify..."
    
    if (!(Get-Command netlify -ErrorAction SilentlyContinue)) {
        Write-Warning "Netlify CLI not found. Installing..."
        npm install -g netlify-cli
    }
    cd frontend-app
    netlify deploy --prod --dir=dist
    cd ..
    Write-Success "Deployed to Netlify"
}

# Deploy to GitHub Pages
function Deploy-GitHubPages {
    Write-Status "Deploying to GitHub Pages..."
    
    if (!$env:GITHUB_TOKEN) {
        Write-Error "GITHUB_TOKEN environment variable is required"
        exit 1
    }
    
    Write-Warning "GitHub Pages deployment is handled by GitHub Actions"
    Write-Status "Push to main/master branch to trigger deployment"
}

# Deploy using Docker
function Deploy-Docker {
    Write-Status "Building and deploying with Docker..."
    
    if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
        Write-Error "Docker is not installed"
        exit 1
    }
    
    # Build Docker image
    docker build -t medspasync-pro frontend-app
    
    # Run container
    docker run -d -p 3000:80 --name medspasync-pro-app medspasync-pro
    
    Write-Success "Docker deployment completed"
    Write-Status "Application available at http://localhost:3000"
}

# Deploy using Docker Compose
function Deploy-DockerCompose {
    Write-Status "Deploying with Docker Compose..."
    
    if (!(Get-Command docker-compose -ErrorAction SilentlyContinue)) {
        Write-Error "Docker Compose is not installed"
        exit 1
    }
    cd frontend-app
    docker-compose up -d
    cd ..
    Write-Success "Docker Compose deployment completed"
    Write-Status "Application available at http://localhost:3000"
}

# Show usage information
function Show-Usage {
    Write-Host "MedSpaSync Pro Deployment Script for Windows" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage: .\scripts\deploy.ps1 [PLATFORM]" -ForegroundColor White
    Write-Host ""
    Write-Host "Platforms:" -ForegroundColor Yellow
    Write-Host "  vercel          Deploy to Vercel" -ForegroundColor White
    Write-Host "  netlify         Deploy to Netlify" -ForegroundColor White
    Write-Host "  github-pages    Deploy to GitHub Pages" -ForegroundColor White
    Write-Host "  docker          Deploy using Docker" -ForegroundColor White
    Write-Host "  docker-compose  Deploy using Docker Compose" -ForegroundColor White
    Write-Host "  build           Only build the application" -ForegroundColor White
    Write-Host "  help            Show this help message" -ForegroundColor White
    Write-Host ""
    Write-Host "Environment Variables:" -ForegroundColor Yellow
    Write-Host "  GITHUB_TOKEN    Required for GitHub Pages deployment" -ForegroundColor White
    Write-Host ""
}

# Main script
switch ($Platform) {
    "vercel" {
        Test-Dependencies
        Build-App
        Deploy-Vercel
    }
    "netlify" {
        Test-Dependencies
        Build-App
        Deploy-Netlify
    }
    "github-pages" {
        Test-Dependencies
        Build-App
        Deploy-GitHubPages
    }
    "docker" {
        Test-Dependencies
        Build-App
        Deploy-Docker
    }
    "docker-compose" {
        Test-Dependencies
        Build-App
        Deploy-DockerCompose
    }
    "build" {
        Test-Dependencies
        Build-App
    }
    default {
        Show-Usage
    }
} 