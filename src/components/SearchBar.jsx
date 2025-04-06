"use client"
import { InputGroup, FormControl } from "react-bootstrap"
import { FaSearch } from "react-icons/fa"
import "../styles/SearchBar.scss"

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar">
      <InputGroup>
        <FormControl
          placeholder="Search Song, Artist"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
      </InputGroup>
    </div>
  )
}

export default SearchBar

