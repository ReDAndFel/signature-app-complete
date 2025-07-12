# Aplicación de Firmas Digitales

Una aplicación completa para la generación y consulta de llaves criptográficas RSA, construida con Angular, Node.js, TypeScript y PostgreSQL, ejecutándose en contenedores Docker.

## Funcionalidades

### Generación de Llaves
- Genera un par de llaves RSA (pública y privada) a partir de un alias
- Descarga automática de la llave privada en formato PEM
- Almacenamiento seguro de la llave pública en la base de datos

### Consulta de Llaves
- Consulta de llaves públicas por alias
- Visualización de la llave pública en formato PEM

## Arquitectura

- **Frontend**: Angular 15 con TypeScript
- **Backend**: Node.js con Express y TypeScript
- **Base de datos**: PostgreSQL
- **Proxy/Firewall**: iptables con nginx
- **Contenedores**: Docker y Docker Compose

## Estructura del Proyecto

```
app-signature-docker/
├── api/signature-backend/     # API Node.js
├── webapp/                    # Aplicación Angular
├── db-init/                   # Scripts de inicialización de BD
├── firewall/                  # Configuración del firewall
├── docker-compose.yml         # Configuración de servicios
├── start.bat                  # Script de inicio (Windows)
└── start.sh                   # Script de inicio (Unix/Linux)
```

## Requisitos

- Docker
- Docker Compose

## Instalación y Ejecución

### Windows
```cmd
start.bat
```

### Unix/Linux/macOS
```bash
chmod +x start.sh
./start.sh
```

### Manual
```bash
# Construir e iniciar todos los servicios
docker-compose up --build -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

## URLs de Acceso

- **Aplicación Web**: https://localhost:443
- **API**: http://localhost:3000
- **Base de Datos**: localhost:5432

## Uso de la Aplicación

### Generar Llaves
1. En la sección "Generar Par de Llaves"
2. Ingresa un alias único (mínimo 3 caracteres)
3. Haz clic en "Generar Llaves"
4. La llave privada se descargará automáticamente

### Consultar Llave Pública
1. En la sección "Consultar Llave Pública"
2. Ingresa el alias de una llave existente
3. Haz clic en "Consultar Llave"
4. La llave pública se mostrará en pantalla

## Servicios Docker

- **webapp-angular**: Interfaz de usuario Angular con nginx
- **api**: API REST Node.js/TypeScript
- **postgres**: Base de datos PostgreSQL
- **firewall**: Proxy con iptables (puerto 443 → webapp:80)

## Variables de Entorno

### Base de Datos
- `POSTGRES_USER`: admin
- `POSTGRES_PASSWORD`: admin1234
- `POSTGRES_DB`: taller1

### API
- `PORT`: 3000
- `DB_HOST`: postgres
- `DB_USER`: admin
- `DB_PASSWORD`: admin1234
- `DB_NAME`: taller1

## Desarrollo

### Estructura de la API
```
src/
├── application/use-cases/     # Casos de uso
├── domain/                    # Modelos y repositorios
├── infrastructure/           # Implementaciones concretas
└── interfaces/http/          # Controladores web
```

### Estructura del Frontend
```
src/app/
├── services/                 # Servicios Angular
├── app.component.*          # Componente principal
└── app.module.ts            # Módulo principal
```

## Troubleshooting

### Errores Comunes

1. **Puerto 443 ocupado**: Detén otros servicios que usen el puerto 443
2. **Error de conexión a BD**: Espera unos segundos más para que PostgreSQL termine de inicializar
3. **Contenedores no inician**: Verifica que Docker esté ejecutándose

### Logs útiles
```bash
# Ver logs de todos los servicios
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f webapp-angular
docker-compose logs -f api
docker-compose logs -f postgres
```

### Reiniciar servicios
```bash
# Reiniciar completamente
docker-compose down
docker-compose up --build -d

# Reiniciar solo un servicio
docker-compose restart webapp-angular
```
