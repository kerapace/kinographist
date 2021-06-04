import { RECEIVE_FILM } from "../../actions/film_actions";

const filmCrewReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
  switch (action.type) {
    case RECEIVE_FILM:
      newState = Object.assign({},state);
      Object.values(action.filmData.filmCrew).forEach((credit => 
        newState[credit.id] = credit));
      return newState;
    default:
      return state;
  }
}

export default filmCrewReducer;