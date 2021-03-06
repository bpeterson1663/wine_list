import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { IconButton, LinearProgress, Container } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import WineGridList from '../Common/WineGridList'
import { fetchWinesByVintage } from '../../queries/wines'

function useQueryParam() {
  return new URLSearchParams(useLocation().search)
}

interface ListByVintageT {
  history: { goBack: () => void }
}

const ListByVintage: React.FC<ListByVintageT> = ({ history }): JSX.Element => {
  const query = useQueryParam()
  const { loading, data, error } = useQuery(fetchWinesByVintage, {
    variables: { vintage: query.get('year') },
  })
  return (
    <Container>
      {loading && <LinearProgress />}
      {error && <div>An error occured {error.message}</div>}
      {!loading && (
        <>
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <WineGridList data={data.wines} title={query.get('year')} />
        </>
      )}
    </Container>
  )
}
ListByVintage.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
}
export default ListByVintage
