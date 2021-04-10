FROM node:14.16.1 as builder
WORKDIR /
COPY . .
RUN npm install && npm run build

FROM nginx:1.19.9-alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /dist .
COPY --from=builder /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]