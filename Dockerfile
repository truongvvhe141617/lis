# Step 1: Build React app
FROM truongvv/public:webapp AS build

# Nhận biến môi trường khi build
ARG REACT_ENV=.env.staging
ARG NODE_OPTIONS=--max-old-space-size=8192
ENV NODE_OPTIONS=${NODE_OPTIONS}

WORKDIR /app

# Copy package.json và lockfile trước để tận dụng cache
COPY package.json yarn.lock ./

# Cài dependency (dùng yarn để thống nhất)
RUN yarn install --frozen-lockfile

# Copy toàn bộ source code
COPY . .

# Copy env file
COPY ${REACT_ENV} .env.staging
COPY ${REACT_ENV} .env.production

# Build app (React/Vite/NextJS đều sẽ ra thư mục build)
RUN yarn build && cp build/index.html build/404.html

# Step 2: Serve bằng Nginx
FROM nginx:stable-alpine

COPY nginx/ /etc/nginx/
COPY --from=build /app/build /usr/share/nginx/html
