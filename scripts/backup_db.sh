#!/usr/bin/env bash
# AVANI Foundation — MongoDB backup
# Usage: ./backup_db.sh [DB_NAME] [BACKUP_DIR]
# Cron example (daily 3 AM):
#   0 3 * * * /opt/avani/scripts/backup_db.sh >> /var/log/avani-backup.log 2>&1
set -euo pipefail

DB_NAME="${1:-avani_foundation}"
DEST="${2:-/opt/avani/backups}"
TS=$(date +%Y%m%d-%H%M%S)

mkdir -p "$DEST"
mongodump --db "$DB_NAME" --out "$DEST/$TS"
tar -czf "$DEST/avani-$DB_NAME-$TS.tar.gz" -C "$DEST" "$TS"
rm -rf "$DEST/$TS"

# Keep only the last 14 backups
ls -1t "$DEST"/avani-$DB_NAME-*.tar.gz 2>/dev/null | tail -n +15 | xargs -r rm -f

echo "Backup saved: $DEST/avani-$DB_NAME-$TS.tar.gz"
