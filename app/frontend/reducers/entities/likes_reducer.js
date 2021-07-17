import { RECEIVE_PROFILE_DATA } from "../../actions/user_actions";
import { RECEIVE_VERBOSE_FILM_DATA } from "../../actions/film_actions";

const likesReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
  switch(action.type) {
    case RECEIVE_PROFILE_DATA:
      Object.values(action.profileData.likes).forEach(like => 
        newState[like.id] = like);
      return newState;
    case RECEIVE_VERBOSE_FILM_DATA:
      Object.values(action.filmData.likes).forEach(like => 
        newState[like.id] = like);
      return newState;
    default:
      return state;
  }
}

export default likesReducer;