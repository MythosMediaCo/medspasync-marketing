#!/bin/bash

# ========================================
# MedSpaSync Pro Ecosystem Startup Script
# ========================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$SCRIPT_DIR"
LOG_DIR="$PROJECT_ROOT/logs"
PID_DIR="$PROJECT_ROOT/pids"

# Create necessary directories
mkdir -p "$LOG_DIR" "$PID_DIR"

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_DIR/ecosystem.log"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_DIR/ecosystem.log"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a "$LOG_DIR/ecosystem.log"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_DIR/ecosystem.log"
}

info() {
    echo -e "${CYAN}[INFO]${NC} $1" | tee -a "$LOG_DIR/ecosystem.log"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if port is available
port_available() {
    local port=$1
    ! nc -z localhost $port 2>/dev/null
}

# Function to check if a service is running
is_service_running() {
    local service_name=$1
    local pid_file="$PID_DIR/${service_name}.pid"
    
    if [[ -f "$pid_file" ]]; then
        local pid=$(cat "$pid_file")
        if kill -0 "$pid" 2>/dev/null; then
            return 0
        else
            rm -f "$pid_file"
        fi
    fi
    return 1
}

# Function to start a service
start_service() {
    local service_name=$1
    local start_command=$2
    local pid_file="$PID_DIR/${service_name}.pid"
    local log_file="$LOG_DIR/${service_name}.log"
    
    if is_service_running "$service_name"; then
        warning "$service_name is already running"
        return 0
    fi
    
    log "Starting $service_name..."
    
    # Start the service in background
    eval "$start_command" > "$log_file" 2>&1 &
    local pid=$!
    
    # Save PID
    echo $pid > "$pid_file"
    
    # Wait a moment to check if it started successfully
    sleep 2
    
    if kill -0 $pid 2>/dev/null; then
        success "$service_name started successfully (PID: $pid)"
        return 0
    else
        error "$service_name failed to start"
        rm -f "$pid_file"
        return 1
    fi
}

# Function to stop a service
stop_service() {
    local service_name=$1
    local pid_file="$PID_DIR/${service_name}.pid"
    
    if [[ -f "$pid_file" ]]; then
        local pid=$(cat "$pid_file")
        if kill -0 "$pid" 2>/dev/null; then
            log "Stopping $service_name (PID: $pid)..."
            kill "$pid"
            rm -f "$pid_file"
            success "$service_name stopped"
        else
            warning "$service_name process not found"
            rm -f "$pid_file"
        fi
    else
        warning "$service_name is not running"
    fi
}

# Function to check service health
check_service_health() {
    local service_name=$1
    local health_url=$2
    
    if is_service_running "$service_name"; then
        if command -v curl &> /dev/null; then
            if curl -s "$health_url" > /dev/null 2>&1; then
                success "$service_name health check passed"
                return 0
            else
                warning "$service_name health check failed"
                return 1
            fi
        else
            info "$service_name is running (health check skipped - curl not available)"
            return 0
        fi
    else
        error "$service_name is not running"
        return 1
    fi
}

# Function to wait for service to be ready
wait_for_service() {
    local service_name=$1
    local health_url=$2
    local max_attempts=${3:-30}
    local delay=${4:-2}
    
    log "Waiting for $service_name to be ready..."
    
    for ((i=1; i<=max_attempts; i++)); do
        if curl -s "$health_url" > /dev/null 2>&1; then
            success "$service_name is ready"
            return 0
        fi
        
        if [[ $i -lt $max_attempts ]]; then
            log "Attempt $i/$max_attempts: $service_name not ready yet, waiting ${delay}s..."
            sleep $delay
        fi
    done
    
    error "$service_name failed to become ready after $max_attempts attempts"
    return 1
}

# Function to start Redis (if not running)
start_redis() {
    if command -v redis-server &> /dev/null; then
        if ! pgrep -f "redis-server" > /dev/null; then
            log "Starting Redis server..."
            redis-server --daemonize yes --port 6379
            sleep 2
            
            if redis-cli ping > /dev/null 2>&1; then
                success "Redis server started"
            else
                error "Failed to start Redis server"
                return 1
            fi
        else
            success "Redis server is already running"
        fi
    else
        warning "Redis server not found, skipping Redis startup"
    fi
}

# Function to check security status
check_security_status() {
    local service_name=$1
    local security_url=$2
    
    if is_service_running "$service_name"; then
        if command -v curl &> /dev/null; then
            log "Checking security status for $service_name..."
            
            # Check security endpoints based on environment
            local env=$(echo "$service_name" | grep -o "dev\|staging\|prod" || echo "dev")
            
            case $env in
                "dev")
                    if curl -s "${security_url}/api/v1/dev/security-test" > /dev/null 2>&1; then
                        success "$service_name security check passed"
                        return 0
                    fi
                    ;;
                "staging")
                    if curl -s "${security_url}/api/v1/staging/security-audit" > /dev/null 2>&1; then
                        success "$service_name security audit passed"
                        return 0
                    fi
                    ;;
                "prod")
                    if curl -s "${security_url}/api/v1/production/security-report" > /dev/null 2>&1; then
                        success "$service_name security report generated"
                        return 0
                    fi
                    ;;
                *)
                    success "$service_name security check completed"
                    return 0
                    ;;
            esac
            
            warning "$service_name security check failed"
            return 1
        else
            info "$service_name security check skipped - curl not available"
            return 0
        fi
    else
        error "$service_name is not running for security check"
        return 1
    fi
}

