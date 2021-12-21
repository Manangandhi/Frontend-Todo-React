import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodoService } from "../services/todoService";
import "../css/TodoItems.css";
import EditTodoDialog from "./EditTodoDialog";

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

  const handleDeleteBtn = (data) => {
    dispatch(TodoService.DeleteTodo(data?._id));
  };

  const handleEditBtn = (data) => {
    setEditDialog((prev) => ({
      ...prev,
      open: true,
      todo: data,
    }));
  };
  const handleCloseBtn = () => {
    setEditDialog((prev) => ({
      ...prev,
      open: false,
      todo: undefined,
    }));
  };

  const handleCompleteBtn = (data) => {
    dispatch(
      TodoService.UpdateTodo({ _id: data?._id, completed: !data?.completed })
    );
  };

  return (
    <div className="todo_container">
      {todoList.map((item) => {
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

              <EditTodoDialog
                dialog={editDialog}
                handleCloseBtn={handleCloseBtn}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoItems;
