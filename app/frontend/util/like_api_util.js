export const likeReview = (likeableId,userId) => ($.ajax({
  url: `api/likes`,
  method: `POST`,
  data: {
    type: 'Review',
    userId,
    likeableId,
  },
}));

export const unlikeReview = (likeableId, userId) => ($.ajax({
  url: `api/likes`,
  method: `DELETE`,
  data: {
    type: 'Review',
    userId,
    likeableId,
  },
}));

export const likeFilm = (likeableId, userId) => ($.ajax({
  url: `api/likes`,
  method: `POST`,
  data: {
    type: 'Film',
    userId,
    likeableId,
  },
}));

export const unlikeFilm = (likeableId, userId) => ($.ajax({
  url: `api/likes`,
  method: `DELETE`,
  data: {
    type: 'Film',
    userId,
    likeableId,
  },
}));