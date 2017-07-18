# Image URL Abstraction Microservice
1. Returns JSON of the image URLs, alt text and page urls for a set of images relating to a given search string (ex./api/cats).
2. Paginate through the responses by adding an offset (ex./api/cats?offset=2) parameter to the URL.
3. Get a list of the most recently submitted search strings by (/recent).

## Dependencies
1. ExpressJS
2. MongoDB (mLab)
3. Dotenv (signup for a Custom Search Engine with Google)
4. Node Google Image Search

## Instructions
1. Make sure to sign up for a Custom Search Engine with Google and add the following to .env file on your project root directory :
```
DB_URL=<insert mongodb URI>
CSE_ID=<insert from google>
CSE_API_KEY=<insert from google>
```

2. Run 'node server.js'

## Author
Neptune Michael Cabelin

## License
MIT