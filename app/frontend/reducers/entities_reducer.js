import {combineReducers} from "redux";
import usersReducer from "./entities/users_reducer";
import filmsReducer from "./entities/films_reducer";
import filmCrewReducer from "./entities/film_crew_reducer";
import peopleReducer from "./entities/people_reducer";
import reviewsReducer from "./entities/reviews_reducer";
import likesReducer from "./entities/likes_reducer";
import listsReducer from "./entities/lists_reducer";
import listElementsReducer from "./entities/list_elements_reducer"

export default combineReducers({
  users: usersReducer,
  reviews: reviewsReducer,
  films: filmsReducer,
  filmCrew: filmCrewReducer,
  people: peopleReducer,
  likes: likesReducer,
  lists: listsReducer,
  listElements: listElementsReducer,
});