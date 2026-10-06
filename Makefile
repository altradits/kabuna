.DEFAULT_GOAL := run

COMPOSE_FILE := e2e-backend/docker-compose.yml
STOREFRONT_PORT := 3001
BACKEND_PORT := 4000

.PHONY: run dev start stop down kill restart status seed clean test help

## run: Check ports, kill any existing processes, clean, restart Docker, display status, and start storefront
run:
	@chmod +x scripts/run.sh
	@./scripts/run.sh run

## dev: Alias for run
dev: run

## start: Alias for run
start: run

## restart: Clean restart of backend and storefront
restart: run

## status: Display health status of ports and Docker containers
status:
	@chmod +x scripts/run.sh
	@./scripts/run.sh status

## kill: Terminate any running storefront processes and free ports
kill:
	@chmod +x scripts/run.sh
	@./scripts/run.sh kill

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

## seed: Seed Ethiopian coffee varieties into Spree database
seed:
	@echo "==> Seeding Kabuna Ethiopian coffee varieties into Spree..."
	@docker compose -f $(COMPOSE_FILE) exec -T web bin/rails runner - < scripts/seed-kabuna-spree.rb
	@echo "==> Seeding complete."

## clean: Kill processes, remove containers & volumes, and clear .next cache
clean: kill
	@echo "==> Removing containers and volumes..."
	@docker compose -f $(COMPOSE_FILE) down -v
	@echo "==> Clearing .next cache..."
	@rm -rf .next
	@echo "==> Clean complete."

## test: Run TypeScript verification
test:
	@pnpm exec tsc --noEmit
	@echo "==> Typecheck passed."

## help: Display this help message
help:
	@echo "Kabuna Ethiopian Specialty Coffee - Process Control"
	@echo ""
	@echo "Available commands:"
	@echo "  make (or make run)  - Checks ports, kills stale processes, restarts Docker, displays status & starts storefront"
	@echo "  make status         - Checks status of services, API, and ports"
	@echo "  make kill           - Kills any process on port $(STOREFRONT_PORT) and frees ports"
	@echo "  make stop           - Kills storefront and stops Docker containers"
	@echo "  make down           - Tears down Docker containers"
	@echo "  make seed           - Re-seeds Ethiopian coffee varieties into Spree"
	@echo "  make clean          - Resets Docker containers, volumes, and Next.js cache"
	@echo "  make test           - Runs TypeScript verification"
