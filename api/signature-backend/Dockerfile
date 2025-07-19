# Usa una imagen base oficial de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila TypeScript a JavaScript y muestra contenido generado
RUN npm run build && ls -R dist

# Expone el puerto
EXPOSE 3000

# Comando para iniciar la API
CMD ["npm", "start"]
