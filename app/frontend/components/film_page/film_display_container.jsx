import {connect} from "react-redux";
import {crewListGroupedByRole, filmReviewsWithUserData, listPreviewsByFilmId} from "../../reducers/selectors";
import {getFilm} from "../../actions/film_actions";
import FilmDisplay from "./film_display";

const mapStateToProps = (state, ownProps) => {
  const film = state.entities.films[ownProps.match.params.filmId];
  return {
  film,
  currentUserId: state.session.currentUserId,
  crewHash: crewListGroupedByRole(state),
  reviews: filmReviewsWithUserData(state, !film ? undefined : film.id),
  listPreviews: listPreviewsByFilmId(state,!film ? undefined : film.id)
  }
};

const mapDispatchToProps = (dispatch) => ({
  getFilm: (id) => dispatch(getFilm(id)), 
});

export default connect(mapStateToProps,mapDispatchToProps)(FilmDisplay);