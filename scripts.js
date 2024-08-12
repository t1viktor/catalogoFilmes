const apiKey = '35d00deec9faf51d98863abc379712bb';
const apiUrl = 'https://api.themoviedb.org/3';

async function fetchMovies(query = '') {
  const endpoint = query
    ? `${apiUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
    : `${apiUrl}/movie/popular?api_key=${apiKey}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

function displayMovies(movies) {
  const moviesContainer = document.getElementById('moviesContainer');
  moviesContainer.innerHTML = '';

  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.className = 'movie';
    movieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
      <h2>${movie.title}</h2>
      <p>${movie.release_date}</p>
    `;
    moviesContainer.appendChild(movieElement);
  });
}

document.getElementById('searchButton').addEventListener('click', () => {
  const query = document.getElementById('searchInput').value;
  fetchMovies(query);
});

fetchMovies();
