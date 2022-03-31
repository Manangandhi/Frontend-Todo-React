import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TodoService } from "../services/todoService";
import "../css/AddTodo.css";
import useValidation from "../hooks/useValidation";

const initialFormData = {
  name: "",
  description: "",
};

const AddTodo = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialFormData);

  const [submitted, setSubmitted] = useState(false);

  const { errors, validate } = useValidation(["name", "description"]);

  const loading = useSelector((state) => state.todo.loading);

  const onChangeHandler = useCallback(
    (e) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));

      if (submitted) {
        validate({ ...formData, [e.target.name]: e.target.value });
      }
    },
    [submitted, formData, validate]
  );
  const addTodoHandler = useCallback(() => {
    setSubmitted(true);
    let err = validate(formData);
    if (err.hasError) return;
    dispatch(
      TodoService.AddTodo({
        name: formData.name,
        description: formData.description,
      })
    );
    setFormData(initialFormData);
  }, [dispatch, formData, validate]);

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
          <span style={{ color: "red" }}>{errors.name}</span>
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
          <span style={{ color: "red" }}>{errors.description}</span>
        </div>
      </div>

      <button className="add_button" onClick={addTodoHandler}>
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
