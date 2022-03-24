import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TodoService } from "../services/todoService";
import "../css/AddTodo.css";

const initialFormData = {
  name: "",
  description: "",
};

const AddTodo = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialFormData);

  const loading = useSelector((state) => state.todo.loading);

  const onChangeHandler = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const addTodoHandler = useCallback(() => {
    dispatch(
      TodoService.AddTodo({
        name: formData.name,
        description: formData.description,
      })
    );
    setFormData(initialFormData);
  }, [dispatch, formData.description, formData.name]);

  return (
    <div className="todo-main-container">
      <div className="todo-input">
        <div className="todo-name-input">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            className="input-style"
            onChange={onChangeHandler}
          />
        </div>

        <div className="todo-desc-input">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            className="input-style"
            onChange={onChangeHandler}
          />
        </div>
      </div>

      <button
        disabled={!formData.name || !formData.description || loading}
        className="add_button"
        onClick={addTodoHandler}
      >
        {loading ? (
          <>
            <i style={{ color: "white" }} className="fa fa-spin fa-spinner" />
          </>
        ) : (
          "Add"
        )}
      </button>
    </div>
  );
};

export default AddTodo;
