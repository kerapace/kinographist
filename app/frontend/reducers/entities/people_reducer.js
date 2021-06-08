import { RECEIVE_VERBOSE_FILM_DATA } from "../../actions/film_actions";
import { RECEIVE_PERSON } from "../../actions/person_actions";

const peopleReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
  switch (action.type) {
    case RECEIVE_VERBOSE_FILM_DATA:
      return action.filmData ? action.filmData.people : {};
    case RECEIVE_PERSON:
      newState = Object.assign({},state);
      action.people.forEach((person) => {
        newState[person.id] = person
      });
    default:
      return state;
  }
}

export default peopleReducer;