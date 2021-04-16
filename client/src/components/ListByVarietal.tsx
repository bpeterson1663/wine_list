import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles'
import { Container, GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core'
import { WineT } from '../types/types'
import InfoIcon from '@material-ui/icons/Info'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const fetchWinesByGrape = gql`
  query wines($varietal: String!) {
    wines(varietal: $varietal) {
      id
      name
      image
      varietal
      winery
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
  imageContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
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

interface ListByVarietalT {
  history: { goBack: () => void }
}

const ListByVarietal: React.FC<ListByVarietalT> = ({ history }): JSX.Element => {
  const classes = useStyles()
  const query = useQueryParam()

  const { loading, data, error } = useQuery(fetchWinesByGrape, {
    variables: { varietal: query.get('grape') },
  })
  if (loading) return <div>...Loading</div>
  if (error) return <div>An error occured {error.message}</div>
  return (
    <>
      <IconButton onClick={() => history.goBack()}>
        <ArrowBackIcon />
      </IconButton>
      <Container className={classes.root}>
        <GridList cellHeight={400} className={classes.gridList}>
          {data.wines.map((wine: WineT) => (
            <GridListTile key={wine.id}>
              <div className={classes.imageContainer}>
                <img className={classes.wineBottle} src={wine.image} alt={wine.varietal} />
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
ListByVarietal.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
}
export default ListByVarietal
