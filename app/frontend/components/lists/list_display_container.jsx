import { connect } from 'react-redux';
import { getList } from '../../actions/list_actions';
import { likeList, unlikeList } from '../../actions/like_actions';
import ListDisplay from './list_display';
import { listByListId, userLike } from "../../reducers/selectors";

const mapStateToProps = (state,{match}) => {
  const list = listByListId(state,parseInt(match.params.listId));
  const currentUserId = state.session.currentUserId;
  return {
    loggedIn: Boolean(state.session.currentUserId),
    listUser: state.entities.users[list ? list.userId : undefined],
    currentUser: state.entities.users[currentUserId],
    liked: userLike(state,currentUserId,"List",list ? list.id : undefined),
    list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    like: (listId, userId) => dispatch(likeList(listId,userId)),
    unlike: (listId, userId) => dispatch(unlikeList(listId,userId)),
    getList: (id) => dispatch(getList(id)),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ListDisplay)