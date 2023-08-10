# OBASEA891_BCL2302_JUSTIN_Obakeng_Eugene_Seabelo_DWA_CAPSTONE
Dynamic Web Apps capstone repo
# Podcast App Readme

## Description
Welcome to the Podcast App project! This is a React-based web application that allows users to browse and explore various podcast shows and episodes. Users can view show previews, search for specific shows, sort shows by different criteria, view show details including episodes, and mark shows as favorites.

## Features
- Show Previews: Users can view a list of show previews, including the title, image, number of seasons, last updated date, and genres of each show.
- Search: Users can search for specific shows by entering keywords in the search bar.
- Sort: Users can sort the list of show previews by title (A-Z or Z-A) or by the date updated (ascending or descending).
- Show Details: When clicking on a show preview, users can view detailed information about the show, including episodes of each season.
- Favorites List: Users can mark shows as favorites and view their favorite shows separately in the Favorites List view.
- Genre Filtering: Users can filter shows based on specific genres.

## Components
1. **App.jsx**: This is the main component that handles the overall application structure and state management. It contains the main logic for fetching show previews, handling search, sorting, and displaying different views based on the user's actions. It uses components such as `Navbar`, `Login`, `ShowPreview`, `FavoritesList`, and `Hero`.

2. **Navbar.jsx**: The `Navbar` component provides the top navigation bar of the application. It includes search functionality, sorting options, and the ability to view the Favorites List. Users can also log in or log out using this component.

3. **ShowPreview.jsx**: The `ShowPreview` component displays a preview of each podcast show, including the show's image, title, number of seasons, last updated date, and genres. It also allows users to view more details about the show, add the show to their favorites, and navigate to the show's episodes.

## Dependencies
- React: This project uses React as the front-end library to build the user interface.
- Supabase: Supabase is used for user authentication.
- Fuse.js: The Fuse.js library is used for fuzzy searching to provide better search results.

## Getting Started
1. Install Node.js and npm (Node Package Manager) on your machine if you haven't already.
2. Clone the project repository to your local machine.
3. Navigate to the project directory and run `npm install` to install the project dependencies.
4. Set up the Supabase client configuration in the `supabaseClient.js` file.
5. Run the application using `npm start`.
6. Open your web browser and go to `http://localhost:3000` to access the Podcast App.

## How to Use the App
1. On the home page, you will see a list of show previews with basic information about each show.
2. Use the search bar to search for specific shows by entering keywords. The search results will be dynamically updated as you type.
3. Use the sorting dropdown to sort the shows by title (A-Z or Z-A) or by the date they were last updated (ascending or descending).
4. Click on a show's image or title to view more details about the show, including its episodes for each season.
5. Click on the "Add to Favorites" button to mark a show as one of your favorites. You can view your favorite shows by clicking the "Favorites List" button in the navigation bar.
6. If you are not logged in, click the "Login" button to log in and gain access to additional features. Once logged in, you can explore the app and interact with it more extensively.

## Important Notes
- The application requires a functional backend to fetch the show previews and details. Make sure the backend server is up and running, and the API endpoints are correctly configured in the `fetchShowPreviews` and `fetchShowDetails` functions in the `data.js` file.

## Contributing
Contributions to this project are welcome! If you have any suggestions, bug fixes, or new features to add, feel free to submit a pull request.

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

Please note that this is a simplified readme for the given code components. You can further expand and customize the readme based on your project's needs, including details about the backend setup, additional features, deployment instructions, and more. Remember to replace the placeholders like `{Your Project Name}` and provide appropriate links and credits if needed.