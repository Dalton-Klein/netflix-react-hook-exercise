
function fetchMovies () {
  return fetch('https://movied.herokuapp.com/discover')
  .then(res => res.json())
  .then( data => data.map( movie => {
    return {id: movie.id, title: movie.title, backdrop_path: movie.backdrop_path, genres: movie.genre_ids, favorited: false}
  }))
  // .then(data => console.log('What is data result: ', data));
}

function fetchCategories () {
  let cats = [28, 12, 13, 35];
  return fetch (`https://movied.herokuapp.com/categories/${cats[0]}`)
  .then(res => res.json())
  .then( data => data.map( movie => {
    return {id: movie.id, title: movie.title, backdrop_path: movie.backdrop_path, genres: movie.genre_ids, favorited: false}
  }))
}

function fetchCatList () {
  return fetch (`https://movied.herokuapp.com/categories`)
  .then(res => res.json())
}


module.exports = {fetchCategories, fetchMovies, fetchCatList }