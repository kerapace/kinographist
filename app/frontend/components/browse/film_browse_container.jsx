import {connect} from "react-redux";
import {getFilms} from "../../actions/film_actions";
import {getPerson} from "../../actions/person_actions";
import FilmBrowse from "./film_browse"

const mapStateToProps = ({entities}) => ({
  films: Object.values(entities.films),
});

const mapDispatchToProps = (dispatch) => ({
  getFilms: (filter) => dispatch(getFilms(filter)),
  getPerson: (id) => dispatch(getPerson(id)),
});

export default connect(mapStateToProps,mapDispatchToProps)(FilmBrowse);