import {connect} from "react-redux";
import {crewListGroupedByRole} from "../reducers/selectors";
import {getFilm} from "../actions/film_actions";
import {FilmDisplay} from "../components/film_display";

const mapStateToProps = (state, ownProps) => ({
  film: state.entities.films[ownProps.match.params.filmId],
  crewHash: crewListGroupedByRole(state.entities.filmCrew),
});

const mapDispatchToProps = (dispatch) => ({
  getFilm: (id) => dispatch(getFilm(id)), 
});

export default connect(mapStateToProps,mapDispatchToProps)(FilmDisplay)