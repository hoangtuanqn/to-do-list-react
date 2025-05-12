import React, { useEffect, useState } from "react";
import { useTodo } from "../hooks/useTodo";

export default function TodoForm() {
    const [text, setText] = useState("");
    const { state, actions } = useTodo();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            state.uidEdit
                ? actions.updateTodo({
                      uid: state.uidEdit,
                      text: text.trim(),
                  })
                : actions.addTodo(text.trim());
            setText("");
        } else {
            actions.updateMessageTodo({
                type: "error",
                message: "Vui lòng nhập đầy đủ thông tin!",
            });
        }
    };
    useEffect(() => {
        if (state.uidEdit) {
            const todo = state.todos.find((item) => item.uid === state.uidEdit);
            if (todo) {
                setText(todo.text);
            }
        }
    }, [state.uidEdit, state.todos]);
    return (
        <form onSubmit={handleSubmit}>
            <div className="relative">
                <input
                    type="text"
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Công việc cần làm"
                    // required
                />
                <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                >
                    {state.uidEdit ? "Cập nhật" : "Thêm"}
                </button>
            </div>
        </form>
    );
}
