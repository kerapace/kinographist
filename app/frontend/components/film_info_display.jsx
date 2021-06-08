import React from "react";
import {NavLink, useRouteMatch} from "react-router-dom";
import {Route} from "react-router";

const crewJobValues = ["director","writer","producer","editor","composer"];

const FilmInfoCast = ({crewHash}) => (
  <>
    <ol className="actor-credits">
      {crewHash["actor"].map((actor,idx) => (
        <li key={idx}>
          {actor.name}
          <p>{actor.role}</p>
        </li>
      ))}
    </ol>
  </>
);

const FilmInfoCrew = ({crewHash}) => (
  <div className="crew-credits-container">
    {
      crewJobValues.map((job) => (
        crewHash[job] === undefined ? "" :
        <ul key={job} className="crew-credits">
          <h3>{crewHash[job].length === 1 ? job : job + "s"}</h3>
          <div/>
          {crewHash[job].map((crew) => (
            <li key={crew.id}>
              {crew.name}
            </li>
          ))}
        </ul>
      ))
    }
  </div>
);

const FilmInfoDetails = ({film}) => (
  <div className="film-details-container">
    <ul className="film-details">
      <h3>Studio</h3>
      <div/>
      <li key={"studio"}>{film.studio}</li>
    </ul>
    <ul className="film-details">
      <h3>Country</h3>
      <div/>
      <li key={"country"}>{film.country}</li>
    </ul>
    <ul className="film-details">
      <h3>Languages</h3>
      <div/>
      {film.languages.map(language => (
        <li key={language}>{language}</li>
      ))}
    </ul>
  </div>
);

const FilmInfoGenres = ({film}) => (
  <div className="film-genres-container">
    <ul className="film-genres">
      <h3>Genres</h3>
        <div/>
        {film.genres.map(genre => (
          <li key={genre}>{genre}</li>
        ))}
    </ul>
  </div>
)

const FilmInfoDisplay = ({film, crewHash}) => {
  const {path, url} = useRouteMatch();
  return (
    <div className="film-info-tabbed-display">
      <nav>
        <NavLink to={`${url}/cast`} isActive={((_,location) => location.pathname === url || location.pathname === `${url}/cast`)}>Cast</NavLink>
        <NavLink to={`${url}/crew`}>Crew</NavLink>
        <NavLink to={`${url}/details`}>Details</NavLink>
        <NavLink to={`${url}/genres`}>Genres</NavLink>
      </nav>
      <section className="film-info-tab">
        <Route exact path={path}>
          <FilmInfoCast crewHash={crewHash}/>
        </Route>
        <Route path={`${path}/cast`}>
          <FilmInfoCast crewHash={crewHash}/>
        </Route>
        <Route path={`${path}/crew`}>
          <FilmInfoCrew crewHash={crewHash}/>
        </Route>
        <Route path={`${path}/details`}>
          <FilmInfoDetails film={film}/>
        </Route>
        <Route path={`${path}/genres`}>
          <FilmInfoGenres film={film}/>
        </Route>
      </section>
    </div>
  );
};

export default FilmInfoDisplay;

