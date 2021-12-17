import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./App.css";
import { TodoService } from "./services/todoService";
// import TodoItems from "./components/TodoItems";
import AddTodo from "./components/AddTodo";

function App() {
  const dispatch = useDispatch();

  const todoList = useSelector((state) => state.todo.todos);

  useEffect(() => {
    dispatch(TodoService.TodoList());
  }, [dispatch]);

  return (
    <div className="App">
      <h3> My Todo App</h3>
      <AddTodo />
      <div>
        {todoList.map((item) => {
          return (
            <div className="">
              <header key={item.id}>
                {item.name} - {item.description}
              </header>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
