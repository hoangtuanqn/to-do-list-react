import { getDateTime } from "../utils/date";
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

export const initialState = {
    todos: JSON.parse(localStorage.getItem("todos")) || [],
    uidEdit: null,
    notification: null,
};

export const todoReducer = (state, action) => {
    switch (action.type) {
        case START_EDIT_TODO:
            return {
                ...state,
                uidEdit: action.payload,
            };

        case ADD_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        uid: Date.now(),
                        text: action.payload,
                        completed: false,
                        completedTime: "",
                    },
                ],
                uidEdit: null,
                notification: {
                    type: "success",
                    message: "Đã thêm thành công!",
                },
            };
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.uid == action.payload.uid) {
                        return {
                            ...todo,
                            text: action.payload.text,
                        };
                    }
                    return todo;
                }),
                uidEdit: null,
                notification: {
                    type: "success",
                    message: "Đã cập nhật lại thông tin thành công!",
                },
            };
        case TOGGLE_TODO:
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.uid == action.payload.uid) {
                        return {
                            ...todo,
                            completed: action.payload.completed,
                            completedTime: action.payload.completed ? getDateTime() : "",
                        };
                    }
                    return todo;
                }),
                notification: {
                    type: "success",
                    message: action.payload.completed ? "Đã đánh dấu hoàn tất!" : "Đã hoàn tác thành công!",
                },
            };
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.uid !== action.payload),
                notification: {
                    type: "success",
                    message: "Đã xóa thành công!",
                },
            };
        case REMOVE_ALL_TODOS:
            return {
                ...state,
                todos: [],
                notification: {
                    type: "success",
                    message: "Đã xóa tất cả công việc thành công!",
                },
            };
        case CLEAR_NOTIFICATION_TODO:
            return {
                ...state,
                notification: null,
            };
        case UPDATE_MESSAGE_TODO:
            return {
                ...state,
                notification: action.payload,
            };
        default:
            return state;
    }
};
