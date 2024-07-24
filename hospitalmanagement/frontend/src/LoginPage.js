import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        navigate('/');
        try {
            const response = await axios.post('http://localhost:3001/api/users/login', { username, password });
            console.log('User logged in:', response.data);
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Failed to log in. Please check your credentials and try again.');
        }
        navigate('/');
    };

    return (
        <div className="auth-page">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit">Login</button>
        </form>
    </div>
    );
};

export default LoginPage;
