import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import ListVarietals from './components/Varietals/ListVarietals'
import ListByVarietal from './components/Varietals/ListByVarietal'
import ListVintages from './components/Vintage/ListVintages'
import ListByVintage from './components/Vintage/ListByVintage'
import ListRegions from './components/Region/ListRegions'
import ListByRegions from './components/Region/ListByRegion'
import Navigation from './components/Navigation'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import WineInfo from './components/WineInfo'

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
const App: React.FC = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Navigation />

          <Switch>
            <Route path="/varietals" exact component={ListVarietals} />
            <Route path="/vintages" exact component={ListVintages} />
            <Route path="/regions" exact component={ListRegions} />

            <Route path="/varietal" component={ListByVarietal} />
            <Route path="/vintage" component={ListByVintage} />
            <Route path="/region" component={ListByRegions} />

            <Route path="/wine/:id" component={WineInfo} />
            <Route path="/" />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default App
