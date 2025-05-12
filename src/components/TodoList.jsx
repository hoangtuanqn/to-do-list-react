import React from "react";
import { useTodo } from "../hooks/useTodo";

export default function TodoList() {
    const { state, actions } = useTodo();
    const todos = state.todos;

    const handleRemoveItem = (uid) => {
        actions.removeItemTodo(uid);
    };

    const handleOperation = (uid, completed) => {
        actions.toogleTodo({
            uid,
            completed,
        });
    };

    const handleEdit = (uid) => {
        actions.startEditTodo(uid);
    };
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Công việc cần làm
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Trạng thái
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Thời gian hoàn thành
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Thao tác
                    </th>
                </tr>
            </thead>
            <tbody>
                {todos.length > 0 ? (
                    [...todos].reverse().map((item) => (
                        <tr
                            key={item.uid}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                        >
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {item.text}
                            </th>
                            <td className={`px-6 py-4 ${item.completed ? "text-green-600" : ""}`}>
                                {item.completed ? "Đã hoàn thành" : "Chưa hoàn thành"}
                            </td>
                            <td className="px-6 py-4">{item.completedTime}</td>
                            <td className="px-6 py-4 flex gap-3">
                                <a
                                    href="javascript:void(0)"
                                    onClick={() => handleOperation(item.uid, !item.completed)}
                                    className={`font-medium ${item.completed ? "text-gray-500" : "text-blue-500"}`}
                                >
                                    {item.completed ? "Hoàn tác" : "Hoàn thành"}
                                </a>
                                <a
                                    href="javascript:void(0)"
                                    onClick={() => handleEdit(item.uid)}
                                    className="font-medium text-yellow-600 dark:text-yellow-500"
                                >
                                    Chỉnh sửa
                                </a>
                                <a
                                    href="javascript:void(0)"
                                    onClick={() =>
                                        confirm("Bạn có chắc chắn muốn xóa nó đi không?") && handleRemoveItem(item.uid)
                                    }
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                >
                                    Xóa
                                </a>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <td className="px-6 py-4 text-center" colSpan={4}>
                            Hiện tại chưa có bất kỳ công việc nào
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
