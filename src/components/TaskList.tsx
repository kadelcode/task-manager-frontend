import React, { useState, Ref } from "react";
import { useDrop, useDrag, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card } from "./ui/card";

// Define the Task interface
interface Task {
    id: number;
    title: string;
    status: string;
}

// Define the props for TaskColumn component
interface TaskColumnProps {
    status: string;
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

// Define the props for TaskCard component
interface TaskCardProps {
    task: Task;
}

// Define a list of tasks with their initial statuses
const tasks = [
    { id: 1, title: "Design the UI", status: "To Do" },
    { id: 2, title: "Develop API", status: "In Progress" },
];

// Main TaskList component
const TaskList = () => {
    // State to manage the list of tasks
    const [taskList, setTaskList] = useState<Task[]>(tasks);

    return (
        // Layout for the task colums
        <div className="grid grid-cols-3 gap-4">
            {/* Map over the statuses to create a column for each */}
            {["To Do", "In Progress", "Completed"].map((status) => (
                // Render a TaskColumn for each status
                <TaskColumn key={status} status={status} tasks={taskList} setTasks={setTaskList} />
            ))}
        </div>
    );
};

// TaskColumn component to represent each column of tasks
const TaskColumn: React.FC<TaskColumnProps> = ({ status, tasks, setTasks }) => {
    // useDrop hook to make this component a drop target
    const [, drop] = useDrop({
        accept: "TASK", // Accept items of type "TASK"
        drop: (item: { id: number}) => moveTask(item.id, status), // Handle the drop event
    });

    // Function to move a task to a new status
    const moveTask = (id: number, newStatus: string) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, status: newStatus } : task ))
        );
    };

    return (
        // Container for the task column with drop functionality
        <div ref={drop as unknown as Ref<HTMLDivElement>} className="p-4 bg-gray-200 rounded-lg min-h-[200px]">
            <h3 className="font-bold">{status}</h3>

            {/* Filter and map tasks to display only those with the current status */}
            {tasks.filter((t) => t.status === status).map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    )
};

// TaskCard component to represent each task
const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    // useDrag hook to make this component draggable
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "TASK", // Type of draggable item
        item: { id: task.id }, // Data to be transferred
        collect: (monitor) => ({ isDragging: monitor.isDragging() }), // Monitor dragging state
    }));

    return (
        // Task card with drag functionality and conditional styling
        <Card ref={drag as unknown as Ref<HTMLDivElement>} className={`p-4 mt-2 bg-white ${isDragging ? "opacity-50" : ""}`}>
            {task.title}
        </Card>
    );
};

const TaskListDndProvider = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <TaskList />
        </DndProvider>
    )
};

// Export the TaskList component as the default export
// export default TaskList;
export default TaskListDndProvider;