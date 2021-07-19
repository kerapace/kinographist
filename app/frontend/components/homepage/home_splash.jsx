import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import classNames from 'classnames';

const HomeSplash = ({splashHeaderFilm,loggedIn,toggleSignupModal,getFilm,tmdbId}) => {
  useEffect(() => {getFilm(tmdbId)},[]);
  return (
    <>
      {!splashHeaderFilm ? "" :  
        <div className="splash-container">
          <figure className="film-splash-header">
            <div className="left-gradient"/>
            <div className="bottom-gradient"/>
            <div className="right-gradient"/>
            <img src={splashHeaderFilm.backdrop}/>
            <Link to={`/film/${splashHeaderFilm.id}`}><p>{`${splashHeaderFilm.title}`}</p></Link>
          </figure>
        </div>
      }
      <main className={classNames("main-splash",{"loaded": splashHeaderFilm})}>
        <section className="introduction">
          <h1>Record what you see<br/>
          Recommend films to others<br/>
          Keep your finger on the pulse</h1>
          <p>There's a wide world of cinema out there. Explore to your heart's content.</p>
          {loggedIn ? "" : <div><button className="pretty-button large" onClick={toggleSignupModal}>Sign Up Now</button></div>}
        </section>
        <section className="functionality-display">
          <figure className="site-overview">
            <div key={1} className="hover-green"></div>
            <div key={2} className="hover-green"></div>
            <div key={3} className="hover-blue"></div>
            <div key={4} className="hover-blue"></div>
            <div key={5} className="hover-orange"></div>
            <div key={6} className="hover-orange"></div>
          </figure>
        </section>
      </main>
    </>
  );
};

export default HomeSplash;