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