# Function to monitor audit logs
monitor_audit_logs() {
    local log_file="$LOG_DIR/audit.log"
    
    if [[ -f "$log_file" ]]; then
        log "Monitoring audit logs..."
        
        # Check for recent security events
        local recent_events=$(tail -n 50 "$log_file" | grep -E "(LOGIN_FAILED|PHI_ACCESS|SECURITY_VIOLATION)" | wc -l)
        
        if [[ $recent_events -gt 0 ]]; then
            warning "Found $recent_events recent security events in audit log"
            
            # Show recent security events
            tail -n 10 "$log_file" | grep -E "(LOGIN_FAILED|PHI_ACCESS|SECURITY_VIOLATION)" | while read line; do
                warning "Security Event: $line"
            done
        else
            info "No recent security events found in audit log"
        fi
    else
        info "Audit log file not found, creating..."
        touch "$log_file"
    fi
}

# Function to check security configuration
check_security_config() {
    log "Checking security configuration..."
    
    # Check environment variables
    local env_file=".env"
    if [[ -f "$env_file" ]]; then
        # Check for required security variables
        local required_vars=("JWT_SECRET" "ENCRYPTION_KEY" "AUDIT_LOGGING_ENABLED")
        
        for var in "${required_vars[@]}"; do
            if grep -q "^${var}=" "$env_file"; then
                success "Security variable $var is configured"
            else
                warning "Security variable $var is not configured"
            fi
        done
        
        # Check for production security settings
        if grep -q "ENVIRONMENT=production" "$env_file"; then
            info "Production environment detected - checking security requirements..."
            
            local prod_checks=(
                "ENCRYPTION_ENABLED=true"
                "HIPAA_COMPLIANCE_MODE=true"
                "AUDIT_LOGGING_ENABLED=true"
            )
            
            for check in "${prod_checks[@]}"; do
                if grep -q "$check" "$env_file"; then
                    success "Production security setting: $check"
                else
                    warning "Missing production security setting: $check"
                fi
            done
        fi
    else
        warning "Environment file not found: $env_file"
    fi
    
    # Check backend security configuration
    local backend_env="python-ai/.env"
    if [[ -f "$backend_env" ]]; then
        info "Checking backend security configuration..."
        
        local backend_checks=(
            "JWT_SECRET"
            "ENCRYPTION_KEY"
            "AUDIT_LOGGING_ENABLED"
            "HIPAA_COMPLIANCE_MODE"
        )
        
        for check in "${backend_checks[@]}"; do
            if grep -q "^${check}=" "$backend_env"; then
                success "Backend security setting: $check"
            else
                warning "Missing backend security setting: $check"
            fi
        done
    else
        warning "Backend environment file not found: $backend_env"
    fi
}

# Function to run security tests
run_security_tests() {
    local service_url=$1
    local environment=$2
    
    log "Running security tests for $environment environment..."
    
    if command -v curl &> /dev/null; then
        case $environment in
            "development")
                # Test encryption
                local encryption_test=$(curl -s -X POST "${service_url}/api/v1/dev/security-test" \
                    -H "Content-Type: application/json" \
                    -d '{"test_type": "encryption"}' 2>/dev/null)
                
                if echo "$encryption_test" | grep -q '"success": true'; then
                    success "Encryption test passed"
                else
                    warning "Encryption test failed"
                fi
                
                # Test authentication
                local auth_test=$(curl -s -X POST "${service_url}/api/v1/dev/security-test" \
                    -H "Content-Type: application/json" \
                    -d '{"test_type": "authentication"}' 2>/dev/null)
                
                if echo "$auth_test" | grep -q '"success": true'; then
                    success "Authentication test passed"
                else
                    warning "Authentication test failed"
                fi
                ;;
                
            "staging")
                # Run security audit
                local audit_result=$(curl -s "${service_url}/api/v1/staging/security-audit" 2>/dev/null)
                
                if echo "$audit_result" | grep -q '"rate_limiting": "enabled"'; then
                    success "Security audit passed"
                else
                    warning "Security audit failed"
                fi
                ;;
                
            "production")
                # Get security report
                local security_report=$(curl -s "${service_url}/api/v1/production/security-report" 2>/dev/null)
                
                if echo "$security_report" | grep -q '"security_status": "secure"'; then
                    success "Security report indicates secure status"
                else
                    warning "Security report indicates potential issues"
                fi
                ;;
        esac
    else
        warning "Security tests skipped - curl not available"
    fi
}

