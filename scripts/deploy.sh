#!/usr/bin/env bash
# Update static files only; preserve the existing Nginx / HTTPS configuration.
set -euo pipefail
umask 022

if [ "$(id -u)" -ne 0 ]; then
  echo 'Run: sudo bash scripts/deploy.sh'
  exit 1
fi

cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."
SITE_URL="${SITE_URL:-https://www.xialuoxi.top}"

npm ci
npm run build -- --site="$SITE_URL"
test -s dist/index.html
test -s dist/rss.xml
nginx -t

mkdir -p /var/www/ai-news-blog
cp -a dist/. /var/www/ai-news-blog/
find /var/www/ai-news-blog -type d -exec chmod 755 {} +
find /var/www/ai-news-blog -type f -exec chmod 644 {} +
systemctl reload nginx
echo "Published: $SITE_URL"
