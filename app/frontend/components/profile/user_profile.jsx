import React, {useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import ReviewList from '../embeds/review_list';
import MultitypeList from '../embeds/multitype_list';
import RatingList from '../embeds/rating_list';
import ListPreviewList from '../embeds/list_preview_list';

const UserProfile = ({user,currentUser,loggedIn,listPreviews,toggleCreateListModal,ratings,reviews,likes,getProfile}) => {
  const {userId} = useParams();
  useEffect(() => getProfile(userId),[userId]);
  return !user ? "" : (
    <main className="user-profile">
      <h1>{user.username}</h1>
      {!user.bio ? "" : (<aside className="user-sidebar">
        {user.bio}
      </aside>)}
      <section className="user-content">
        <RatingList ratings={ratings}/>
        <ReviewList reviews={reviews} page={"user"}/>
        <MultitypeList title={"Recent Likes"} entries={likes}/>
        <ListPreviewList title={"Lists"} entries={listPreviews}/>
      </section>
    </main>
  );
};

export default UserProfile;