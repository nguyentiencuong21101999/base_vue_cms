FROM node:15.11.0-alpine as builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

# from builer
FROM nginx:1.20.2

COPY .docker/config/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
