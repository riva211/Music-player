"use client"

import { useState, useEffect, useRef } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import ForYou from "./pages/ForYou"
import TopTracks from "./pages/TopTracks"
import Favourites from "./pages/Favourites"
import RecentlyPlayed from "./pages/RecentlyPlayed"
import NowPlaying from "./components/NowPlaying"
import { musicData } from "./data/musicData"
import "./styles/App.scss"
import { Container, Row, Col } from "react-bootstrap"
import { extractColors } from "./utils/colorExtractor"

function App() {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [favourites, setFavourites] = useState([])
  const [recentlyPlayed, setRecentlyPlayed] = useState([])
  const [bgGradient, setBgGradient] = useState("linear-gradient(to bottom, #121212, #000000)")
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(new Audio())

  // Load favourites from localStorage
  useEffect(() => {
    const storedFavourites = localStorage.getItem("favourites")
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites))
    }

    const storedRecentlyPlayed = sessionStorage.getItem("recentlyPlayed")
    if (storedRecentlyPlayed) {
      setRecentlyPlayed(JSON.parse(storedRecentlyPlayed))
    }

    // Set default track
    if (musicData.length > 0) {
      setCurrentTrack(musicData[1]) // Set to Ghost Stories by default
    }

    return () => {
      audioRef.current.pause()
    }
  }, [])

  // Update audio source when current track changes
  useEffect(() => {
    if (currentTrack) {
      audioRef.current.src = currentTrack.musicUrl
      audioRef.current.load()

      if (isPlaying) {
        audioRef.current.play()
      }

      // Extract colors from thumbnail
      extractColors(currentTrack.thumbnail).then((colors) => {
        setBgGradient(`linear-gradient(to bottom, #0f1722, #0a0e14)`)
      })

      // Add to recently played
      addToRecentlyPlayed(currentTrack)
    }
  }, [currentTrack])

  // Handle play/pause
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      playNext()
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  const addToRecentlyPlayed = (track) => {
    const updatedRecent = [track, ...recentlyPlayed.filter((t) => t.id !== track.id)].slice(0, 10)
    setRecentlyPlayed(updatedRecent)
    sessionStorage.setItem("recentlyPlayed", JSON.stringify(updatedRecent))
  }

  const toggleFavourite = (track) => {
    let updatedFavourites
    if (favourites.some((fav) => fav.id === track.id)) {
      updatedFavourites = favourites.filter((fav) => fav.id !== track.id)
    } else {
      updatedFavourites = [...favourites, track]
    }
    setFavourites(updatedFavourites)
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites))
  }

  const playTrack = (track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const playNext = () => {
    const currentIndex = musicData.findIndex((track) => track.id === currentTrack.id)
    const nextIndex = (currentIndex + 1) % musicData.length
    setCurrentTrack(musicData[nextIndex])
    setIsPlaying(true)
  }

  const playPrevious = () => {
    const currentIndex = musicData.findIndex((track) => track.id === currentTrack.id)
    const prevIndex = (currentIndex - 1 + musicData.length) % musicData.length
    setCurrentTrack(musicData[prevIndex])
    setIsPlaying(true)
  }

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration
    setCurrentTime(newTime)
    audioRef.current.currentTime = newTime
  }

  return (
    <Router>
      <div className="app-container" style={{ background: bgGradient }}>
        <Container fluid className="p-0">
          <Row className="g-0">
            <Col xs={12} sm={3} md={2} lg={2} className="sidebar-container">
              <Sidebar />
            </Col>

            {/* Main content area */}
            <Col xs={12} sm={9} md={10} lg={10} className="main-area">
              <Row className="g-0">
                {/* Content section */}
                <Col xs={12} md={7} lg={8} className="content-container">
                  <Routes>
                    <Route path="/" element={<Navigate to="/for-you" />} />
                    <Route
                      path="/for-you"
                      element={
                        <ForYou
                          tracks={musicData}
                          currentTrack={currentTrack}
                          isPlaying={isPlaying}
                          onPlayTrack={playTrack}
                          onToggleFavourite={toggleFavourite}
                          favourites={favourites}
                        />
                      }
                    />
                    <Route
                      path="/top-tracks"
                      element={
                        <TopTracks
                          tracks={musicData}
                          currentTrack={currentTrack}
                          isPlaying={isPlaying}
                          onPlayTrack={playTrack}
                          onToggleFavourite={toggleFavourite}
                          favourites={favourites}
                        />
                      }
                    />
                    <Route
                      path="/favourites"
                      element={
                        <Favourites
                          tracks={favourites}
                          currentTrack={currentTrack}
                          isPlaying={isPlaying}
                          onPlayTrack={playTrack}
                          onToggleFavourite={toggleFavourite}
                          favourites={favourites}
                        />
                      }
                    />
                    <Route
                      path="/recently-played"
                      element={
                        <RecentlyPlayed
                          tracks={recentlyPlayed}
                          currentTrack={currentTrack}
                          isPlaying={isPlaying}
                          onPlayTrack={playTrack}
                          onToggleFavourite={toggleFavourite}
                          favourites={favourites}
                        />
                      }
                    />
                  </Routes>
                </Col>

                {/* Now playing section */}
                <Col xs={12} md={5} lg={4} className="now-playing-container">
                  <NowPlaying
                    track={currentTrack}
                    isPlaying={isPlaying}
                    onTogglePlayPause={togglePlayPause}
                    onNext={playNext}
                    onPrevious={playPrevious}
                    currentTime={currentTime}
                    duration={duration}
                    onProgressChange={handleProgressChange}
                    onToggleFavourite={toggleFavourite}
                    favourites={favourites}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  )
}

export default App

