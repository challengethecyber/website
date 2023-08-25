FROM node:18 AS build

WORKDIR /app
COPY . .

RUN yarn
RUN yarn build

FROM nginx:1.18-alpine as deploy
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/public .

ENTRYPOINT [ "nginx", "-g","daemon off;" ]

EXPOSE 80