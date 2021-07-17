import classNames from "classnames";
import React from "react";

const Poster = ({size, hoverable, displayInfo, film}) => {
  return (<div className={classNames(`poster`,`poster-${size}`,{hoverable})} style={{backgroundImage: "url("+film.poster+")"}}>
    {!displayInfo ? "" : (
      <div className={"poster-info-display"}>
      </div>
    )}
  </div>);
};

export default Poster;