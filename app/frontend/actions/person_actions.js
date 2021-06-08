import * as PersonApiUtil from "../util/person_api_util";

export const RECEIVE_PERSON = "RECEIVE_PERSON";

export const receivePerson = (person) => ({
  type: RECEIVE_PERSON,
  person,
})

export const getPerson = id => dispatch => (PersonApiUtil.getPerson(id).then((person) => dispatch(receivePerson(person))));

