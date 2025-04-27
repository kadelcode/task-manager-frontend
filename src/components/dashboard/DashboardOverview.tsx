"use client"

import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
//import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
// import axios from "axios";
import { Loader2 } from "lucide-react";
import useTaskStore from "@/store/taskStore";

import { isBefore, subDays, format, isSameDay } from "date-fns";

// Define a function to get an array of the past 7 days formatted as ["Mon", "Tue", ...]
const getPastWeekDays = () => {
    // Initialize an empty array to store the days
    const days = [];

    // Loop from 6 to 0 (inclusive) to get the past 7 days
    for (let i = 6; i >= 0; i--) {
        // Calculate the date for each day by subtracting 'i' days from the current date
        const date = subDays(new Date(), i);

        // Push an object containing the date and its formatted label into the 'days' array
        days.push({
            date, // The actual date object
            label: format(date, "EEE"), // Format the date as a three-letter abbreviation (e.g., "Mon", "Tue")
        });
    }
    return days; // Ensure the function returns the array
};

//const apiURL = process.env.NEXT_PUBLIC_API_URL;

// Define a type for a task
/*type Task = {
    _id: string;
    title: string;
    status: "todo" | "in-progress" | "done" | "overdue";
    dueDate: string;
    priority: string;
    createdAt: string;
}*/

// import withAuth from "@/hoc/withAuth";
/*const stats = [
    { title: "Total Tasks", value: 120 },
    { title: "Completed", value: 78 },
    { title: "Pending", value: 34 },
    { title: "Overdue", value: 8 },
];*/

/*const data = [
    { name: "Mon", tasks: 10 },
    { name: "Tue", tasks: 15 },
    { name: "Wed", tasks: 7 },
    { name: "Thu", tasks: 12 },
    { name: "Fri", tasks: 20 },
];*/

export default function DashboardOverview() {
    //const [tasks, setTasks] = useState<Task[]>([]);
    const { tasks, fetchTasks, loading, error } = useTaskStore();
    //const [loading, setLoading] = useState<boolean>(true);
    //const [error, setError] = useState<string | null>(null);

    // Get today's date
    const today = new Date();

    // Call the getPastWeekDays function to get an array of the past 7 days
    const pastWeekDays = getPastWeekDays();

    // Map over the pastWeekDays array to create a new array called weeklyData
    const weeklyData = pastWeekDays.map(day => ({
        // Set the 'name' property to the formatted label of the day (e.g., "Mon", "Tue")
        name: day.label,

        // Set the 'tasks' property to the count of tasks created on that day
        tasks: tasks.filter(task => {
            // Use the isSameDay function to check if the task was created on the same day as 'day.date'
            return isSameDay(new Date(task.createdAt), day.date);
        }).length, // Get the length of the filtered array, which is the count of tasks created on that day 
    }))

    // Calculate overdue tasks
    const overdueTasks = tasks.filter((task) => {
        // If task is not done AND dueDate is before today
        return (
            task.status !== "done" &&
            task.dueDate && isBefore(new Date(task.dueDate), today)
        );
    })

    // Total number of overdue tasks
    const totalOverdue = overdueTasks.length;

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "done").length;
    const pending = tasks.filter(t => t.status === "in-progress").length;
    //const overdue = tasks.filter(t => t.status === "overdue").length;

    return (
        <section className="p-3 md:p-6">
            <div>
                { loading && (
                        <div className="p-4 py-20 w-full flex justify-center items-center">
                            <Loader2 className="animate-spin text-[#05df72]" />
                        </div>
                )}

                { error && (
                        <div className="p-4 py-20 text-center text-[#e7000b]">Error: {error}</div>
                )}
                { !loading && !error && (
                    <div className="grid gap-6 p-4 md:grid-cols-2 lg:grid-cols-4">
                        <StatCard title="Total Tasks" value={total} />
                        <StatCard title="Completed" value={completed} />
                        <StatCard title="Pending" value={pending} />
                        <StatCard title="Overdue" value={totalOverdue} />
                    </div>
                )}
            </div>

            <div className="md:col-span-2 lg:col-span-4">
                <Card style={{ boxShadow: '0 2px 4px -2px rgb(0, 0, 0, 0.5)' }} className="mb-4">
                    <CardContent className="p-4">
                        <h3 className="text-lg font-semibold mb-4">Weekly Task Completion</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={weeklyData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="tasks" fill="#4f46e5" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card style={{ boxShadow: '0 2px 4px -2px rgb(0, 0, 0, 0.5)' }} className="mb-4">
                    <CardContent className="p-4">
                        <h3 className="text-lg font-semibold mb-4">Upcoming Deadlines</h3>
                        <ul className="space-y-2 text-[#000]">
                            <li>📌 Design Review Meeting - Today</li>
                            <li>📌 Finish Feature X - Tomorrow</li>
                            <li>📌 Client Feedback - In 3 days</li>
                        </ul>
                    </CardContent>                
                </Card>

                <Card style={{ boxShadow: '0 2px 4px -2px rgb(0, 0, 0, 0.5)' }} className="mb-4">
                    <CardContent className="p-4">
                        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                        <div className="flex gap-2 flex-wrap">
                            <Button>Add Task</Button>
                            <Button variant="outline">View Calendar</Button>
                            <Button variant="outline">Search Tasks</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

type StatCardProps = {
    title: string;
    value: number;
}

function StatCard({ title, value }: StatCardProps) {
    return (
        <Card style={{ boxShadow: '0 2px 4px -2px rgb(0, 0, 0, 0.5)' }}>
            <CardContent className="p-4">
                <p className="text-sm text-[#4a5565]">{title}</p>
                <h2 className="text-2xl font-bold text-[#000]">{value}</h2>
            </CardContent>
        </Card>
    )
}