export const getProfile = (id) => $.ajax({
  url: `api/users/${id}`,
  method: 'GET',
});

