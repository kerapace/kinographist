import React from 'react';
import UserEntry from './user_entry';

const UserList = ({users}) => (
  <section key={"users"} className="review-list-container">
    <h2>All Users</h2>
    <div className="border"/>
    {!users ? "" :
      users.map(user => <UserEntry key={user.id} user={user}/>)
    }
  </section>
);

export default UserList;