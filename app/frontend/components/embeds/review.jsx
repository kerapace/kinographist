import React from 'react';
import { Star, Half, Heart } from '../svg_elements';
import {Link} from 'react-router-dom';
import Poster from '../poster';

const Review = ({page, context, review}) => {
  return (<article className="film-review">
    <header>
      <div>{page === "user" && context === "list" ? "" : <p key={"user"}>Review by <Link className="user-link" to={`/user/${review.userId}`}>{review.username}</Link></p>}
      {page === "film" && context === "list" ? "" : <Link to={`/film/${review.film.id}`}><h3>{review.film.title}</h3></Link>}
      {!review.rating ? "" :
        (<span className="rating ">
          {[...Array(Math.floor(review.rating))].map((_,idx) => <Star key={idx} height={14} width={14}/>)}
          {review.rating - Math.floor(review.rating) === 0 ? "" : <Half key={"half"} height={14} width={14}/>}
        </span>)
      }
      </div>
      {page !== "review" ? "" : <p key={"created"}>Reviewed {review.created}</p>}
      {page !== "review" || review.updated === review.created ? "" : <p key={"updated"}>Edited {review.updated}</p>}
      {!review.title ? "" : <h3>{review.title}</h3>}
    </header>
    {page === "film" ? "" :
      <aside>
        <Poster size="small" film={review.film} hoverable={true}/>
      </aside>
    }
    <p>{review.body}</p>
    <div className="border"/>
  </article>);
};

export default Review;