import {connect} from 'react-redux';
import {getFilm} from '../../actions/film_actions';
import {toggleSignupModal} from '../../actions/ui_actions';
import HomeSplash from './home_splash';

const mapStateToProps = ({entities, session},ownProps) => ({
  splashHeaderFilm: entities.films[ownProps.filmId],
  loggedIn: !!session.currentUserId,
  user: entities.users[session.currentUserId],
});

const mapDispatchToProps = (dispatch) => ({
  getFilm: (id) => dispatch(getFilm(id)),
  toggleSignupModal: () => dispatch(toggleSignupModal()),
});

export default connect(mapStateToProps,mapDispatchToProps)(HomeSplash);