# Function to start PostgreSQL (if not running)
start_postgres() {
    if command -v pg_ctl &> /dev/null; then
        # Try to find PostgreSQL data directory
        local pg_data_dir=""
        
        # Common PostgreSQL data directories
        local possible_dirs=(
            "/usr/local/var/postgres"
            "/var/lib/postgresql/data"
            "/opt/homebrew/var/postgresql@15"
            "/opt/homebrew/var/postgresql@14"
            "/opt/homebrew/var/postgresql@13"
        )
        
        for dir in "${possible_dirs[@]}"; do
            if [[ -d "$dir" ]]; then
                pg_data_dir="$dir"
                break
            fi
        done
        
        if [[ -n "$pg_data_dir" ]]; then
            if ! pgrep -f "postgres" > /dev/null; then
                log "Starting PostgreSQL from $pg_data_dir..."
                pg_ctl -D "$pg_data_dir" start
                sleep 3
                success "PostgreSQL started"
            else
                success "PostgreSQL is already running"
            fi
        else
            warning "PostgreSQL data directory not found, please start PostgreSQL manually"
        fi
    else
        warning "PostgreSQL not found, skipping PostgreSQL startup"
    fi
}

# Function to start the backend API gateway
start_backend() {
    local backend_dir="$PROJECT_ROOT/medspasync-ai-api"
    
    if [[ ! -d "$backend_dir" ]]; then
        error "Backend directory not found: $backend_dir"
        return 1
    fi
    
    cd "$backend_dir"
    
    # Check if virtual environment exists
    if [[ ! -d "venv" ]]; then
        log "Creating Python virtual environment..."
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    source venv/bin/activate
    
    # Install dependencies
    log "Installing backend dependencies..."
    pip install -r requirements.txt
    
    # Start the backend
    start_service "backend" "python api_server.py"
    
    cd "$PROJECT_ROOT"
}

# Function to start the main frontend
start_main_frontend() {
    local frontend_dir="$PROJECT_ROOT"
    
    if [[ ! -f "$frontend_dir/package.json" ]]; then
        error "Main frontend package.json not found"
        return 1
    fi
    
    cd "$frontend_dir"
    
    # Install dependencies if node_modules doesn't exist
    if [[ ! -d "node_modules" ]]; then
        log "Installing main frontend dependencies..."
        npm install
    fi
    
    # Start the main frontend
    start_service "main-frontend" "npm run dev"
    
    cd "$PROJECT_ROOT"
}

# Function to start the demo frontend
start_demo_frontend() {
    local demo_dir="$PROJECT_ROOT/medspasync-frontend"
    
    if [[ ! -d "$demo_dir" ]]; then
        error "Demo frontend directory not found: $demo_dir"
        return 1
    fi
    
    cd "$demo_dir"
    
    # Install dependencies if node_modules doesn't exist
    if [[ ! -d "node_modules" ]]; then
        log "Installing demo frontend dependencies..."
        npm install
    fi
    
    # Start the demo frontend
    start_service "demo-frontend" "npm run dev"
    
    cd "$PROJECT_ROOT"
}

# Function to start the Next.js demo app
start_next_demo() {
    local next_dir="$PROJECT_ROOT/medspasync-pro-next"
    
    if [[ ! -d "$next_dir" ]]; then
        error "Next.js demo directory not found: $next_dir"
        return 1
    fi
    
    cd "$next_dir"
    
    # Install dependencies if node_modules doesn't exist
    if [[ ! -d "node_modules" ]]; then
        log "Installing Next.js demo dependencies..."
        npm install
    fi
    
    # Start the Next.js demo app
    start_service "next-demo" "npm run dev"
    
    cd "$PROJECT_ROOT"
}

# Function to start the marketing page
start_marketing_page() {
    local marketing_dir="$PROJECT_ROOT/medspasync-marketing"
    
    if [[ ! -d "$marketing_dir" ]]; then
        error "Marketing page directory not found: $marketing_dir"
        return 1
    fi
    
    cd "$marketing_dir"
    
    # Install dependencies if node_modules doesn't exist
    if [[ ! -d "node_modules" ]]; then
        log "Installing marketing page dependencies..."
        npm install
    fi
    
    # Start the marketing page (assuming it uses a dev server)
    start_service "marketing-page" "npm run dev"
    
    cd "$PROJECT_ROOT"
}

