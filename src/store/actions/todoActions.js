import { todoActionTypes } from "../actionTypes/todoActionTypes";

// List
export const todoListRequest = () => {
  return {
    type: todoActionTypes.TODO_LIST_REQUEST,
  };
};

export const todoListSuccess = (data) => {
  return {
    type: todoActionTypes.TODO_LIST_SUCCESS,
    payload: data,
  };
};

export const todoListFailure = (data) => {
  return {
    type: todoActionTypes.TODO_LIST_FAILURE,
    payload: data,
  };
};

// Create
export const addTodoRequest = () => {
  return {
    type: todoActionTypes.ADD_TODO_REQUEST,
  };
};

export const addTodoSuccess = (data) => {
  return {
    type: todoActionTypes.ADD_TODO_SUCCESS,
    payload: data,
  };
};

export const addTodoFailure = (data) => {
  return {
    type: todoActionTypes.ADD_TODO_FAILURE,
    payload: data,
  };
};

// Update
export const updateTodoRequest = () => {
  return {
    type: todoActionTypes.UPDATE_TODO_REQUEST,
  };
};

export const updateTodoSuccess = (data) => {
  return {
    type: todoActionTypes.UPDATE_TODO_SUCCESS,
    payload: data,
  };
};

export const updateTodoFailure = (data) => {
  return {
    type: todoActionTypes.UPDATE_TODO_FAILURE,
    payload: data,
  };
};

// Delete
export const deleteTodoRequest = () => {
  return {
    type: todoActionTypes.DELETE_TODO_REQUEST,
  };
};

export const deleteTodoSuccess = (data) => {
  return {
    type: todoActionTypes.DELETE_TODO_SUCCESS,
    payload: data,
  };
};

export const deleteTodoFailure = (data) => {
  return {
    type: todoActionTypes.DELETE_TODO_FAILURE,
    payload: data,
  };
};
