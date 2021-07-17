import * as UserApiUtil from "../util/user_api_util"

export const RECEIVE_PROFILE_DATA = "RECEIVE_PROFILE_DATA"

export const receiveProfileData = (profileData) => ({
  type: RECEIVE_PROFILE_DATA,
  profileData,
});

export const getProfile = id => dispatch => UserApiUtil.getProfile(id).then(profileData => dispatch(receiveProfileData(profileData)));