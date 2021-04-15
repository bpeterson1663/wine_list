import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles'
import { GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core'
import { WineT } from '../types/types'
import InfoIcon from '@material-ui/icons/Info'

const fetchWinesByGrape = gql`
  query wines($varietal: String!) {
    wines(varietal: $varietal) {
      id
      name
      image
      varietal
    }
  }
`
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 900,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  wineBottle: {
    width: '120px',
    height: '400px',
  },
}))

function useQueryParam() {
  return new URLSearchParams(useLocation().search)
}
const ListByVarietal: React.FC = (): JSX.Element => {
  const classes = useStyles()
  const query = useQueryParam()

  const { loading, data, error } = useQuery(fetchWinesByGrape, {
    variables: { varietal: query.get('grape') },
  })
  if (loading) return <div>...Loading</div>
  if (error) return <div>An error occured {error.message}</div>
  console.log('wines: ', data.wines)
  return (
    <div className={classes.root}>
      <GridList cellHeight={400} className={classes.gridList}>
        {data.wines.map((wine: WineT) => (
          <GridListTile key={wine.id}>
            <img className={classes.wineBottle} src={wine.image} alt={wine.varietal} />
            <GridListTileBar
              title={wine.varietal}
              actionIcon={
                <Link to={`/varietal?grape=${wine.varietal}`}>
                  <IconButton aria-label={`info about ${wine.varietal}`} className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                </Link>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

export default ListByVarietal
