"use client";

import useTaskStore from "@/store/taskStore";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import {Loader2, CheckCircle, Clock, Pencil, Trash2, X, CheckCircle2, AlarmMinusIcon } from "lucide-react";
import Link from "next/link";
import type { Task } from "@/types/taskTypes";
import { motion, AnimatePresence } from "framer-motion";


function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown}).message === "string"
  )
}


export default function TasksListPage() {
    const { tasks, fetchTasks, loading, error, deleteTask, updateTask } = useTaskStore();

    // Modal and editing states
    const [isModelOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

    // Add state to confirm the deletion of a task
    const [confirmingDeleteId, setConfirmingDeleteId] = useState<string | null>(null);

    // Add a timer state to confirm deletion
    const [confirmTimer, setConfirmTimer] = useState<NodeJS.Timeout | null>(null);

    // Add a deleting task id state
    const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);


    //const [hasFetched, setHasFetched] = useState(false);

    // Checks if the task is overdue and not completed
    const isOverdue = (task: Task) => {
      if (!task.dueDate) return false;
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      return dueDate < today && task.status !== "done";
    }

    // Update timer on delete icon click
    const handleStartConfirmDelete = (taskId: string) => {
      setConfirmingDeleteId(taskId);

      // Clear any previous timer
      if (confirmTimer) {
        clearTimeout(confirmTimer);
      }

      // Start a new 5s timer
      const timer = setTimeout(() => {
        setConfirmingDeleteId(null);
      }, 5000);

      setConfirmTimer(timer);
    }

    // Update timer on Cancel or Confirm click
    const handleCancelDelete = () => {
      setConfirmingDeleteId(null);
      if (confirmTimer) {
        clearTimeout(confirmTimer);
      }
    };

    const handleConfirmDelete = async (taskId: string) => {
      try {
        setDeletingTaskId(taskId);
        await deleteTask(taskId); // await the Zustand action
      } finally {
        setDeletingTaskId(null);
        setConfirmingDeleteId(null);
      }
      if (confirmTimer) {
        clearTimeout(confirmTimer);
      }
    }

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
        /*console.log("Saving task with data:", {
          title: editingTask.title,
          description: editingTask.description,
          dueDate: editingTask.dueDate,
          priority: editingTask.priority,
          status: editingTask.status,
        });*/
        closeModal();
      } catch (error) {
        if (isErrorWithMessage(error)) {
          setUpdateError(error.message)
        } else {
          setUpdateError("Failed to update task.");
        }
      } finally {
        setIsUpdating(false);
      }
    }

    /*const handleDelete = (taskId: string) => {
      deleteTask(taskId); // Zustand action
    }*/

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
                      task.status === "done" 
                      ? "bg-[#dcfce7]"
                      : isOverdue(task)
                      ? "bg-[#ffe4e6]"
                      : "bg-[#fff]"
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
                        <div title="Completed">
                          <CheckCircle className="text-[#00c951] w-6 h-6" />
                        </div>
                      ) : isOverdue(task) ? (
                        <div title="Overdue">
                          <AlarmMinusIcon className="text-[#fb2c36] w-6 h-6" />
                        </div>
                      ) :
                      (
                        <div title="Pending">
                          <Clock className="text-[#efb100] w-6 h-6" />
                        </div>
                      )}

                      {/* Edit button */}
                      <button
                        title="Edit Task"
                        onClick={() => {openEditModal(task); console.log("Opening modal for tasks:", task)}}
                        className="text-gray-900 hover:bg-gray-300 p-2 rounded-3xl transition-colors"
                      >
                        <Pencil className="w-5 h-5"/>
                      </button>

                      <AnimatePresence mode="wait">
                      {/* Delete confirmation */}
                      {confirmingDeleteId === task.id ? (
                        <motion.div
                          key="confirming"
                          initial={{ opacity: 0, scale: 0.8, x: 20 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.8, x: 20 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="flex items-center gap-2"
                        
                        >
                          <button
                            title="Cancel"
                            onClick={handleCancelDelete}
                            className="text-gray-900 hover:bg-gray-300 p-2 rounded-full transition"
                          >
                            <X className="h-5 w-5" />
                          </button>
                          <button
                            title="Confirm Delete"
                            onClick={() => handleConfirmDelete(task.id)}
                            className="text-gray-900 hover:bg-gray-300 p-2 rounded-full transition"
                          >
                            {deletingTaskId === task.id ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <CheckCircle2 className="h-5 w-5" />
                            )}
                            
                          </button>
                        </motion.div>
                        ) : (
                          <button
                            title="Delete Task"
                            onClick={() => handleStartConfirmDelete(task.id)}
                            className="text-gray-900 hover:bg-gray-300 p-2 rounded-3xl transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                      )}
                      </AnimatePresence>
                      
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
                <div 
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-[#fff] p-6 mx-3 rounded-xl shadow-xl w-full max-w-md space-y-4">
                    <h2 className="text-xl font-semibold">Edit Task</h2>

                    {/* Title */}
                    <input 
                      type="text"
                      value={editingTask.title}
                      onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                      style={{ border: '1px black solid'}}
                      placeholder="Title"
                    />

                    {/* Description */}
                    <textarea
                      value={editingTask.description}
                      onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                      style={{ border: '1px black solid'}}
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
                      style={{ border: '1px black solid'}}
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
                      style={{ border: '1px black solid'}}
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
                          setEditingTask((prev) => prev ? { ...prev, status: e.target.checked ? "done" : "todo" } : prev)
                        }
                      />
                      <span>Completed</span>
                    </label>

                    {/* Error */}
                    {updateError && (
                      <p className="text-sm text-[#fb2c36]">{updateError}</p>
                    )}
                    

                    {/* Buttons */}
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={closeModal}
                        className="px-4 py-2 rounded bg-[#e5e7eb] hover:bg-[#d1d5dc]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className={`px-4 py-2 rounded text-white transition 
                          ${isUpdating ? "bg-[#4a5565] cursor-not-allowed" : "bg-[#101828] hover:bg-[#1e2939]"}
                        `}
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
