import classNames from "classnames";
import React from "react";

const Poster = ({size, hoverable, film, component: Component, embedProps}) => {
  return (<div className={classNames(`poster`,`poster-${size}`,{hoverable})} style={{backgroundImage: "url("+film.poster+")"}}>
    {!Component ? "" :
      <Component {...embedProps}/>
    }
  </div>);
};

export default Poster;