import { useState, useEffect, useRef } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { ListGroup, Button } from "react-bootstrap"
import { FaMusic, FaBars, FaTimes, FaHeadphones, FaChartLine, FaHeart, FaHistory } from "react-icons/fa"
import logo from '../assets/logo.png'
import "../styles/Sidebar.scss"
import pro from '../assets/Profile.png'

const Sidebar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const location = useLocation()
  const sidebarRef = useRef(null)
  const mobileSidebarRef = useRef(null)

  const toggleMobileMenu = (e) => {
    // Prevent event from bubbling up to document
    if (e) {
      e.stopPropagation()
    }
    setShowMobileMenu(!showMobileMenu)
  }

  // Close menu when route changes
  useEffect(() => {
    setShowMobileMenu(false)
  }, [location])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showMobileMenu &&
        mobileSidebarRef.current &&
        !mobileSidebarRef.current.contains(event.target) &&
        // Make sure we're not clicking the menu toggle button
        !event.target.closest('.mobile-menu-toggle')
      ) {
        setShowMobileMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    // Add body class to prevent scrolling when menu is open
    if (showMobileMenu) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.classList.remove('menu-open')
    }
  }, [showMobileMenu])

  // Navigation links component - reused for both mobile and desktop
  const NavLinks = ({ onClick, className }) => (
    <ListGroup variant="flush" className={className || "nav-links"}>
      <ListGroup.Item as={NavLink} to="/for-you" className="nav-link" onClick={onClick}>
        <FaHeadphones className="nav-icon" />
        <span>For You</span>
      </ListGroup.Item>
      <ListGroup.Item as={NavLink} to="/top-tracks" className="nav-link" onClick={onClick}>
        <FaChartLine className="nav-icon" />
        <span>Top Tracks</span>
      </ListGroup.Item>
      <ListGroup.Item as={NavLink} to="/favourites" className="nav-link" onClick={onClick}>
        <FaHeart className="nav-icon" />
        <span>Favourites</span>
      </ListGroup.Item>
      <ListGroup.Item as={NavLink} to="/recently-played" className="nav-link" onClick={onClick}>
        <FaHistory className="nav-icon" />
        <span>Recently Played</span>
      </ListGroup.Item>
    </ListGroup>
  )

  return (
    <>
      <div className="sidebar d-none d-sm-block" ref={sidebarRef}>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="sidebar-content">
          <NavLinks />
          <div className="profile-container">
            <img src={pro} alt="Profile" className="profile-image" />
          </div>
        </div>
      </div>

      <div className="mobile-header d-block d-sm-none">
        <Button
          variant="link"
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          <FaBars />
        </Button>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
      </div>

      <div
        className={`mobile-sidebar d-sm-none ${showMobileMenu ? 'open' : ''}`}
        ref={mobileSidebarRef}
      >
        <div className="mobile-sidebar-header">
          <div className="logo">
            <FaMusic className="logo-icon" />
            <span>Spotify</span>
          </div>
          <Button
            variant="link"
            className="close-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Close menu"
          >
            <FaTimes />
          </Button>
        </div>
        <div className="mobile-sidebar-content">
          <NavLinks onClick={() => setShowMobileMenu(false)} className="mobile-nav-links" />
          <div className="profile-container">
            <img src={pro} alt="Profile" className="profile-image" />
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile menu */}
      {showMobileMenu && <div className="mobile-menu-overlay d-sm-none" onClick={() => setShowMobileMenu(false)} />}
    </>
  )
}

export default Sidebar