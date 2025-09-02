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
        <div>
            <h2>Your Todoist Inbox Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.content}</li>
                ))}
            </ul>
        </div>
    );
}
