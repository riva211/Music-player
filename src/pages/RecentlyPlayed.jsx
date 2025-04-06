"use client"

import { useState } from "react"
import { Container } from "react-bootstrap"
import TrackList from "../components/TrackList"
import SearchBar from "../components/SearchBar"
import "../styles/Pages.scss"

const RecentlyPlayed = ({ tracks, currentTrack, isPlaying, onPlayTrack, onToggleFavourite, favourites }) => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <Container fluid className="page-container">
      <h1>Recently Played</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      {tracks.length > 0 ? (
        <TrackList
          tracks={tracks}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayTrack={onPlayTrack}
          onToggleFavourite={onToggleFavourite}
          favourites={favourites}
          searchTerm={searchTerm}
        />
      ) : (
        <div className="no-tracks-message">
          <p>No recently played tracks. Start playing some music!</p>
        </div>
      )}
    </Container>
  )
}

export default RecentlyPlayed

