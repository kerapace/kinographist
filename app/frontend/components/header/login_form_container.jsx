import {connect} from "react-redux";
import LoginForm from "./login_form";
import {login} from "../../actions/session_actions";
import {flushSessionErrors} from "../../actions/error_actions";

const mapStateToProps = ({errors}) => ({
  sessionErrors: errors.session,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
  flushSessionErrors: () => dispatch(flushSessionErrors()),
});

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);