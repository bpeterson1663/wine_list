import React from 'react'
import { useQuery } from '@apollo/client'
import { fetchAllVarietals } from '../queries/wines'
import Varietal from '../models/Varietal'
const WineList: React.FC = (): JSX.Element => {
  const { loading, data, error } = useQuery(fetchAllVarietals)
  if (loading) return <div>...Loading</div>
  if (error) return <div>An error occured {error.message}</div>
  const varietals: Varietal[] = [new Varietal('All Varietals')]
  data.varietals.forEach((varietal: Varietal) => varietals.push(new Varietal(varietal.varietal)))
  return (
    <div>
      {varietals.map((wine: Varietal) => (
        <div key={wine.varietal}>
          {wine.varietal}
          <img src={wine.image} width={200} height={200} />
        </div>
      ))}
    </div>
  )
}

export default WineList
