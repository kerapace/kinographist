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
  const {personId} = useParams();
  const [decade, setDecade] = useState(null);
  const [genre, setGenre] = useState(null);
  const [language, setLanguage] = useState(null);
  const getFilter = () => {
    let filter = Object.fromEntries(Object.entries({decade,genre,language}).filter(([_,v]) => v !== null));
    if(position !== undefined && personId !== undefined) {filter[position] = personId}
    return filter;
  };
  useEffect(() => {if(personId !== undefined) {getPerson(personId)}},[])
  useEffect(() => getFilms(getFilter()),[decade,genre,language])
  return (
    <section className="film-browser">
      <header>
        <h1>Browse Films</h1>
        <section className="selectors-menu">
          <Select key={"genre"}
            isClearable
            placeholder={"Genre"}
            value={!genre ? null : [{value: genre, label: genre}]}
            className={"browse-selector"} 
            options={genreOptions}
            onChange={(e) => setGenre(e ? e.value : null)}/>
          <Select key={"year"}
            isClearable
            placeholder={"Decade"}
            value={!decade ? null : [{value: decade, label: `${decade}s`}]}
            className={"browse-selector"}
            options={[...Array(11)].map((_,idx) => ({value: 1920+10*idx, label: `${1920+10*idx}s`}))}
            onChange={(e) => setDecade(e ? e.value : null)}/>
          <Select key={"language"} 
            isClearable
            placeholder={"Language"}
            value={!language ? null : [{value: language, label: language}]} 
            className={"browse-selector"}
            options={languageOptions} 
            onChange={(e) => setLanguage(e ? e.value : null)}/>
          </section>
      </header>
      {!films ? "" : 
        films.length === 0 && Object.keys(getFilter()).length !== 0 ?
          (<p>No films found matching criteria.</p>)
        :
          <div className="film-browse-container">
            {!films ? "" : films.map(film => (<Link key={film.id} to={`/film/${film.id}`}><Poster size={"medium"} hoverable={true} film={film}/></Link>))}
          </div>
      }
    </section>
  );
}

export default FilmBrowse;