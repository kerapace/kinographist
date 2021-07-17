import {connect} from "react-redux";
import {signup} from "../../actions/session_actions";
import {toggleSignupModal} from "../../actions/ui_actions";
import {flushSessionErrors} from "../../actions/error_actions";
import SignupModal from "./signup_modal";

const mapStateToProps = ({ui, errors}) => ({
  isDisplayed: ui.signupModalDisplay,
  sessionErrors: errors.session,
});


const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(signup(user)),
  toggleSignupModal: () => dispatch(toggleSignupModal()),
  flushSessionErrors: () => dispatch(flushSessionErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupModal);