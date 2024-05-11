The lab exercises are completed in the labMoviesApp branch

Assignment two is on master branch

Features include:
- Popular movies list view
- Upcoming movies list view
- Added actors images/link carousel to movie details page using [react slick library](https://react-slick.neostack.com/)
- Actor's movies list that is accessible by clicking the actor's card in a movie details page 
- TV series list view
- TV series details page
- Favorite TV series list view (persisted with it's own context)
- Added filtering by average vote for homepage list view
- Added form for creating your own fantasy movie
- Movie review page/ form
- A movie's reviews are enriched with user submitted ones

- Pagination for list view pages
- Multi criteria search: Movie search form with appropriate controls/ list view for search result
- Backend Auth API integration (login page/form with context for logged in user - shows username in header)

- Submitting a review persists the movie review to DynamoDB
- Frontend CDN deployment to AWS (CloudFront)
- Deployment of frontend and backend to AWS with custom domain
- Fullstack deployment - (Automated) Backend Auth and App API integration? The frontend and backend are deployed as part of the cdk deploy and linked correctly to one another

- The user's fantasy movies are saved and read from DynamoDb / AWS lambda
  - Only shown after 'login' (under the create fantasy movie form)
  - Movies are rendered into a MUI table
