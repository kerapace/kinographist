import React, {useEffect, useState} from 'react';
import { Redirect, Link, useParams } from 'react-router-dom';
import Poster from '../poster';
import classNames from "classnames";
import {Heart} from '../svg_elements';

const ListDisplay = ({loggedIn, listUser, currentUser, list, getList, match, liked, like, unlike}) => {
  const {listId} = useParams(); 
  useEffect(() => {if(match.params.listId) {getList(listId)}},[listId]);
  const [likeCount, setLikeCount] = useState(null);
  if (likeCount === null && list) {
    setLikeCount(!list.likesCount ? 0 : list.likesCount)
  }
  return !list ? "" : (
    <>
      {!list.isWatchList ? "" : <Redirect to={`/user/${list.userId}/watchlist`} />}
      <section className="film-browser">
      <header>
        <h1>{`${list.title}`}</h1>
        <p>Made by <Link to={`/user/${list.userId}`}>{listUser.username}</Link></p>
      <section className="blurb">
        <p>{list.blurb}</p>
      </section>
      <section className="like-menu">
        {!loggedIn || listUser.id === currentUser.id ? "" : <ListLikeButton likeableId={list.id} userId={currentUser.id} {...{liked, like, unlike, likeCount, setLikeCount}}/> }
        <p>{`${likeCount} ${likeCount === 1 ? "like" : "likes"}`}</p>
      </section>
      </header>
      <div className="border"/>
      <div className="film-browse-container">
        {!list.elements ? "" : (
          list.elements.map((element,idx) => 
          <Link key={idx} to={`/film/${element.id}`}> 
              <Poster size={"medium"} hoverable={true} film={element}/>
          </Link>
          )
        )}
      </div>
    </section>
    </>
  );
};

const ListLikeButton = ({liked,likeableId,userId,like,unlike,likeCount,setLikeCount}) => {
  const toggleLike = () => {
    if(liked) {
      unlike(likeableId,userId).then(() => setLikeCount(likeCount-1));
    } else {
      like(likeableId,userId).then(() => setLikeCount(likeCount+1));
    }
  };
  return (
    <button className={classNames("review-like-button",{"clicked": liked})} onClick={toggleLike}>
      <Heart height={24} width={24}/>
    </button>
  );
};



export default ListDisplay;