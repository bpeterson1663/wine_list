import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import ListByVarietal from './components/ListByVarietal'
import Navigation from './components/Navigation'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})
const theme = createMuiTheme({
  palette: {
    primary: { main: '#1588E6' },
    secondary: { main: '#DC567F' },
  },
})
const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Navigation />

          <Switch>
            <Route path="/varietals" component={ListByVarietal} />
            <Route path="/" />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </ThemeProvider>
  )
}
ReactDOM.render(<Root />, document.getElementById('root'))
