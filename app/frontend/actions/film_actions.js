import * as FilmApiUtil from "../util/film_api_util";

export const RECEIVE_VERBOSE_FILM_DATA = "RECEIVE_VERBOSE_FILM_DATA";

export const receiveFilmVerboseData = (filmData) => ({
  type: RECEIVE_VERBOSE_FILM_DATA,
  filmData,
});

export const getFilm = (id) => (dispatch) => (FilmApiUtil.getFilm(id).then((filmData) => dispatch(receiveFilmVerboseData(filmData))));