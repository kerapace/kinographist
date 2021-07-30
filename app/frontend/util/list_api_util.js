export const createList = (list, elements) => ($.ajax({
  url: `api/lists`,
  method: 'POST',
  data: {
    list,
    elements
  }
}));

export const getAllLists = () => ($.ajax({
  url: `api/lists/`,
  method: 'GET',
}));

export const getList = (id) => ($.ajax({
  url: `api/lists/${id}`,
  method: 'GET'
}));

export const getWatchList = (userId) => ($.ajax({
  url: `api/watchlist/${userId}`,
  method: 'GET'
}))

export const updateList = (id, list, elements) => ($.ajax({
  url: `api/lists/${id}`,
  method: 'PATCH',
  data: {
    list,
    elements
  }
}));

export const deleteList = (id) => ($.ajax({
  url: `api/lists/${id}`,
  method: 'DELETE'
}));

export const addItemToList = (element) => ($.ajax({
  url: 'api/list_elements',
  method: 'POST',
  data: {
    element
  }
}));

export const removeItemFromList = (elementId) => ($.ajax({
  url: `api/list_elements/${elementId}`,
  method: 'DELETE'
}));