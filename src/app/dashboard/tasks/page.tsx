"use client";

import useTaskStore from "@/store/taskStore";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import {Loader2, CheckCircle, Clock, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import type { Task } from "@/types/taskTypes";


export default function TasksListPage() {
    const { tasks, fetchTasks, loading, error, deleteTask, updateTask } = useTaskStore();

    // Modal and editing states
    const [isModelOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

    //const [hasFetched, setHasFetched] = useState(false);

    const openEditModal = (task: Task) => {
      setEditingTask(task)
      setIsModalOpen(true);
    }

    const closeModal = () => {
      setEditingTask(null);
      setIsModalOpen(false);
    }

    // Handle task editing
    const handleSave = async () => {
      if (!editingTask?.id) {
        console.error("No task ID provided")
        return;
      }
      setIsUpdating(true);
      setUpdateError(null);

      try {
        await updateTask(editingTask.id, {
          title: editingTask.title,
          description: editingTask.description,
          dueDate: editingTask.dueDate,
          priority: editingTask.priority,
          status: editingTask.status,
        })
        closeModal();
      } catch (error) {
        const message =
          (typeof error == "object" &&
            error !== null &&
            "message" in error &&
            (error as any).message) ||
            "Failed to update task.";
        setUpdateError(message as string);
      } finally {
        setIsUpdating(false);
      }
    }

    const handleDelete = (taskId: string) => {
      deleteTask(taskId); // Zustand action
    }

    /*useEffect(() => {
      if (!hasFetched) {
        fetchTasks().then(() => setHasFetched(true));
      }
    }, [fetchTasks, hasFetched]);*/
    useEffect(() => {
      fetchTasks();
    }, [fetchTasks]);

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
                <p className="text-center text-[#6a7282] text-lg mt-10">
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
                    key={task.id}
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
                    <div className="flex items-center gap-3 mt-3 sm:mt-0 sm:ml-4">
                      {task.status === "done" ? (
                        <CheckCircle className="text-[#00c951] w-6 h-6" />
                      ) : (
                        <Clock className="text-[#efb100] w-6 h-6" />
                      )}

                      {/* Edit button */}
                      <button 
                        onClick={() => {openEditModal(task); console.log("Opening modal for tasks:", task)}}
                        className="text-gray-900 hover:bg-gray-300 p-2 rounded-3xl transition-colors"
                      >
                        <Pencil className="w-5 h-5"/>
                      </button>

                      {/* Delete button */}
                      <button 
                        onClick={() => handleDelete(task.id)}
                        className="text-gray-900 hover:bg-gray-300 p-2 rounded-3xl transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                  </li>
                ))}
              </ul>
              </div>
            )}
        </div>
        )}
        {/*Edit Task Modal */}
        {isModelOpen && editingTask && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-[#fff] p-6 rounded-xl shadow-xl w-full max-w-md space-y-4">
                    <h2 className="text-xl font-semibold">Edit Task</h2>

                    {/* Title */}
                    <input 
                      type="text"
                      value={editingTask.title}
                      onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Title"
                    />

                    {/* Description */}
                    <textarea
                      value={editingTask.description}
                      onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Description"
                    ></textarea>

                    {/* Due Date */}
                    <input
                      type="date"
                      value={editingTask.dueDate?.slice(0, 10) || ""}
                      onChange={(e) =>
                        setEditingTask({ ...editingTask, dueDate: e.target.value })
                      }
                      className="w-full border rounded px-3 py-2"
                    />

                    {/* Priority */}
                    <select
                      value={editingTask.priority || "medium"}
                      onChange={(e) => 
                        setEditingTask({
                          ...editingTask,
                          priority: e.target.value as "low" | "medium" | "high",
                        })
                      }
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>

                    {/* Completed */}
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editingTask.status==="done"}
                        onChange={(e) =>
                          setEditingTask({ ...editingTask, status: e.target.checked ? "done" : "todo"})
                        }
                      />
                      <span>Completed</span>
                    </label>

                    {/* Error */}
                    {updateError && (
                      <p className="text-sm text-red-500">{updateError}</p>
                    )}
                    

                    {/* Buttons */}
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={closeModal}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        disabled={isUpdating}
                      >
                        { isUpdating ? "Saving..." : "Save"}
                      </button>

                    </div>
                  </div>
                </div>
              )}
      </section>
    );
}
