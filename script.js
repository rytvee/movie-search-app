const BACKEND_URL = 'https://movie-search-api-pi.vercel.app/api/search';

function searchMovies() {
  const query = document.getElementById('searchInput').value;
  const url = `${BACKEND_URL}?query=${encodeURIComponent(query)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const results = document.getElementById('results');
      results.innerHTML = '';

      if (data.results.length === 0) {
        results.innerHTML = '<p>No movies found.</p>';
        return;
      }

      data.results.forEach(movie => {
        const poster = movie.poster_path
          ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
          : 'https://via.placeholder.com/300x450?text=No+Image';

        const movieCard = document.createElement('div');
        movieCard.className = 'movie';

        movieCard.innerHTML = `
          <div class="movie-image">
            <img src="${poster}" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/300x450?text=No+Image';">
          </div>
          <div class="movie-content">
            <h3>${movie.title}</h3>
            <div class="movie-meta">
              <p>🗓 ${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
              <p>⭐ ${movie.vote_average || 'N/A'}/10</p>
            </div>
          </div>
        `;

        results.appendChild(movieCard);
      });
    })
    .catch(error => {
      document.getElementById('results').innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    });
}

// ✅ Listen for Enter key on the input field
document.getElementById('searchInput').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    searchMovies();
  }
});
