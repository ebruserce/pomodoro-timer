import { useState, useEffect } from "react";

export default function TodoistTasks() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const res = await fetch("http://localhost:4000/tasks", {
                    credentials: "include", // important to send cookies
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

        fetchTasks();
    }, []);

    if (loading) return <div>Loading tasks...</div>;

    return (
        <div className="bg-sage-200 rounded-4xl flex flex-col shadow-md relative">
            <div className="text-white font-sofia text-xl md:text-2xl lg:text-2xl p-4 flex justify-center">
                Your Todoist Inbox Tasks
            </div>
            <div className="flex justify-between items-center p-4">
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>{task.content}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