# Function to start all services
start_all() {
    log "Starting MedSpaSync Pro Ecosystem..."
    
    # Check security configuration first
    check_security_config
    
    # Start infrastructure services
    start_redis
    start_postgres
    
    # Start backend API gateway
    start_backend
    
    # Wait for backend to be ready
    wait_for_service "backend" "http://localhost:8000/health/quick"
    
    # Run security tests for backend
    local environment=$(grep "ENVIRONMENT=" .env 2>/dev/null | cut -d'=' -f2 || echo "development")
    run_security_tests "http://localhost:8000" "$environment"
    
    # Start all frontends
    start_main_frontend
    start_demo_frontend
    start_next_demo
    start_marketing_page
    
    # Wait for frontends to be ready
    wait_for_service "main-frontend" "http://localhost:3000" 15 3
    wait_for_service "demo-frontend" "http://localhost:3001" 15 3
    wait_for_service "next-demo" "http://localhost:3002" 15 3
    wait_for_service "marketing-page" "http://localhost:3003" 15 3
    
    # Final health checks
    log "Performing final health checks..."
    check_service_health "backend" "http://localhost:8000/health/quick"
    check_service_health "main-frontend" "http://localhost:3000"
    check_service_health "demo-frontend" "http://localhost:3001"
    check_service_health "next-demo" "http://localhost:3002"
    check_service_health "marketing-page" "http://localhost:3003"
    
    # Security status checks
    log "Performing security status checks..."
    check_security_status "backend" "http://localhost:8000"
    
    # Monitor audit logs
    monitor_audit_logs
    
    success "MedSpaSync Pro Ecosystem started successfully!"
    
    echo
    echo "=== MedSpaSync Pro Ecosystem Status ==="
    echo "Backend API Gateway: http://localhost:8000"
    echo "Backend Health: http://localhost:8000/health"
    echo "Backend Docs: http://localhost:8000/docs"
    echo "Main Frontend: http://localhost:3000"
    echo "Demo Frontend: http://localhost:3001"
    echo "Next.js Demo: http://localhost:3002"
    echo "Marketing Page: http://localhost:3003"
    echo "Redis: localhost:6379"
    echo "PostgreSQL: localhost:5432"
    echo "======================================"
    echo
    echo "=== Security Status ==="
    echo "Environment: $environment"
    echo "Authentication: Enabled"
    echo "Encryption: $(grep "ENCRYPTION_ENABLED=" .env 2>/dev/null | cut -d'=' -f2 || echo "Unknown")"
    echo "HIPAA Compliance: $(grep "HIPAA_COMPLIANCE_MODE=" .env 2>/dev/null | cut -d'=' -f2 || echo "Unknown")"
    echo "Audit Logging: $(grep "AUDIT_LOGGING_ENABLED=" .env 2>/dev/null | cut -d'=' -f2 || echo "Unknown")"
    echo "======================"
    echo
    echo "Logs: $LOG_DIR"
    echo "PIDs: $PID_DIR"
    echo
}

# Function to stop all services
stop_all() {
    log "Stopping MedSpaSync Pro Ecosystem..."
    
    stop_service "marketing-page"
    stop_service "next-demo"
    stop_service "demo-frontend"
    stop_service "main-frontend"
    stop_service "backend"
    
    success "MedSpaSync Pro Ecosystem stopped"
}

# Function to restart all services
restart_all() {
    log "Restarting MedSpaSync Pro Ecosystem..."
    stop_all
    sleep 2
    start_all
}

