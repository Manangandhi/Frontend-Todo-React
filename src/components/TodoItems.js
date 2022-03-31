import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodoService } from "../services/todoService";
import EditTodoDialog from "./EditTodoDialog";
import "../css/TodoItems.css";

const TodoItems = () => {
  const dispatch = useDispatch();

  const todoList = useSelector((state) => state.todo.todos);

  const deleting = useSelector((state) => state.todo?.deleting);

  const [editDialog, setEditDialog] = useState({
    open: false,
  });

  useEffect(() => {
    dispatch(TodoService.TodoList());
  }, [dispatch]);

  const handleDeleteBtn = useCallback(
    (data) => {
      dispatch(TodoService.DeleteTodo(data?._id));
    },
    [dispatch]
  );
  const handleEditBtn = useCallback((data) => {
    setEditDialog((prev) => ({
      ...prev,
      open: true,
      todo: data,
    }));
  }, []);
  const handleCloseBtn = useCallback(() => {
    setEditDialog((prev) => ({
      ...prev,
      open: false,
      todo: undefined,
    }));
  }, []);

  const handleCompleteBtn = useCallback(
    (data) => {
      dispatch(
        TodoService.UpdateTodo({ _id: data?._id, completed: !data?.completed })
      );
    },
    [dispatch]
  );

  return (
    <div className="todo_container">
      {todoList.length <= 0 ? (
        <span style={{ color: "white", fontSize: "2rem" }}>
          No Todos Found, Please Add new Todo...
        </span>
      ) : (
        todoList.map((item) => {
          return (
            <div key={item._id} className="todo_header">
              <div style={{ minHeight: "90%" }}>
                <h5
                  style={{
                    textDecoration:
                      item?.completed === true ? "line-through" : "",
                    color: item?.completed === true ? "#898787" : "",
                  }}
                  className="todo_name"
                >
                  {item.name}
                </h5>
                <span
                  style={{
                    textDecoration:
                      item?.completed === true ? "line-through" : "",
                    color: item?.completed === true ? "#898787" : "",
                  }}
                  className="todo_desc"
                >
                  {item.description}
                </span>
              </div>
              <div className="todo_buttons">
                <button
                  style={{
                    color: item.completed === false ? "#990000" : "",
                  }}
                  onClick={() => handleCompleteBtn(item)}
                  className="complete_todo_btn"
                >
                  {item?.completed === true ? "Completed" : "Not Completed"}
                </button>
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
                  disabled={deleting.includes(item._id)}
                >
                  {deleting.includes(item._id) ? (
                    <>
                      <i
                        style={{ color: "black" }}
                        className="fa fa-spin fa-spinner"
                      />
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>

                {editDialog?.todo?._id && (
                  <EditTodoDialog
                    dialog={editDialog}
                    handleCloseBtn={handleCloseBtn}
                  />
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TodoItems;
