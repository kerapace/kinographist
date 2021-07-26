import { RECEIVE_LIST_DATA, DESTROY_LIST } from "../../actions/list_actions";
import { RECEIVE_PROFILE_DATA } from "../../actions/user_actions";
import { RECEIVE_VERBOSE_FILM_DATA } from "../../actions/film_actions";

const listsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
  switch(action.type) {
    case RECEIVE_PROFILE_DATA:
      Object.values(action.profileData.lists).forEach(list => 
        newState[list.id] = list);
      return newState;
    case RECEIVE_VERBOSE_FILM_DATA:
      Object.values(action.filmData.lists).forEach(list => 
        newState[list.id] = list);
      return newState;
    case RECEIVE_LIST_DATA:
      newState = Object.assign({},state);
      Object.values(action.listData.lists).forEach(list =>
        newState[list.id] = list);
      return newState;
    case DESTROY_LIST:
      newState = Object.assign({},state);
      delete newState[action.listId];
      return newState;
    default:
      return state;
  }
}

export default listsReducer;