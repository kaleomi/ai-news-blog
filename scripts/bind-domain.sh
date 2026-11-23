#!/usr/bin/env bash
# Add the new domain without rewriting old certificate paths or virtual hosts.
set -euo pipefail
umask 022

if [ "$(id -u)" -ne 0 ]; then
  echo 'Run: sudo bash scripts/bind-domain.sh'
  exit 1
fi

DOMAIN='www.xialuoxi.top'
CONFIG='/etc/nginx/sites-available/ai-news-blog-top'
ENABLED='/etc/nginx/sites-enabled/ai-news-blog-top'

test -s /var/www/ai-news-blog/index.html
command -v nginx > /dev/null

# Preserve any HTTPS configuration already written by Certbot on a prior run.
if [ ! -e "$CONFIG" ]; then
  cat > "$CONFIG" <<'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name www.xialuoxi.top;
    root /var/www/ai-news-blog;
    index index.html;
    charset utf-8;

    location / {
        try_files $uri $uri/ =404;
    }
    location /_astro/ {
        try_files $uri =404;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    location ~ /\. {
        deny all;
    }
}
NGINX
fi

ln -sfn "$CONFIG" "$ENABLED"
nginx -t
systemctl reload nginx

if ! command -v certbot > /dev/null; then
  apt-get update
  DEBIAN_FRONTEND=noninteractive apt-get install -y certbot python3-certbot-nginx
fi

certbot --nginx -d "$DOMAIN" --redirect
systemctl enable --now certbot.timer
echo "Domain configured: https://$DOMAIN"
