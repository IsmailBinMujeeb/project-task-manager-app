import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import "./DashboardPage.css";

export default function DashboardPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/user/projects", {
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                const data = await response.json();

                if (response.ok) {

                    setProjects(data.data || []);
                } else {
                    setError(data.message || "Could not load your projects.");
                }
                // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setError("Network error. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleCreateProject = () => {

        navigate("/create-project")
    };

    return (
        <div className="dashboard-container">
            <h2>📂 Your Projects</h2>

            {loading && <p>Loading projects... ⏳</p>}
            {error && <p className="error">{error}</p>}

            {projects.length < 4 && (
                <button className="create-btn" onClick={handleCreateProject}>
                    ➕ Create New Project
                </button>
            )}

            <div className="projects-grid">
                {projects.map((project) => (
                    <div className="project-card" key={project._id}>
                        <h3><Link to={`/project/${project._id}`} className="project-title">{project.title}</Link></h3>
                        <p>{project.description}</p>
                        <span className="date">
                            📅 {new Date(project.createdAt).toLocaleDateString(`en-${project.owner?.country || 'IN'}`, {
                                day: "2-digit", month: "short", year: "numeric"
                            })}
                        </span>
                    </div>
                ))}
                {!loading && projects.length === 0 && (
                    <p>You haven’t created any projects yet! 👀</p>
                )}
            </div>
        </div>
    );
}
