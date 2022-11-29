# Starting image
FROM alpine:3.15 AS builder

# Workdir in container
WORKDIR /app

# Copy project into container
COPY . ./

# Install node & curl
RUN apk add --update npm

RUN npm ci --only=production

RUN cp -r /app/node_modules /app/node_modules_production

# Install dependencies
RUN npm install

# Build npm
RUN npm run build


FROM alpine:3.15

WORKDIR /app

RUN apk add --update nodejs

COPY --from=builder /app/node_modules_production/ ./node_modules/
COPY --from=builder /app/dist/ ./dist/
COPY --from=builder /app/package*.json ./

# Execution
CMD ["node", "dist/index.js"]
