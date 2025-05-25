# Stage 1: Build the React app
FROM node:18 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Create a non-root user(Debain-compatible)
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Copy built app to nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Change ownership of the copied files
RUN chown -R appuser:appgroup /usr/share/nginx/html

# Switch to non-root user
USER appuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
