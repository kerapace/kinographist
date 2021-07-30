import { connect } from "react-redux";
import { getWatchList } from "../../actions/list_actions";
import { listByListId, listWithFilmData, watchList } from "../../reducers/selectors";
import { updateReview } from "../../actions/review_actions";
import { removeItemFromList } from "../../actions/list_actions";
import { toggleReviewModal } from "../../actions/ui_actions";
import WatchListDisplay from "./watch_list_display";

const mapStateToProps = (state,{match}) => {
  const wList = watchList(state,match.params.userId);
  return {
    loggedIn: Boolean(state.session.currentUserId),
    listUser: state.entities.users[match.params.userId],
    currentUser: state.entities.users[state.session.currentUserId],
    list: wList ? listByListId(state,wList.id) : null
  };
};

const mapDispatchToProps = (dispatch) => ({
  getWatchList: (userId) => dispatch(getWatchList(userId)),
  updateReview: (review) => dispatch(updateReview(review)),
  removeItemFromList: (elementId) => dispatch(removeItemFromList(elementId)), 
});

export default connect(mapStateToProps,mapDispatchToProps)(WatchListDisplay);