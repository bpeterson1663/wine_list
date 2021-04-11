import React from 'react'
import { useQuery } from '@apollo/client'
import { fetchAllWines } from '../queries/wines'
import { WineT } from '../types/Wine'

const WineList: React.FC = (): JSX.Element => {
  const { loading, data, error } = useQuery(fetchAllWines)
  if (loading) return <div>...Loading</div>
  if (error) return <div>An error occured {error.message}</div>
  return (
    <div>
      {data.wines.map((wine: WineT) => (
        <div key={wine.id}>
          {wine.name}
          {wine.vintage}
        </div>
      ))}
    </div>
  )
}

export default WineList
