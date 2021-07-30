import React from 'react';
import Poster from '../poster';
import {Link} from 'react-router-dom';

const ListPreview = ({list}) => {
  return (
  <>
    <article key={list.id} className="list-preview">
      <aside className="poster-preview">
        {!list.elements ? "" :
          list.elements.slice().reverse().map(film =>
            <div key={film.id}>
              <Poster hoverable={true} size={"small"} film={film}/>
            </div>
          )
        }
      </aside>
      <header>
        <Link to={`/list/${list.id}`}><h3>{list.title}</h3></Link>
      </header>
      <section className="list-blurb-preview">
        {list.blurb}
      </section>
    </article>
    <div className="border"/>
  </>
  );
};

export default ListPreview;