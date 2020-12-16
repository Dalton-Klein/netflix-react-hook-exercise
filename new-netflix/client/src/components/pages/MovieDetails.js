import React, {useEffect, useState} from 'react'
import {useParams, Link } from 'react-router-dom';
import './MovieDetails.css';

export default function MovieDetails() {
  console.log(useParams());
  const { id } = useParams();
  const [details, setDetails] = useState([]);  
  useEffect( () => {
    getMovieDetails()
    // eslint-disable-next-line 
  },[])

  async function getMovieDetails () {
    let result = await fetch(`https://movied.herokuapp.com/movie/${id}`)
    .then(res => res.json())
    setDetails(result);
    console.log(result)
    return result;
  }
  
  return ( 
    <div>
      <Link to="/">
        <button 
          className="back-button" 
          type="button" 
          name="back">
            back
        </button>
      </Link>
      
      <img src={`https://image.tmdb.org/t/p/w300/${details.backdrop_path}`} alt="no backdrop"/>
      <h2>{details.title}</h2>
      <h3>"{details.tagline}"</h3>
      <p>{details.overview}</p>
    </div>
  )
}
