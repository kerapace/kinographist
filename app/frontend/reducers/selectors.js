// export const orderedCastList = (state) => (
//   Object.values(state.entities.filmCrew).filter((credit) => credit.position === "actor").sort((a,b) => a.ord - b.ord)
// );

// export const crewList = (state) => (
//   Object.values(state.entities.filmCrew).filter((credit) => credit.position !== "actor")
// );

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

export const filmAssociatedPeople = (state) => (
  Object.values(state.entities.people)
)