import { ToastContainer } from "react-toastify";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useTodo } from "./hooks/useTodo";

export default function TodoList2() {
    const { actions } = useTodo();
    return (
        <div className="w-4xl w-max-full mx-auto mt-20">
            <h1 className="text-center font-bold text-2xl">Ứng dụng Todo List</h1>
            <div className="my-10">
                <TodoForm />
            </div>
            <div className="relative overflow-x-auto">
                <button
                    onClick={() => confirm("Bạn có chắc chắn muốn xóa hết tất cả không?") && actions.clearTodos()}
                    className="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mb-5 cursor-pointer"
                >
                    Xóa tất cả
                </button>
                <TodoList />
            </div>
            <ToastContainer />
        </div>
    );
}
