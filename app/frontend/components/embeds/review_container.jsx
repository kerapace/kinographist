import {likeReview, unlikeReview} from "../../actions/like_actions";
import {userLike} from '../../reducers/selectors';
import {connect} from 'react-redux';
import Review from './review';

const mapStateToProps = (state,{review}) => {
  const currentUser = state.entities.users[state.session.currentUserId];
    return {
    loggedIn: Boolean(currentUser),
    currentUser: currentUser,
    userLike: userLike(state,currentUser ? currentUser.id : null,"Review",review.id),
  };
};

const mapDispatchToProps = (dispatch) => ({
  like: (reviewId, userId) => dispatch(likeReview(reviewId,userId)),
  unlike: (reviewId, userId) => dispatch(unlikeReview(reviewId,userId)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Review);