import {connect} from "react-redux";
import {toggleSignupModal} from "../actions/ui_actions";
import Navbar from "./navbar";

const mapStateToProps = ({entities, session}) => ({
  currentUser: entities.users[session.currentUserId],
});

const mapDispatchToProps = (dispatch) => ({
  toggleSignupModal: () => dispatch(toggleSignupModal()),
});

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)