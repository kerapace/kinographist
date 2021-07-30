import React, {useEffect} from 'react';
import UserList from '../embeds/user_list';

const UserIndex = ({users,getUserIndex}) => {
  useEffect(() => getUserIndex(),[]);
  return (
    <main className="index">
      <UserList title={"Recent Lists"} users={users}/>
    </main>
  );
};

export default UserIndex;