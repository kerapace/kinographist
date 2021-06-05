// export const orderedCastList = (state) => (
//   Object.values(state.entities.filmCrew).filter((credit) => credit.position === "actor").sort((a,b) => a.ord - b.ord)
// );

// export const crewList = (state) => (
//   Object.values(state.entities.filmCrew).filter((credit) => credit.position !== "actor")
// );

export const crewListGroupedByRole = (state) => {
  crewHash = {}
  Object.values(state.entities.filmCrew).forEach((credit) => {
    credit = Object.assign({},credit);
    credit.name = state.entities.people[state.entities.filmCrew.personId];
    crewHash[credit.position] = (crewHash[credit.position] || []);
    crewHash[credit.position].push(credit);
  });
  crewHash["actor"].sort((a,b) => a.ord - b.ord);
  return crewHash;
}

export const filmAssociatedPeople = (state) => (
  Object.values(state.entities.people)
)