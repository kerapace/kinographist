import {connect} from 'react-redux';
import UserIndex from './user_index';
import {getUserIndex} from "../../actions/user_actions";
import { allUsers } from '../../reducers/selectors';

const mapStateToProps = (state) => ({
  users: allUsers(state),
});

const mapDispatchToProps = (dispatch) => ({
  getUserIndex: () => dispatch(getUserIndex()),
});

export default connect(mapStateToProps,mapDispatchToProps)(UserIndex);