"use client"

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
//import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

// import withAuth from "@/hoc/withAuth";
const stats = [
    { title: "Total Tasks", value: 120 },
    { title: "Completed", value: 78 },
    { title: "Pending", value: 34 },
    { title: "Overdue", value: 8 },
];

const data = [
    { name: "Mon", tasks: 10 },
    { name: "Tue", tasks: 15 },
    { name: "Wed", tasks: 7 },
    { name: "Thu", tasks: 12 },
    { name: "Fri", tasks: 20 },
];

export default function DashboardOverview() {
    return (
        <section className="p-3 md:p-6">
            <div className="grid gap-6 p-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardContent className="p-4">
                            <p className="text-sm text-gray-600">{stat.title}</p>
                            <h2 className="text-2xl font-bold">{stat.value}</h2>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="md:col-span-2 lg:col-span-4">
                <Card className="mb-4">
                    <CardContent className="p-4">
                        <h3 className="text-lg font-semibold mb-4">Weekly Task Completion</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="tasks" fill="#4f46e5" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="mb-4">
                    <CardContent className="p-4">
                        <h3 className="text-lg font-semibold mb-4">Upcoming Deadlines</h3>
                        <ul className="space-y-2">
                            <li>📌 Design Review Meeting - Today</li>
                            <li>📌 Finish Feature X - Tomorrow</li>
                            <li>📌 Client Feedback - In 3 days</li>
                        </ul>
                    </CardContent>                
                </Card>

                <Card className="mb-4">
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