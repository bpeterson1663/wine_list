import { gql } from '@apollo/client'

export const fetchAllWines = gql`
    {
        wines{
            id,
            name
        }
    }
`