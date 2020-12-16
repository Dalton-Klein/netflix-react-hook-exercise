import React  from 'react'
import MovieList from './MovieList';
import './MovieContainer.css';

export default function  MovieContainer (props) {
  // render several movieLists depending on category
  const listCategories = props.genres
  // eslint-disable-next-line 
    .map((category) => {
      let filteredList = props.allMovies
        .filter(movie => {
          return movie.genres.includes(category.id)
        })
      if (filteredList.length){
        return <MovieList 
        key = {category.id} 
        title = {category.name} 
        moviesList={filteredList}
        onClick= {(id) => props.onClick(id)}
        />
      }
      }
    )

  return (
    <>
      <MovieList 
      title = 'Discover'
      moviesList = {props.discoveryMovies}
      onClick= {(id) => props.onClick(id)}
      />
      {listCategories};
    </>
  )
  
}
