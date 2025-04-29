import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const [auth, setAuth] = useState("checking");
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                let res = await fetch("http://localhost:3000/api/user/profile", {
                    credentials: "include",
                });
                
                if (res.ok) return setAuth("authorized");

                if (res.status === 401) {
                    const refresh = await fetch(
                        "http://localhost:3000/api/user/refresh-access-token",
                        {
                            method: "POST",
                            credentials: "include",
                        }
                    );

                    if (refresh.ok) {
                        // Retry original profile request after refresh
                        res = await fetch("http://localhost:3000/api/user/profile", {
                            credentials: "include",
                        });

                        if (res.ok) return setAuth("authorized");
                    }
                }

                setAuth("unauthorized");
            // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setAuth("unauthorized");
            }
        };

        checkAuth();
    }, []);

    if (auth === "checking") return <p>Checking authentication...</p>;

    if (auth === "unauthorized") return navigate("/login");

    return children;
}
