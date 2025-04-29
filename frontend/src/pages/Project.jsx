/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./ProjectPage.css";

export default function ProjectPage() {
    const { projectId } = useParams();
    const [project, setProject] = useState({});
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newTask, setNewTask] = useState({ title: "", description: "" });

    useEffect(() => {
        fetchProject();
        fetchTasks();
    }, []);

    const fetchProject = async () => {
        const res = await fetch(`http://localhost:3000/api/project/projects/${projectId}`, { credentials: "include" });
        const data = await res.json();
        setProject(data.data);
    };

    const fetchTasks = async () => {
        const res = await fetch(`http://localhost:3000/api/project/projects/${projectId}`, { credentials: "include" });
        const data = await res.json();
        setTasks(data.data?.tasks);
    };

    const handleCreateTask = async () => {
        const res = await fetch(`http://localhost:3000/api/task/create/${projectId}`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        });

        if (res.ok) {
            setNewTask({ title: "", description: "" });
            setShowModal(false);
            fetchTasks();
        } else {
            alert("Failed to create task ❌");
        }
    };

    const markAsCompleted = async (taskId) => {
        const res = await fetch(`http://localhost:3000/api/task/mark-as-completed/${taskId}`, {
            method: "POST",
            credentials: "include"
        });

        if (res.ok) fetchTasks();
        else alert("❌ Could not update task");
    };

    const handleDeleteTask = async (taskId) => {
        const res = await fetch(`http://localhost:3000/api/task/delete/${taskId}`, { method: "DELETE", credentials: "include" });

        if (res.ok) fetchTasks();
        else alert("❌ Could not delete task");
    }

    const deleteProject = async () => {

        const res = await fetch(`http://localhost:3000/api/project/projects/${projectId}`, { method: "DELETE", credentials: "include" });

        if (res.ok) navigate("/dashboard");
        else alert("❌ Could not delete task");
    }

    return (
        <div className="project-page">
            <header className="project-header">
                <h1 contentEditable>{project.title}</h1>
                <p contentEditable>{project.description}</p>
                <div>
                    <button className="add-task-btn" onClick={() => setShowModal(true)}>
                        Add Task
                    </button>
                    <button className="delete-btn" onClick={() => deleteProject()}>
                        Delete Project
                    </button>
                </div>

            </header>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Create New Task</h3>
                        <input
                            type="text"
                            placeholder="Task Title"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        />
                        <textarea
                            placeholder="Task Description"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        />
                        <button onClick={handleCreateTask}>🚀 Create Task</button>
                        <button onClick={() => setShowModal(false)}>❌ Cancel</button>
                    </div>
                </div>
            )}

            <section className="task-list">
                {tasks.length === 0 ? (
                    <p>No tasks yet!</p>
                ) : (
                    tasks.map((task) => (
                        <div key={task._id} className={`task-card ${task.completed ? "completed" : ""}`}>
                            <h4>{task.title}</h4>
                            <p>{task.description}</p>
                            <div className="task-meta">
                                <p>Status: {task.status}</p>
                                <p>Created: {new Date(task.createdAt).toLocaleDateString()}</p>
                                {task.dateOfCompletion && (
                                    <p>Completed: {new Date(task.dateOfCompletion).toLocaleDateString()}</p>
                                )}
                            </div>
                            {!task.dateOfCompletion && (
                                <label>
                                    <input
                                        type="checkbox"
                                        onChange={() => markAsCompleted(task._id)}
                                    />
                                    Mark as Completed
                                </label>
                            )}
                            <button className="delete-btn" onClick={() => handleDeleteTask(task._id)}>Delete</button>
                        </div>
                    ))
                )}
            </section>
        </div>
    );
}
