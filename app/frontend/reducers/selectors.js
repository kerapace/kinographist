// export const orderedCastList = (state) => (
//   Object.values(state.entities.filmCrew).filter((credit) => credit.position === "actor").sort((a,b) => a.ord - b.ord)
// );

// export const crewList = (state) => (
//   Object.values(state.entities.filmCrew).filter((credit) => credit.position !== "actor")
// );

const addDataIfRightType = (like,state) => {
  switch(like.type) {
    case "Review":
      return Object.assign(like,{film: state.entities.films[like.filmId],user: film.state.entities.users[like.userId]})
    case "List":
    default:
      return like;
  }
};

const likeTypes = (state) => ({"Review": state.entities.reviews, "Film": state.entities.films});

export const crewListGroupedByRole = (state) => {
  const crewHash = {};
  Object.values(state.entities.filmCrew).forEach((credit) => {
    credit = Object.assign({},credit);
    credit.name = state.entities.people[credit.personId].name;
    crewHash[credit.position] = (crewHash[credit.position] || []);
    crewHash[credit.position].push(credit);
  });
  if (crewHash["actor"]) {crewHash["actor"].sort((a,b) => a.ord - b.ord);}
  return crewHash;
}

export const filmReviewsWithUserData = (state, filmId) => 
  (filmReviews(state,filmId).map(review => 
    Object.assign({},review,{username: state.entities.users[review.userId].username})))

export const filmReviews = (state, filmId) => (
  Object.values(state.entities.reviews).filter(review => review.filmId === filmId)
);

export const userReview = (state,userId,filmId) => (
  Object.values(state.entities.reviews).find(review => review.filmId === filmId && review.userId === userId)
);

export const userRatings = (state,userId) => {
  return Object.values(state.entities.reviews)
    .filter(review => review.userId === userId && review.watched)
    .map(review => Object.assign({},review,{username: state.entities.users[review.userId].username, film: state.entities.films[review.filmId]}))
    .sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at))
};

export const userLikes = (state,userId) => {
  const types = likeTypes(state);
  return Object.values(state.entities.likes)
    .filter(like => like.userId === userId)
    .sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
    .map(like => Object.assign({},{type: like.likeableType},types[like.likeableType][like.likeableId]))
    .map(like => addDataIfRightType(like,state));
};

export const filmAssociatedPeople = (state) => (
  Object.values(state.entities.people)
);