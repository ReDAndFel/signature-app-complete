@echo off
echo Construyendo y ejecutando la aplicacion de firmas digitales...
echo.

echo Deteniendo contenedores existentes...
docker-compose down

echo.
echo Construyendo imagenes...
docker-compose build --no-cache

echo.
echo Iniciando servicios...
docker-compose up -d

echo.
echo Esperando a que los servicios esten listos...
timeout /t 10 /nobreak >nul

echo.
echo La aplicacion esta lista!
echo.
echo - Interfaz web: https://localhost:443
echo - API: http://localhost:3000
echo - Base de datos: localhost:5432
echo.
echo Para ver los logs: docker-compose logs -f
echo Para detener: docker-compose down
