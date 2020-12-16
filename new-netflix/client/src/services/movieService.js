
function fetchDiscoveryMovies () {
  return fetch('https://movied.herokuapp.com/discover')
  .then(res => res.json())
  .then( data => data.map( movie => {
    return {id: movie.id, title: movie.title, backdrop_path: movie.backdrop_path, genres: movie.genre_ids, favorited: false}
  }))
}

function fetchAllMovies (categoryId) {
  return fetch (`https://movied.herokuapp.com/categories/${categoryId}`)
  .then(res => res.json())
  .then(data => data.filter( movie => movie.backdrop_path))
  .then(data => data.map( movie => {
    return {id: movie.id, title: movie.title, backdrop_path: movie.backdrop_path, genres: movie.genre_ids, favorited: false}
  }))
}

function fetchCatList () {
  return fetch (`https://movied.herokuapp.com/categories`)
  .then(res => res.json())
}

module.exports = {fetchAllMovies, fetchDiscoveryMovies, fetchCatList }