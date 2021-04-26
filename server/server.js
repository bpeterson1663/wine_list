require('dotenv').config()
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const app = express()
const db = require('./db/index')
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(4000, () => {
  console.log('Listening on port 4000')
})
