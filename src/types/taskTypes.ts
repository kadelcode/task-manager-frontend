// Define the Task interface to specify the structure of a task object
export interface Task {
    id: string; // Unique identifier for the task
    title: string; // Title of the task
    description: string; // Description of the task
    status: "todo" | "in-progress" | "done" | "overdue"; // Status of the task
    priority: "low" | "medium" | "high"; // Priority level of the task
    dueDate: string; // Due date of the task
    assignedTo: string; // Person assigned to the task
};