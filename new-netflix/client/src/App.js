import './App.css';
import React, { useState, useEffect } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieContainer from './components/MovieContainer';
import MovieDetails from './components/pages/MovieDetails';
import {fetchDiscoveryMovies, fetchAllMovies, fetchCatList } from './services/movieService'

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
    // eslint-disable-next-line 
  },[])

  useEffect ( () => {
    myList.forEach(movie => {
      return refreshListsAfterFav(movie);
    })
    // eslint-disable-next-line 
  },[isLoaded])

  useEffect(() => {
    localStorage.setItem('saved-myList', JSON.stringify(myList))
    //console.log('Saved To Local Storage!');
  },[myList]);

  async function grabMovies () {
    const getDiscoverMovies = await fetchDiscoveryMovies();
    const catList = await fetchCatList();
    setGenres(catList);   
    let tempMovies = await getAllMovies (catList);

    // console.log('tempMovies', typeof tempMovies[0])

    const uniqueMovies = Array.from(new Set(tempMovies.map(a => a.id)))
      .map(id => {
        return tempMovies.find(a => a.id === id)
      })
    setCategoryMovies(uniqueMovies);
    setDiscoveryMovies(getDiscoverMovies);
    setIsLoaded(true); // this then triggers the second useEffect
  }

  async function getAllMovies (genres) {
    let movies = await Promise.all(genres.map(genre => {
      return fetchAllMovies(genre.id)
    }));
    return movies.flat();
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
    <Router>
      <Switch>
        <Route path="/details/:id" component={MovieDetails}></Route>
        <Route path="/">
          <SearchBar />
          <div className="spacer" />
          {!!myList.length && favComp}
          <MovieContainer 
            discoveryMovies= {discoveryMovies}
            genres= {genres} 
            allMovies={categoryMovies}
            onClick={id => handleClick(id)}
          />
        </Route>
      </Switch>
      
    </Router>
    )
  }
} 