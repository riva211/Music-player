"use client"

import { useState } from "react"
import { Container } from "react-bootstrap"
import TrackList from "../components/TrackList"
import SearchBar from "../components/SearchBar"
import "../styles/Pages.scss"

const ForYou = ({ tracks, currentTrack, isPlaying, onPlayTrack, onToggleFavourite, favourites }) => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <Container fluid className="page-container">
      <h1>For You</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <TrackList
        tracks={tracks}
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

export default ForYou

