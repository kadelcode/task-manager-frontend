"use client";

import useTaskStore from "@/store/taskStore";
import { useEffect } from "react";
import { format } from "date-fns";
import {Loader2, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";


export default function TasksListPage() {
    const { tasks, fetchTasks, loading, error } = useTaskStore();

    useEffect(() => {
      fetchTasks()
    }, [fetchTasks])

    return (
      <section>
        { loading && (
          <div className="p-4 py-20 w-full flex justify-center items-center">
            <Loader2 className="animate-spin text-[#05df72]" />
          </div>
        )}
        
        { error && (
            <div className="p-4 py-20 text-center text-[#e7000b]">Error: {error}</div>
        )}
        { !loading && !error && (
          <div className="w-full mx-auto p-4">
            {tasks.length === 0 ? (
              <div className="text-center mt-10 space-y-4">
                <p className="text-center text-gray-500 text-lg mt-10">
                  You have no tasks yet.
                </p>
                <Link 
                  href="/tasks/new"
                  className="inline-block bg-[#101828] hover:bg-[#1e2939] text-[#fff] px-4 py-2 rounded-lg shadow"
                >
                  Create your task
                </Link>
              </div>
            ) : (
              <div>
              <h1 className="text-2xl font-semibold mb-6">Your Tasks</h1>
              <ul>
                {[...tasks].reverse().map((task) => (
                  <li 
                    key={task.title}
                    style={{ boxShadow: '0px 2px 4px 2px rgb(0, 0, 0, 0.1)'}}
                    className={`p-4 mt-4 rounded-2xl shadow-md transition-all flex flex-col sm:flex-row sm:justify-between sm:items-center ${
                      task.status === "done" ? "bg-[#dcfce7]" : "bg-[#fff]"
                    }`}
                  >
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-[#1e2939]">{task.title}</h2>
                      <p className="text-[#4a5565] mt-1 text-justify">{task.description}</p>
                      {task.dueDate && (
                        <p className="text-sm text-[#6a7282] mt-1">
                          Due: {format(new Date(task.dueDate), "MMM dd, yyyy")}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0 mt-3 sm:mt-0 sm:ml-4">
                      {task.status === "done" ? (
                        <CheckCircle className="text-[#00c951] w-6 h-6" />
                      ) : (
                        <Clock className="text-[#efb100] w-6 h-6" />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              </div>
            )}
        </div>
        )}
      </section>
    );
}
