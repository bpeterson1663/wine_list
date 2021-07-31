import React from 'react'
import PropTypes from 'prop-types'
import { LinearProgress } from '@material-ui/core'
import { useQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import InfoIcon from '@material-ui/icons/Info'
import { fetchAllRegions } from '../../queries/wines'
import { Container, GridList, GridListTile, GridListTileBar, IconButton, Typography } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

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
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}))

interface ListRegionsT {
  history: { goBack: () => void }
}

const ListRegions: React.FC<ListRegionsT> = ({ history }): JSX.Element => {
  const { loading, data, error } = useQuery(fetchAllRegions)
  const classes = useStyles()

  return (
    <Container>
      {loading && <LinearProgress />}
      {error && <div>An error occured {error.message}</div>}
      {!loading && (
        <>
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.header}>
            Regions
          </Typography>
          <Container className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
              {data.regions.map((area: { region: string }) => (
                <GridListTile key={area.region}>
                  <GridListTileBar
                    title={area.region}
                    actionIcon={
                      <Link to={`/region?area=${area.region}`}>
                        <IconButton aria-label={`info about ${area.region}`} className={classes.icon}>
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
      )}
    </Container>
  )
}
ListRegions.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
}
export default ListRegions
