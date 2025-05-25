# backend/Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Create a non-root user(Debain-compatible)
RUN addgroup -r appgroup && adduser -r -g appgroup appuser

# Change ownership of working directory
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

EXPOSE 5000
# backend/Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Create a non-root user (Debian-compatible)
RUN groupadd appgroup && useradd -m -g appgroup appuser

# Change ownership of working directory
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

EXPOSE 5000

CMD ["npm", "start"]

CMD ["npm", "start"]
