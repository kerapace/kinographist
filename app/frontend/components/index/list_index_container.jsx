import {connect} from 'react-redux';
import ListIndex from './list_index';
import {getAllLists} from "../../actions/list_actions";
import { allListPreviews } from '../../reducers/selectors';
import { toggleCreateListModal } from '../../actions/ui_actions';

const mapStateToProps = (state) => ({
  lists: allListPreviews(state),
  loggedIn: Boolean(state.session.currentUserId),
});

const mapDispatchToProps = (dispatch) => ({
  getAllLists: () => dispatch(getAllLists()),
  toggleCreateListModal: () => dispatch(toggleCreateListModal()),
});

export default connect(mapStateToProps,mapDispatchToProps)(ListIndex);