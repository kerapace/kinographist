import * as LikeApiUtil from "../util/like_api_util";

export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const DELETE_LIKE = "DELETE_LIKE";

export const receiveLike = (like) => ({
  type: "RECEIVE_LIKE",
  like,
});

export const deleteLike = (likeId) => ({
  type: "DELETE_LIKE",
  likeId,
});

export const likeFilm = (filmId,userId) => dispatch => LikeApiUtil.likeFilm(filmId,userId).then(like => dispatch(receiveLike(like)));

export const unlikeFilm = (filmId,userId) => dispatch => LikeApiUtil.unlikeFilm(filmId,userId).then(like => dispatch(deleteLike(like.id)));

export const likeReview = (reviewId,userId) => dispatch => LikeApiUtil.likeReview(reviewId,userId).then(like => dispatch(receiveLike(like)));

export const unlikeReview = (reviewId,userId) => dispatch => LikeApiUtil.unlikeReview(reviewId,userId).then(like => dispatch(deleteLike(like.id)));

export const likeList = (listId,userId) => dispatch => LikeApiUtil.likeList(listId,userId).then(like => dispatch(receiveLike(like)));

export const unlikeList = (listId,userId) => dispatch => LikeApiUtil.unlikeList(listId,userId).then(like => dispatch(deleteLike(like.id)));