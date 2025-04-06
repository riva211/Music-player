# Music Player Application

A modern, responsive music player web application built with React. This application provides a Spotify-like interface for browsing and playing music tracks.


## Features

- 🎵 Browse and play music tracks
- 🎧 Full playback controls (play, pause, skip, volume)
- ❤️ Add tracks to favorites
- 🕰️ View recently played tracks
- 📱 Fully responsive design for all devices
- 🎨 Modern and intuitive UI

## Tech Stack

- React 19
- React Router 7
- React Bootstrap
- SASS for styling
- React Icons

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm (v8 or higher) or yarn

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/music-player.git
cd music-player
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Add Audio Files

Place your audio files in the `src/assets/audio` directory. The application is configured to use the following audio files:

- starboy.mp3
- ghost_stories.mp3
- demons.mp3
- mouth_of_the_river.mp3
- sparks.mp3
- viva_la_vida.mp3
- hymn_for_the_weekend.mp3
- pain.mp3

### 4. Add Album Covers

Place your album cover images in the `public/album-covers` directory. The application is configured to use the following image files:

- starboy.jpg
- ghost_stories.jpg
- demons.jpg
- mouth_of_the_river.jpg
- sparks.jpg
- viva_la_vida.jpg
- hymn_for_the_weekend.jpg
- pain.jpg

### 5. Start the Development Server

```bash
npm start
# or
yarn start
```

This will start the development server at [http://localhost:3000](http://localhost:3000).

### 6. Build for Production

When you're ready to deploy your application:

```bash
npm run build
# or
yarn build
```

This will create an optimized production build in the `build` directory.

## Project Structure

```
music-player/
├── public/                  # Public assets
│   ├── album-covers/        # Album cover images
│   └── index.html           # HTML template
├── src/                     # Source code
│   ├── assets/              # Assets
│   │   ├── audio/           # Audio files
│   │   └── logo.png         # App logo
│   ├── components/          # React components
│   │   ├── NowPlaying.jsx   # Currently playing track
│   │   ├── Player.jsx       # Audio player controls
│   │   ├── SearchBar.jsx    # Search functionality
│   │   ├── Sidebar.jsx      # Navigation sidebar
│   │   └── TrackList.jsx    # List of tracks
│   ├── data/                # Data files
│   │   └── musicData.js     # Track information
│   ├── pages/               # Page components
│   │   ├── Favourites.jsx   # Favorite tracks page
│   │   ├── ForYou.jsx       # Recommended tracks page
│   │   ├── RecentlyPlayed.jsx # Recently played page
│   │   └── TopTracks.jsx    # Top tracks page
│   ├── styles/              # SCSS style files
│   │   ├── App.scss         # Main app styles
│   │   ├── NowPlaying.scss  # Now playing styles
│   │   ├── Pages.scss       # Page-specific styles
│   │   ├── Player.scss      # Player controls styles
│   │   ├── SearchBar.scss   # Search bar styles
│   │   ├── Sidebar.scss     # Sidebar styles
│   │   └── TrackList.scss   # Track list styles
│   ├── utils/               # Utility functions
│   │   └── colorExtractor.js # Extract colors from images
│   ├── App.js               # Main App component
│   ├── index.js             # Entry point
│   └── index.css            # Global styles
├── .gitignore               # Git ignore file
├── package.json             # Project dependencies
└── README.md                # Project documentation
```

## Available Scripts

In the project directory, you can run:

### `npm start` or `yarn start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm test` or `yarn test`

Launches the test runner in interactive watch mode.

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.

### `npm run eject` or `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time.

## Customization

### Adding New Tracks

To add new tracks, edit the `src/data/musicData.js` file and add new entries following the existing format:

```javascript
{
  id: 9,
  title: "Your Track Title",
  thumbnail: "/album-covers/your_track_image.jpg",
  musicUrl: yourTrackImport,
  duration: "3:45",
  artistName: "Artist Name",
  popularity: 80,
}
```

Don't forget to import your audio file at the top of the file:

```javascript
import yourTrackImport from '../assets/audio/your_track_file.mp3';
```

### Styling

The application uses SCSS for styling. You can customize the look and feel by editing the files in the `src/styles` directory.



## Acknowledgments

- Icons provided by [React Icons](https://react-icons.github.io/react-icons/)
- UI components from [React Bootstrap](https://react-bootstrap.github.io/)
