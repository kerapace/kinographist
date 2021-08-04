import * as FilmApiUtil from "../util/film_api_util";

export const RECEIVE_VERBOSE_FILM_DATA = "RECEIVE_VERBOSE_FILM_DATA";
export const RECEIVE_FILM_DATA = "RECEIVE_FILM_DATA";

export const receiveVerboseFilmData = (filmData) => ({
  type: RECEIVE_VERBOSE_FILM_DATA,
  filmData,
});

export const receiveFilmData = (filmData) => ({
  type: RECEIVE_FILM_DATA,
  filmData,
})

export const getFilm = (id) => (dispatch) => (FilmApiUtil.getFilm(id).then((filmData) => dispatch(receiveVerboseFilmData(filmData))));

export const getFilmByTmdbId = id => dispatch => (FilmApiUtil.getFilmByTmdbId(id).then(filmData => dispatch(receiveFilmData(filmData))));

export const getFilms = (filter) => (dispatch) => (FilmApiUtil.fetchFilmList(filter).then((filmData) => dispatch(receiveFilmData(filmData))));