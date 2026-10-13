#!/usr/bin/env bash
# AVANI Foundation — MongoDB restore
# Usage: ./restore_db.sh /path/to/avani-avani_foundation-YYYYMMDD-HHMMSS.tar.gz [DB_NAME]
# WARNING: --drop replaces existing collections in the target database.
set -euo pipefail

ARCHIVE="${1:?Usage: restore_db.sh <backup.tar.gz> [DB_NAME]}"
DB_NAME="${2:-avani_foundation}"

TMP=$(mktemp -d)
tar -xzf "$ARCHIVE" -C "$TMP"
DUMP_DIR=$(find "$TMP" -mindepth 2 -maxdepth 2 -type d | head -1)

mongorestore --drop --db "$DB_NAME" "$DUMP_DIR"
rm -rf "$TMP"

echo "Restore complete into database: $DB_NAME"
