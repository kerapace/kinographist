import React, {useEffect, useRef} from 'react';
import ReviewList from '../embeds/review_list';
import MultitypeList from '../embeds/multitype_list';

const UserProfile = ({user,currentUser,loggedIn,ratings,likes,getProfile,match}) => {
  useEffect(() => getProfile(match.params.userId),[]);
  return !user ? "" : (
    <main className="user-profile">
      <h1>{user.username}</h1>
      {!user.bio ? "" : (<aside className="user-sidebar">
        {user.bio}
      </aside>)}
      <section className="user-content">
        <ReviewList reviews={ratings} page={"user"}/>
        <MultitypeList title={"Recent Likes"} entries={likes}/>
      </section>
    </main>
  );
};

export default UserProfile;