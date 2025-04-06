"use client"
import { useState, useRef } from "react"
import {  Overlay, Popover } from "react-bootstrap"
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaEllipsisH, FaHeart } from "react-icons/fa"
import "../styles/NowPlaying.scss"

const NowPlaying = ({
  track,
  isPlaying,
  onTogglePlayPause,
  onNext,
  onPrevious,
  currentTime,
  duration,
  onProgressChange,
  onToggleFavourite,
  favourites = [],
}) => {
  const [showOptions, setShowOptions] = useState(false)
  const optionsButtonRef = useRef(null)

  if (!track) return null

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0")
    return `${minutes}:${seconds}`
  }

  const progressPercentage = (currentTime / duration) * 100 || 0

  const isTrackFavourite = () => {
    return favourites.some((fav) => fav.id === track.id)
  }

  const handleToggleFavourite = () => {
    onToggleFavourite(track)
    setShowOptions(false)
  }

  return (
    <div className="now-playing">
      <div className="track-info">
        <h2>{track.title}</h2>
        <p>{track.artistName}</p>
      </div>

      <div className="album-art-container">
        <img src={track.thumbnail || "/placeholder.svg"} alt={track.title} className="album-art" />
      </div>

      <div className="progress-container">
        <div className="time-display">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <input
          type="range"
          className="progress-slider"
          value={progressPercentage}
          onChange={onProgressChange}
          min="0"
          max="100"
        />
      </div>

      <div className="controls">
        <button
          className="control-btn options-btn"
          onClick={() => setShowOptions(!showOptions)}
          ref={optionsButtonRef}
        >
          <FaEllipsisH />
        </button>

        <Overlay
          show={showOptions}
          target={optionsButtonRef.current}
          placement="top"
          rootClose
          onHide={() => setShowOptions(false)}
        >
          <Popover className="options-popover">
            <Popover.Body>
              <button
                className={`option-item ${isTrackFavourite() ? 'favourite' : ''}`}
                onClick={handleToggleFavourite}
              >
                <FaHeart className="option-icon" />
                <span>{isTrackFavourite() ? "Remove from Favourites" : "Add to Favourites"}</span>
              </button>
            </Popover.Body>
          </Popover>
        </Overlay>

        <button className="control-btn" onClick={onPrevious}>
          <FaStepBackward />
        </button>
        <button className="control-btn play-btn" onClick={onTogglePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className="control-btn" onClick={onNext}>
          <FaStepForward />
        </button>
        <button className="control-btn volume-btn">
          <FaVolumeUp />
        </button>
      </div>
    </div>
  )
}

export default NowPlaying

