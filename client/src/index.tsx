import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { Typography } from '@material-ui/core'
import ListByVarietal from './components/ListByVarietal'
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Typography variant="h2" component="h2">
        Wine List
      </Typography>
      <ListByVarietal />
    </ApolloProvider>
  )
}
ReactDOM.render(<Root />, document.getElementById('root'))
