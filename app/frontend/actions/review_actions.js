import * as ReviewApiUtil from "../util/review_api_util";

export const RECEIVE_REVIEWS = "RECEIVE_REVIEWS";
export const RECEIVE_VERBOSE_REVIEW_DATA = "RECEIVE_VERBOSE_REVIEW_DATA";
export const REMOVE_REVIEW = "REMOVE_REVIEW";
export const UPDATE_REVIEW = "UPDATE_REVIEW";

export const receiveReviews = (reviewData) => ({
  type: RECEIVE_REVIEWS,
  reviewData,
});

export const receiveVerboseReviewData = (reviewData) => ({
  type: RECEIVE_VERBOSE_REVIEW_DATA,
  reviewData,
});

export const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  reviewId,
})

export const fetchReview = (id) => (dispatch) =>
  ReviewApiUtil.fetchReview(id).then(reviewData => dispatch(receiveReviews(reviewData)));

export const updateReview = (review) => (dispatch) =>
  ReviewApiUtil.editReview(review).then(reviewData => dispatch(receiveReviews(reviewData)));

// export const createReview = (review) => (dispatch) =>
//   ReviewApiUtil.createReview(review).then(reviewData => dispatch(receiveReviews(reviewData)));

export const deleteReview = (id) => (dispatch) =>
  ReviewApiUtil.deleteReview(id).then(() => dispatch(removeReview(id)));

