export const likeReview = (likeableId,userId) => ($.ajax({
  url: `api/likes`,
  method: `POST`,
  data: {
    type: 'review',
    userId,
    likeableId,
  },
}));

export const unlikeReview = (likeableId, userId) => ($.ajax({
  url: `api/likes`,
  method: `DELETE`,
  data: {
    type: 'review',
    userId,
    likeableId,
  },
}));

export const likeFilm = (likeableId, userId) => ($.ajax({
  url: `api/likes`,
  method: `POST`,
  data: {
    type: 'film',
    userId,
    likeableId,
  },
}));

export const unlikeFilm = (likeableId, userId) => ($.ajax({
  url: `api/likes`,
  method: `DELETE`,
  data: {
    type: 'film',
    userId,
    likeableId,
  },
}));