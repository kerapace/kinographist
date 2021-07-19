import React from 'react';
import {Link} from 'react-router-dom';
import Poster from '../poster';
import { Star, Half } from '../svg_elements';

const FilmEntry = ({film, rating}) => (
  <>
    <article className="film-entry">
      <aside>
      <Link to={`/film/${film.id}`}><Poster size={"small"} film={film} hoverable={true}/></Link>
      </aside>
      <header>
        {!film ? "" :
          <div>
            <Link to={`/film/${film.id}`}><h3>{film.title}</h3></Link>
            <p>{film.releaseYear}</p>
            {!rating ? "" : (<span className="rating ">
                {[...Array(Math.floor(rating))].map((_,idx) => <Star key={idx} height={12} width={12}/>)}
                {rating - Math.floor(rating) === 0 ? "" : <Half key={"half"} height={12} width={12}/>}
              </span>)}
          </div>
        }
      </header>
    </article>
    <div className="border"/>
  </>
);

export default FilmEntry;