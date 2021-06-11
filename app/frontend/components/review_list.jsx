import React from "react";
import {Link} from "react-router-dom";
import {Star, Half} from "./svg_elements";

export const ReviewList = ({page, reviews}) => {
  return (
  <section className="review-list-container">
    <h2>Reviews</h2>
    <div className="border"/>
    {!reviews ? "" : reviews.map(review => <Review key={review.id} page={page} context={"list"} review={review}/>)}
  </section>
)};

export const Review = ({page, context, review}) => {
  return (<article className="film-review">
    <header>
      <div>{page === "user" && context === "list" ? "" : <p key={"user"}>Review by <Link className="user-link" to={`/user/${review.userId}`}>{review.username}</Link></p>}
      {!review.rating ? "" :
        (<span className="rating  ">
          {[...Array(Math.floor(review.rating))].map((_,idx) => <Star key={idx} height={14} width={14}/>)}
          {review.rating - Math.floor(review.rating) === 0 ? "" : <Half key={"half"} height={14} width={14}/>}
        </span>)
      } 
      {page === "film" && context === "list" ? "" : <h2>{review.film.title}</h2>}
      </div>
      {page !== "review" ? "" : <p key={"created"}>Reviewed {review.created}</p>}
      {page !== "review" || review.updated === review.created ? "" : <p key={"updated"}>Edited {review.updated}</p>}
    </header>
    {!review.title ? "" : <h3>{review.title}</h3>}
    <p>{review.body}</p>
    <div className="border"/>
  </article>);
};