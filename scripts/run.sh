#!/usr/bin/env bash
# ==============================================================================
# Kabuna Ethiopian Specialty Coffee - Process Runner & Health Controller
# ==============================================================================
# 1. Checks if storefront port (3001) is in use.
# 2. Terminates any conflicting/stale processes cleanly and verifies port release.
# 3. Cleans stale Next.js dev locks and cache artifacts.
# 4. Verifies/Starts Docker daemon if needed.
# 5. Restarts Docker backend containers (postgres, redis, web) & awaits health.
# 6. Displays a comprehensive service status dashboard.
# 7. Starts/Restarts the Next.js storefront on http://localhost:3001.
# ==============================================================================

set -eo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"

STOREFRONT_PORT="${STOREFRONT_PORT:-3001}"
BACKEND_PORT="${BACKEND_PORT:-4000}"
COMPOSE_FILE="e2e-backend/docker-compose.yml"

# ANSI Colors
BOLD="\033[1m"
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
CYAN="\033[0;36m"
MAGENTA="\033[0;35m"
RESET="\033[0m"

ensure_docker_daemon() {
    if ! docker info >/dev/null 2>&1; then
        echo -e "  ${YELLOW}[WARN] Docker daemon is not running. Starting Docker Desktop...${RESET}"
        open -a Docker 2>/dev/null || true
        local max_wait=30
        local count=0
        while [ $count -lt $max_wait ]; do
            if docker info >/dev/null 2>&1; then
                echo -e "  ${GREEN}[OK] Docker daemon is now running and responsive.${RESET}"
                return 0
            fi
            count=$((count + 1))
            sleep 2
        done
        echo -e "  ${RED}[ERROR] Docker daemon could not be reached. Please launch Docker Desktop.${RESET}"
        exit 1
    fi
}

kill_port_processes() {
    echo -e "${BOLD}${CYAN}==> [1/5] Checking port availability...${RESET}"

    # Check Storefront Port 3001
    local pids_3001
    pids_3001=$(lsof -ti :${STOREFRONT_PORT} 2>/dev/null || true)

    if [ -n "$pids_3001" ]; then
        echo -e "  ${YELLOW}[WARN] Port ${STOREFRONT_PORT} is currently in use by PID(s): ${pids_3001}${RESET}"
        echo -e "  ${RED}[STOP] Terminating existing storefront process(es)...${RESET}"
        for pid in $pids_3001; do
            kill -9 "$pid" 2>/dev/null || true
        done
        pkill -f "next dev -p ${STOREFRONT_PORT}" 2>/dev/null || true
        sleep 1

        local remaining_3001
        remaining_3001=$(lsof -ti :${STOREFRONT_PORT} 2>/dev/null || true)
        if [ -n "$remaining_3001" ]; then
            echo -e "  ${YELLOW}[WARN] Force killing lingering process(es): ${remaining_3001}${RESET}"
            kill -9 $remaining_3001 2>/dev/null || true
            sleep 1
        fi
        echo -e "  ${GREEN}[OK] Port ${STOREFRONT_PORT} is now cleared and available.${RESET}"
    else
        echo -e "  ${GREEN}[OK] Port ${STOREFRONT_PORT} is available.${RESET}"
    fi
}

clean_locks() {
    echo ""
    echo -e "${BOLD}${CYAN}==> [2/5] Cleaning stale locks & temporary files...${RESET}"
    rm -f .next/lock .next/dev/lock 2>/dev/null || true
    echo -e "  ${GREEN}[OK] Dev locks cleaned.${RESET}"
}

restart_docker() {
    echo ""
    echo -e "${BOLD}${CYAN}==> [3/5] Restarting Docker backend containers...${RESET}"
    ensure_docker_daemon

    if [ ! -f "$COMPOSE_FILE" ]; then
        echo -e "  ${RED}[ERROR] Docker compose file not found at ${COMPOSE_FILE}!${RESET}"
        exit 1
    fi

    echo -e "  [RESTART] Restarting Spree Commerce services (postgres, redis, web)..."
    docker compose -f "$COMPOSE_FILE" restart
    echo -e "  [WAIT] Awaiting healthy state..."
    docker compose -f "$COMPOSE_FILE" up -d --wait
    echo -e "  ${GREEN}[OK] Docker backend containers restarted and healthy.${RESET}"
}

