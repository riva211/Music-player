"use client"

import { useState } from "react"
import { Container } from "react-bootstrap"
import TrackList from "../components/TrackList"
import SearchBar from "../components/SearchBar"
import "../styles/Pages.scss"

const TopTracks = ({ tracks, currentTrack, isPlaying, onPlayTrack, onToggleFavourite, favourites }) => {
  const [searchTerm, setSearchTerm] = useState("")

  // Sort tracks by popularity (we'll use a dummy property for this example)
  const sortedTracks = [...tracks].sort((a, b) => b.popularity - a.popularity)

  return (
    <Container fluid className="page-container">
      <h1>Top Tracks</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <TrackList
        tracks={sortedTracks}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayTrack={onPlayTrack}
        onToggleFavourite={onToggleFavourite}
        favourites={favourites}
        searchTerm={searchTerm}
      />
    </Container>
  )
}

export default TopTracks

