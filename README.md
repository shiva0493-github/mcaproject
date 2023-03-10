# MCA Podcast Technical Test

To make a podcast SPA based on the information provided in the technical requirements document.

## Objectives
Three main views
1. Homepage
    - Show the list of 100 podcasts
    - Once obtained, the list should be stored on the client side and only called again after one day has passed
    - Live/Immediate Filter for the podcasts based on the Podcast and Author Name
    - Each Podcast is linked to its detail view
2. Podcast Detail View
    - Side Bar with Podcast Image, title, author and description
    - On the right side, Episode Count and the list of Episodes with their title, published date and duration
    - Store the information of each podcast on the client side when it is called for the first time.
    - It should be called again only after a day has passed.
    - Side Bar with Podcast Information should be linked to the podcast detail view.
3. Episode Detail View
    - The same side bar of the podcast information from the podcast detail page
    - The image, title and author should be linked to go to the podcast detail view.
    - The Episode section should have title, description and a basic HTML5 audio player to listen to the podcast.

Header
- The Title 'Podcaster' should be linked to go to the home page.
- Every time there is a navigation from the client side, some visual sign should be there to act as a loader while the information is being loaded.


## External packages needed to install
1. npm install styled-components
2. npm install axios
3. npm install react-router-dom

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


