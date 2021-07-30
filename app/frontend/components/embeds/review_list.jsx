import React from "react";
import ReviewContainer from "./review_container";

const ReviewList = ({page, reviews}) => {
  return (
  <section className="review-list-container">
    <h2>Reviews</h2>
    <div className="border"/>
    {!reviews ? "" : reviews.map(review => <ReviewContainer key={review.id} page={page} context={"list"} review={review}/>)}
  </section>
)};

export default ReviewList;