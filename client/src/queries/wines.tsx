import { gql } from '@apollo/client'

export const fetchAllWines = gql`
  {
    wines {
      id
      name
      vintage
      varietal
      imageUrl
    }
  }
`
export const fetchAllVarietals = gql`
  {
    varietals {
      varietal
    }
  }
`

export const fetchAllVintages = gql`
  {
    vintages {
      vintage
    }
  }
`

export const fetchAllRegions = gql`
  {
    regions {
      region
    }
  }
`

export const fetchWinesByGrape = gql`
  query wines($varietal: String!) {
    wines(varietal: $varietal) {
      id
      name
      imageUrl
      varietal
      winery
    }
  }
`

export const fetchWinesByVintage = gql`
  query wines($vintage: String!) {
    wines(vintage: $vintage) {
      id
      name
      imageUrl
      varietal
      winery
    }
  }
`

export const fetchWinesByRegion = gql`
  query wines($region: String!) {
    wines(region: $region) {
      id
      name
      imageUrl
      varietal
      winery
    }
  }
`

export const fetchWine = gql`
  query wines($id: String!) {
    wines(id: $id) {
      name
      winery
      vintage
      price
      varietal
      description
      imageUrl
      region
    }
  }
`
