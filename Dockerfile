# Step 1: Build React app
#FROM truongvv/public:webapp-base-build AS build

FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json và yarn.lock trước
COPY package.json yarn.lock* ./

# Cài dependencies
RUN yarn install

# Copy toàn bộ source code
COPY . .

# Build React app
RUN yarn build
RUN cp build/index.html build/404.html

# Stage 2: Nginx serve
FROM nginx:stable-alpine
COPY nginx/ /etc/nginx/
COPY --from=build /app/build /usr/share/nginx/html