# Function to show status
show_status() {
    log "MedSpaSync Pro Ecosystem Status:"
    
    echo
    echo "=== Service Status ==="
    
    # Backend
    if is_service_running "backend"; then
        echo -e "Backend API Gateway: ${GREEN}RUNNING${NC}"
        check_service_health "backend" "http://localhost:8000/health/quick"
        check_security_status "backend" "http://localhost:8000"
    else
        echo -e "Backend API Gateway: ${RED}STOPPED${NC}"
    fi
    
    # Main Frontend
    if is_service_running "main-frontend"; then
        echo -e "Main Frontend: ${GREEN}RUNNING${NC}"
        check_service_health "main-frontend" "http://localhost:3000"
    else
        echo -e "Main Frontend: ${RED}STOPPED${NC}"
    fi
    
    # Demo Frontend
    if is_service_running "demo-frontend"; then
        echo -e "Demo Frontend: ${GREEN}RUNNING${NC}"
        check_service_health "demo-frontend" "http://localhost:3001"
    else
        echo -e "Demo Frontend: ${RED}STOPPED${NC}"
    fi
    
    # Next.js Demo
    if is_service_running "next-demo"; then
        echo -e "Next.js Demo: ${GREEN}RUNNING${NC}"
        check_service_health "next-demo" "http://localhost:3002"
    else
        echo -e "Next.js Demo: ${RED}STOPPED${NC}"
    fi
    
    # Marketing Page
    if is_service_running "marketing-page"; then
        echo -e "Marketing Page: ${GREEN}RUNNING${NC}"
        check_service_health "marketing-page" "http://localhost:3003"
    else
        echo -e "Marketing Page: ${RED}STOPPED${NC}"
    fi
    
    # Infrastructure
    if pgrep -f "redis-server" > /dev/null; then
        echo -e "Redis: ${GREEN}RUNNING${NC}"
    else
        echo -e "Redis: ${RED}STOPPED${NC}"
    fi
    
    if pgrep -f "postgres" > /dev/null; then
        echo -e "PostgreSQL: ${GREEN}RUNNING${NC}"
    else
        echo -e "PostgreSQL: ${RED}STOPPED${NC}"
    fi
    
    echo "===================="
    echo
    
    # Security Status
    echo "=== Security Status ==="
    
    # Check environment
    local environment=$(grep "ENVIRONMENT=" .env 2>/dev/null | cut -d'=' -f2 || echo "development")
    echo "Environment: $environment"
    
    # Check security configuration
    local security_vars=(
        "AUTHENTICATION_ENABLED"
        "ENCRYPTION_ENABLED"
        "AUDIT_LOGGING_ENABLED"
        "HIPAA_COMPLIANCE_MODE"
    )
    
    for var in "${security_vars[@]}"; do
        local value=$(grep "^${var}=" .env 2>/dev/null | cut -d'=' -f2 || echo "Not configured")
        if [[ "$value" == "true" ]]; then
            echo -e "$var: ${GREEN}ENABLED${NC}"
        elif [[ "$value" == "false" ]]; then
            echo -e "$var: ${RED}DISABLED${NC}"
        else
            echo -e "$var: ${YELLOW}$value${NC}"
        fi
    done
    
    # Check audit logs
    local audit_log="$LOG_DIR/audit.log"
    if [[ -f "$audit_log" ]]; then
        local recent_events=$(tail -n 50 "$audit_log" | grep -E "(LOGIN_FAILED|PHI_ACCESS|SECURITY_VIOLATION)" | wc -l)
        if [[ $recent_events -gt 0 ]]; then
            echo -e "Recent Security Events: ${YELLOW}$recent_events${NC}"
        else
            echo -e "Recent Security Events: ${GREEN}0${NC}"
        fi
    else
        echo -e "Audit Log: ${RED}NOT FOUND${NC}"
    fi
    
    echo "======================"
    echo
}

