import axios from "axios";
import {
  addTodoFailure,
  addTodoRequest,
  addTodoSuccess,
  deleteTodoFailure,
  deleteTodoRequest,
  deleteTodoSuccess,
  todoListFailure,
  todoListRequest,
  todoListSuccess,
} from "../store/actions/todoActions";

export class TodoService {
  static TodoList = () => {
    return (dispatch) => {
      dispatch(todoListRequest());
      axios
        .get("http://localhost:5000/todos/list", "")
        .then((response) => {
          dispatch(todoListSuccess(response.data));
        })
        .catch((error) => {
          console.log(error);
          dispatch(todoListFailure(error));
        });
    };
  };

  static AddTodo = (data) => {
    return (dispatch) => {
      dispatch(addTodoRequest());
      axios
        .post("http://localhost:5000/todos/create", data)
        .then((response) => {
          dispatch(addTodoSuccess(response.data));
        })
        .catch((error) => {
          console.log(error);
          dispatch(addTodoFailure(error));
        });
    };
  };

  static DeleteTodo = (id) => {
    return (dispatch) => {
      dispatch(deleteTodoRequest());
      axios
        .delete(`http://localhost:5000/todos/delete/${id}`)
        .then((response) => {
          dispatch(deleteTodoSuccess(id));
        })
        .catch((error) => {
          dispatch(deleteTodoFailure(error));
        });
    };
  };
}
