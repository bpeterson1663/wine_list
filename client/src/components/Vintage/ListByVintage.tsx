import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { useLocation } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { IconButton } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import WineGridList from '../Common/WineGridList'

const fetchWinesByVintage = gql`
  query wines($vintage: String!) {
    wines(vintage: $vintage) {
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

interface ListByVintageT {
  history: { goBack: () => void }
}

const ListByVintage: React.FC<ListByVintageT> = ({ history }): JSX.Element => {
  const classes = useStyles()
  const query = useQueryParam()
  const { loading, data, error } = useQuery(fetchWinesByVintage, {
    variables: { vintage: query.get('year') },
  })
  if (loading) return <div>...Loading</div>
  if (error) return <div>An error occured {error.message}</div>
  return (
    <>
      <IconButton onClick={() => history.goBack()}>
        <ArrowBackIcon />
      </IconButton>
      <WineGridList data={data.wines} />
    </>
  )
}
ListByVintage.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
}
export default ListByVintage
