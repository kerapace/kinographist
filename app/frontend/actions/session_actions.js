import * as SessionApiUtil from "../util/session_api_util";

export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

export const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user,
});

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

export const receiveSessionErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

export const signup = formUser => dispatch => (
  SessionApiUtil.signup(formUser)
  .then(user => dispatch(receiveCurrentUser(user)),errs => {dispatch(receiveSessionErrors(errs.responseJSON))})
);

export const login = formUser => dispatch => (
  SessionApiUtil.login(formUser)
  .then(user => dispatch(receiveCurrentUser(user)),errs => dispatch(receiveSessionErrors(errs.responseJSON)))
);

export const logout = () => dispatch => (
  SessionApiUtil.logout()
  .then(() => dispatch(logoutCurrentUser()),errs => dispatch(receiveSessionErrors(errs.responseJSON)))
);