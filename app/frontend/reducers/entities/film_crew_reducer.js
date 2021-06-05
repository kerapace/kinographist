import { RECEIVE_VERBOSE_FILM_DATA } from "../../actions/film_actions";

const filmCrewReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
  switch (action.type) {
    case RECEIVE_VERBOSE_FILM_DATA:
     return action.filmData.filmCrew;
    default:
      return state;
  }
}

export default filmCrewReducer;