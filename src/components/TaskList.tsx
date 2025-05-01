import React, { useState, Ref, useEffect } from "react";
import { useDrop, useDrag, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card } from "./ui/card";
import useTaskStore from "@/store/taskStore";
import { Loader2 } from "lucide-react";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Define the Task interface
interface Task {
    id: string;
    title: string;
    status: string;
}

// Define the props for TaskColumn component
interface TaskColumnProps {
    status: "todo" | "in-progress" | "done" | "overdue";
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

// Define the props for TaskCard component
interface TaskCardProps {
    task: Task;
}

// Define a list of tasks with their initial statuses
/*const tasks = [
    { id: 1, title: "Design the UI", status: "To Do" },
    { id: 2, title: "Develop API", status: "In Progress" },
];*/

// Main TaskList component
const TaskList = () => {
    // State to manage the list of tasks
    const [taskList, setTaskList] = useState<Task[]>([]);

    const tasks = useTaskStore((state) => state.tasks);
    const loading = useTaskStore((state) => state.loading);
    const fetchTasks = useTaskStore((state) => state.fetchTasks);

    useEffect(() => {
        /*const fetchTasks = async () => {
            // const response = await axios.get(API_URL + '/tasks');
            setTaskList(response.data)
        };*/
        fetchTasks(); // Fetch tasks from the API when the component mounts
    }, [fetchTasks]);

    if (loading) {
        return <div className="p-4 py-20 w-full flex justify-center items-center">
                    <Loader2 className="animate-spin text-[#05df72]" />
               </div>; // Show loading state while fetching tasks
    }
    if (!tasks) {
        return <div className="p-4 py-20 w-full flex justify-center items-center">No tasks available</div>; // Show message if no tasks are available
    }
    /*if (tasks.length === 0) {
        return <div>No tasks available</div>; // Show message if no tasks are available
    }
    if (tasks.length > 0) {
        setTaskList(tasks); // Set the task list with fetched tasks
    }*/
    // Render the task columns using the TaskColumn component

    return (
        // Layout for the task colums
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Map over the statuses to create a column for each */}
            {(["todo", "in-progress", "done"] as const).map((status) => (
                // Render a TaskColumn for each status
                <TaskColumn key={status} status={status} tasks={taskList} setTasks={setTaskList} />
            ))}
        </div>
    );
};

// TaskColumn component to represent each column of tasks
const TaskColumn: React.FC<TaskColumnProps> = ({ status }) => {
    const tasks = useTaskStore((state) => state.tasks);
    const updateTask = useTaskStore((state) => state.updateTask);

    // useDrop hook to make this component a drop target
    const [, drop] = useDrop({
        accept: "TASK", // Accept items of type "TASK"
        drop: (item: { id: string}) => moveTask(item.id, status), // Handle the drop event
    });

    // Function to move a task to a new status
    const moveTask = async (id: string, newStatus: "todo" | "in-progress" | "done" | "overdue") => {
        try {
            await updateTask(id, { status: newStatus }); // Update the task status in the backend
            // Optionally, you can also update the local state here if needed
        } catch (error) {
            console.error("Error moving task:", error); // Handle any errors that occur during the update
        }
    };

    return (
        // Container for the task column with drop functionality
        <div ref={drop as unknown as Ref<HTMLDivElement>} className="p-4 sm:p-6 h-[80vh] sm:h-screen w-full bg-[#e5e7eb] rounded-lg min-h-[200px]">
            <h3 className="font-bold">
                {status === "todo" ? "To Do" : status === "in-progress" ? "In Progress" : "Completed"}
            </h3>

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
        <Card ref={drag as unknown as Ref<HTMLDivElement>} className={`p-4 mt-2 bg-[#fff] ${isDragging ? "opacity-50" : ""}`}>
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