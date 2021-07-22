import * as ListApiUtil from '../util/list_api_util';

export const RECEIVE_LIST_DATA = "RECEIVE_LIST_DATA";
export const DESTROY_LIST = "DESTROY_LIST";
export const ADD_ITEM_TO_LIST = "ADD_ITEM_TO_LIST";
export const REMOVE_ITEM_FROM_LIST = "REMOVE_ITEM_FROM_LIST";

export const receiveListData = (listData) => ({
  type: RECEIVE_LIST_DATA,
  listData
});

export const destroyList = (listId) => ({
  type: DESTROY_LIST,
  listId
});

export const addElementToList = (elementData) => ({
  type: ADD_ITEM_TO_LIST,
  elementData
});

export const destroyElement = (elementData) => ({
  type: REMOVE_ITEM_FROM_LIST,
  elementData
})

export const createList = (listData, elements) => dispatch => (
  ListApiUtil.createList(listData,elements).then(listData => dispatch(receiveListData(listData)))
);

export const updateList = (id, listData, elements) => dispatch => (
  ListApiUtil.updateList(id,listData,elements).then(listData => dispatch(receiveListData(listData)))
);

export const getList = id => dispatch => (
  ListApiUtil.getList(id).then(listData => dispatch(receiveListData(listData)))
);

export const removeList = listId => dispatch => (
  ListApiUtil.deleteList(listId).then(listId => dispatch(destroyList(listId)))
);

export const addItemToList = element => dispatch => (
  ListApiUtil.addItemToList(element).then(elementData => dispatch(addElementToList(elementData)))
);

export const removeItemFromList = elementId => dispatch => (
  ListApiUtil.removeItemFromList(elementId).then(elementData => dispatch(destroyElement(elementData)))
);
