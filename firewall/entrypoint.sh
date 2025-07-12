#!/bin/sh

# Espera a que webapp esté listo
sleep 3

# Obtiene la IP interna del contenedor webapp
# cambiar aqui 'webapp' por el nombre del contenedor q aparece en el compose
WEBAPP_IP=$(getent hosts webapp | awk '{ print $1 }')

echo "IP de webapp: $WEBAPP_IP"

# Habilita redirección de paquetes
echo 1 > /proc/sys/net/ipv4/ip_forward

# Redirige el tráfico que entra por el puerto 443 hacia webapp:80
iptables -t nat -A PREROUTING -p tcp --dport 443 -j DNAT --to-destination ${WEBAPP_IP}:80
iptables -t nat -A POSTROUTING -j MASQUERADE

# Evita que el contenedor termine
tail -f /dev/null
