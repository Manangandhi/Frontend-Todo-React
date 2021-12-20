import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodoService } from "../services/todoService";
import "../css/TodoItems.css";

const TodoItems = () => {
  const dispatch = useDispatch();

  const todoList = useSelector((state) => state.todo.todos);

  const deleting = useSelector((state) => state.todo?.deleting);

  useEffect(() => {
    dispatch(TodoService.TodoList());
  }, [dispatch]);

  const handleDeleteBtn = (data) => {
    dispatch(TodoService.DeleteTodo(data?._id));
  };

  const handleEditBtn = (data) => {
    // dispatch(TodoService.DeleteTodo(data?._id));
  };

  return (
    <div className="todo_container">
      {todoList.map((item) => {
        return (
          <div className="todo_header">
            <div>
              <h5 className="todo_name">{item.name}</h5>
              <span className="todo_desc">{item.description}</span>
            </div>
            <div className="todo_buttons">
              <button className="complete_todo_btn">Complete</button>
              <button
                onClick={() => handleEditBtn(item)}
                className="edit_todo_btn"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDeleteBtn(item)}
                className="delete_todo_btn"
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <i
                      style={{ color: "white" }}
                      className="fa fa-spin fa-spinner"
                    />
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoItems;
