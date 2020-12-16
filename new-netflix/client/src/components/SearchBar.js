import React from 'react'
import logo from '../assets/logo-image.png';
import './SearchBar.css'
// new-netflix/client/src/assets/logo-image.png

export default function SearchBar() {
  return (
    <>
      <nav className="navbar">
        <img 
          className= "logo-image" 
          src={logo} 
          alt="No img found" />
        <input type="text" placeholder="Search movies..." id="search-field" />
      </nav>
    </>
  )
}
