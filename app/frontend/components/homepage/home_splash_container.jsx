import {connect} from 'react-redux';
import {getFilmByTmdbId} from '../../actions/film_actions';
import {toggleSignupModal} from '../../actions/ui_actions';
import HomeSplash from './home_splash';

const mapStateToProps = ({entities, session},ownProps) => ({
  splashHeaderFilm: Object.values(entities.films).find(film => ownProps.tmdbId === film.tmdbId),
  loggedIn: !!session.currentUserId,
  user: entities.users[session.currentUserId],
});

const mapDispatchToProps = (dispatch) => ({
  getFilm: (id) => dispatch(getFilmByTmdbId(id)),
  toggleSignupModal: () => dispatch(toggleSignupModal()),
});

export default connect(mapStateToProps,mapDispatchToProps)(HomeSplash);