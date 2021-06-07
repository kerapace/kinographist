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

export const filmAssociatedPeople = (state) => (
  Object.values(state.entities.people)
)