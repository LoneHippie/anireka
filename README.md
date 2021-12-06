# AniReka PWA

[AniReka](https://www.anireka.com) is a PWA for finding detailed information on anime series, movies and music videos that impliments a feature rich search page with the aim of letting users find new series and recommendations. Data is sourced from AniList GraphQL API.

## Technologies Used

**Front End**

- React
- TypeScript
- Sass

**Design Tools**

- Figma

### Project Goals

During this project I managed to learn a lot about effectively utilizing TypeScript in larger codebases and how it can greatly increase workflow productivity through the use of enums and component level interfaces as well as exportable type defintions. I also learned a lot about handling GraphQL data fetching and how it can shine in certain situations where REST might require several nested fetches.

One of the biggest things I learned as a result of building a project this size is how to manage performance through memoizing components and making use of lazyLoad in tandem with suspense to lighten JS payloads on the client side. I also found React Router to be very useful to generate url paths by extracting the unqiue ids from anime entries as variables.