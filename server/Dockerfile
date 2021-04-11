FROM node:14.16.1 as builder
WORKDIR /usr/src/app
COPY . .
ENV PGUSER=my_username
ENV PGPASSWORD=mysecretpassword
RUN npm install
EXPOSE 4000
COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh