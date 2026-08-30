# ==============================
# Stage 1: Build Stage
# ==============================
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (for layer caching)
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci --only=production

# ==============================
# Stage 2: Production Stage
# ==============================
FROM node:18-alpine AS production

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001

# Set working directory
WORKDIR /app

# Copy installed dependencies from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy source code
COPY src/ ./src/
COPY package*.json ./

# Change ownership to non-root user
RUN chown -R nodeuser:nodejs /app
USER nodeuser

# Expose port
EXPOSE 3000

# Health check for Docker
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start the app
CMD ["node", "src/app.js"]
