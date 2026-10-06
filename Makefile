.DEFAULT_GOAL := dev

COMPOSE_FILE := e2e-backend/docker-compose.yml
STOREFRONT_PORT := 3001
BACKEND_PORT := 4000

.PHONY: dev start stop kill restart status seed clean help

## kill: Terminate any running storefront processes and free port 3001
kill:
	@echo "==> Killing any existing processes on port $(STOREFRONT_PORT)..."
	@-lsof -ti :$(STOREFRONT_PORT) | xargs kill -9 2>/dev/null || true
	@-pkill -f "next dev -p $(STOREFRONT_PORT)" 2>/dev/null || true
	@sleep 1
	@echo "==> Port $(STOREFRONT_PORT) is clear."

## dev: Kill stale processes, verify/start Spree backend, and launch storefront
dev: kill
	@echo "==> Ensuring Spree Commerce Docker services are up..."
	@docker compose -f $(COMPOSE_FILE) up -d --wait
	@echo "==> Starting Kabuna storefront on http://localhost:$(STOREFRONT_PORT)..."
	@pnpm run dev

## start: Alias for dev
start: dev

## stop: Stop storefront process and shut down backend Docker containers
stop: kill
	@echo "==> Stopping Docker containers..."
	@docker compose -f $(COMPOSE_FILE) stop
	@echo "==> All processes stopped."

## down: Stop and remove Docker containers
down: kill
	@echo "==> Tearing down Docker containers..."
	@docker compose -f $(COMPOSE_FILE) down
	@echo "==> Everything down."

## restart: Kill all processes, restart Docker services, and start storefront
restart: kill
	@echo "==> Restarting Docker containers..."
	@docker compose -f $(COMPOSE_FILE) restart
	@docker compose -f $(COMPOSE_FILE) up -d --wait
	@echo "==> Starting Kabuna storefront on http://localhost:$(STOREFRONT_PORT)..."
	@pnpm run dev

## seed: Seed Ethiopian coffee varieties into Spree database
seed:
	@echo "==> Seeding Kabuna Ethiopian coffee varieties into Spree..."
	@docker compose -f $(COMPOSE_FILE) exec -T web bin/rails runner - < scripts/seed-kabuna-spree.rb
	@echo "==> Seeding complete."

## status: Check status of ports and containers
status:
	@echo "==> Checking port $(STOREFRONT_PORT) (Storefront):"
	@-lsof -i :$(STOREFRONT_PORT) || echo "Port $(STOREFRONT_PORT) is free."
	@echo ""
	@echo "==> Checking port $(BACKEND_PORT) (Spree Backend API):"
	@-lsof -i :$(BACKEND_PORT) || echo "Port $(BACKEND_PORT) is free."
	@echo ""
	@echo "==> Docker Container Status:"
	@docker compose -f $(COMPOSE_FILE) ps

## clean: Kill processes, remove containers & volumes, and clear .next cache
clean: kill
	@echo "==> Removing containers and volumes..."
	@docker compose -f $(COMPOSE_FILE) down -v
	@echo "==> Clearing .next cache..."
	@rm -rf .next
	@echo "==> Clean complete."

## help: Display this help message
help:
	@echo "Kabuna Ethiopian Specialty Coffee - Process Control"
	@echo ""
	@echo "Available commands:"
	@echo "  make (or make dev)  - Kills any existing process and starts backend + storefront"
	@echo "  make kill           - Kills any process on port $(STOREFRONT_PORT)"
	@echo "  make stop           - Kills storefront and stops Docker containers"
	@echo "  make restart        - Kills and restarts all services"
	@echo "  make seed           - Re-seeds Ethiopian coffee varieties into Spree"
	@echo "  make status         - Checks status of services and ports"
	@echo "  make clean          - Resets Docker containers, volumes, and Next.js cache"
