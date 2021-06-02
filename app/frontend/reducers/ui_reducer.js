import {TOGGLE_SIGNUP_MODAL} from "../actions/ui_actions";

const initialState = {
  signupModalDisplay: false,
}

const uiReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = {};
  switch(action.type) {
    case TOGGLE_SIGNUP_MODAL:
      newState = Object.assign({},state);
      newState.signupModalDisplay = !newState.signupModalDisplay;
      return newState;
    default:
      return state;
  }
};

export default uiReducer;