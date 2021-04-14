import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import ListByVarietal from './components/ListByVarietal'
import Navigation from './components/Navigation'
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

const Root = () => {
  return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Navigation />

          <Switch>
            <Route path="/varietals" component={ListByVarietal} />
            <Route path="/" />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
  )
}
ReactDOM.render(<Root />, document.getElementById('root'))
