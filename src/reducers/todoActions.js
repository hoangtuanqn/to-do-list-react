import {
    ADD_TODO,
    REMOVE_TODO,
    REMOVE_ALL_TODOS,
    UPDATE_TODO,
    TOGGLE_TODO,
    START_EDIT_TODO,
    CLEAR_NOTIFICATION_TODO,
    UPDATE_MESSAGE_TODO,
} from "./actionTypes";

export const addTodo = (text) => ({ type: ADD_TODO, payload: text });
export const updateTodo = (todo) => ({ type: UPDATE_TODO, payload: todo });
export const toogleTodo = (todo) => ({ type: TOGGLE_TODO, payload: todo });
export const updateMessageTodo = (message) => ({ type: UPDATE_MESSAGE_TODO, payload: message });
export const clearTodos = () => ({ type: REMOVE_ALL_TODOS });
export const clearNotificationTodo = () => ({ type: CLEAR_NOTIFICATION_TODO });
export const removeItemTodo = (uid) => ({
    type: REMOVE_TODO,
    payload: uid,
});
export const startEditTodo = (id) => ({
    type: START_EDIT_TODO,
    payload: id,
});
