# wine_list
A React app using GraphQL and Postgres to display a list of wines and allow user to favorite them

Three components
- React Frontend using Typescript
- GraphQL server to handle querying database
- Postgres relational database

Database
Three Tables
- Wines
    - Name
    - Winery
    - Varietal
    - Vintage
    - Price
    - Description
    - Tasting Notes
- Users (anonymous for now, generate a session id that is stored in local storage)
    - sessionId (session id)
- Favorites
    - sessionId - key of sessionId
    - wineId - id of wine

For orchestration use Docker Compose
    - nginx for ui
    - node for Graphql
    - postgres for db
