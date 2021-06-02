import {connect} from "react-redux";
import {signup} from "../actions/session_actions";
import {toggleSignupModal} from "../actions/ui_actions";
import SignupModal from "./signup_modal";

const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(signup(user)),
  toggleSignupModal: () => dispatch(toggleSignupModal),
});

export default connect(null, mapDispatchToProps)(SignupModal);