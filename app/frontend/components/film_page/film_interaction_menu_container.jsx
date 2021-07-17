import {connect} from "react-redux";
import {updateReview,deleteReview} from "../../actions/review_actions";
import {toggleReviewModal} from "../../actions/ui_actions"
import {userReview} from "../../reducers/selectors";
import uiReducer from "../../reducers/ui_reducer";
import FilmInteractionMenu from "./film_interaction_menu";

const mapStateToProps = (state,{film}) => ({
  loggedIn: Boolean(state.session.currentUserId),
  currentUser: state.entities.users[state.session.currentUserId],
  review: userReview(state,state.session.currentUserId,film.id),
  modalDisplayed: state.ui.reviewModalDisplay,
});

const mapDispatchToProps = (dispatch) => ({
  updateReview: (review) => dispatch(updateReview(review)),
  toggleReviewModal: () => dispatch(toggleReviewModal()),
});

export default connect(mapStateToProps,mapDispatchToProps)(FilmInteractionMenu);