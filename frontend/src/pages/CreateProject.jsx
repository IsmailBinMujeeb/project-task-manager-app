import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProjectPage.css";

export default function CreateProjectPage() {

    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            return setMessage("Please fill in all fields ❌");
        }

        try {
            const response = await fetch("http://localhost:3000/api/project/create", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate("/dashboard")
            } else {
                setMessage(`❌ ${data.message || "Failed to create project."}`);
            }
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setMessage("❌ Server error. Try again.");
        }
    };

    return (
        <div className="create-project-container">
            <h2>Create New Project</h2>
            {message && <p className="message">{message}</p>}
            <form className="create-project-form" onSubmit={handleSubmit}>
                <label>Project Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                />
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    rows="5"
                />
                <button type="submit">🚀 Create Project</button>
            </form>
        </div>
    );
}
