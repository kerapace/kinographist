import classNames from "classnames";
import React, {useState, useEffect} from "react";
import {Eye, Heart, PlusSign, MinusSign} from "../svg_elements";
import Poster from "../poster";

const FilmInteractionMenu = ({modalDisplayed, toggleReviewModal, loggedIn, liked, likeFilm, unlikeFilm, watchList, userLists, addItemToList, removeItemFromList, currentUser, review, updateReview, film}) => {
  return (
    <>
      {!loggedIn || !modalDisplayed ? "" : <ReviewModal userId={currentUser.id} film={film} review={review} updateReview={updateReview} toggleReviewModal={toggleReviewModal}/>}
      <nav className="film-interaction-menu">
        <div className="state-buttons-container">
          {!loggedIn ? "" : (
            <>
              <WatchButton watched={review ? review.watched : false} userId={currentUser.id} filmId={film.id} updateReview={updateReview}/>
              <FilmLikeButton liked={liked} like={likeFilm} unlike={unlikeFilm} userId={currentUser.id} likeableId={film.id} updateReview={updateReview}/>
              <WatchListButton {...{watchList, userId: currentUser.id, filmId: film.id, addItemToList, removeItemFromList}}/>
            </>
          )}
        </div>
        <div className="rating-button-container">
          {!loggedIn ? "" : <RatingButton rating={review ? review.rating : 0} userId={currentUser.id} filmId={film.id} updateReview={updateReview}/>}
        </div>
        <div className="review-button-container">
          {!loggedIn ? <p>Log in to rate and review...</p> : <a onClick={() => toggleReviewModal()}>Click to review</a>}
        </div>
        <ListAccordion {...{userLists, userId: currentUser.id, filmId: film.id, addItemToList, removeItemFromList}}/>
      </nav>
    </>
  )
};

const FilmLikeButton = ({liked, likeableId, userId, like, unlike, updateReview}) => {
  const toggleLike = () => {
    if(liked) { 
      unlike(likeableId,userId);
    } else {
      like(likeableId,userId);
      updateReview({filmId: likeableId, userId, watched: true});
    }
  }
  return (
    <button className={classNames("like-button",{"clicked": liked})} onClick={() => toggleLike()}>
      <Heart height={36} width={36}/>
      <p>{liked ? "Liked" : "Like"}</p>
    </button>
  );
}

const WatchListButton = ({watchList, userId, filmId, addItemToList, removeItemFromList}) => {
  const [hovered, trackHover] = useState(false)
  const toggleWatchList = () => {
    if(!watchList.elementId) {
      addItemToList({userId,filmId,listId: watchList.id});
    } else {
      removeItemFromList(watchList.elementId);
    }
  }
  return watchList === null ? "" : (
    <button className={classNames("watch-list-button",{"clicked": watchList.elementId !== null})}
      onClick={toggleWatchList}
      onMouseEnter={() => trackHover(true)}
      onMouseLeave={() => trackHover(false)}
    >
      {watchList.elementId === null ? <PlusSign height={36} width={36}/> : <MinusSign height={36} width={36}/>}
      <p>{hovered && watchList.elementId ? "Remove" : "Watchlist"}</p>
    </button>
  );
};

const ListAccordion = ({userLists, userId, filmId, addItemToList, removeItemFromList}) => {
  const [listDisplay, setListDisplay] = useState(false);
  const toggleList = (list) => {
    if(!list.elementId) {
      addItemToList({userId,filmId,listId: list.id});
    }
    else {
      removeItemFromList(list.elementId);
    }
  }
  return (<>
    <div className="list-data-toggler"
      onClick={() => setListDisplay(!listDisplay)}
    >
      <p>
      {!listDisplay ? "Add film to list..." : "Hide lists..."}
      </p>
    </div>
    {!listDisplay ? "" : userLists.map(list => 
      <div key={list.id} onClick={() => toggleList(list)}>
        <p>
          {list.elementId === undefined ? 
            `Add film to ${list.title}` :
            `Remove film from ${list.title}`
          }
        </p>
      </div>
    )}
  </>
  );
};

const ReviewModal = ({userId, film, review, updateReview, toggleReviewModal}) => {
  const [title, setTitle] = useState(review && review.title ? review.title : "");
  const [body, setBody] = useState(review && review.body ? review.body : "");
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    };
  },[]);
  return (
    <div className="modal-background">
      <section className="review-form-container">
        <aside>
          <Poster size={"medium"} hoverable={true} film={film}/>
        </aside>
        <section>
          <div className="exit-button">
            <a onClick={() => {
              return toggleReviewModal()}}>X</a>
          </div>
          <h2>I Watched...</h2>
          <h1>{film.title}</h1>
          <form onSubmit={e => {
            e.preventDefault();
            updateReview({userId,filmId: film.id,title,body,watched: true})
            toggleReviewModal();
          }}>
            <div className="rating-inset">
              <RatingButton rating={review && review.rating ? review.rating : 0} filmId={film.id} userId={userId} updateReview={updateReview}/>
            </div>
            <input type="text" value={title} placeholder="Title" onChange={e => setTitle(e.target.value)}/>
            <textarea value={body} placeholder="Add a review..." onChange={e => setBody(e.target.value)}/>
            <button>Submit Review</button>
          </form>
        </section>
      </section>
    </div>
)};

const WatchButton = ({watched, userId, filmId, updateReview}) => (
  <>
    <button className={classNames("watch-button",{"clicked": watched})} onClick={() => updateReview({userId,filmId,watched: !watched})}>
      <Eye height={36} width={36}/>
      <p>{watched ? "Watched" : "Watch"}</p>
    </button>
  </>
);

const RatingButton = ({rating, userId, filmId, updateReview}) => {
  const [hoverRating, setHoverRating] = useState(rating);
  const [displayRating, setDisplayRating] = useState(rating);
  useEffect(() => {
    setDisplayRating(rating);
    setHoverRating(rating)
  },[rating]);
  return (
    <>
      <div className="exit-button">
        <a onClick={e => {
          updateReview({userId, filmId, rating: 0});
          setHoverRating(0);
        }}>X</a>
      </div>
      <div className={classNames("rating-button",{"rated": rating !== 0 && displayRating === hoverRating})}
        onMouseLeave={() => setHoverRating(displayRating)}>
        <div className="visible-rating" style={{width: `${hoverRating*20}%`}}/>
        {[...Array(10)].map((_,idx) => (
          <RatingIncrement key={idx} rating={(idx+1)/2} {...{updateReview,userId,filmId,setHoverRating,setDisplayRating}}/>
        ))}
      </div>
    </>
  );
};

const RatingIncrement = ({rating,updateReview, userId, filmId, setHoverRating, setDisplayRating}) => (
  <div className="rating-increment" onMouseEnter={() => setHoverRating(rating)} onClick={() => {
    setDisplayRating(rating);
    updateReview({rating,userId,filmId,watched: true});
  }}/>
);

export default FilmInteractionMenu;