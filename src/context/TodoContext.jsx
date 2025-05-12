import { useReducer, createContext, useEffect } from "react";
import { initialState, todoReducer } from "../reducers/todoReducer";
import * as actions from "../reducers/todoActions";
import { toast } from "react-toastify";

export const TodoContext = createContext();
export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(state.todos));
    }, [state.todos]);
    useEffect(() => {
        const notification = state.notification;
        if (notification) {
            toast[notification.type](notification.message);
            dispatch(actions.clearNotificationTodo());
        }
    }, [state.notification]);

    const value = {
        state,
        actions: {
            addTodo: (text) => dispatch(actions.addTodo(text)),
            updateTodo: (todo) => dispatch(actions.updateTodo(todo)),
            toogleTodo: (todo) => dispatch(actions.toogleTodo(todo)),
            startEditTodo: (id) => dispatch(actions.startEditTodo(id)),
            removeItemTodo: (uid) => dispatch(actions.removeItemTodo(uid)),
            clearTodos: () => dispatch(actions.clearTodos()),
            clearNotificationTodo: () => dispatch(actions.clearNotificationTodo()),
        },
    };
    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
