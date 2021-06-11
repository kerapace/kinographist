import {RECEIVE_CURRENT_USER} from '../../actions/session_actions';
import {RECEIVE_VERBOSE_FILM_DATA} from "../../actions/film_actions";
import {RECEIVE_VERBOSE_REVIEW_DATA, RECEIVE_REVIEWS} from "../../actions/review_actions";

const usersReducer = (state = {},action) => {
  Object.freeze(state);
  let newState = {};
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      newState = Object.assign({},state);
      newState[action.user.id] = action.user;
      return newState;
    case RECEIVE_VERBOSE_FILM_DATA:
      newState = Object.assign({},state);
      Object.values(action.filmData.users).forEach(user => (
        newState[user.id] = user
      ));
      return newState;
    case RECEIVE_REVIEWS:
      newState = Object.assign({},state);
      Object.values(action.reviewData.users).forEach(user => (
        newState[user.id] = user
      ));
      return newState;
    case RECEIVE_VERBOSE_REVIEW_DATA:
      newState = Object.assign({},state);
      Object.values(action.reviewData.users).forEach(user => (
        newState[user.id] = user
      ));
      return newState;
    default:
      return state;
  }
}

export default usersReducer;