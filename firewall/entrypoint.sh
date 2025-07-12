#!/bin/sh

echo "Starting SSL Firewall/Proxy..."

# Espera a que los servicios estén listos
sleep 5

echo "Starting nginx with SSL configuration..."

# Inicia nginx con la configuración SSL
nginx -g "daemon off;" -c /etc/nginx/nginx-ssl.conf
