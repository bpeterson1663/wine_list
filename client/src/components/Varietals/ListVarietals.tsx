import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Typography,
  LinearProgress,
} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import { fetchAllVarietals } from '../../queries/wines'
import Varietal from '../../models/Varietal'
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

interface ListVarietalsT {
  history: { goBack: () => void }
}

const ListVarietals: React.FC<ListVarietalsT> = ({ history }): JSX.Element => {
  const { loading, data = { varietals: [] }, error } = useQuery(fetchAllVarietals)
  const classes = useStyles()

  const varietals: Varietal[] = []
  data.varietals.forEach((varietal: Varietal) => varietals.push(new Varietal(varietal.varietal)))

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
            Varietals
          </Typography>
          <Container className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
              {varietals.map((grape: Varietal) => (
                <GridListTile key={grape.varietal}>
                  <img src={grape.image} alt={grape.varietal} />
                  <GridListTileBar
                    title={grape.varietal}
                    actionIcon={
                      <Link to={`/varietal?grape=${grape.varietal}`}>
                        <IconButton aria-label={`info about ${grape.varietal}`} className={classes.icon}>
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
ListVarietals.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
}
export default ListVarietals
