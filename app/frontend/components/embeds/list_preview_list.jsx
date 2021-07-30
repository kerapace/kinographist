import React from "react";
import ListPreview from "./list_preview";

const ListPreviewList = ({title,entries}) => {
  return (
    <section className="list-previews-container">
      <h2>{title}</h2>
      <div className="border"/>
      {!entries ? "" : entries.map(entry => <ListPreview key={entry.id} list={entry}/>)}
    </section>
  );
};

export default ListPreviewList;