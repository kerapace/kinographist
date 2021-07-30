export const getProfile = (id) => $.ajax({
  url: `api/users/${id}`,
  method: 'GET',
});

export const getIndex = () => $.ajax({
  url:  'api/users',
  method: 'GET',
});