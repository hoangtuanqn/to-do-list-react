import { ToastContainer, toast } from "react-toastify";
import React, { useLayoutEffect, useState } from "react";
import { getDateTime } from "./utils/date";

export default function TodoList() {
    const [note, setNote] = useState("");
    const [todos, setTodos] = useState([]);
    const [infoUpdate, setInfoUpdate] = useState({
        isUpdate: false,
        uid: "",
    });

    const message = (status, message) => {
        return toast[status](message);
    };
    const addTodoList = (note) => {
        const noteInfo = {
            uid: Date.now(),
            note: note,
            completed: false,
            completedTime: "",
        };
        const updatedTodos = [...todos, noteInfo];
        setTodos(updatedTodos);
        saveTodoList(updatedTodos);
    };

    const updateTodoList = (note) => {
        const uid = infoUpdate.uid;
        const index = findIndexItem(uid);
        if (index == -1) return;
        const updatedTodos = [...todos];
        updatedTodos[index] = {
            ...updatedTodos[index],
            note: note,
        };
        setTodos(updatedTodos);
        saveTodoList(updatedTodos);
        setInfoUpdate({
            isUpdate: false,
            uid: "",
        });
    };

    const validate = (note) => {
        if (!note) {
            message("error", "Vui lòng nhập đầy đủ thông tin!");
            return false;
        }
        return true;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate(note)) {
            infoUpdate.isUpdate ? updateTodoList(note) : addTodoList(note);
            message("success", infoUpdate.isUpdate ? "Đã cập nhật thành công!" : "Đã thêm thành công!");
            setNote("");
        }
    };

    const findIndexItem = (uid) => {
        return todos.findIndex((item) => item.uid === uid);
    };

    const handleOperation = (uid, status = false) => {
        const index = findIndexItem(uid);
        if (index == -1) return;
        const updatedTodos = [...todos];
        updatedTodos[index] = {
            ...updatedTodos[index],
            completed: status,
            completedTime: status ? getDateTime() : "",
        };
        setTodos(updatedTodos);
        saveTodoList(updatedTodos);
    };

    const handleRemoveItem = (uid) => {
        let index = findIndexItem(uid);
        if (index == -1) return;
        const updatedTodos = [...todos];

        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
        saveTodoList(updatedTodos);
        message("success", "Đã xóa thành công!");
    };

    const saveTodoList = (todoList) => {
        localStorage.setItem("todos", JSON.stringify(todoList));
    };
    const getTodoList = () => {
        const todosJson = localStorage.getItem("todos");
        const todosParse = JSON.parse(todosJson);
        setTodos(todosParse ?? []);
    };

    const clearTodos = () => {
        setTodos([]);
        saveTodoList([]);
        message("success", "Đã xóa hết tất cả thành công!");
    };

    useLayoutEffect(() => {
        getTodoList();
    }, []);
    return (
        <div className="w-4xl w-max-full mx-auto mt-20">
            <h1 className="text-center font-bold text-2xl">Ứng dụng Todo List</h1>
            <div className="my-10">
                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            type="note"
                            id="note"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Công việc cần làm"
                            // required
                        />
                        <button
                            type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                        >
                            {infoUpdate.isUpdate ? "Cập nhật" : "Thêm"}
                        </button>
                    </div>
                </form>
            </div>
            <div className="relative overflow-x-auto">
                <button
                    onClick={() => confirm("Bạn có chắc chắn muốn xóa hết tất cả không?") && clearTodos()}
                    className="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mb-5 cursor-pointer"
                >
                    Xóa tất cả
                </button>
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
                                        {item.note}
                                    </th>
                                    <td className={`px-6 py-4 ${item.completed ? "text-green-600" : ""}`}>
                                        {item.completed ? "Đã hoàn thành" : "Chưa hoàn thành"}
                                    </td>
                                    <td className="px-6 py-4">{item.completedTime}</td>
                                    <td className="px-6 py-4 flex gap-3">
                                        <a
                                            href="javascript:void(0)"
                                            onClick={() => handleOperation(item.uid, !item.completed)}
                                            className={`font-medium ${
                                                item.completed ? "text-gray-500" : "text-blue-500"
                                            }`}
                                        >
                                            {item.completed ? "Hoàn tác" : "Hoàn thành"}
                                        </a>
                                        <a
                                            href="javascript:void(0)"
                                            onClick={() => {
                                                setNote(item.note);
                                                setInfoUpdate({
                                                    isUpdate: true,
                                                    uid: item.uid,
                                                });
                                            }}
                                            className="font-medium text-yellow-600 dark:text-yellow-500"
                                        >
                                            Chỉnh sửa
                                        </a>
                                        <a
                                            href="javascript:void(0)"
                                            onClick={() =>
                                                confirm("Bạn có chắc chắn muốn xóa nó đi không?") &&
                                                handleRemoveItem(item.uid)
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
            </div>
            <ToastContainer />
        </div>
    );
}
