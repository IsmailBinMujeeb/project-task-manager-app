import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {

    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:3000/api/user/profile", { credentials: "include" })
            .then(res => {
                if (res.ok) navigate("/dashboard");
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="landing-container">
            <header className="landing-header">
                <h1 className="landing-title">Taskify</h1>
                <p className="landing-subtitle">
                    Organize your day, boost your productivity.
                </p>
            </header>

            <main className="landing-main">
                <h2 className="main-heading">Why Taskify?</h2>
                <ul className="feature-list">
                    <li>Create and manage your tasks easily</li>
                    <li>Set reminders and deadlines</li>
                    <li>Track your progress visually</li>
                    <li>Sync across devices</li>
                </ul>
                <button className="get-started-btn" onClick={() => navigate("/login")}>Get Started</button>
            </main>

            <footer className="landing-footer">
                &copy; 2025 Taskify. All rights reserved.
            </footer>
        </div>
    );
}