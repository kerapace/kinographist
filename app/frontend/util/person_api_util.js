export const getPerson = (id) => ($.ajax({
  url: `/api/people/${id}`,
  method: 'GET',
}));