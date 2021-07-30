import * as UserApiUtil from "../util/user_api_util"

export const RECEIVE_PROFILE_DATA = "RECEIVE_PROFILE_DATA"

export const RECEIVE_USER_DATA = "RECEIVE_USER_DATA";

export const receiveProfileData = (profileData) => ({
  type: RECEIVE_PROFILE_DATA,
  profileData,
});

export const receiveUserData = (userData) => ({
  type: RECEIVE_USER_DATA,
  userData,
});

export const getProfile = id => dispatch => UserApiUtil.getProfile(id).then(profileData => dispatch(receiveProfileData(profileData)));

export const getUserIndex = () => dispatch => UserApiUtil.getIndex().then(userData => dispatch(receiveUserData(userData)));
