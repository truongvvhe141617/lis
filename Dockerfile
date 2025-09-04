# Step 1: Build React app
#FROM truongvv/public:webapp-base-build AS build

# Step 1: Build React app
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json trước
COPY package.json ./
RUN yarn install

# Copy toàn bộ code
COPY . .

ARG NODE_OPTIONS=--max-old-space-size=8192
ENV NODE_OPTIONS=${NODE_OPTIONS}

RUN yarn build
RUN cp build/index.html build/404.html

# Step 2: Serve with Nginx
FROM nginx:stable-alpine

COPY nginx/ /etc/nginx/
COPY --from=build /app/build /usr/share/nginx/html



