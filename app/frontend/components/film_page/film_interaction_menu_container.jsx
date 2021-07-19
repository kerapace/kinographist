import {connect} from "react-redux";
import {updateReview,deleteReview} from "../../actions/review_actions";
import {toggleReviewModal} from "../../actions/ui_actions";
import {likeFilm,unlikeFilm} from "../../actions/like_actions";
import {userReview, userLike} from "../../reducers/selectors";
import uiReducer from "../../reducers/ui_reducer";
import FilmInteractionMenu from "./film_interaction_menu";

const mapStateToProps = (state,{film}) => {
  const currentUserId = state.session.currentUserId;
  return {
  loggedIn: Boolean(currentUserId),
  currentUser: state.entities.users[currentUserId],
  review: userReview(state,currentUserId,film.id),
  liked: userLike(state,currentUserId,"Film",film.id),
  modalDisplayed: state.ui.reviewModalDisplay
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateReview: (review) => dispatch(updateReview(review)),
  toggleReviewModal: () => dispatch(toggleReviewModal()),
  likeFilm: (userId,filmId) => dispatch(likeFilm(userId,filmId)),
  unlikeFilm: (userId,filmId) => dispatch(unlikeFilm(userId,filmId)),
});

export default connect(mapStateToProps,mapDispatchToProps)(FilmInteractionMenu);