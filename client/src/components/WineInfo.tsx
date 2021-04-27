import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Container, IconButton } from '@material-ui/core'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { fetchWine } from '../queries/wines'

const useStyles = makeStyles(() => ({
  wineBottle: {
    maxWidth: '400px',
    height: '400px',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  paperContainer: {
    margin: 5,
    padding: '5px 10px',
    maxWidth: 400,
  },
}))

interface WineInfoT {
  history: { goBack: () => void }
}

const WineInfo: React.FC<WineInfoT> = ({ history }): JSX.Element => {
  const { id } = useParams()
  const { loading, data, error } = useQuery(fetchWine, {
    variables: { id },
  })
  const classes = useStyles()
  if (loading) return <div>...Loading</div>
  if (error) return <div>An error occured {error.message}</div>
  console.log('data: ', data)
  const wine = data.wines[0]
  return (
    <>
      <IconButton onClick={() => history.goBack()}>
        <ArrowBackIcon />
      </IconButton>
      <Container className={classes.container}>
        <Paper elevation={0} className={classes.paperContainer}>
          <img className={classes.wineBottle} src={wine.imageUrl} alt={wine.varietal} />
        </Paper>
        <Paper elevation={3} className={classes.paperContainer}>
          <h3>{wine.winery}</h3>
          <h3>{wine.name}</h3>
          <h3>{wine.region}</h3>
          <h3>{wine.varietal}</h3>
          <h4>{wine.vintage}</h4>
          <h5>${wine.price}</h5>
          <p>{wine.description}</p>
        </Paper>
      </Container>
    </>
  )
}
WineInfo.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
}
export default WineInfo
