import React from 'react'
import { LinearProgress, Container } from '@material-ui/core'

import { useQuery } from '@apollo/client'
import WineGridList from '../Common/WineGridList'
import { fetchAllWines } from '../../queries/wines'

const Home: React.FC = (): JSX.Element => {
  const { loading, data, error } = useQuery(fetchAllWines)
  return (
    <Container>
      {loading && <LinearProgress />}
      {error && <div>An error occured {error.message}</div>}
      {!loading && <WineGridList data={data.wines} title={'All Wines'} />}
    </Container>
  )
}

export default Home
