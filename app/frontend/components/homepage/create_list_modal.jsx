import React, {useState, useEffect} from "react";

const CreateListModal = ({displayed,userId,toggleCreateListModal,createList}) => {
  const [title,setTitle] = useState("");
  const [blurb,setBlurb] = useState("");
  const [ordered,setOrdered] = useState(true);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    }
  },[])
  return (!displayed ? "" :
  <div className="modal-background">
    <section className="list-form-container">
      <div className="exit-button">
        <a onClick={toggleCreateListModal}>
          X
        </a>
      </div>
      <h2>Create New List</h2>
      <form onSubmit={e => {
        e.preventDefault();
        createList({userId,title,blurb,ordered},[]);
        toggleCreateListModal();
      }}>
        <input type="text" value={title} placeholder="Title..." onChange={e => setTitle(e.target.value)}/>
        <textarea value={blurb} placeholder="Say a little something about the list" onChange={e => setBlurb(e.target.value)}/>
        <label>Ordered<input type="checkbox" value={"ordered"} onChange={e => setOrdered(e.target.checked)} defaultChecked={ordered}/></label>
        <button className="pretty-button large">Create List</button>
      </form>
    </section>
  </div>
  );
};

export default CreateListModal;