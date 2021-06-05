import React, {useEffect} from "react";
import {Link} from "react-router-dom";

const FilmDisplay = ({film, crewHash, getFilm, match}) => {
  useEffect(() => getFilm(match.params.filmId),[])
  return (
    <main className="film-page">
      <figure className="film-splash-header"/>
      <aside className="film-left-sidebar">
        <Poster size={"large"} hoverable={false} film={film}/>
        {/* <InlineFilmDataContainer filmId={film.id}/> */}
      </aside>
      <section className="film-info">
        <h2>{film.title}</h2>
        <span>
          <h3>{<Link to="/">{film.release_date.slice(0,4)}</Link>}</h3>
          {!crewHash["director"] ? "" :
          <h3>Directed by {crewHash["director"].map((el,idx) => <Link key={idx} to="/">{el.name}</Link>)}</h3>
          }
        </span>
        <section className="film-blurb">
          <p>{film.blurb}</p>
        </section>
        <FilmInfoDisplay film={film} crewHash={crewHash}/>
      </section>
    </main>
  );
};

export default FilmDisplay;