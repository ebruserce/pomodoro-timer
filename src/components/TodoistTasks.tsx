import { useState, useEffect } from "react";

export default function TodoistTasks() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch tasks from backend
    async function fetchTasks() {
        try {
            const res = await fetch("http://localhost:4000/tasks", {
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to fetch tasks");

            const data = await res.json();
            setTasks(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // Close a task
    async function closeTask(id: string) {
        try {
            const res = await fetch(`http://localhost:4000/tasks/${id}/close`, {
                method: "POST",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to close task");

            // Remove the task from UI immediately after closing
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    if (loading) return <div>Loading tasks...</div>;

    return (
        <div className="bg-sage-200 rounded-4xl flex flex-col shadow-md relative">
            <div className="text-white font-sofia text-xl md:text-2xl lg:text-2xl p-4 flex justify-center">
                Your Todoist Inbox Tasks
            </div>
            <div className="p-4">
                <ul className="space-y-2">
                    {tasks.map(task => (
                        <li
                            key={task.id}
                            className="flex items-center gap-2 text-white"
                        >
                            <input
                                type="checkbox"
                                onChange={() => closeTask(task.id)}
                                className="w-5 h-5 cursor-pointer accent-sage-100"
                            />
                            <span>{task.content}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
