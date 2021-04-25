import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { IconButton } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import WineGridList from '../Common/WineGridList'
import { fetchWinesByRegion } from '../../queries/wines'

function useQueryParam() {
  return new URLSearchParams(useLocation().search)
}

interface ListByRegionT {
  history: { goBack: () => void }
}

const ListByRegion: React.FC<ListByRegionT> = ({ history }): JSX.Element => {
  const query = useQueryParam()
  const { loading, data, error } = useQuery(fetchWinesByRegion, {
    variables: { region: query.get('area') },
  })
  if (loading) return <div>...Loading</div>
  if (error) return <div>An error occured {error.message}</div>
  return (
    <>
      <IconButton onClick={() => history.goBack()}>
        <ArrowBackIcon />
      </IconButton>
      <WineGridList data={data.wines} title={query.get('area')} />
    </>
  )
}
ListByRegion.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
}
export default ListByRegion
