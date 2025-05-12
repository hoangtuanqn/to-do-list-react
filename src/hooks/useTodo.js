import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

// Custom hook for using the Todo context
export const useTodo = () => useContext(TodoContext);
