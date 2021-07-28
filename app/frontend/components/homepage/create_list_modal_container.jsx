import {connect} from 'react-redux';
import { toggleCreateListModal } from '../../actions/ui_actions';
import { createList } from '../../actions/list_actions';
import CreateListModal from './create_list_modal';

const mapStateToProps = (state) => ({
  userId: state.session.currentUserId,
  displayed: state.ui.createListModalDisplay
});

const mapDispatchToProps = (dispatch) => ({
  toggleCreateListModal: () => dispatch(toggleCreateListModal()),
  createList: (list,elements) => dispatch(createList(list,elements)),
});

export default connect(mapStateToProps,mapDispatchToProps)(CreateListModal);