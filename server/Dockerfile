<<<<<<< HEAD
# Server Dockerfile
FROM node:18-alpine
=======
# Client Dockerfile
FROM node:18-alpine AS builder
>>>>>>> 92dd1bd62705a71d3385607a12ed53abc27c6744

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
<<<<<<< HEAD
RUN npm ci --only=production

# Copy source code
COPY src ./src

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "start"]
=======
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Copy built assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
>>>>>>> 92dd1bd62705a71d3385607a12ed53abc27c6744
