import { RECEIVE_FILM } from "../../actions/film_actions";

const filmsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
  switch (action.type) {
    case RECEIVE_FILM:
      newState = Object.assign({},state);
      Object.values(action.filmData.films).forEach((film => 
        newState[film.id] = film));
      return newState;
    default:
      return state;
  }
}

export default filmsReducer;