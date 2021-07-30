import {connect} from 'react-redux';
import {getProfile} from '../../actions/user_actions';
import {userRatings, userLikes, listPreviewsByUserId} from '../../reducers/selectors';
import UserProfile from './user_profile';
import { toggleCreateListModal } from '../../actions/ui_actions';

const mapStateToProps = (state,ownProps) => {
  const user = state.entities.users[ownProps.match.params.userId];
  const [ratings, reviews] = userRatings(state, !user ? undefined : user.id);
  debugger
  return {
    user,
    currentUser: state.entities.users[state.session.currentUserId],
    loggedIn: Boolean(state.session.currentUserId),
    ratings,
    reviews,
    listPreviews: listPreviewsByUserId(state,!user ? undefined : user.id),
    likes: userLikes(state,!user ? undefined : user.id),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProfile: id => dispatch(getProfile(id)),
  toggleCreateListModal: () => dispatch(toggleCreateListModal()),
})

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);