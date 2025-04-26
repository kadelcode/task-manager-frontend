// This interface defines the structure of a task object as it is expected
// to be received from an API
export interface TaskFromAPI {
    _id: string; // Unique identifier for the task
    title: string; // Title of the task
    description: string; // Description of the task
    status: "todo" | "in-progress" | "done" | "overdue"; // Status of the task
    priority: "low" | "medium" | "high"; // Priority level of the task
    dueDate: string; // Due date of the task
    assignedTo: string; // Person assigned to the task
};

// This interface extends from TaskFromAPI interface but omits the _id property
export interface Task extends Omit<TaskFromAPI, "_id"> {
    id: string;
}