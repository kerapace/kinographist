import {combineReducers} from "redux";
import usersReducer from "./entities/users_reducer";
import filmsReducer from "./entities/films_reducer";
import filmCrewReducer from "./entities/film_crew_reducer";
import peopleReducer from "./entities/people_reducer";
import reviewsReducer from "./entities/reviews_reducer";

export default combineReducers({
  users: usersReducer,
  reviews: reviewsReducer,
  films: filmsReducer,
  filmCrew: filmCrewReducer,
  people: peopleReducer,
});