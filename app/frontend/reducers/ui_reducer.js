import {TOGGLE_CREATE_LIST_MODAL, TOGGLE_SIGNUP_MODAL} from "../actions/ui_actions";
import {RECEIVE_CURRENT_USER} from "../actions/session_actions";
import {TOGGLE_REVIEW_MODAL} from "../actions/ui_actions";

const initialState = {
  signupModalDisplay: false,
  reviewModalDisplay: false,
  createListModalDisplay: false,
}

const uiReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = {};
  switch(action.type) {
    case TOGGLE_SIGNUP_MODAL:
      newState = Object.assign({},state);
      newState.signupModalDisplay = !newState.signupModalDisplay;
      return newState;
    case TOGGLE_REVIEW_MODAL:
      newState = Object.assign({},state);
      newState.reviewModalDisplay = !newState.reviewModalDisplay;
      return newState;
    case TOGGLE_CREATE_LIST_MODAL:
      newState = Object.assign({}, state);
      newState.createListModalDisplay = !newState.createListModalDisplay;
      return newState;
    case RECEIVE_CURRENT_USER:
      newState.signupModalDisplay = false;
      return newState;
    default:
      return state;
  }
};

export default uiReducer;