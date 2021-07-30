import {RECEIVE_CURRENT_USER} from '../../actions/session_actions';
import {RECEIVE_VERBOSE_FILM_DATA} from "../../actions/film_actions";
import {RECEIVE_VERBOSE_REVIEW_DATA, RECEIVE_REVIEWS} from "../../actions/review_actions";
import {RECEIVE_PROFILE_DATA, RECEIVE_USER_DATA} from "../../actions/user_actions";
import { RECEIVE_LIST_DATA } from '../../actions/list_actions';

const usersReducer = (state = {}, action) => {
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
    case RECEIVE_PROFILE_DATA:
      newState = Object.assign({},state);
      Object.values(action.profileData.users).forEach(user =>(
        newState[user.id] = user
      ));
      return newState;
    case RECEIVE_LIST_DATA:
      newState = Object.assign({},state);
      Object.values(action.listData.users).forEach(user =>(
        newState[user.id] = user
      ));
      return newState;
    case RECEIVE_USER_DATA:
      newState = Object.assign({},state);
      Object.values(action.userData.users).forEach(user => 
        newState[user.id] = user
      );
      return newState;
    default:
      return state;
  }
}

export default usersReducer;