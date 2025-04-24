"use client";

import useTaskStore from "@/store/taskStore";


export default function TasksListPage() {
    const { tasks } = useTaskStore();

    return (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
    );
}
