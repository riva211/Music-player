"use client"

import { useState } from "react"
import { ListGroup, Dropdown } from "react-bootstrap"
import { FaPlay, FaPause, FaEllipsisH, FaHeart } from "react-icons/fa"
import "../styles/TrackList.scss"

const TrackList = ({
  tracks,
  currentTrack,
  isPlaying,
  onPlayTrack,
  onToggleFavourite,
  favourites,
  searchTerm = "",
}) => {
  const [hoveredTrack, setHoveredTrack] = useState(null)

  const filteredTracks = tracks.filter((track) => track.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const isTrackFavourite = (track) => {
    return favourites.some((fav) => fav.id === track.id)
  }

  return (
    <ListGroup className="track-list">
      {filteredTracks.map((track) => (
        <ListGroup.Item
          key={track.id}
          className={`track-item ${currentTrack && currentTrack.id === track.id ? "active" : ""}`}
          onMouseEnter={() => setHoveredTrack(track.id)}
          onMouseLeave={() => setHoveredTrack(null)}
        >
          <div className="track-item-content">
            <div className="track-thumbnail-container">
              <img src={track.thumbnail || "/placeholder.svg"} alt={track.title} className="track-thumbnail" />
              {(hoveredTrack === track.id || (currentTrack && currentTrack.id === track.id)) && (
                <button className="play-button" onClick={() => onPlayTrack(track)}>
                  {currentTrack && currentTrack.id === track.id && isPlaying ? <FaPause /> : <FaPlay />}
                </button>
              )}
            </div>
            <div className="track-details">
              <div className="track-title">{track.title}</div>
              <div className="track-artist">{track.artistName}</div>
            </div>
            <div className="track-duration">{track.duration}</div>
            <Dropdown className="track-options">
              <Dropdown.Toggle as="div" id={`dropdown-${track.id}`}>
                <FaEllipsisH />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => onToggleFavourite(track)}
                  className={isTrackFavourite(track) ? "favourite" : ""}
                >
                  <FaHeart className="me-2" />
                  {isTrackFavourite(track) ? "Remove from Favourites" : "Add to Favourites"}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </ListGroup.Item>
      ))}
      {filteredTracks.length === 0 && <div className="no-tracks">No tracks found</div>}
    </ListGroup>
  )
}

export default TrackList

