# Stage 1: Dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Builder — produces static export in /app/out
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Ensure we run a production build. build:ci (not build) — same reasoning as
# ci.yml's own build step: it skips re-running the full Jest suite (stubbing
# coverage data instead), which both avoids redundant work and sidesteps a
# React/testing-library incompatibility under this image's Alpine/Node
# combination that doesn't reproduce on the actual CI runner.
ENV NODE_ENV=production
RUN npm run build:ci

# Stage 3: Runner — serve the static export with nginx
FROM nginx:stable-alpine AS runner

# Use a non-root user for security
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

USER nginx

COPY --chown=nginx:nginx scripts/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=nginx:nginx /app/out /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -f -q -O /dev/null http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
