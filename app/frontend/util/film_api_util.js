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