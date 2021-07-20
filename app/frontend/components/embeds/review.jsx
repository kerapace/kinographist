import React, {useState, useRef, useEffect} from 'react';
import classNames from 'classnames';
import { Star, Half, Heart } from '../svg_elements';
import {Link} from 'react-router-dom';
import Poster from '../poster';

const Review = ({page, context, review, loggedIn, currentUser, userLike, like, unlike}) => {
  const [likeCount, setLikeCount] = useState(review.likesCount === null ? 0 : review.likesCount);
  return (!review ? "" : 
  <>
    <article className="film-review">
      {page === "film" ? "" :
        <aside>
          <Poster size="small" film={review.film} hoverable={true}/>
        </aside>
      }
      <section>
        <header>
          {page === "film" && context === "list" ? "" : <Link to={`/film/${review.film.id}`}><h3>{review.film.title}</h3></Link>}
          <div>
          {!review.rating ? "" :
            (<span className="rating ">
              {[...Array(Math.floor(review.rating))].map((_,idx) => <Star key={idx} height={12} width={12}/>)}
              {review.rating - Math.floor(review.rating) === 0 ? "" : <Half key={"half"} height={12} width={12}/>}
            </span>)
          }
          {!review.user ? "" :
            <p key={"user"}>Review by <Link className="user-link" to={`/user/${review.userId}`}>{review.user.username}</Link></p>
          }
          </div>
          {!review.title ? "" : <h4>{review.title}</h4>}
        </header>
        <p>{review.body}</p>
        <footer className="review-footer">
          {!loggedIn || review.userId === currentUser.id ? "" :
            <ReviewLikeButton liked={userLike} likeableId={review.id} userId={currentUser.id} {...{like, unlike, likeCount, setLikeCount}}/>
          }
          <p>{`${likeCount} ${likeCount === 1 ? "like" : "likes"}`}</p>
          {<p key={"created"}>Reviewed {review.updated}</p>}
        </footer>
      </section>
    </article>
    <div className="border"/>
  </>
  );
};

const ReviewLikeButton = ({liked, likeableId, userId, like, unlike, likeCount, setLikeCount}) => {
  const isLoaded = useRef(true);
  useEffect(() => {return () => isLoaded.current = false;},[])
  const toggleLike = () => {
    if(liked) { 
      unlike(likeableId,userId).then(() => isLoaded.current ? setLikeCount(likeCount-1) : null);
    } else {
      like(likeableId,userId).then(() => isLoaded.current ? setLikeCount(likeCount+1) : null);
    }
  }
  return (
    <button className={classNames("review-like-button",{"clicked": liked})} onClick={() => toggleLike()}>
      <Heart height={18} width={18}/>
    </button>
  );
}

export default Review;