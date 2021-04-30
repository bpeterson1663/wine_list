import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { Paper, Container, FormControl, TextField, Typography, Button } from '@material-ui/core'
import { searchForWines } from '../../queries/wines'
import WineGridList from '../Common/WineGridList'

const Search = (): JSX.Element => {
  const [winery, setWinery] = useState('')
  const [searchWines, { loading, data, error }] = useLazyQuery(searchForWines)
  const handleSearch = () => {
    searchWines({
      variables: { winery },
    })
  }

  if (loading) return <div>...Loading</div>
  if (error) return <div>An error occured {error.message}</div>
  return (
    <Container>
      <Paper>
        <FormControl>
          <TextField label="Winery" value={winery} onChange={(e) => setWinery(e.target.value)} />
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search For Wines
        </Button>
      </Paper>
      {data?.wines?.length ? <WineGridList data={data.wines} title="Results" /> : null}
    </Container>
  )
}

export default Search
