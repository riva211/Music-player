"use client"

import { useState } from "react"
import { Container } from "react-bootstrap"
import TrackList from "../components/TrackList"
import SearchBar from "../components/SearchBar"
import "../styles/Pages.scss"

const Favourites = ({ tracks, currentTrack, isPlaying, onPlayTrack, onToggleFavourite, favourites }) => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <Container fluid className="page-container">
      <h1>Favourites</h1>
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
          <p>No favourite tracks yet. Mark some tracks as favourite to see them here.</p>
        </div>
      )}
    </Container>
  )
}

export default Favourites

