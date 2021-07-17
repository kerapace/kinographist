import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import FilmInfoDisplay from "./film_info_display";
import Poster from "../poster";
import ReviewList from "../embeds/review_list";
import FilmInteractionMenuContainer from "./film_interaction_menu_container"

const FilmDisplay = ({film, crewHash, reviews, getFilm, match}) => {
  useEffect(() => getFilm(match.params.filmId),[]);
  return !film || Object.keys(crewHash).length === 0 ? "" : (
    <>
      <div className="splash-container">
        <figure className="film-splash-header">
          <div className="left-gradient"/>
          <div className="bottom-gradient"/>
          <div className="right-gradient"/>
          <img src={film.backdrop}/>
        </figure>
      </div>
      <main className="film-page">
        <div className="film-left-sidebar">
          <aside>
            <Poster size={"large"} hoverable={false} displayInfo={false} film={film}/>
            {/* <InlineFilmDataContainer filmId={film.id}/> */}
          </aside>
        </div>
        <section className="film-info">
          <div className="film-info-header">
            <h1>{film.title}</h1>
            <h2>{<Link to="/">{film.releaseYear}</Link>}</h2>
            {!crewHash["director"] ? "" :
            <h2>Directed by {crewHash["director"].map((el,idx) => <Link key={idx} to="/">{el.name}</Link>)}</h2>
            }
          </div>
          <section className="film-blurb">
            <h2>{film.tagline}</h2>
            <p>{film.blurb}</p>
          </section>
          <FilmInfoDisplay film={film} crewHash={crewHash}/>
        </section>
        <section className="rating-container">
          <FilmInteractionMenuContainer film={film}/>
        </section>
        <section className="reviews-container">
          <ReviewList page={"film"} reviews={reviews}/>
        </section>
      </main>
      </>
  );
};

export default FilmDisplay;