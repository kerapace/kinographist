import {connect} from 'react-redux';
import {getProfile} from '../../actions/user_actions';
import {userRatings, userLikes} from '../../reducers/selectors';
import UserProfile from './user_profile';

const mapStateToProps = (state,ownProps) => {
  const user = state.entities.users[ownProps.match.params.userId];
  return {
    user,
    currentUser: state.entities.users[state.session.currentUserId],
    loggedIn: Boolean(state.session.currentUserId),
    ratings: userRatings(state,!user ? undefined : user.id),
    likes: userLikes(state,!user ? undefined : user.id),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProfile: id => dispatch(getProfile(id)),
})

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);