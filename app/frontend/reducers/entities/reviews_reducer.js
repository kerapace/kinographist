import {RECEIVE_VERBOSE_FILM_DATA} from "../../actions/film_actions";
import {RECEIVE_REVIEWS, RECEIVE_VERBOSE_REVIEW_DATA, REMOVE_REVIEW} from "../../actions/review_actions";

const reviewsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
  switch(action.type) {
    case RECEIVE_VERBOSE_FILM_DATA:
      newState = Object.assign({},state);
      Object.values(action.filmData.reviews).forEach(review => 
        newState[review.id] = review
      );
      return newState;
    case RECEIVE_REVIEWS:
      newState = Object.assign({},state);
      Object.values(action.reviewData.reviews).forEach(review =>
        newState[review.id] = review
      );
      return newState;
    case RECEIVE_VERBOSE_REVIEW_DATA:
      newState = Object.assign({},state);
      Object.values(action.reviewData.reviews).forEach(review =>
        newState[review.id] = review
      );
      return newState;
    case REMOVE_REVIEW:
      newState = Object.assign({},state);
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
}

export default reviewsReducer;