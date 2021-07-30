import React, {useEffect} from 'react';
import ListPreviewList from '../embeds/list_preview_list';

const ListIndex = ({lists,loggedIn,getAllLists,toggleCreateListModal}) => {
  useEffect(() => getAllLists(),[]);
  return (
    <main className="index">
      {!loggedIn ? "" : <a onClick={toggleCreateListModal}><h2>Create a New List</h2></a>}
      <div className="border"/>
      <ListPreviewList title={"Recent Lists"} entries={lists}/>
    </main>
  );
};

export default ListIndex;