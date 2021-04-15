import React from 'react'
import { Paper } from '@material-ui/core'
import { useQuery, gql } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const fetchWine = gql`
  query wines($id: String!) {
    wines(id: $id) {
      name
      winery
      vintage
      price
      varietal
      description
      image
    }
  }
`
const useStyles = makeStyles(() => ({
  wineBottle: {
    width: '120px',
    height: '400px',
  },
}))
const WineInfo: React.FC = (): JSX.Element => {
  const { id } = useParams()
  const { loading, data, error } = useQuery(fetchWine, {
    variables: { id },
  })
  const classes = useStyles()
  if (loading) return <div>...Loading</div>
  if (error) return <div>An error occured {error.message}</div>

  const wine = data.wines[0]
  return (
    <Paper>
      <h3>
        {wine.winery} {wine.name}
      </h3>
      <h4>{wine.vintage}</h4>
      <h5>${wine.price}</h5>
      <img className={classes.wineBottle} src={wine.image} alt={wine.varietal} />
      <p>{wine.description}</p>
    </Paper>
  )
}

export default WineInfo
