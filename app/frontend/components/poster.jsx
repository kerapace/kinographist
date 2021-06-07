import classNames from "classnames";
import React from "react";

const Poster = ({size, hoverable, film}) => (
  <div className={classNames(`poster`,`poster-${size}`,{hoverable})}>
    <img src={film.poster}/>
    <div className={"poster-info-display"}></div>
  </div>
);

export default Poster;