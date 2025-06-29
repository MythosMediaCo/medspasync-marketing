#!/bin/bash

# ========================================
# MedSpaSync Pro Frontend Startup Script
# ========================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to validate environment
validate_environment() {
    local env_file=".env"
    
    if [ ! -f "$env_file" ]; then
        print_warning "No .env file found. Creating from template..."
        if [ -f "env.example" ]; then
            cp env.example .env
            print_success "Created .env from template"
        else
            print_error "No env.example template found"
            exit 1
        fi
    fi
    
    # Load environment variables
    if [ -f "$env_file" ]; then
        export $(grep -v '^#' "$env_file" | xargs)
    fi
    
    # Validate required variables
    local required_vars=("VITE_APP_ENVIRONMENT" "VITE_API_BASE_URL")
    for var in "${required_vars[@]}"; do
        if [ -z "${!var}" ]; then
            print_warning "Environment variable $var is not set, using defaults"
        fi
    done
    
    print_success "Environment validation passed"
}

# Function to check dependencies
check_dependencies() {
    print_status "Checking dependencies..."
    
    # Check Node.js
    if ! command_exists node; then
        print_error "Node.js is required but not installed"
        exit 1
    fi
    
    # Check npm
    if ! command_exists npm; then
        print_error "npm is required but not installed"
        exit 1
    fi
    
    # Check Node.js version
    local node_version=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$node_version" -lt 16 ]; then
        print_error "Node.js version 16 or higher is required"
        exit 1
    fi
    
    print_success "Dependencies check completed"
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    if [ -f "package.json" ]; then
        npm install
        print_success "Dependencies installed"
    else
        print_error "package.json not found"
        exit 1
    fi
}

# Function to build for production
build_production() {
    print_status "Building for production..."
    
    # Set production environment
    export VITE_APP_ENVIRONMENT=production
    
    # Build the application
    npm run build
    
    print_success "Production build completed"
}

# Function to start development server
start_development() {
    local environment="$1"
    
    print_status "Starting development server (environment: $environment)..."
    
    # Set environment variable
    export VITE_APP_ENVIRONMENT="$environment"
    
    # Start the development server
    npm run dev
}

# Function to start preview server
start_preview() {
    print_status "Starting preview server..."
    
    # Check if dist directory exists
    if [ ! -d "dist" ]; then
        print_error "dist directory not found. Please run build first."
        exit 1
    fi
    
    # Start the preview server
    npm run preview
}

# Function to run tests
run_tests() {
    print_status "Running tests..."
    
    npm run test
}

# Function to run linting
run_lint() {
    print_status "Running linting..."
    
    npm run lint
}

# Function to show status
show_status() {
    print_status "Frontend Status:"
    echo "  Environment: ${VITE_APP_ENVIRONMENT:-development}"
    echo "  API Base URL: ${VITE_API_BASE_URL:-http://localhost:5000}"
    echo "  App Name: ${VITE_APP_NAME:-MedSpaSync Pro}"
    echo "  App Version: ${VITE_APP_VERSION:-1.0.0}"
    echo ""
    echo "Available commands:"
    echo "  dev          - Start development server"
    echo "  build        - Build for production"
    echo "  preview      - Start preview server"
    echo "  test         - Run tests"
    echo "  lint         - Run linting"
}

# Function to check backend connectivity
check_backend() {
    local api_url="${VITE_API_BASE_URL:-http://localhost:5000}"
    
    print_status "Checking backend connectivity..."
    
    if command_exists curl; then
        if curl -f "${api_url}/health/quick" >/dev/null 2>&1; then
            print_success "Backend is reachable"
            return 0
        else
            print_warning "Backend is not reachable at $api_url"
            return 1
        fi
    else
        print_warning "curl not available, skipping backend check"
        return 1
    fi
}

# Main function
main() {
    print_status "Starting MedSpaSync Pro Frontend..."
    
    # Parse command line arguments
    local command="dev"
    local environment="development"
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            dev|development)
                command="dev"
                environment="development"
                shift
                ;;
            staging)
                command="dev"
                environment="staging"
                shift
                ;;
            build|production)
                command="build"
                environment="production"
                shift
                ;;
            preview)
                command="preview"
                shift
                ;;
            test)
                command="test"
                shift
                ;;
            lint)
                command="lint"
                shift
                ;;
            --help)
                echo "Usage: $0 [COMMAND]"
                echo ""
                echo "Commands:"
                echo "  dev          - Start development server (default)"
                echo "  staging      - Start development server with staging config"
                echo "  build        - Build for production"
                echo "  preview      - Start preview server"
                echo "  test         - Run tests"
                echo "  lint         - Run linting"
                echo "  --help       - Show this help message"
                exit 0
                ;;
            *)
                print_error "Unknown command: $1"
                exit 1
                ;;
        esac
    done
    
    # Run setup steps
    validate_environment
    check_dependencies
    install_dependencies
    
    # Check backend connectivity (for development)
    if [ "$command" = "dev" ]; then
        check_backend
    fi
    
    # Execute command
    case $command in
        dev)
            start_development "$environment"
            ;;
        build)
            build_production
            ;;
        preview)
            start_preview
            ;;
        test)
            run_tests
            ;;
        lint)
            run_lint
            ;;
        *)
            print_error "Unknown command: $command"
            exit 1
            ;;
    esac
    
    # Show status
    show_status
    
    print_success "MedSpaSync Pro Frontend started successfully!"
}

# Run main function with all arguments
main "$@" 