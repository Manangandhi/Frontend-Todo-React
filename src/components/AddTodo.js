import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TodoService } from "../services/todoService";

const initialFormData = {
  name: "",
  description: "",
};

const AddTodo = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialFormData);

  const loading = useSelector((state) => state.todo.loading);

  const onChangeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addTodoHandler = () => {
    dispatch(
      TodoService.AddTodo({
        name: formData.name,
        description: formData.description,
      })
    );
    setFormData(initialFormData);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-2">
        <input
          type="text"
          placeholder="Enter Name here..."
          name="name"
          value={formData.name}
          className="form-control mb-2"
          onChange={onChangeHandler}
        />
        <input
          type="text"
          placeholder="Enter Description here..."
          name="description"
          value={formData.description}
          className="form-control"
          onChange={onChangeHandler}
        />

        <button
          disabled={!formData.name || !formData.description}
          className="btn btn-warning mt-2"
          onClick={addTodoHandler}
        >
          {loading ? <p>Loading...</p> : "Add"}
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
