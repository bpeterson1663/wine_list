import React from 'react'
import { useQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles'
import { GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import { fetchAllVarietals } from '../queries/wines'
import Varietal from '../models/Varietal'

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
  }
}))
const WineList: React.FC = (): JSX.Element => {
  const { loading, data, error } = useQuery(fetchAllVarietals)
  const classes = useStyles()

  if (loading) return <div>...Loading</div>
  if (error) return <div>An error occured {error.message}</div>

  const varietals: Varietal[] = [new Varietal('All Varietals')]
  data.varietals.forEach((varietal: Varietal) => varietals.push(new Varietal(varietal.varietal)))

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
      {varietals.map((wine: Varietal) => (
        <GridListTile key={wine.varietal}>
         <img src={wine.image} alt={wine.varietal} />
            <GridListTileBar
              title={wine.varietal}
              actionIcon={
                <IconButton aria-label={`info about ${wine.varietal}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
        </GridListTile>
      ))}
    </GridList>
      </div>
  )
}

export default WineList
