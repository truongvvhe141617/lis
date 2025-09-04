# Step 1: Build React app
#FROM truongvv/public:webapp-base-build AS build

# Step 1: Build React app
FROM node:18-alpine AS build

# build args + env
ARG REACT_ENV=.env.staging
ARG NODE_OPTIONS=--max-old-space-size=8192
ENV NODE_OPTIONS=${NODE_OPTIONS}

WORKDIR /app

# Copy package.json trước để cache dependency
#COPY package.json yarn.lock ./

# Install dependency
RUN yarn install --frozen-lockfile

# Copy toàn bộ source code
COPY . .

# Copy env file
COPY ${REACT_ENV} .env.staging
COPY ${REACT_ENV} .env.production

# Build app
RUN yarn build
RUN cp build/index.html build/404.html

# Step 2: Serve với Nginx
FROM nginx:stable-alpine

COPY nginx/ /etc/nginx/
COPY --from=build /app/build /usr/share/nginx/html

