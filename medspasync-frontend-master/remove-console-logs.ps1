# Remove console.log statements from production code
Write-Host "🧹 Removing console.log statements from production code..." -ForegroundColor Green

$filesToClean = @(
    "medspasync-ecosystem/environment-manager.js",
    "medspasync-backend/config/database.js",
    "medspasync-backend/controllers/reconciliationController.js",
    "medspasync-backend/controllers/ReportingController.js",
    "medspasync-backend/controllers/enhanced-client-registration.controller.js",
    "medspasync-backend/controllers/auth.controller.js",
    "medspasync-backend/controllers/subscriptionController.js",
    "medspasync-backend/config/reconciliation.js",
    "medspasync-backend/config/environment.js",
    "medspasync-ecosystem/test-framework.js",
    "performance-tests/load-test.js"
)

foreach ($file in $filesToClean) {
    if (Test-Path $file) {
        Write-Host "Cleaning: $file" -ForegroundColor Yellow
        
        # Read file content
        $content = Get-Content $file -Raw
        
        # Remove console.log, console.error, console.warn statements
        $cleanedContent = $content -replace '^\s*console\.(log|error|warn)\([^)]*\);?\s*$', '' -replace '\s*console\.(log|error|warn)\([^)]*\);?\s*', ''
        
        # Write back cleaned content
        Set-Content $file $cleanedContent -NoNewline
        
        Write-Host "✅ Cleaned: $file" -ForegroundColor Green
    } else {
        Write-Host "⚠️  File not found: $file" -ForegroundColor Yellow
    }
}

Write-Host "🎉 Console.log cleanup completed!" -ForegroundColor Green 