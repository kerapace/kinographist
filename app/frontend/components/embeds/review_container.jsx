import {likeReview, unlikeReview} from "../../actions/like_actions";
import {connect} from 'react-redux';
import Review from './review';

const mapStateToProps = ({entities,session}) => ({
  loggedIn: Boolean(session.currentUserId),
  currentUser: entities.users[session.currentUserId],
});

const mapDispatchToProps = (dispatch) => ({
  likeReview: (reviewId, userId) => dispatch(likeReview(reviewId,userId)),
  unlikeReview: (reviewId, userId) => dispatch(unlikeReview(reviewId,userId)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Review);