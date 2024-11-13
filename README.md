# Game Scout 🎮
Game Scout is a web application designed for gaming enthusiasts, making it easy to explore popular games and view download options such as Xbox Game Pass and Torrent links. Leveraging the RAWG API and web scraping techniques.

## Features 🚀
* **Game Discovery:** Lists popular games using API and web scraping methods, providing a wide range of content for users.
* **Game Search and Sorting:** Search for games by title, genre, release year, and popularity, and sort them by various criteria.
* **Detailed Game Information:** Offers descriptions, screenshots, platforms, scores, achievements and more details for selected games.
* **Xbox Game Pass and Torrent Links:** Automatically fetches Xbox Game Pass and Torrent links for games using web scraping and stores them in the database.
* **Screenshots and Videos:** Integrated with the RAWG API to display visual content for games.

## Technologies Used 🛠
* **Next.js and TypeScript**: Modern, type-safe frameworks for building the application's user interface.
* **Tailwind CSS:** Simplifies the styling process, providing quick and flexible design options.
* **PostgreSQL:** Reliable database for storing game data and URL links.
* **RAWG API:** Third-party API providing data on popular games, descriptions, release dates, and more.
* **Web Scraping (Python):** Fetches Xbox Game Pass and Torrent links automatically from websites.
* **Node.js and SQL Queries:** Handles database operations and queries for game information in PostgreSQL.

##  Setup 🖥️
To run the project locally, follow these steps:
1. Clone this repository:
```text
git clone https://github.com/demirelakif/game-scout.git
```
2. Install necessary dependencies:
```text
npm install
```
3. Configure PostgreSQL and populate the .env file as shown:
```text
RAWG_API_KEY=your_rawg_api_key

POSTGRES_URL=postgres://your_postgres_user:your_postgres_password@localhost:5432/game_scout
POSTGRES_PRISMA_URL=postgres://your_postgres_user:your_postgres_password@localhost:5432/game_scout
POSTGRES_URL_NO_SSL=postgres://your_postgres_user:your_postgres_password@localhost:5432/game_scout?sslmode=disable
POSTGRES_URL_NON_POOLING=postgres://your_postgres_user:your_postgres_password@localhost:5432/game_scout?connection_limit=1

POSTGRES_USER=your_postgres_user
POSTGRES_HOST=localhost
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DATABASE=game_scout

```
4. Start the application:
```text
npm run dev
```

# Usage 📖
* When launched, the app displays a list of popular games by default.
* Use the search bar to look up games by title and sort them by different criteria.
* Click on a game to view more detailed information on its detail page.
* If GamePass or Torrent links are available, they will be accessible directly.




