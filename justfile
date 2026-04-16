default: run

# Start all services (depends on DB init + migrations + seed)
run: init-sql
    docker compose up

# Init Postgres, run migrations, seed data
init-sql:
    docker compose up -d postgres
    dockerize -wait tcp://localhost:5432 -timeout 15s
    cd server && npx prisma migrate deploy
    ./scripts/insert-dummy-data.sh

# Tear down and remove volumes
down:
    docker compose down -v
