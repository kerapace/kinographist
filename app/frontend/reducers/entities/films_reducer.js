import { RECEIVE_VERBOSE_FILM_DATA, RECEIVE_FILM_DATA } from "../../actions/film_actions";
import { ADD_ITEM_TO_LIST } from "../../actions/list_actions";
import { RECEIVE_PROFILE_DATA } from "../../actions/user_actions";

const filmsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
  switch (action.type) {
    case RECEIVE_FILM_DATA:
      newState = {};
      !action.filmData.films ? "" : Object.values(action.filmData.films).forEach((film => 
        newState[film.id] = film));
      return newState;
    case RECEIVE_VERBOSE_FILM_DATA:
      newState = Object.assign({},state);
      Object.values(action.filmData.films).forEach((film => 
        newState[film.id] = film));
      return newState;
    case RECEIVE_PROFILE_DATA:
      newState = {};
      Object.values(action.profileData.films).forEach(film =>
        newState[film.id] = film
      );
      return newState;
    case ADD_ITEM_TO_LIST:
      newState = Object.assign({},state)
      Object.values(action.elementData.films).forEach(film =>
        newState[film.id] = film);
      return newState;
    default:
      return state;
  }
}

export default filmsReducer;