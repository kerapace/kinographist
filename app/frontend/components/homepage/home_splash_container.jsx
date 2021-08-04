import {connect} from 'react-redux';
import {getFilmByTmdbId} from '../../actions/film_actions';
import {toggleSignupModal} from '../../actions/ui_actions';
import HomeSplash from './home_splash';

const mapStateToProps = (state,ownProps) => ({
  splashHeaderFilm: Object.values(state.entities.films).find(film => ownProps.tmdbId === film.tmdbId),
  loggedIn: !!state.session.currentUserId,
  user: state.entities.users[state.session.currentUserId],
});

const mapDispatchToProps = (dispatch) => ({
  getFilm: (id) => dispatch(getFilmByTmdbId(id)),
  toggleSignupModal: () => dispatch(toggleSignupModal()),
});

export default connect(mapStateToProps,mapDispatchToProps)(HomeSplash);