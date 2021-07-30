import React from 'react';
import {Link} from 'react-router-dom';

const UserEntry = ({user}) => 
!user ? "" : (
  <>
    <article className="user-entry">
      {!user.avatar ? "" : (
        <aside className="avatar-container">
        </aside>
      )}
      <header>
        <Link to={`/user/${user.id}`}><h3>{user.username}</h3></Link>
        <p>{`Registered ${user.created}`}</p>
      </header>
    </article>
    <div className="border"/>
  </>
);

export default UserEntry;