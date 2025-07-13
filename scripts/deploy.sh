#!/bin/bash

# MedSpaSync Pro Deployment Script
# Supports multiple deployment platforms

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

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi
    
    print_success "Dependencies check passed"
}

# Build the application
build_app() {
    print_status "Building application..."
    
    # Clean previous build
    (cd frontend-app && npm run clean)
    
    # Install dependencies
    (cd frontend-app && npm ci)
    
    # Build for production
    (cd frontend-app && npm run build)
    
    if [ $? -eq 0 ]; then
        print_success "Build completed successfully"
    else
        print_error "Build failed"
        exit 1
    fi
}

# Deploy to Vercel
deploy_vercel() {
    print_status "Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    (cd frontend-app && vercel --prod)
    print_success "Deployed to Vercel"
}

# Deploy to Netlify
deploy_netlify() {
    print_status "Deploying to Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        print_warning "Netlify CLI not found. Installing..."
        npm install -g netlify-cli
    fi
    
    (cd frontend-app && netlify deploy --prod --dir=dist)
    print_success "Deployed to Netlify"
}

# Deploy to GitHub Pages
deploy_github_pages() {
    print_status "Deploying to GitHub Pages..."
    
    if [ -z "$GITHUB_TOKEN" ]; then
        print_error "GITHUB_TOKEN environment variable is required"
        exit 1
    fi
    
    # This would typically be handled by GitHub Actions
    print_warning "GitHub Pages deployment is handled by GitHub Actions"
    print_status "Push to main/master branch to trigger deployment"
}

# Deploy using Docker
deploy_docker() {
    print_status "Building and deploying with Docker..."
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed"
        exit 1
    fi
    
    # Build Docker image
    docker build -t medspasync-pro frontend-app
    
    # Run container
    docker run -d -p 3000:80 --name medspasync-pro-app medspasync-pro
    
    print_success "Docker deployment completed"
    print_status "Application available at http://localhost:3000"
}

# Deploy using Docker Compose
deploy_docker_compose() {
    print_status "Deploying with Docker Compose..."
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed"
        exit 1
    fi
    
    (cd frontend-app && docker-compose up -d)
    
    print_success "Docker Compose deployment completed"
    print_status "Application available at http://localhost:3000"
}

# Show usage information
show_usage() {
    echo "MedSpaSync Pro Deployment Script"
    echo ""
    echo "Usage: $0 [OPTION]"
    echo ""
    echo "Options:"
    echo "  vercel          Deploy to Vercel"
    echo "  netlify         Deploy to Netlify"
    echo "  github-pages    Deploy to GitHub Pages"
    echo "  docker          Deploy using Docker"
    echo "  docker-compose  Deploy using Docker Compose"
    echo "  build           Only build the application"
    echo "  help            Show this help message"
    echo ""
    echo "Environment Variables:"
    echo "  GITHUB_TOKEN    Required for GitHub Pages deployment"
    echo ""
}

# Main script
main() {
    case "${1:-help}" in
        "vercel")
            check_dependencies
            build_app
            deploy_vercel
            ;;
        "netlify")
            check_dependencies
            build_app
            deploy_netlify
            ;;
        "github-pages")
            check_dependencies
            build_app
            deploy_github_pages
            ;;
        "docker")
            check_dependencies
            build_app
            deploy_docker
            ;;
        "docker-compose")
            check_dependencies
            build_app
            deploy_docker_compose
            ;;
        "build")
            check_dependencies
            build_app
            ;;
        "help"|*)
            show_usage
            ;;
    esac
}

# Run main function with all arguments
main "$@" 