export const fetchReview = (id) => ($.ajax({
  url: `api/reviews/${id}`,
  method: `GET`,
}));

export const createReview = (review) => ($.ajax({
  url: `api/reviews`,
  method: `POST`,
  data: {
    review,
  }
}));

export const deleteReview = (id) => ($.ajax({
  url: `api/reviews/${id}`,
  method: `DELETE`,
}));

export const editReview = (review) => ($.ajax({
  url: `api/reviews/`,
  method: `PATCH`,
  data: {
    review,
  },
}))