import React from 'react'
import { useQuery } from '@apollo/client'
import WineGridList from '../Common/WineGridList'
import { fetchAllWines } from '../../queries/wines'

const Home: React.FC = (): JSX.Element => {
  const { loading, data, error } = useQuery(fetchAllWines)
  if (loading) return <div>...Loading</div>
  if (error) return <div>An error occured {error.message}</div>
  return <WineGridList data={data.wines} title={'All Wines'} />
}

export default Home
