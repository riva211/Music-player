"use client"

import { useState, useEffect } from "react"
import { Row, Col, Button } from "react-bootstrap"
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaBars } from "react-icons/fa"
import "../styles/Player.scss"

const Player = ({
  track,
  isPlaying,
  onTogglePlayPause,
  onNext,
  onPrevious,
  audioRef,
  onToggleSidebar,
  showSidebarToggle,
}) => {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(80)

  useEffect(() => {
    const audio = audioRef.current

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      onNext()
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [audioRef, onNext])

  useEffect(() => {
    audioRef.current.volume = volume / 100
  }, [volume, audioRef])

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0")
    return `${minutes}:${seconds}`
  }

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration
    setCurrentTime(newTime)
    audioRef.current.currentTime = newTime
  }

  const handleVolumeChange = (e) => {
    setVolume(Number.parseInt(e.target.value))
  }

  if (!track) return null

  return (
    <div className="player">
      <Row className="align-items-center">
        {showSidebarToggle && (
          <Col xs={1}>
            <Button variant="link" className="sidebar-toggle" onClick={onToggleSidebar}>
              <FaBars />
            </Button>
          </Col>
        )}
        <Col xs={showSidebarToggle ? 3 : 4} md={3} className="track-info">
          <img src={track.thumbnail || "/placeholder.svg"} alt={track.title} className="track-thumbnail" />
          <div className="track-details">
            <div className="track-title">{track.title}</div>
            <div className="track-artist">{track.artistName}</div>
          </div>
        </Col>
        <Col xs={showSidebarToggle ? 5 : 5} md={6} className="player-controls">
          <div className="controls-buttons">
            <button onClick={onPrevious} className="control-btn">
              <FaStepBackward />
            </button>
            <button onClick={onTogglePlayPause} className="control-btn play-btn">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={onNext} className="control-btn">
              <FaStepForward />
            </button>
          </div>
          <div className="progress-container">
            <span className="time">{formatTime(currentTime)}</span>
            <input
              type="range"
              className="progress-slider"
              value={(currentTime / duration) * 100 || 0}
              onChange={handleProgressChange}
              min="0"
              max="100"
            />
            <span className="time">{formatTime(duration)}</span>
          </div>
        </Col>
        <Col xs={3} md={3} className="volume-control">
          <FaVolumeUp className="volume-icon" />
          <input
            type="range"
            className="volume-slider"
            value={volume}
            onChange={handleVolumeChange}
            min="0"
            max="100"
          />
        </Col>
      </Row>
    </div>
  )
}

export default Player

