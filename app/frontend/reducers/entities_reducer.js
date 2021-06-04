import {combineReducers} from "redux";
import usersReducer from "./entities/users_reducer";
import filmsReducer from "./entities/films_reducer";
import filmCrewReducer from "./entities/film_crew_reducer";
import peopleReducer from "./entities/people_reducer";

export default combineReducers({
  users: usersReducer,
  films: filmsReducer,
  filmCrew: filmCrewReducer,
  people: peopleReducer,
});