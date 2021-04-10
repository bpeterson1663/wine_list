docker container run -d --name db -p 5432:5432 -e POSTGRES_PASSWORD=process.env.PGPASSWORD -e POSTGRES_USER=process.env.PGUSER postgres:13.2-alpine

See https://node-postgres.com/api/client