display_status() {
    echo ""
    echo -e "${BOLD}${CYAN}==> [4/5] Inspecting services & system status...${RESET}"
    ensure_docker_daemon

    # Verify Spree Rails health check endpoint /up
    local max_retries=20
    local count=0
    local backend_status="${RED}INITIALIZING${RESET}"

    while [ $count -lt $max_retries ]; do
        local http_code
        http_code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:${BACKEND_PORT}/up" 2>/dev/null || echo "000")
        if [ "$http_code" = "200" ]; then
            backend_status="${GREEN}ONLINE (HTTP 200 OK)${RESET}"
            break
        fi
        count=$((count + 1))
        sleep 1
    done

    # Probe Spree API with publishable key
    local spree_key
    spree_key=$(grep "^SPREE_PUBLISHABLE_KEY=" .env.local 2>/dev/null | cut -d'=' -f2 | tr -d ' ' || echo "")
    local product_info="${YELLOW}Checking...${RESET}"

    if [ -n "$spree_key" ]; then
        local api_resp
        api_resp=$(curl -s -H "x-spree-api-key: ${spree_key}" "http://localhost:${BACKEND_PORT}/api/v3/store/products" 2>/dev/null || echo "")
        if echo "$api_resp" | grep -q '"data"'; then
            local p_count
            p_count=$(echo "$api_resp" | grep -o '"id"' | wc -l | tr -d ' ')
            product_info="${GREEN}${p_count} varieties loaded in Spree API${RESET}"
        else
            product_info="${YELLOW}API online (syncing catalog)${RESET}"
        fi
    fi

    # Check port 3001 status
    local port_3001_status
    if lsof -ti :${STOREFRONT_PORT} >/dev/null 2>&1; then
        port_3001_status="${YELLOW}LISTENING (PID: $(lsof -ti :${STOREFRONT_PORT} | tr '\n' ' '))${RESET}"
    else
        port_3001_status="${GREEN}AVAILABLE (Ready to start)${RESET}"
    fi

    echo ""
    echo -e "${BOLD}${MAGENTA}========================================================================${RESET}"
    echo -e "${BOLD}${MAGENTA}       KABUNA ETHIOPIAN SPECIALTY COFFEE - STATUS DASHBOARD            ${RESET}"
    echo -e "${BOLD}${MAGENTA}========================================================================${RESET}"
    echo -e "  ${BOLD}Spree Backend API:${RESET}     http://localhost:${BACKEND_PORT}  [${backend_status}]"
    echo -e "  ${BOLD}Spree Health Check:${RESET}    http://localhost:${BACKEND_PORT}/up"
    echo -e "  ${BOLD}Catalog Products:${RESET}      ${product_info}"
    echo -e "  ${BOLD}Port ${STOREFRONT_PORT} (Storefront):${RESET}  ${port_3001_status}"
    echo -e "  ${BOLD}Storefront Entry:${RESET}      http://localhost:${STOREFRONT_PORT}/us/en"
    echo -e "${BOLD}${MAGENTA}------------------------------------------------------------------------${RESET}"
    docker compose -f "$COMPOSE_FILE" ps --format "table {{.Service}}\t{{.Status}}\t{{.Ports}}"
    echo -e "${BOLD}${MAGENTA}========================================================================${RESET}"
    echo ""
}

start_storefront() {
    echo -e "${BOLD}${CYAN}==> [5/5] Launching Kabuna Next.js Storefront on http://localhost:${STOREFRONT_PORT}...${RESET}"
    echo -e "  [START] Starting Turbopack dev server..."
    echo -e "  [URL] Storefront URL: ${BOLD}${GREEN}http://localhost:${STOREFRONT_PORT}/us/en${RESET}"
    echo -e "  [INFO] Press ${BOLD}Ctrl+C${RESET} at any time to gracefully stop."
    echo ""
    exec pnpm run dev
}

# --- Command Dispatcher ---
MODE="${1:-run}"

case "$MODE" in
    run)
        kill_port_processes
        clean_locks
        restart_docker
        display_status
        start_storefront
        ;;
    restart)
        kill_port_processes
        clean_locks
        restart_docker
        display_status
        start_storefront
        ;;
    status)
        display_status
        ;;
    clean)
        kill_port_processes
        clean_locks
        echo -e "  ${GREEN}[OK] Cleaned and stopped.${RESET}"
        ;;
    *)
        echo "Usage: $0 {run|restart|status|clean}"
        exit 1
        ;;
esac
