import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import Poster from "../poster";
import { Eye } from "../svg_elements";

const WatchListDisplay = ({loggedIn,currentUser,list,listUser,getWatchList,updateReview,removeItemFromList}) => {
  const {userId} = useParams();
  useEffect(() => {if(userId) {getWatchList(userId)}},[]);
  const [displayList, updateDisplayList] = useState(list.elements ? [...list.elements] : "");
  const clearElement = (idx) => {
    removeItemFromList(displayList[idx].elementId);
    updateDisplayList(displayList.slice(0,idx).concat(displayList.slice(idx+1)))
  };
  const embedProps = {
    updateReview,
    clearElement,
  };
  return !list ? "" : (
    <section className="film-browser">
      <h1>{`${listUser.username}'s Watchlist`}</h1>
      <div className="border"/>
      <div className="film-browse-container">
        {!list.elements ? "" : (
          list.elements.map((element,idx) => 
          <Link key={idx} to={`/film/${element.id}`}> 
            {loggedIn && currentUser.id === userId ?
              <Poster size={"medium"} hoverable={true} film={element} component={WatchListPosterEmbed} {...{embedProps}}/>
              :
              <Poster size={"medium"} hoverable={true} film={element}/>
            }
          </Link>
          )
        )}
      </div>
    </section>
  );
};

const WatchListPosterEmbed = ({film,updateReview,removeItemFromList}) => {
  <figure class="poster-embed">
    
  </figure>
};

export default WatchListDisplay;