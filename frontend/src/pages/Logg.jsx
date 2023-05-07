import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logg = () => {
    const navigate = useNavigate();
    const [logout, setLogout] = React.useState(false);
    const [logg, setLogg] = useState({ logg: [] });
    
    React.useEffect(() => {
        if (!localStorage.getItem("auth")) navigate("/login");
    }, [navigate, logout]);
    
    const logoutHandler = (e) => {
        e.preventDefault();
        localStorage.removeItem("auth");
        setLogout(true);
    };
    
    useEffect(() => {
        const fetchData = async () => {
        const response = await fetch("http://api.solvann.eksempler.no/api/logg");
        const data = await response.json();
        setLogg(data);
        };
        fetchData();
    }, []);
    
    return (
        <div>
        <h1>Logg</h1>
        <button onClick={logoutHandler}>Logg ut</button>
        <table>
            <thead>
            <tr>
                <th>Id</th>
                <th>Logg</th>
                <th>Timestamp</th>
            </tr>
            </thead>
            <tbody>
            {logg.map((log) => (
                <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.logg}</td>
                <td>{log.timestamp}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
    }

export default Logg;