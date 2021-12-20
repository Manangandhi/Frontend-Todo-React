import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <h3 className="mb-4 mt-2">My Todos</h3>
        <AddTodo />
        <TodoItems />
      </div>
    </div>
  );
}

export default App;
