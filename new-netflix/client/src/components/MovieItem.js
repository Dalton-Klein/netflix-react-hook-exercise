import React, { useState } from 'react'
import './MovieItem.css';
import addBtn from '../assets/btn-add.svg';
import remvBtn from '../assets/btn-added.svg';

export default function MovieItem (props) {

  const [isShown, setIsShown] = useState(false);

  return (
    <div className="movie-item-card"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <div 
        className="movie-item-title">
        <h4>{props.movie.title}</h4>
      </div>
      <img 
      className="movie-item-img"
      src ={`https://image.tmdb.org/t/p/w300/${props.movie.backdrop_path}`} alt='No Img Available'/>
      {isShown &&
        (<div className="movie-item-button">
          <button onClick={props.onClick}>
            <img src={props.movie.favorited ? remvBtn: addBtn} alt="add button"/>
          </button>
        </div>)
      }
    </div>
  )
  
}
