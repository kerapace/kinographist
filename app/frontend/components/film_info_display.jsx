import React from "react";
import {NavLink} from "react-router-dom";
import {Route} from "react-router";

let {path, url} = useRouteMatch();

const crewJobValues = ["director","writer","producer","editor","composer"];

const FilmInfoCast = (crewHash) => (
  <>
    <ol className="actor-credits">
      {crewHash["actor"].map((actor,idx) => (
        <li key={idx}>
          <span>{actor.name}</span>
          <details>{actor.role}</details>
        </li>
      ))}
    </ol>
  </>
);

const FilmInfoCrew = (crewHash) => (
  <div className="crew-credits-container">
    {
      crewJobValues.map((job) => (
        crewHash[job] === undefined ? "" :
        <ul key={job} className="crew-credits">
          <h3>{crewHash[job].length === 1 ? job : job + "s"}</h3>
          {crewHash[job].map((crew) => (
            <li key={crew.id}>
              <span>{actor.name}</span>
            </li>
          ))}
        </ul>
      ))
    }
  </div>
);

const FilmInfoDetails = (film) => (
  <div className="film-details-container">
    <ul className="film-details">
      <h3>Studio</h3>
      <li key={"studio"}>{film.studio}</li>
    </ul>
    <ul className="film-details">
      <h3>Country</h3>
      <li key={"country"}>{film.country}</li>
    </ul>
    <ul className="film-details">
      <h3>Languages</h3>
      {film.languages.split(", ").map(language => (
        <li key={language}>{language}</li>
      ))}
    </ul>
  </div>
);

const FilmInfoDisplay = ({film, crewHash}) => {
  return (
    <div className="film-info-tabbed-display">
      <nav>
        <NavLink to={`${url}/cast`}>Cast</NavLink>
        <NavLink to={`${url}/crew`}>Crew</NavLink>
        <NavLink to={`${url}/details`}>Details</NavLink>
      </nav>
      <section className="film-info-tab">
        <Route path={[`${path}`,`${path}/cast`]}>
          <FilmInfoCast crewHash={crewHash}/>
        </Route>
        <Route path={`${path}/crew`}>
          <FilmInfoCrew crewHash={crewHash}/>
        </Route>
        <Route path={`${path}/details`}>
          <FilmInfoDetails film={film}/>
        </Route>
      </section>
    </div>
  );
};

export default FilmInfoDisplay;

