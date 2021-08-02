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
              <Poster key={film.id} hoverable={true} size={"small"} film={film}/>
            </div>
          )
        }
      </aside>
      <header>
        <Link to={`/list/${list.id}`}><h3>{list.title}</h3></Link>
        <div className="preview-info">
          {!list.likesCount ? <p key={1}></p> : <p key={"likes"}>{list.likesCount === 1 ? `${list.likesCount} like` : `${list.likesCount} likes`}</p>}
          {!list.user ? <p key={2}></p> : <p key={"user"}>Created by <Link to={`/user/${list.user.id}`}>{list.user.username}</Link></p>}
        </div>
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