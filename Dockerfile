# Step 1
FROM iolis/public:webapp-base-build AS build
ARG REACT_ENV=.env.staging
ARG NODE_OPTIONS
ENV NODE_OPTIONS=${NODE_OPTIONS}

WORKDIR /app

COPY . /app
COPY ${REACT_ENV} .env.staging
COPY ${REACT_ENV} .env.production
RUN yarn add exceljs
RUN NODE_OPTIONS="--max-old-space-size=8192" npm run build\
    && cd build\
    && cp index.html 404.html

# Stage 2
FROM nginx:stable-alpine
COPY nginx/ /etc/nginx/
COPY --from=build /app/build /usr/share/nginx/html