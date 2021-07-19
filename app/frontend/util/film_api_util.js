export const fetchFilm = (tmdbId) => ($.ajax({
  url: 'api/films',
  method: 'POST',
  data: {
    tmdbId,
  },
}));

export const updateFilm = (id) => ($.ajax({
  url: `api/films/${id}`,
  method: 'PATCH',
}));

export const getFilm = (id) => ($.ajax({
  url: `api/films/${id}`,
  method: 'GET',
}));

export const getFilmByTmdbId = (tmdbId) => ($.ajax({
  url: `api/films/by_tmdb_id/${tmdbId}`,
  method: 'GET'
}));

export const fetchFilmList = (filter) => ($.ajax({
  url: 'api/browse',
  method: 'GET',
  data: {
    filter,
  },
}))