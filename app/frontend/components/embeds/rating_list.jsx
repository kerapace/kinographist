import React from 'react';
import FilmEntry from './film_entry';

const RatingList = ({ratings}) => (
  <section key={"rating"} className="review-list-container">
    <h2>Recently Seen</h2>
    {!ratings ? "" :
      ratings.map(review => <FilmEntry key={review.id} film={review.film} rating={review.rating}/>)
    }
  </section>
);

export default RatingList;