import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import Poster from "./poster";

const genres = ["Action","Comedy","Drama","Mystery","Crime",];
const languages = ["English","French","Spanish","Italian","Japanese","Korean"];

const FilmBrowse = ({films, getFilms, getPerson, position}) => {
  const [year, setYear] = useState("");
  const {personId} = useParams();
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const getFilter = () => {
    let filter = Object.fromEntries(Object.entries({year,genre,language}).filter(([_,v]) => v !== ""));
    if(position !== "" && personId !== "") {filter[position] = personId}
    return filter;
  };
  useEffect(() => {if(personId !== undefined) {getPerson(personId)}},[])
  useEffect(() => getFilms(getFilter()),[year,genre,language])
  return (
    <section className="film-browser">
      <h1>Browse Films</h1>
      <select id="genre" onChange={(e) => setGenre(e.target.value)}>
        <option key={"blank"} value={""}>Genre</option>
        {genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
      </select>
      <select id="year" onChange={(e) => setYear(e.target.value)}>
        <option key={"blank"} value={""}>Year</option>
        {
          [...Array(121)].map((_,idx) => <option key={idx+1901} value={idx+1901}>{idx+1901}</option>)
        }
      </select>
      <select id="language" onChange={(e) => setLanguage(e.target.value)}>
        <option key={"blank"} value={""}>Language</option>
        {languages.map(language => <option key={language} type="select" value={language}>{language}</option>)}
      </select>
      <div className="film-browse-container">
        {!films ? "" : films.map(film => (<Link to={`/film/${film.id}`}><Poster key={film.id} size={"medium"} hoverable={true} film={film}/></Link>))}
      </div>
    </section>
  );
}

export default FilmBrowse;