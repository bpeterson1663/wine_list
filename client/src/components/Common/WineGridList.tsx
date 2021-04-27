import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { Container, GridList, GridListTile, GridListTileBar, IconButton, Typography } from '@material-ui/core'
import { WineT } from '../../types/types'
import InfoIcon from '@material-ui/icons/Info'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
  },
  gridList: {
    width: 900,
  },
  imageContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  wineBottle: {
    maxWidth: '400px',
    height: '400px',
  },
}))

interface WineGridListT {
  data: WineT[]
  title: string | null
}
const WineGridList: React.FC<WineGridListT> = ({ data, title }): JSX.Element => {
  const classes = useStyles()
  return (
    <>
      <Typography variant="h6" className={classes.header}>
        {title}
      </Typography>
      <Container className={classes.root}>
        <GridList cellHeight={400} className={classes.gridList}>
          {data.map((wine: WineT) => (
            <GridListTile key={wine.id}>
              <div className={classes.imageContainer}>
                <img className={classes.wineBottle} src={wine.imageUrl} alt={wine.varietal} />
              </div>
              <GridListTileBar
                title={`${wine.name} - ${wine.winery}`}
                actionIcon={
                  <Link to={`/wine/${wine.id}`}>
                    <IconButton aria-label={`info about ${wine.name}`} className={classes.icon}>
                      <InfoIcon />
                    </IconButton>
                  </Link>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </Container>
    </>
  )
}

WineGridList.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
}
export default WineGridList
