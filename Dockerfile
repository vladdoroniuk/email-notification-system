# Development
FROM node:21.6.1-bullseye-slim AS development
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
USER node

# Build
FROM node:21.6.1-bullseye-slim AS build
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
RUN npm ci --only=production && npm cache clean --force
RUN npx prisma generate
USER node

# Production
FROM node:18-alpine AS production
ARG APP_NAME
ENV NODE_ENV production
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["sh", "-c", "node ./dist/apps/${APP_NAME}/main.js"]
