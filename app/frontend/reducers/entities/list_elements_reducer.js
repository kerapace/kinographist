import { RECEIVE_LIST_DATA, DESTROY_LIST, ADD_ITEM_TO_LIST, REMOVE_ITEM_FROM_LIST } from "../../actions/list_actions";
import { RECEIVE_PROFILE_DATA } from "../../actions/user_actions";
import { RECEIVE_VERBOSE_FILM_DATA } from "../../actions/film_actions";

const listElementsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
  switch(action.type) {
    case RECEIVE_PROFILE_DATA:
      Object.values(action.profileData.listElements).forEach(element => 
        newState[element.id] = element);
      return newState;
    case RECEIVE_VERBOSE_FILM_DATA:
      Object.values(action.filmData.listElements).forEach(element => 
        newState[element.id] = element);
      return newState;
    case RECEIVE_LIST_DATA:
      newState = Object.assign({},state);
      Object.values(action.listData.listElements).forEach(element => 
        newState[element.id] = element);
      return newState;
    case ADD_ITEM_TO_LIST:
      newState = Object.assign({},state);
      Object.values(action.elementData.listElements).forEach(element =>
        newState[element.id] = element);
      return newState;
    case REMOVE_ITEM_FROM_LIST:
      newState = Object.assign({},state);
      Object.values(action.elementData.listElements).forEach(element =>
        delete newState[element.id]);
      return newState;
    case DESTROY_LIST:
      return state.filter(element => element.listId !== action.listId);
    default:
      return state;
  }
}

export default listElementsReducer;