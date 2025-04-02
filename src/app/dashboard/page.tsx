"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import withAuth from "@/hoc/withAuth";

function Dashboard() {
  return (
    <section className="p-6">
        {/*<h1 className="text-2xl font-bold mb-6 text-purple-600">Dashboard</h1>*/}
        {/* Task Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <Card className="bg-gray-200 text-gray-800">
                <CardHeader><CardTitle>To Do</CardTitle></CardHeader>
                <CardContent>10 Tasks</CardContent>
            </Card>

            <Card className="bg-yellow-200 text-yellow-800">
                <CardHeader><CardTitle>In Progress</CardTitle></CardHeader>
                <CardContent>5 Tasks</CardContent>
            </Card>

            <Card className="bg-green-200 text-green-800">
                <CardHeader><CardTitle>Completed</CardTitle></CardHeader>
                <CardContent>20 Tasks</CardContent>
            </Card>
        </div>
    </section>
  );
}

export default Dashboard;
//export default withAuth(Dashboard);
