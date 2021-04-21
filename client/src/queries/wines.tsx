import { gql } from '@apollo/client'

export const fetchAllWines = gql`
  {
    wines {
      id
      name
      vintage
      varietal
      image
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

export const fetchWinesByGrape = gql`
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

export const fetchWinesByVintage = gql`
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