# Function to show logs
show_logs() {
    local service_name=$1
    
    if [[ -z "$service_name" ]]; then
        echo "Available log files:"
        ls -la "$LOG_DIR"/*.log 2>/dev/null || echo "No log files found"
        return
    fi
    
    local log_file="$LOG_DIR/${service_name}.log"
    
    if [[ -f "$log_file" ]]; then
        tail -f "$log_file"
    else
        error "Log file not found: $log_file"
    fi
}

# Function to clean up
cleanup() {
    log "Cleaning up..."
    
    # Stop all services
    stop_all
    
    # Remove PID files
    rm -f "$PID_DIR"/*.pid
    
    # Keep log files for debugging
    log "Cleanup completed. Log files preserved in $LOG_DIR"
}

# Function to start metrics monitoring (Prometheus + Grafana)
start_metrics() {
    log "Starting metrics monitoring stack..."
    
    # Check if Docker is available
    if ! command -v docker &> /dev/null; then
        error "Docker is required for metrics monitoring"
        return 1
    fi
    
    # Create metrics configuration directory
    mkdir -p "$PROJECT_ROOT/monitoring"
    
    # Copy Prometheus configuration
    if [[ -f "python-ai/monitoring/prometheus.yml" ]]; then
        cp python-ai/monitoring/prometheus.yml "$PROJECT_ROOT/monitoring/"
        success "Prometheus configuration copied"
    else
        warning "Prometheus configuration not found"
    fi
    
    # Copy alerting rules
    if [[ -f "python-ai/monitoring/medspasync-rules.yml" ]]; then
        cp python-ai/monitoring/medspasync-rules.yml "$PROJECT_ROOT/monitoring/"
        success "Alerting rules copied"
    else
        warning "Alerting rules not found"
    fi
    
    # Start Prometheus
    log "Starting Prometheus..."
    if docker run -d \
        --name medspasync-prometheus \
        --network host \
        -v "$PROJECT_ROOT/monitoring/prometheus.yml:/etc/prometheus/prometheus.yml" \
        -v "$PROJECT_ROOT/monitoring/medspasync-rules.yml:/etc/prometheus/medspasync-rules.yml" \
        prom/prometheus:latest \
        --config.file=/etc/prometheus/prometheus.yml \
        --storage.tsdb.path=/prometheus \
        --web.console.libraries=/etc/prometheus/console_libraries \
        --web.console.templates=/etc/prometheus/consoles \
        --storage.tsdb.retention.time=200h \
        --web.enable-lifecycle; then
        success "Prometheus started successfully"
    else
        error "Failed to start Prometheus"
        return 1
    fi
    
    # Start Grafana
    log "Starting Grafana..."
    if docker run -d \
        --name medspasync-grafana \
        --network host \
        -e "GF_SECURITY_ADMIN_PASSWORD=admin" \
        -e "GF_USERS_ALLOW_SIGN_UP=false" \
        grafana/grafana:latest; then
        success "Grafana started successfully"
    else
        error "Failed to start Grafana"
        return 1
    fi
    
    # Wait for services to be ready
    log "Waiting for metrics services to be ready..."
    sleep 10
    
    # Check Prometheus
    if curl -s "http://localhost:9090/-/healthy" > /dev/null; then
        success "Prometheus is ready"
    else
        warning "Prometheus health check failed"
    fi
    
    # Check Grafana
    if curl -s "http://localhost:3000/api/health" > /dev/null; then
        success "Grafana is ready"
    else
        warning "Grafana health check failed"
    fi
    
    echo
    echo "=== Metrics Monitoring Stack ==="
    echo "Prometheus: http://localhost:9090"
    echo "Grafana: http://localhost:3000 (admin/admin)"
    echo "Metrics Endpoint: http://localhost:8000/metrics"
    echo
    echo "To import the dashboard:"
    echo "1. Open Grafana at http://localhost:3000"
    echo "2. Login with admin/admin"
    echo "3. Add Prometheus as data source (http://localhost:9090)"
    echo "4. Import dashboard from python-ai/monitoring/grafana-dashboard.json"
}

# Function to stop metrics monitoring
stop_metrics() {
    log "Stopping metrics monitoring stack..."
    
    # Stop Grafana
    if docker ps -q -f name=medspasync-grafana | grep -q .; then
        docker stop medspasync-grafana
        docker rm medspasync-grafana
        success "Grafana stopped"
    else
        warning "Grafana is not running"
    fi
    
    # Stop Prometheus
    if docker ps -q -f name=medspasync-prometheus | grep -q .; then
        docker stop medspasync-prometheus
        docker rm medspasync-prometheus
        success "Prometheus stopped"
    else
        warning "Prometheus is not running"
    fi
}

# Function to show metrics status
show_metrics_status() {
    echo
    echo "=== Metrics Monitoring Status ==="
    
    # Check Prometheus
    if docker ps -q -f name=medspasync-prometheus | grep -q .; then
        echo -e "${GREEN}✓ Prometheus is running${NC}"
        if curl -s "http://localhost:9090/-/healthy" > /dev/null; then
            echo -e "${GREEN}  Health: OK${NC}"
        else
            echo -e "${YELLOW}  Health: Warning${NC}"
        fi
    else
        echo -e "${RED}✗ Prometheus is not running${NC}"
    fi
    
    # Check Grafana
    if docker ps -q -f name=medspasync-grafana | grep -q .; then
        echo -e "${GREEN}✓ Grafana is running${NC}"
        if curl -s "http://localhost:3000/api/health" > /dev/null; then
            echo -e "${GREEN}  Health: OK${NC}"
        else
            echo -e "${YELLOW}  Health: Warning${NC}"
        fi
    else
        echo -e "${RED}✗ Grafana is not running${NC}"
    fi
    
    # Check metrics endpoint
    if curl -s "http://localhost:8000/metrics" > /dev/null; then
        echo -e "${GREEN}✓ Metrics endpoint is accessible${NC}"
    else
        echo -e "${RED}✗ Metrics endpoint is not accessible${NC}"
    fi
    
    echo
    echo "Access URLs:"
    echo "- Prometheus: http://localhost:9090"
    echo "- Grafana: http://localhost:3000"
    echo "- Metrics: http://localhost:8000/metrics"
}

# Function to create backup
create_backup() {
    log "Creating system backup..."
    
    # Check if backend is running
    if ! is_service_running "backend"; then
        error "Backend is not running. Please start the ecosystem first."
        return 1
    fi
    
    # Create backup via API
    local response=$(curl -s -X POST "http://localhost:8000/api/v1/backup/create" \
        -H "Content-Type: application/json" \
        -d '{"type": "full"}')
    
    if echo "$response" | grep -q '"status":"success"'; then
        local backup_id=$(echo "$response" | grep -o '"backup_id":"[^"]*"' | cut -d'"' -f4)
        success "Backup created successfully: $backup_id"
        echo "Backup ID: $backup_id"
        echo "Timestamp: $(date)"
    else
        error "Backup creation failed"
        echo "Response: $response"
        return 1
    fi
}

# Function to check backup status
check_backup_status() {
    log "Checking backup system status..."
    
    # Check if backend is running
    if ! is_service_running "backend"; then
        error "Backend is not running. Please start the ecosystem first."
        return 1
    fi
    
    # Get backup status via API
    local response=$(curl -s "http://localhost:8000/api/v1/backup/status")
    
    if echo "$response" | grep -q '"status":"success"'; then
        echo
        echo "=== Backup System Status ==="
        echo "System Status: $(echo "$response" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)"
        echo "Total Backups: $(echo "$response" | grep -o '"total_backups":[0-9]*' | cut -d':' -f2)"
        echo "Successful: $(echo "$response" | grep -o '"successful_backups":[0-9]*' | cut -d':' -f2)"
        echo "Failed: $(echo "$response" | grep -o '"failed_backups":[0-9]*' | cut -d':' -f2)"
        echo "Total Size: $(echo "$response" | grep -o '"total_size_gb":[0-9.]*' | cut -d':' -f2) GB"
        echo "Latest Backup: $(echo "$response" | grep -o '"latest_backup":"[^"]*"' | cut -d'"' -f4)"
        echo "Disk Usage: $(echo "$response" | grep -o '"disk_usage_percent":[0-9.]*' | cut -d':' -f2)%"
        echo "Next Scheduled: $(echo "$response" | grep -o '"next_scheduled_backup":"[^"]*"' | cut -d'"' -f4)"
    else
        error "Failed to get backup status"
        echo "Response: $response"
        return 1
    fi
}

# Function to list backups
list_backups() {
    log "Listing recent backups..."
    
    # Check if backend is running
    if ! is_service_running "backend"; then
        error "Backend is not running. Please start the ecosystem first."
        return 1
    fi
    
    local limit=${1:-10}
    
    # Get backup list via API
    local response=$(curl -s "http://localhost:8000/api/v1/backup/list?limit=$limit")
    
    if echo "$response" | grep -q '"status":"success"'; then
        echo
        echo "=== Recent Backups ==="
        echo "Found $(echo "$response" | grep -o '"count":[0-9]*' | cut -d':' -f2) backups:"
        echo
        
        # Parse and display backup list
        echo "$response" | grep -o '"backup_id":"[^"]*"' | cut -d'"' -f4 | while read backup_id; do
            echo "  - $backup_id"
        done
    else
        error "Failed to list backups"
        echo "Response: $response"
        return 1
    fi
}

# Function to restore from backup
restore_backup() {
    local backup_id=$1
    local restore_type=${2:-"all"}
    
    if [[ -z "$backup_id" ]]; then
        error "Backup ID is required"
        echo "Usage: ./start_ecosystem.sh restore <backup_id> [type]"
        return 1
    fi
    
    log "Restoring from backup: $backup_id (type: $restore_type)"
    
    # Check if backend is running
    if ! is_service_running "backend"; then
        error "Backend is not running. Please start the ecosystem first."
        return 1
    fi
    
    # Confirm restoration
    echo "⚠️  WARNING: This will restore the system from backup $backup_id"
    echo "This operation may overwrite current data."
    read -p "Are you sure you want to continue? (y/N): " confirm
    
    if [[ $confirm != "y" && $confirm != "Y" ]]; then
        info "Restoration cancelled"
        return 0
    fi
    
    # Perform restoration via API
    local response=$(curl -s -X POST "http://localhost:8000/api/v1/backup/restore/$backup_id" \
        -H "Content-Type: application/json" \
        -d "{\"type\": \"$restore_type\"}")
    
    if echo "$response" | grep -q '"status":"success"'; then
        success "Restoration completed successfully"
        echo "Backup ID: $backup_id"
        echo "Restore Type: $restore_type"
        echo "Timestamp: $(date)"
    else
        error "Restoration failed"
        echo "Response: $response"
        return 1
    fi
}

# Function to verify backup
verify_backup() {
    local backup_id=$1
    
    if [[ -z "$backup_id" ]]; then
        error "Backup ID is required"
        echo "Usage: ./start_ecosystem.sh verify <backup_id>"
        return 1
    fi
    
    log "Verifying backup: $backup_id"
    
    # Check if backend is running
    if ! is_service_running "backend"; then
        error "Backend is not running. Please start the ecosystem first."
        return 1
    fi
    
    # Verify backup via API
    local response=$(curl -s "http://localhost:8000/api/v1/backup/verify/$backup_id")
    
    if echo "$response" | grep -q '"status":"success"'; then
        local is_valid=$(echo "$response" | grep -o '"is_valid":[^,]*' | cut -d':' -f2)
        if [[ "$is_valid" == "true" ]]; then
            success "Backup verification passed: $backup_id"
        else
            error "Backup verification failed: $backup_id"
            return 1
        fi
    else
        error "Backup verification failed"
        echo "Response: $response"
        return 1
    fi
}

# Function to test disaster recovery
test_disaster_recovery() {
    log "Running disaster recovery tests..."
    
    # Check if backend is running
    if ! is_service_running "backend"; then
        error "Backend is not running. Please start the ecosystem first."
        return 1
    fi
    
    # Run disaster recovery tests
    if [[ -f "python-ai/test_disaster_recovery.py" ]]; then
        cd python-ai
        if python test_disaster_recovery.py; then
            success "Disaster recovery tests passed"
        else
            error "Disaster recovery tests failed"
            return 1
        fi
        cd ..
    else
        error "Disaster recovery test script not found"
        return 1
    fi
}

# Function to show help
show_help() {
    echo "MedSpaSync Pro Ecosystem Management Script"
    echo
    echo "Usage: $0 [COMMAND]"
    echo
    echo "Commands:"
    echo "  start           Start all ecosystem services"
    echo "  stop            Stop all ecosystem services"
    echo "  restart         Restart all ecosystem services"
    echo "  status          Show status of all services"
    echo "  logs [service]  Show logs for a specific service"
    echo "  cleanup         Clean up logs and temporary files"
    echo "  security        Run security tests and audits"
    echo "  monitor         Launch unified monitoring dashboard"
    echo "  metrics         Start Prometheus + Grafana monitoring stack"
    echo "  stop-metrics    Stop metrics monitoring stack"
    echo "  metrics-status  Show metrics monitoring status"
    echo "  backup          Create a new system backup"
    echo "  backup-status   Check backup system status"
    echo "  backup-list     List recent backups"
    echo "  restore <id>    Restore from backup"
    echo "  verify <id>     Verify backup integrity"
    echo "  test-dr         Run disaster recovery tests"
    echo "  deploy          Deploy to production environment"
    echo "  help            Show this help message"
    echo
    echo "Services:"
    echo "  - Backend API (Python/FastAPI)"
    echo "  - Main Frontend (React/Vite)"
    echo "  - Demo Frontend (React/Vite)"
    echo "  - Redis (Caching & Session Store)"
    echo "  - PostgreSQL (Database)"
    echo "  - Prometheus (Metrics Collection)"
    echo "  - Grafana (Metrics Visualization)"
    echo "  - Disaster Recovery (Backup & Restore)"
    echo
    echo "Examples:"
    echo "  $0 start              # Start all services"
    echo "  $0 status             # Check service status"
    echo "  $0 logs backend       # View backend logs"
    echo "  $0 monitor            # Open monitoring dashboard"
    echo "  $0 metrics            # Start metrics stack"
    echo "  $0 backup             # Create system backup"
    echo "  $0 backup-status      # Check backup status"
    echo "  $0 restore backup_123 # Restore from backup"
    echo "  $0 test-dr            # Run disaster recovery tests"
    echo "  $0 deploy             # Deploy to production"
}

# Main function
main() {
    case "${1:-start}" in
        start)
            start_all
            ;;
        stop)
            stop_all
            ;;
        restart)
            restart_all
            ;;
        status)
            show_status
            ;;
        logs)
            show_logs "$2"
            ;;
        cleanup)
            cleanup
            ;;
        security)
            run_security_command
            ;;
        monitor)
            # Unified terminal UI monitoring
            python3 python-ai/monitor_dashboard.py
            ;;
        metrics)
            start_metrics
            ;;
        stop-metrics)
            stop_metrics
            ;;
        metrics-status)
            show_metrics_status
            ;;
        backup)
            create_backup
            ;;
        backup-status)
            check_backup_status
            ;;
        backup-list)
            list_backups "$2"
            ;;
        restore)
            restore_backup "$2" "$3"
            ;;
        verify)
            verify_backup "$2"
            ;;
        test-dr)
            test_disaster_recovery
            ;;
        deploy)
            deploy_production
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            echo "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# Handle script interruption
trap 'echo -e "\n${YELLOW}Interrupted by user${NC}"; cleanup; exit 1' INT TERM

# Run main function
main "$@" 