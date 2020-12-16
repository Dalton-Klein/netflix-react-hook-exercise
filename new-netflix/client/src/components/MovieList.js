import React from 'react';
import MovieItem from './MovieItem';
import './MovieList.css';
// import fetchMovies from '../services/movieService'

export default function MovieList (props) {
  const listMovies = props.moviesList
    .map((movie) => <MovieItem 
      key= {movie.id} 
      movie= {movie}
      onClick= {() => props.onClick(movie)} 
      />)

  return (
    <div className="list">
      <h2>{props.title}</h2>
      <div className="movie-list">
        {listMovies}
      </div>
    </div>
  )
  
}
