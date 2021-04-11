import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import WineList from './components/WineList'
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <h1>Wine List</h1>
      <WineList />
    </ApolloProvider>
  )
}
ReactDOM.render(<Root />, document.getElementById('root'))
