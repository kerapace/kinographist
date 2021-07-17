import React from 'react';
import {Link} from 'react-router-dom';
import Poster from '../poster';

const FilmEntry = ({film}) => (
  <article className="film-entry">
    <header>
      {!film ? "" :
        <div>
          <Link to={`/film/${film.id}`}><h2>{film.title}</h2></Link>
          <p>{film.releaseYear}</p>
        </div>
      }
    </header>
    <aside>
      <Poster size={"small"} film={film}/>
    </aside>
    <div className="border"/>
  </article>
);

export default FilmEntry;