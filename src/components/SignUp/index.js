import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';


function Signup() {
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
        axios.post('http://localhost:4000/signup', { username: username, password: password })
            .then((response) => {
                // Get the JWT token from the response
                const token = response.data.token;
                console.log(`Received token: ${token}`);
                localStorage.setItem('token', token);
                console.log('Token saved in local storage:', token);
                // TODO: Save the token in local storage or cookies for future use
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="login-container">
            <h2>Sign Up</h2>
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

export default Signup;
