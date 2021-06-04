import * as FilmApiUtil from "../util/film_api_util";

export const RECEIVE_FILM = "RECEIVE_FILM";

export const receiveFilm = (filmData) => ({
  type: RECEIVE_FILM,
  filmData,
});

export const getFilm = (id) => (dispatch) => (FilmApiUtil.getFilm(id).then((filmData) => dispatch(receiveFilm(filmData))));