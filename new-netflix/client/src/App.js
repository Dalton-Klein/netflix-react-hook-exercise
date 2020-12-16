// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'
import MovieList from './components/MovieList';
import MovieContainer from './components/MovieContainer';
import {fetchMovies, fetchCategories, fetchCatList } from './services/movieService'

export default function App () {

  const [isLoaded, setIsLoaded] = useState(false);
  const [discoveryMovies, setDiscoveryMovies] = useState([]);
  const [categoryMovies, setCategoryMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [myList, setMyList] = useState([]);

  useEffect(  () => {
    grabMovies();
    const data = localStorage.getItem('saved-myList');
    if (data) {
      setMyList(JSON.parse(data));
    }
  },[])

  useEffect ( () => {
    myList.forEach(movie => {
      console.log('inforEach')
      return refreshListsAfterFav(movie);
    })
  },[isLoaded])

  useEffect(() => {
    localStorage.setItem('saved-myList', JSON.stringify(myList))
    //console.log('Saved To Local Storage!');
  },[myList]);

  async function grabMovies () {
    const getDiscoverMovies = await fetchMovies();
    //loop and await for all categories
    const getCategoryMovies = await fetchCategories();
    const catList = await fetchCatList()
    setDiscoveryMovies(getDiscoverMovies);
    setCategoryMovies(getCategoryMovies);
    setGenres(catList);
    setIsLoaded(true); // this then triggers the second useEffect
  }

  function updateMoviesList (list, myFavMovie) {
    let newMovies = list.slice();
    for (let movie = 0; movie < newMovies.length; movie++) {
      if (newMovies[movie].id === myFavMovie.id) {
        newMovies[movie].favorited = !newMovies[movie].favorited;
      } 
    }
    return newMovies;
  }
  
  function updateFavList(myFav) {
    if (!myFav.favorited) return [...myList, myFav];
    else return myList.filter(movie => movie.id !== myFav.id);
  }

  function handleClick(myFavMovie) {
    const updateFaves = updateFavList(myFavMovie);
    refreshListsAfterFav(myFavMovie);
    setMyList(updateFaves);
  }

  function refreshListsAfterFav (movie) {
    const updatedMovies = updateMoviesList(discoveryMovies, movie);
    const updatedCatMovies = updateMoviesList(categoryMovies, movie);
    setDiscoveryMovies(updatedMovies);
    setCategoryMovies(updatedCatMovies);
  }

  const favComp = 
    <MovieList 
      title = 'My List' 
      moviesList={myList}
      onClick= {id => handleClick(id)}
    />;
    
  if (!isLoaded) return (<div>LOADING...</div>)
  else {
    return (
      <>
      {!!myList.length && favComp}
      <MovieContainer 
      discoveryMovies= {discoveryMovies}  //movies
      genres= {genres} //catList
      allMovies={categoryMovies}
      onClick={id => handleClick(id)}
      />
    </>
    )
  }
}