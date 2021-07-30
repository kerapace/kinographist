import React from 'react';
import ReviewContainer from './review_container';
import FilmEntry from './film_entry';
import ListPreview from './list_preview';

const MultitypeList = ({title, entries}) => (
  <section className="review-list-container">
    <h2>{title}</h2>
    <div className="border"/>
    {!entries ? "" :
      entries.map((entry,idx) => {
        switch(entry.type) {
          case "Review":
            return <ReviewContainer page={"like"} context={"list"} key={idx} review={entry}/>;
          case "Film":
            return <FilmEntry key={idx} film={entry}/>;
          case "List":
            return <ListPreview key={idx} list={entry}/>;
          default:
            return "";
        }
      })
    }
  </section>
);

export default MultitypeList;