import { todoActionTypes } from "../actionTypes/todoActionTypes";

const initialState = {
  todos: [],
  error: "",
  loading: false,
  deleting: false,
  updating: false,
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    // List
    case todoActionTypes.TODO_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case todoActionTypes.TODO_LIST_SUCCESS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
        error: "",
      };
    case todoActionTypes.TODO_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        todos: [],
      };

    // Create
    case todoActionTypes.ADD_TODO_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case todoActionTypes.ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        loading: false,
        error: "",
      };
    case todoActionTypes.ADD_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Update
    case todoActionTypes.UPDATE_TODO_REQUEST:
      return {
        ...state,
        updating: true,
        error: "",
      };
    case todoActionTypes.UPDATE_TODO_SUCCESS:
      const payload = action.payload;
      const todos = state.todos.map((t) => {
        if (t?._id === payload?._id) {
          return payload;
        }
        return t;
      });
      return {
        ...state,
        todos: todos,
        updating: false,
        error: "",
      };
    case todoActionTypes.UPDATE_TODO_FAILURE:
      return {
        ...state,
        updating: false,
        error: action.payload,
      };

    // Delete
    case todoActionTypes.DELETE_TODO_REQUEST:
      return {
        ...state,
        deleting: true,
        error: "",
      };
    case todoActionTypes.DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter((td) => td._id !== action.payload),
        deleting: false,
        error: "",
      };
    case todoActionTypes.DELETE_TODO_FAILURE:
      return {
        ...state,
        deleting: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
