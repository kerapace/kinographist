import React, {Component, useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import Poster from "../poster";
import Select from 'react-select';

const genres = ["Action","Comedy","Drama","Mystery","Crime",];

const genreOptions = [
  {value: "Action", label: "Action"},
  {value: "Comedy", label: "Comedy"},
  {value: "Drama", label: "Drama"},
  {value: "Mystery", label: "Mystery"},
  {value: "Crime", label: "Crime"}
];

const languages = ["English","French","Spanish","Italian","Japanese","Korean"];

const languageOptions = [
  {value: "English", label: "English"},
  {value: "French", label: "French"},
  {value: "Spanish", label: "Spanish"},
  {value: "Italian", label: "Italian"},
  {value: "Japanese", label: "Japanese"},
  {value: "Korean", label: "Korean"},
];

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
      <header>
        <h1>Browse Films</h1>
        <select key={"genre"} id="genre" onChange={(e) => setGenre(e.target.value)}>
          <option key={"blank"} value={""}>Genre</option>
          {genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
        </select>
        <select key={"year"} id="year" onChange={(e) => setYear(e.target.value)}>
          <option key={"blank"} value={""}>Year</option>
          {
            [...Array(121)].map((_,idx) => <option key={idx+1901} value={idx+1901}>{idx+1901}</option>)
          }
        </select>
        <select key={"language"} id="language" onChange={(e) => setLanguage(e.target.value)}>
          <option key={"blank"} value={""}>Language</option>
          {languages.map(language => <option key={language} type="select" value={language}>{language}</option>)}
        </select>
      </header>
      <div className="film-browse-container">
        {!films ? "" : films.map(film => (<Link key={film.id} to={`/film/${film.id}`}><Poster size={"medium"} hoverable={true} film={film}/></Link>))}
      </div>
    </section>
  );
}

export default FilmBrowse;