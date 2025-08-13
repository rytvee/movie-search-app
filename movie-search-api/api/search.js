export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow access from all origins

  const API_KEY = process.env.TMDB_API_KEY;
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from TMDb' });
  }
}
