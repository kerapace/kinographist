import { RECEIVE_FILM } from "../../actions/film_actions";

const peopleReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
  switch (action.type) {
    case RECEIVE_FILM:
      newState = Object.assign({},state);
      Object.values(action.filmData.people).forEach((person => 
        newState[person.id] = person));
      return newState;
    default:
      return state;
  }
}

export default peopleReducer;