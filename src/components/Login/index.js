import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Username: ${username} Password: ${password}`);
        // Do something with the username and password

        axios.post('http://localhost:4000/login', { username: username, password: password })
            .then(response => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                alert('valid credentials');
                // Redirect the user to the protected page
            })
            .catch(error => {
                alert('Invalid credentials');
            });
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
                <label>
                    Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;
