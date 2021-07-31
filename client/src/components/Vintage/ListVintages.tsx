import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import InfoIcon from '@material-ui/icons/Info'
import { fetchAllVintages } from '../../queries/wines'
import {
  Container,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Typography,
  LinearProgress,
} from '@material-ui/core'
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

interface ListVintagesT {
  history: { goBack: () => void }
}

const ListVintages: React.FC<ListVintagesT> = ({ history }): JSX.Element => {
  const { loading, data, error } = useQuery(fetchAllVintages)
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
            Vintages
          </Typography>
          <Container className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
              {data.vintages.map((year: { vintage: string }) => (
                <GridListTile key={year.vintage}>
                  <GridListTileBar
                    title={year.vintage}
                    actionIcon={
                      <Link to={`/vintage?year=${year.vintage}`}>
                        <IconButton aria-label={`info about ${year.vintage}`} className={classes.icon}>
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
ListVintages.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
}
export default ListVintages
