#!/bin/bash

DB_NAME="cortex"
DB_USER="cortex"
DB_PASS="cortex"
DB_HOST="localhost"
DB_PORT="5432"

execute_sql() {
  local sql=$1
  PGPASSWORD=$DB_PASS psql -U $DB_USER -h $DB_HOST -d $DB_NAME -p $DB_PORT -c "$sql"
}

reports=(
  "INSERT INTO reports (id, name, description) VALUES ('report-001', 'Q1 Summary', 'Quarterly summary report for Q1') ON CONFLICT DO NOTHING;"
  "INSERT INTO reports (id, name, description) VALUES ('report-002', 'Claims Analysis', 'Detailed claims breakdown') ON CONFLICT DO NOTHING;"
  "INSERT INTO reports (id, name, description) VALUES ('report-003', 'Provider Performance', NULL) ON CONFLICT DO NOTHING;"
)

case_assignments=(
  "INSERT INTO case_assignments (id, case_id, assignee_id, status) VALUES ('ca-001', 'CASE-001', 'user-1', 'pending') ON CONFLICT DO NOTHING;"
  "INSERT INTO case_assignments (id, case_id, assignee_id, status) VALUES ('ca-002', 'CASE-002', 'user-2', 'in_review') ON CONFLICT DO NOTHING;"
  "INSERT INTO case_assignments (id, case_id, assignee_id, status) VALUES ('ca-003', 'CASE-003', 'user-1', 'completed') ON CONFLICT DO NOTHING;"
)

echo "Inserting dummy reports..."

for sql in "${reports[@]}"; do
  execute_sql "$sql"
done

echo "Inserting dummy case assignments..."

for sql in "${case_assignments[@]}"; do
  execute_sql "$sql"
done

echo "Dummy data inserted successfully."
