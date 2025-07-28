const BACKEND_URL = 'https://movie-search-api-pi.vercel.app/api/search';

function searchMovies() {
  const query = document.getElementById('searchInput').value;
  const url = `${BACKEND_URL}?query=${encodeURIComponent(query)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const results = document.getElementById('results');
      results.innerHTML = ''; // Clear previous results

      if (!data.results || data.results.length === 0) {
        results.innerHTML = '<p>No movies found.</p>';
        return;
      }

      data.results.forEach(movie => {
        const poster = movie.poster_path
          ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
          : 'https://via.placeholder.com/200x300?text=No+Image';

        const movieCard = document.createElement('div');
        movieCard.className = 'movie';

        movieCard.innerHTML = `
          <img src="${poster}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <p>🗓 ${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
          <p>⭐ ${movie.vote_average}/10</p>
        `;

        results.appendChild(movieCard);
      });
    })
    .catch(error => {
      document.getElementById('results').innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    });
}
