import { TodoProvider } from "./context/TodoContext.jsx";
import TodoList from "./TodoList.jsx";
import TodoList2 from "./TodoList2.jsx";

function App() {
    return (
        <TodoProvider>
            <TodoList2 />
        </TodoProvider>
    );
}
export default App;
