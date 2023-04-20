import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';


function handleLogout() {
    localStorage.removeItem('token');
    window.location.reload(); // refresh the page
}

function Home() {
    const token = localStorage.getItem('token');
    if (token) {
        return (
            <div className="App_home">
                <nav className="navbar">
                    <div className="navbar-title">Home</div>
                    <div className="nav-links">
                        <button onClick={handleLogout}>Logout</button>
                        <Link to="/profile">Dashboard</Link>
                    </div>
                </nav>
                <div className="content">
                    <h1>Welcome to my React App!</h1>
                    <p>This is my first React app with a black navbar.</p>
                </div>
            </div>
        )
    }
    else {
        return (
        <div className="App_home">
            <nav className="navbar">
                <div className="navbar-title">Home</div>
                <div className="nav-links">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>
            </nav>
            <div className="content">
                <h1>Welcome to my React App!</h1>
                <p>This is my first React app with a black navbar.</p>
            </div>
        </div>
    );
    }
}

export default Home;
