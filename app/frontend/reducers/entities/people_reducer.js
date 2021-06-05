import { RECEIVE_VERBOSE_FILM_DATA } from "../../actions/film_actions";

const peopleReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
  switch (action.type) {
    case RECEIVE_VERBOSE_FILM_DATA:
      return action.filmData.people;
    default:
      return state;
  }
}

export default peopleReducer;